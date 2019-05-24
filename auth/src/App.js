import React from "react";
import "./App.css";
import { Route, NavLink } from "react-router-dom";
import Login from "./Login";
import Users from "./Users";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "http://localhost:5111"
    };
  }

  login = user => {
    console.log("hit login");
    console.log("user", user);
    // const axiosObj = { headers: user, body: {} };

    axios.interceptors.request.use(
      options => {
        options.headers.username = user.username;
        options.headers.password = user.password;
        return options;
      },
      err => {
        return Promise.reject(err);
      }
    );

    // axios({
    //   method: "post",
    //   url: `${this.state.url}/api/login`,
    //   headers: user
    // })

    axios
      .get(`${this.state.url}/api/login`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <>
        <header>
          <NavLink to="/login">Login</NavLink>
        </header>
        <main>
          <Route path="/login" render={props => <Login login={this.login} />} />
          <Route exact path="/" component={Users} />
        </main>
      </>
    );
  }
}

export default App;
