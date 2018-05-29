const Nightmare = require('nightmare')
const assert = require('assert')

describe('Load a series of Pages on the Deployed Environment', function() {
  // Recommended: 5s locally, 10s to remote server, 30s from airplane ¯\_(ツ)_/¯
  this.timeout('10s')

  let nightmare = null
  beforeEach(() => {
    nightmare = new Nightmare()
  })

  describe('/ (Home Page)', () => {
    it('should load without error', done => {
      // your actual testing urls will likely be `http://localhost:port/path`
      nightmare.goto('https://bitchin-kitchen.herokuapp.com/')
        .end()
        .then(function (result) { done() })
        .catch(done)
    })
  })

  describe('/user (User Page)', () => {
    it('should load without error', done => {
      // your actual testing urls will likely be `http://localhost:port/path`
      nightmare.goto('https://bitchin-kitchen.herokuapp.com/#/user')
        .end()
        .then(function (result) { done() })
        .catch(done)
    })
  })
})

  describe('Load a series of Pages on the Local Environment', function() {
    // Recommended: 5s locally, 10s to remote server, 30s from airplane ¯\_(ツ)_/¯
    this.timeout('10s')
  
    let nightmare = null
    beforeEach(() => {
      nightmare = new Nightmare()
    })
  
    describe('/ (Home Page)', () => {
      it('should load without error', done => {
        // your actual testing urls will likely be `http://localhost:port/path`
        nightmare.goto('http://localhost:8080/')
          .end()
          .then(function (result) { done() })
          .catch(done)
      })
    })
  
    describe('/user (User Page)', () => {
      it('should load without error', done => {
        // your actual testing urls will likely be `http://localhost:port/path`
        nightmare.goto('http://localhost:8080/#/user')
          .end()
          .then(function (result) { done() })
          .catch(done)
      })
    })
})

  describe('Do a recipe Search on the deployed environment', function () {
    this.timeout('30s')
  
    let nightmare = null
    beforeEach(() => {
      // show true lets you see wth is actually happening :)
      nightmare = new Nightmare({ 
        openDevTools: {
            mode: 'detach'
        },  
        show: true })
    })
  
    describe('given a search query', () => {
      it('should find and recieve a result', done => {
        nightmare
        .goto('https://bitchin-kitchen.herokuapp.com/#/user')
        .on('page', (type, message) => {
          if (type == 'alert') done()
        })
        .type('#recipe-search', 'pizza')
        .click('#search-submit')
        .wait(2000)
        .wait('.recipeheader') //Only appears when recipes are loaded.
        .end()
        .then(result => { done() })
        .catch(done)
      })
    })
  })

  describe('Do a recipe Search on the local environment', function () {
    this.timeout('30s')
  
    let nightmare = null
    beforeEach(() => {
      // show true lets you see wth is actually happening :)
      nightmare = new Nightmare({ 
        openDevTools: true,  
        show: true })
    })
  
    describe('given a search query', () => {
      it('should find and recieve a result', done => {
        nightmare
        .goto('http://localhost:8080/#/user')
        .click('.navbar-toggler-icon')
        .type('#recipe-search', 'pizza')
        .click('#search-submit')
        .wait(2000)
        .exists('.recipeheader') //Only appears when recipes are loaded.
        .end()
        .then(result => { done() })
        .catch(done)
      })
    })
  })
