import React from "react";
import axios from "axios";
import "./Notification.css";
import Table from "react-bootstrap/Table";

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDues: [],
      userRecievables: []
    };
  }

  componentDidMount() {
    // Call axios to get dues,.
    // set dues in state
    const endpoint = "http://localhost:9090/api/events/getdues";
    const headers = {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("jwt")
    };
    axios
      .get(endpoint, { headers: headers }) //endpoint has req.body, token is in headers
      .then(res => {
        console.log("Get RESPONSE for dues", res.data.dues);
        this.setState({ userDues: res.data.dues });
      })
      .catch(error => {
        console.log("error:", error);
        this.setState({
          users: [{ id: 1, user: "You are not authorized !! Please sign in.." }]
        });
      });

    const Rendpoint = "http://localhost:9090/api/events/recievables";
    const headers2 = {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("jwt")
    };

    axios
      .get(Rendpoint, { headers: headers2 })
      .then(res => {
        console.log(
          "Here is the response from recievables",
          res.data.recievables
        );
        this.setState({ userRecievables: res.data.recievables });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          users: [{ id: 1, user: "You are not authorized !! Please sign in.." }]
        });
      });
  }
  render() {
    console.log("User recv", this.state.userRecievables);

    return (
      <div className=".notification">
        <h2> My Dues </h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>To Pay</th>
            </tr>
          </thead>

          <tbody className="duesTable">
            {this.state.userDues.map(due => {
              return (
                <tr>
                  <td>{due.username}</td>
                  <td>{due.email}</td>
                  <td>{due.amount_to_pay}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <h2> My Recievables </h2>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>To Pay</th>
            </tr>
          </thead>
          <tbody>
            {this.state.userRecievables.map(recievable => {
              return (
                <tr>
                  <td>{recievable.username}</td>
                  <td>{recievable.email}</td>
                  <td>{recievable.to_get}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Notifications;
