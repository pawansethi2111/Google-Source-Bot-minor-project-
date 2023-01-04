import React, {Component} from 'react';
import Swal from 'sweetalert2';
import {connect} from 'react-redux';
class MessageInput extends Component{

  constructor(props){
    super(props);
    this.state={
        text:""
    };
  }

  setInputField = (e) => {
    this.setState({text:e.target.value})
    this.props.setTextInput(e.target.value)
  }

  render(){
    return (<div>
        <div className="box-footer" style={{padding:'0rem'}}>
                {this.props.userInputActive?(<form onSubmit={(e)=>{
                  e.preventDefault();
                  this.sendMessage();
                }}>
                    <div className="input-group">
                        <input id="chat-input" type="text" name="message" 
                        placeholder="Type Here ..." className="form-control" value={this.state.text}
                        onChange={this.setInputField}
                        list="list"
                        autoComplete={this.props.currentQuestion.type=="suggestion"?"on":"off"}
                        style={{width:'88%'}}  
                        /> 
                        <span className="input-group-btn">
                        <button  type="submit" className="btn btn-primary btn-flat" 
                        style={{padding:"6px 10px",borderRadius:"2px 2px 2px 0px",float:'right'}}
                        >Send</button>
                        </span>
                        {this.props.currentQuestion.tags?(
                          <datalist id="list">
                          {this.props.currentQuestion.tags.map((obj,index)=>{
                            return <option value={obj} key={index}/>
                          })}
                          </datalist>
                        ):null}
                         </div>
                </form>):(
                  <div>
                    <a href="javascript:void(0)" className="input-cover"></a>
                    {/* <a href="javascript:void(0)" className="input-cover">You'll type here shortly</a> */}
                  </div>
                )}
            </div>
    </div>);
  }

  validateBooleanBotUser = () => {
    return fetch(`https://recruitingmonk-v2.azurewebsites.net/bot/booleanbot/${this.props.ip}`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
      },
    }).then(response => {
      if(response.ok) {
          console.log(response)
          return response;
      }
      else {
          var error = new Error("Error " + response.status + ": " + response.statusText);
          error.response = response;
          throw error;
      }
  }, 
  error => {
      var errmess = new Error(error.message);
      throw errmess;
  })
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp)
      return true;
    }).catch(error => {
      console.log(error);
      return false
    })
  }

  async sendMessage(){
    if(!this.props.isAuthorized){
      let isUserValid = await this.validateBooleanBotUser()
      if(!isUserValid){
        return Swal.fire({
          icon: "info",
          title: "Oops..",
          text: "You have Reached your max limit. Please SignUp/Login the Platform",
        });
      }
    }
    let obj={
      label:this.state.text, 
      user:this.props.user,
      photoUrl:"",
      element:"Statement",      
      timestamp:Date.now()
    }
    if(!this.state.text){
      if(this.props.currentQuestion.required){
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Input Cannot Be Empty!",
        })
        return;
      }
      else {
        this.state.text="-"
      }
    }
    if(this.props.booleanathonInitated){
      this.props.submitBooleanResponse(this.state.text);
    }
    else if(this.props.userInputActive
      &&(this.props.currentQuestion.type=="text"||this.props.currentQuestion.type=="suggestion")){
      if(this.props.nextQuestion.type!="text")
      this.props.disableUserInput();
      
      if(this.props.currentQuestion.element=="Question"||this.props.currentQuestion.element=="Suggest"){
        this.props.submitQuestionInputAnswer(this.props.currentQuestion,this.state.text);
      }
      else if(this.props.currentQuestion.element=="Email"){
        this.props.submitEmailInputAnswer(this.props.currentQuestion,this.state.text);
      }
      else if(this.props.currentQuestion.element=="Number"){
        this.props.submitNumberInputAnswer(this.props.currentQuestion,this.state.text);
      }
    }
    this.setState({text:""}); 
  }
}
const mapStateToProps = (state) => {
  return{
    isAuthorized:state.authUser.isAuthorized
  }
}

const mapDispatchToProps = (dispatch) => {

}

export default connect(mapStateToProps,mapDispatchToProps)(MessageInput);