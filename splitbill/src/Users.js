import React from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

class Users extends React.Component {
  state = {
    users: []
  };

  render() {
    return (
      <div>
        <h2> My Friends </h2>

        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              
            </tr>
          </thead>

          <tbody>
            {this.state.users.map(user => {
              return (
                <tr>
                  <td> {user.username}</td>
                  <td> {user.email} </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
  componentDidMount() {
    const headers = { authorization: localStorage.getItem("jwt") };

    const endpoint = "https://arpita-sinha-split-the-bill.herokuapp.com/api/users/";
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
}
export default Users;
// fetchData=()=>{
//     const token = localStorage.getItem('jwt')
//            const  config = {
//              headers: {
//                "authorization": token,
//             }
//           }
//           axios.get("http://localhost:9090/api/users/",config)
//               .then(res =>{

//                console.log("here is the response from GET call",res)
//               })
//  }
