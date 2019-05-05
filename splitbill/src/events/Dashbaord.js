import React from "react";
import axios from "axios";
//import EventForm from "./EventForm";
import EventsForm from "./EventsForm";
import "./events.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    const headers = { authorization: localStorage.getItem("jwt") };

    const endpoint = "http://localhost:9090/api/users/";
    axios
      .get(endpoint, { headers })
      .then(res => {
        console.log("Get RESPONSE", res);
        this.setState({ users: res.data });
      })

      .catch(error => {
        console.log("error:", error);
        this.setState({
          users: [{ id: 1, user: "You are not authorized !! Please sign in.." }]
        });
      });
  }

  eventCreated = () => {
    this.props.eventCreated();
  }
  render() {
    return (
      <div className="dashboard">
       <h1 className= "new"> Create New Events </h1>
        <EventsForm users={this.state.users} eventCreated={this.eventCreated}/>
      </div>
    );
  }
}

export default Dashboard;
