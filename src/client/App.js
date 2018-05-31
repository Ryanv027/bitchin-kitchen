import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Home } from './Home';
import User from './User';
import firebase, { auth, provider } from './firebase.js';
import * as firebaseui from 'firebaseui'
import 'firebase/auth';
import { Create } from './Create';
import { Favorites } from './Favorites';

var uiConfig = {
  signInSuccessUrl: '/user',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID
  ],
};
var ui = new firebaseui.auth.AuthUI(firebase.auth());

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      welcome: null,
      username: '',
      user: null,
      searchTerm: '',
      recipeQuery: '',
      searchRedirect: false,
      favorites: []
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStar = this.handleStar.bind(this);
    this.removeStar = this.removeStar.bind(this);
    this.favoritesToDatabase = this.favoritesToDatabase.bind(this);
    this.deleteFavorites = this.deleteFavorites.bind(this);
    this.getUserFavorites = this.getUserFavorites.bind(this);
    this.setFavoriteState = this.setFavoriteState.bind(this);
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }
  componentDidUpdate(){
    
  }
  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        window.location = '/#/user'
        let user_data = JSON.stringify({
          // photo: ,
          bio: user.photoURL,
          email: user.email,
          birthday: '',
          user_name: user.displayName,
          fuid: user.uid,
        });

        console.log(user);

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
                user
              });
            }
            
        }).then(()=> {
          window.location.href = "/#/user"
        }).catch(error => {
            console.log(error)
        });
      });
  }
  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }
  getUserFavorites(){
    if(this.state.user !== null){
      console.log('passed inspection')
      fetch(`/api/getUserFavorites/${this.state.user.uid}`)
        .then(response => {
          return response.json();
        })
        .then(response => {
          this.setFavoriteState(response)
        })
        .catch(error => {
          console.log(error)
        })
    }    
  }
  setFavoriteState(recipes){
    console.log(recipes)
    let favs = []
    for (let i = 0; i < recipes.length; i++) {
        favs.push(recipes[i].recipe_id)
    }
    this.setState({ favorites: favs})
  }
  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  handleStar(id, name, image){
    //console.log(name + ' Handle Star and ' + image)
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
      console.log(response)
    })
  }
  }

  deleteFavorites(id){
    console.log('working delete')
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
        console.log(response)
      })
    } 
  } 

  handleSubmit(event) {
    console.log('firing')
    this.setState({ recipeQuery: this.state.searchTerm, searchRedirect: true });
  }

  removeStar(recipe){
    console.log('remove hit')
    let recipeLocation = this.state.favorites.indexOf(recipe)
    console.log(recipeLocation)
    let favorites = this.state.favorites
    console.log(favorites)
    let newFavorites = favorites.filter((index) => {
      return index !== recipe
    })
    console.log(newFavorites)
    this.setState({ favorites: newFavorites })
  }
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path='/user'
          render={(routeProps) => (<User {...routeProps}
            user={this.state.user}
            searchTerm={this.state.searchTerm}
            recipeQuery={this.state.recipeQuery}
            onClickLogin={this.login}
            onClickLogout={this.logout}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            handleStar={this.handleStar}
            favorites={this.state.favorites}
            getUserFavorites={this.getUserFavorites}
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
              searchTerm={this.state.searchTerm}
              recipeQuery={this.state.recipeQuery}
              onClickLogin={this.login}
              onClickLogout={this.logout}
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              handleStar={this.handleStar}
              favorites={this.state.favorites}
            />
            )}
          />
         
        </Switch>
      </HashRouter>
    );
  }
}