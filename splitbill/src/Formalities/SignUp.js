import React from "react"
import axios from "axios";
import "./sign.css";

class SignUp extends React.Component{
  state={

    username:"",
    password:"",
    phone:null,
    email:""


  }

  inputHandler=(event)=>{
     this.setState({[event.target.name]:event.target.value})

  }
  submitHandler=(event)=>{

    event.preventDefault();
    
    const endpoint="https://arpita-sinha-split-the-bill.herokuapp.com/api/auth/register"
    axios.post(endpoint,this.state)
    console.log("REGISTER",endpoint,this.state)
       .then(res=>{
           console.log("Register response",res)
           localStorage.setItem('jwt',res.data.token)
       })
       .catch(err=>{
           console.log("thec error is ",err)
       })
  }

  render(){
      return(
        <>
         <form className="form" onSubmit={this.submitHandler}>
           <input className="inside" type="text" placeholder="username" name="username"value={this.state.username}
            onChange={this.inputHandler}/>
            <br/>
            <br/>

          <input className="inside" type="password" placeholder="password" name="password"value={this.state.password}
            onChange={this.inputHandler}/>
            <br/><br/>

            <input className="inside" type="phone" placeholder="phone" name="phone"value={this.state.phone}
            onChange={this.inputHandler}/>
            <br/><br/>

            <input className="inside" type="email" placeholder="email" name="email"value={this.state.email}
            onChange={this.inputHandler}/>
            <br/><br/>
         
         
         
         
         <button type="submit">SignUp</button>
         
         
         
         </form>


        </>

      )
  }
 
}

export default SignUp


