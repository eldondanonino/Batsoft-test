import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
} from "react-router-dom";
import SubmitButton from "./Components/SubmitButton";
import LoginForm from "./Components/LoginForm";
import "./style.css";

class App extends Component {
  constructor() {
    super();
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.getStatus = this.getStatus.bind(this);

    this.state = {
      login: false,
      user: "",
    };
  }

  componentDidMount() {
    //Initial check for the login status of our database
    this.getStatus();
  }

  //Login handler : sends the username and the password to the API for it to check if the credentials are valid
  async handleLogIn(un, pw) {
    try {
      let res = await fetch("/login", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: un,
          password: pw,
        }),
      });

      let result = await res.json();
      console.log(`Message from the server : ${result.message}`);
      if (result && result.success) {
        this.setState({ user: result.username, login: true });
        alert(`Login successful, welcome ${this.state.user}`);
        this.setState({ login: true });
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.log("ERROR WHILE LOGGING IN");
    }
  }

  //Logout handler : pretty much the same, requests the logout from the API
  async handleLogOut() {
    try {
      let res = await fetch("/logout", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "",
        }),
      });

      let result = await res.json();
      console.log(`Server response : ${result.message}`);
      if (result && result.success) {
        this.getStatus();
        alert("Logout successful");
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.log("ERROR WHILE LOGGING OUT");
    }
  }

  //Status getter : checking with the API for a login state, and updates it accordingly
  async getStatus() {
    try {
      console.log("Sending a status request to the back");
      let res = await fetch("/getstatus", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          logged: 1,
        }),
      });

      let result = await res.json();
      console.log(`Server respons : ${result.message}`);

      if (result && result.success) {
        console.log(`Logged in : ${result.username}`);
        this.setState({ login: true });
        return result.success;
      } else {
        console.log("Error while contacting the server (not critical)");
        this.setState({ login: false });
        return result.success;
      }
    } catch (err) {
      console.log("ERROR WHILE CONTACTING THE SERVER");
      this.setState({ login: false });
      return 0;
    }
  }

  //user creation : send credentials to add to the database
  async handleSignup(un, pw) {
    console.log(`SENDING TO THE API : ${un} + ${pw}`);
    try {
      let res = await fetch("/signup", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: un,
          password: pw,
        }),
      });
      let result = await res.json();
      console.log(`Message from the server : ${result.message}`);
      if (result && result.success) {
        alert(`Signup successful, try logging in!`);
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.log("ERROR WHILE SIGNING UP");
    }
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Route path="/" exact>
            {() => this.getStatus()}
            {this.state.login === true ? (
              <Redirect push to="/main-menu" />
            ) : (
              <></>
            )}
            <div className="login-form">
              <p className="title">Login Page</p>
              <LoginForm text = "Log in!" LogIn={this.handleLogIn} />
              <br />
              <Link className="link" to={"/sign-up"}>
                Sign up now!
              </Link>
            </div>
          </Route>

          <Route path="/sign-up" exact>                   
            {() => this.getStatus()}
            {this.state.login === true ? (
              <Redirect push to="/main-menu" />
            ) : (
              <></>
            )}
            <div className="login-form">
              <h1 className="title"> Signup page </h1>
              <LoginForm text = "Sign up!" LogIn={this.handleSignup} />
              <br />
              <Link className="link" to={"/"}>
                Main Menu
              </Link>
            </div>
          </Route>

          <Route path="/main-menu" exact>
            {() => this.getStatus()}
            {this.state.login !== true ? <Redirect push to="/" /> : <></>}
            <div className="centerer">
              <h1 className="title">Welcome {this.state.user}!</h1>
              <p>
                Here is the exclusive content : a person that does not exist!{" "}
              </p>
              <img
                src="https://thispersondoesnotexist.com/image"
                width="600"
                height="600"
              />
              <SubmitButton text="Log Out" method={() => this.handleLogOut()} />
            </div>
          </Route>
        </div>
      </Router>
    );
  }
}
export default App;
