import React from "react"
import "./Dropdown.css"

class Dropdown extends React.Component{
    constructor(props){
        super(props);

        this.state={
            showList : false,

        }


    }
    elementClickHandler=event=>{
        console.log(event.target.getAttribute("value"));
        this.props.elementHandler(event.target.getAttribute("value"))
        this.setState({showList:!this.state.showList})
    }

    clickHandler=(event)=>{
        event.preventDefault();

        this.setState({showList:!this.state.showList})
    }

    render(){
        //At first we are making the list as an  blank array because we don,t want to show the
        // dropdown menu without clicking.We put a  condition this.state.showList =true
       // then the list variable gets the entire data. when the div is clicked it toggles
       //between  showing and not showing the list.
        let list = [];

        if (this.state.showList) {
            list = this.props.list;
        }
        console.log (this.props.list, list);
        return (
            <div>
                <div className="bar" onClick={this.clickHandler}>{this.props.heading}</div>

                <div className="list">
                {
                    list.map(element => {
                        return <div onClick={this.elementClickHandler} value={element.name} >{element.name}</div>
                    })
                }

                </div>
            </div>


        )


    }



}

export default Dropdown