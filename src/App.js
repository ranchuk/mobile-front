import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";
import EditUser from "./components/editUser/editUser";
import MyCart from "./components/myCart/myCart";
import MyProducts from "./components/myProducts/myProducts";
import Login from "./components/login/login";
import { Provider } from "react-redux";
import store from "./store/store";
import "./sass/main.scss";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/edituser" component={EditUser} />
            <Route exact path="/myCart" component={MyCart} />
            <Route exact path="/myProducts" component={MyProducts} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
