import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/layout/NavBar";

import About from "./components/layout/About";
import Contact from "./components/layout/Contact";
import AddDish from "./components/dishes/AddDish";
import Dishes from "./components/dishes/Dishes";
import Dish from "./components/dishes/Dish";
import Alert from "./components/layout/Alert";
//import Upload from "./components/test/Upload";
import { Provider } from "react-redux";
import store from "./store";
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <section className="container">
            <Alert />

            <Switch>
              <Route exact path="/about" component={About} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/adddish" component={AddDish} />
              <Route exact path="/" component={Dishes} />
              <Route exact path="/dish/:id" component={Dish} />
              {/*<Route exact path="/upload" component={Upload} />*/}
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
