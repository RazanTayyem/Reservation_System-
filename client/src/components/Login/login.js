import React, { Component } from "react";
import "./login.css";
import Logobig from "./logobig.png";
import axios from "axios";

class Login extends Component {
  state = {
    user: {},
    error: null
  };

  componentDidMount() {
    const { history } = this.props;
    axios.get("/checkauth").then(({ data }) => {
      if (data.success) {
        history.push("/home");
      } else {
        history.push("/");
      }
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ user: { ...this.state.user, [name]: value } });
  };

  handleClick = () => {
    const { username, password } = this.state.user;
    const { history } = this.props;
    axios
      .post("/login", { username, password })
      .then(({ data }) => {
        if (data.success) {
          history.push("/home");
        } else {
          this.setState({ error: data.error });
        }
      })
      .catch(error => {
        this.setState({ error: error.response.data.error });
      });
  };
  handleSubmitForm = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="outer-login">
        <div className="login">
          <img
            className="photo"
            src={Logobig}
            alt="logo"
            width="30%"
            height="370px"
          />

          <form className="form" onSubmit={this.handleSubmitForm}>
            <input
              className="login-input"
              type="text"
              name="username"
              value={this.state.username}
              placeholder="username"
              onChange={this.handleChange}
            />
            <input
              className="login-input"
              type="password"
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <button className="btn1" onClick={this.handleClick}>
              Log in
            </button>
            {this.state.error != null && (
              <p className="error-message"> {this.state.error}</p>
            )}
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
