import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { NavLink, Route } from "react-router-dom";
import SignUp from "./Formalities/SignUp";
import axios from "axios";
import SignIn from "./Formalities/SignIn";
import Users from "./Users";
import Dashbaord from "./events/Dashbaord";
import Notifications from "./events/Notifications";

class App extends Component {
  constructor() {
    super();
    this.state = {
      signedInUser: null,
      
    };
  }

  userSignedIn = user => {
    this.setState({ signedInUser: user });
  };

  createNewEvent = newEvent => {
    const headers = { authorization: localStorage.getItem("jwt") };
    console.log("New Event ");
    console.log(newEvent);
    axios
      .post("http://localhost:9090/api/events/", { headers }, newEvent)
      .then(res => {
        console.log("POST reply came ... ", res);
        //here the data came in res.data.success
      })
      .catch(err => {
        console.log(err);
      });
  };

  eventCreated = () => {
    this.setState({});
  }

  render() {
    if (this.state.signedInUser) {
      return (
        <div className="App">
         <h2 className="welcome"> Split-the-Bills </h2>
         <h3>Welcome {this.state.signedInUser}!</h3>
         <button onClick ={this.logoutHandler} >Logout</button>
          <hr />
          <main className="main">
            <Dashbaord  eventCreated={this.eventCreated} />

            <Notifications />

            {/* <NavLink to="/users" className="friends"><h2>My FriendList</h2></NavLink>
            <Route path="/users" component={Users} /> */}
            <Users />
          </main>
        </div>
      );
    } else {
      return (
        <div className="App">
          {/* <header className="main">
            <NavLink to="/signup">SignUp </NavLink>
            &nbsp; | &nbsp;
            <NavLink to="/signin">SignIn </NavLink>
            &nbsp; | &nbsp;
            
            
          </header>
          <main>
            <Route path="/signup" component={SignUp} />
             
            <Route
              exact path="/signin" render={props => (<SignIn {...props} userSignedIn={this.userSignedIn} /> )} />
           
          </main> */}
          
          <header className="main"> 
              <h1 className="header"> SPLIT-THE-BILLS</h1>  
          </header>

          <div className="log">
          
            
          
            <SignIn userSignedIn={this.userSignedIn}/>
            <SignUp/>
          </div>
        </div>
        
      );
    }
  }

  logoutHandler= ()=>{

    localStorage.removeItem('jwt');
    this.setState({signedInUser:false})
  }
}

export default App;
