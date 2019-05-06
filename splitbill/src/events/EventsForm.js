import React from "react";
import axios from "axios";
//import Dropdown from "./Dropdown";
import "./eventform.css";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class EventsForm extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      event_name: "",
      description: "",
      date: "",
      total_expenditure: "",
      paid_by: "",
      participants: [],

      hide: "",
      users: [],
      selectedUser: [],
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  componentDidMount() {
    //Get users and populate them in this.state.users;
    this.setState({
      users: this.props.users,
      participants: this.props.users.map(user => {
        return user.username, user.email;
      })
    });
  }

  changeHandler = event => {
    event.preventDefault();
    console.log(event.target.name, event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  selectUser = (selected, event) => {
    event.preventDefault();
    this.setState({
      hide: { display: "none" },
      selectedUser: selected
    });
  };
  clickHandler = event => {
    event.preventDefault();
    
    let newEvent = {
      event_name: this.state.event_name,
      description: this.state.event_description,
      total_expenditure: this.state.total_expenditure,
      date: this.state.date,
      paid_by: this.state.paid_by,
      participants: this.state.participants
        ? this.state.participants.split(",")
        : []
    };

    // For testing :
    //let newEvent1 = {
    //   event_name: "name",
    //   description: "description",
    //   total_expenditure: "100",
    //   date: "11 may 2019",
    //   paid_by: "user1@abc.com",
    //   participants: ["user1@abc.com", "user4@abc.com"]
    // };

    // axios
    //   .post(endpoint, this.state)
    //   .then(res => {
    //     localStorage.setItem("jwt", res.data.token);
    //     this.props.userSignedIn(this.state.username);
    //   })
    //   .catch(err => {
    //     console.log("thec error is ", err);
    //   });

    const headers = {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("jwt")
    };

    const endpoint = "https://arpita-sinha-split-the-bill.herokuapp.com/api/events/";
    axios
      .post(endpoint, newEvent, { headers: headers })
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

    console.log("Create event = ", newEvent);
    this.setState({
      event_name: "",
      description: "",
      date: "",
      total_expenditure: 0,
      paid_by: "",
      particiants: []
    });

    console.log("calling event = ");
    this.props.eventCreated();
  };

  render() {
    console.log(this.state.selectedUser);
    return (
      <form className="myForm">
        <input
          type="text"
          name="event_name"
          value={this.state.event_name}
          placeholder="Event Name"
          onChange={this.changeHandler}
          className="EventName"
        />
        <br />
        <input
          type="text"
          name="event_description"
          value={this.state.event_description}
          placeholder="Event Description"
          onChange={this.changeHandler}
          className="EventName"
        />
        <br />
        <input
          type="text"
          name="date"
          value={this.state.date}
          placeholder="Event Date"
          onChange={this.changeHandler}
          className="EventName"
        />
        <br />
        <input
          type="text"
          name="total_expenditure"
          value={this.state.total_expenditure}
          placeholder="Total Expenditure"
          onChange={this.changeHandler}
          className="EventName"
        />
        <br />
        {/* <input
          type="text"
          name="Paid BY:"
          value={this.state.paid_by}
          placeholder="Paid BY"
          onChange={this.changeHandler}
          className="paidBy"
        /> */}
        {/* <Dropdown
          style={{
            border: "1px solid red",
            display: "flex",
            flexDirection: "column"
          }}
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle}
        >
          <DropdownToggle caret>Paid By</DropdownToggle>
          <DropdownMenu
            style={{
              border: "1px solid red",
              display: "flex",
              flexDirection: "column"
            }}
          >
            {this.props.users ? (
              this.props.users.map(user => (
                <DropdownItem
                  onClick={event => this.selectUser(user.email, event)}
                  key={user.id}
                >
                  {user.email}
                </DropdownItem>
              ))
            ) : (
              <DropdownItem>{this.state.selectedUser[0]}</DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown> */}
        <br />

        <h4 className="head">PaidBy</h4>
        <div>
          <input
            type="text"
            name="paid_by"
            value={this.state.paid_by}
            placeholder="Paid by"
            onChange={this.changeHandler}
            className="EventName"
          />
        </div>

        <br />
        <h4 className="head">Participants</h4>
        <textarea
          type="text"
          cols="50"
          rows="10"
          name="participants"
          placeholder="Participants, comma separated..."
          value={this.state.textBody}
          onChange={this.changeHandler}
          className="participants"
        />
        <br />
        <button className="submitButton" onClick={this.clickHandler}>
          Submit
        </button>
      </form>
    );
  }
}

export default EventsForm;
