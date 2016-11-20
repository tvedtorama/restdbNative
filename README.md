## An Auth0 powered todo-app in react-native connected to the restdb.io plug and play database.

Using the [restdb.io cloud database](https://restdb.io) to persist tasks.  See [this blog post](https://restdb.io/blog/#!posts/57cece1a2d5dbc27000000d3) for a similar example using their "pages" web technology.

### Tech stack

**Libraries**

* react-native
* [Auth0](https://github.com/auth0/react-native-lock) 
* redux
* redux-saga
* [react-motion](https://github.com/chenglou/react-motion)
* axios

**Dev tools**

* typescript 
* babel
* gulp

**GUI and Authentication**

The GUI is a port of the TODOMvc sample from the excellent [react-motion library](https://github.com/chenglou/react-motion).  Porting to typescript and react-native was fairly simple - the animation logic worked out of the box. The styling was much more challenging, however, and ATW not very flexible and a disgrace to the orgiginal (looks OK in iPhone 5 portrait). 

The GUI was also converted to redux and some very simple sagas takes care of persisting the user's inputs to the restdb database.

User authentication with Auth0 is a breeze, the GUI simply displays a login screen which is overlaid with the Auth0 login panel.  When a JWT is received, the redux saga toggles state and the todo-GUI is shown.

**Building and Debugging**

Building is done by `gulp build` or `gulp watch`.  This produces at javascript file hierarchy under /build, which is used runtime. When hot reloading is activated, the GUI updates after each build. (ATW, this causes the login screen to reappear - not very "hot" then.)

To debug, use "remote js debugging" in chrome, and connect the amazing [remote-redux-devtools](https://github.com/zalmoxisus/remote-redux-devtools).  This can be done by uncommenting `composeEnhancers(applyMiddleware(middleware)))` in *init.ts*.  With the remote devtools active, head over to remotedev.io/local and see the state of the app unfolding.  Magic!

**Making it you own**

Set ut a free database over at restdb.io, and get an account at Auth0.  Configre the db in app/database.ts, setup the Auth0 clientId in components/Todo.tsx.