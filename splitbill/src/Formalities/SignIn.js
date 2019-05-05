import React from "react";
import axios from "axios";
import "./sign.css";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  inputHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  submitHandler = event => {
    event.preventDefault();
    console.log("Logging in...");
    const endpoint = "http://localhost:9090/api/auth/login";
    axios
      .post(endpoint, this.state)
      .then(res => {
        localStorage.setItem("jwt", res.data.token);
        this.props.userSignedIn(this.state.username);
      })
      .catch(err => {
        console.log("thec error is ", err);
      });
  };

  render() {
    return (
      <>
       
        <form className="form" onSubmit={this.submitHandler}>
          <input className="inside"
            type="text"
            placeholder="username"
            name="username"
            value={this.state.username}
            onChange={this.inputHandler}
          />
          <br />
          <br />

          <input className="inside"
            type="password"
            placeholder="password"
            name="password"
            value={this.state.password}
            onChange={this.inputHandler}
          />
          <br />
          <br />
          <button type="submit">SignIn</button>
        </form>
      </>
    );
  }
}

export default SignIn;
