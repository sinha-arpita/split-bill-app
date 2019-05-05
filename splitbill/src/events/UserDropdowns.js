import React from "react";
import { tsIndexSignature } from "@babel/types";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class UserDropdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    for (let i = 0; i < this.props.users.length; i++) {}
    return (
      <div>
        {this.props.users.map(user => {
          return <DropdownItem> {user} </DropdownItem>;
        })}
      </div>
    );
  }
}

export default UserDropdown;
