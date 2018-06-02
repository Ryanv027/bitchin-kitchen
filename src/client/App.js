import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Home } from './Home';
import User from './User';
import firebase, { auth, provider } from './firebase.js';
import * as firebaseui from 'firebaseui'
import 'firebase/auth';
import { Create } from './Create';
import { Favorites } from './Favorites';
import util from 'util';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      welcome: null,
      username: '',
      user: null,
      chef: null,
      data: [],
      favdata: [],
      page: 1,
      selectedRecipe: false,
      searchTerm: '',
      recipeQuery: '',
      choice: (this.recipeQuery) ? this.recipeQuery : 'sushi',
      searchRedirect: false,
      favorites: [],
      startingPosition: 50,
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStar = this.handleStar.bind(this);
    this.removeStar = this.removeStar.bind(this);
    this.favoritesToDatabase = this.favoritesToDatabase.bind(this);
    this.deleteFavorites = this.deleteFavorites.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.getUserFavorites = this.getUserFavorites.bind(this);
    this.setFavoriteState = this.setFavoriteState.bind(this);
    this.setDataState = this.setDataState.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleRecipe = this.handleRecipe.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollRecipes = this.scrollRecipes.bind(this);
    this.searchRecipes = this.searchRecipes.bind(this);
  }

  componentWillMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ 
          user,
          chef: user.uid 
        });
        this.getFavorites();

      } else {
        window.location.href = '/#/'
      }
    });
    this.searchRecipes();
  }

  componentDidMount() {
    this.getFavorites();
    this.searchRecipes()
    // this.getUserFavorites();
    
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.chef !== nextProps.user.uid) {
      this.setState({chef: nextProps.user.uid})
      this.getFavorites()
    } else {
      
    }
    
  }

  componentDidUpdate( prevProps, prevState, snapshot){
        if(prevProps.recipeQuery === this.props.recipeQuery) {
            return false
        } else {
        this.setState({ page: 1, startingPosition: 50})
        this.searchRecipes();
        }
    }   
  
  
  getFavorites( ){
    // console.log('getFavorites in FAVORITES')
    fetch(`/api/getUserFavorites/${this.state.chef}`)
    .then(response => {
      // console.log(response)
      return response.json();
    })
    .then(response => {
      console.log( 'get favs favdata response:', util.inspect(response));
      this.setDataState(response)
    })
    .catch(error => {
      // console.log(error)
    })
  }

  getUserFavorites(){
    if(this.state.user !== null){
      // console.log('passed inspection')
      fetch(`/api/getUserFavorites/${this.state.user.uid}`)
        .then(response => {
          // console.log(response)
          return response.json();
        })
        .then(response => {
          this.setFavoriteState(response)
        })
        .catch(error => {
          // console.log(error)
        })
    } 
  }

  setFavoriteState(recipes){
    // console.log(recipes)
    let favs = []
    for (let i = 0; i < recipes.length; i++) {
        favs.push(recipes[i].recipe_id)
    }
    this.setState({ favorites: favs})
  }

  setDataState(recipes){
    let favdata = []
    for(let i =0; i < recipes.length; i++){
      favdata.push(recipes[i])
    }
    this.setState({ favdata: favdata })
  }

  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        const chef = result.user.uid
        window.location = '/#/user'
        let user_data = JSON.stringify({
          // photo: ,
          bio: user.photoURL,
          email: user.email,
          birthday: '',
          user_name: user.displayName,
          fuid: user.uid,
        });

        // console.log(user);

        fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: user_data
        })
        .then(response => {
            return response.json();
        }).then(newUser => {
            if(newUser){
              this.setState({
                user, 
                chef
              });
            }
            
        }).then(()=> {
          window.location.href = "/#/user"
        }).catch(error => {
            // console.log(error)
        });
      });
  }
  logout() {
    auth.signOut()
      .then(() => {
        window.location.href = "/#/"
        this.setState({
          user: null
        })
      });
  }

  getUserFavorites(){
    if(this.state.user !== null){
      // console.log('passed inspection')
      fetch(`/api/getUserFavorites/${this.state.user.uid}`)
        .then(response => {
          return response.json();
        })
        .then(response => {
          this.setFavoriteState(response)
        })
        .catch(error => {
          // console.log(error)
        })
    } 
  }

  setFavoriteState(recipes){
    // console.log(recipes)
    let favs = []
    for (let i = 0; i < recipes.length; i++) {
        favs.push(recipes[i].recipe_id)
    }
    this.setState({ favorites: favs})
  }

  favoritesToDatabase(id, name, image){
    if(this.state.user.uid){
    fetch('/api/addFavorites', {
      method: 'POST',
      headers: {
       'Content-Type': 'application/json'
      },
      body: 
        JSON.stringify(
          {recipeID: id,
            recipeName: name,
            recipeImg: image,
            fuid: this.state.user.uid
          })
      
    }).then(response => {
      return response.text();
    }).then(response => {
      // console.log(response)
    })
  }
  }

  searchRecipes( ){
    //// console.log('Search hit')
    let choice;
    if(this.state.recipeQuery){
      choice = this.state.recipeQuery;
      this.state.choice = this.state.recipeQuery;
    }else{
        choice = this.state.choice;
    }
    //// console.log(choice)
    let url = `/api/recipe-search/${choice}/${this.state.page}`
    let recipes = []
    //// console.log(url)
    fetch(url)
        .then(response => {
            return response.json();
        }).then(data => {
            // console.log('data')
            for(let i = 0; i < 10; i++){
                recipes.push(data[i])
            }
            if(recipes.length > 9){
                this.setState( (prevState) => ({ 
                    data: recipes,
                    startingPosition: 50
                }))
    
            }
        }).catch(error => {
            // console.log(error)
    })
  }

  deleteFavorites(id){
    // console.log('working delete')
    if(this.state.user.uid){
      fetch('api/deleteFavorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: 
          JSON.stringify(
            {
              recipeID: id,
              fuid: this.state.user.uid
            }
          )
      })
      .then(response => {
        return response.text();
      })
      .then(response => {
        // console.log(response)
      })
    } 
  } 

  handleSubmit(event) {
    // console.log('firing')
    this.setState({ recipeQuery: this.state.searchTerm, searchRedirect: true });
  }

  removeStar(recipe){
    // console.log('remove hit')
    let recipeLocation = this.state.favorites.indexOf(recipe)
    // console.log(recipeLocation)
    let favorites = this.state.favorites
    // console.log(favorites)
    let newFavorites = favorites.filter((index) => {
      return index !== recipe
    })
    // console.log(newFavorites)
    console.log('favdata coming?')
    console.log(util.inspect(this.props.favdata));
    this.setState({ favorites: newFavorites })
    // this.setState({ favdata: newFavorites })
    this.getFavorites();
  }

  scrollRecipes(){
    let url = `/api/recipe-search/${this.state.choice}/${this.state.page}`
        let currentRecipes = []
        fetch(url)
            .then(response => {
                return response.json(); 
            }).then(data => {
                for(let i =0; i < 10; i++){
                    if(data[i].recipeName !== undefined){
                    currentRecipes.push(data[i])
                    }
                }
                if(currentRecipes.length > 9){
                    this.setState(prevState => ({
                        data: prevState.data.concat(currentRecipes) ,
                        page: prevState.page + 1
                    }))
                }
            }).catch(error => {
                // console.log(error)
            }) 
  }

  handleRecipe(id){
    let url = `/api/get-recipe/${id}`
    fetch(url)
        .then(response => {
           return response.json();
        }).then(data => {
            this.setState(({ selectedRecipe: data }))                
        }).catch(error => {
            // console.log(error)
        })
}

handleChange(event) {
  this.setState({ searchTerm: event.target.value });
}

handleStar(id, name, image){
  //// console.log(name + ' Handle Star and ' + image)
  if(this.state.favorites.indexOf(id) !== -1){
    this.removeStar(id)
    this.deleteFavorites(id)
  } else {
    this.setState(prevState => ({
      favorites: prevState.favorites.concat(id)
    }));
    this.favoritesToDatabase(id, name, image);
  }
}


  handleModal(){
      this.setState(({ selectedRecipe: false }))
  }


  handleScroll(){
    const position = document.getElementById('scrollboxId').scrollTop
    console.log(`position:${position} startingPosition: ${(this.state.startingPosition)}`)
    if(position > (this.state.startingPosition)){
        this.setState((prevState) => ({ startingPosition: prevState.startingPosition + (400)}));
        this.scrollRecipes();
    }
  }

  


  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path='/user'
          render={(routeProps) => (<User {...routeProps}
            user={this.state.user}
            data={this.state.data}
            searchTerm={this.state.searchTerm}
            recipeQuery={this.state.recipeQuery}
            selectedRecipe={this.state.selectedRecipe}
            onClickLogin={this.login}
            onClickLogout={this.logout}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            handleStar={this.handleStar}
            favorites={this.state.favorites}
            getFavorites={this.getFavorites}
            getUserFavorites={this.getUserFavorites}
            handleScroll={this.handleScroll}
            handleRecipe={this.handleRecipe}
            handleModal={this.handleModal}
            scrollRecipes={this.scrollRecipes}
            searchRecipes={this.searchRecipes}
          />
          )}
          />
          <Route
            exact path='/'
            render={(routeProps) => (<Home {...routeProps}
              user={this.state.user}
              searchTerm={this.state.searchTerm}
              onClickLogin={this.login}
              onClickLogout={this.logout}
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
            />
            )}
          />
          <Route
            exact path='/create'
            render={(routeProps) => (<Create {...routeProps}
              user={this.state.user}
              searchTerm={this.state.searchTerm}
              onClickLogin={this.login}
              onClickLogout={this.logout}
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
            />
            )}
          />
          <Route
            exact path='/favorites'
            render={(routeProps) => (<Favorites {...routeProps}
              user={this.state.user}
              favdata={this.state.favdata}
              selectedRecipe={this.state.selectedRecipe}
              searchTerm={this.state.searchTerm}
              recipeQuery={this.state.recipeQuery}
              onClickLogin={this.login}
              onClickLogout={this.logout}
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              handleModal={this.handleModal}
              handleStar={this.handleStar}
              handleRecipe={this.handleRecipe}
              handleScroll={this.handleScroll}
              getFavorites={this.getFavorites}
              getUserFavorites={this.getUserFavorites}
              favorites={this.state.favorites}
            />
            )}
          />
         
        </Switch>
      </HashRouter>
    );
  }
}