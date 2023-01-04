import React, {Component} from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2'
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
                        autoComplete="off"
                        autoCorrect="off"
                        onChange={(e)=>{
                          this.setInputField(e)
                          this.props.updateAutoSelect(e.target.value);}
                        }
                        list="list"
                        style={{width:'88%'}}   
                        /> 

                        <span className="input-group-btn">
                        <button  type="submit" className="btn btn-primary btn-flat" 
                        style={{padding:"6px 10px",borderRadius:"2px 2px 2px 0px",float:'right'}}
                        >Send</button>
                        </span>

                          <datalist id="list">
                          {this.props.matchedSugesstion.map((obj,index)=>{
                            return <option value={obj} key={index}/>
                          })}
                          </datalist>
                        
                         </div>
                </form>):(
                  <div>
                    {/* <a href="javascript:void(0)" className="input-cover">You'll type here shortly</a> */}
                    <a href="javascript:void(0)" className="input-cover"></a>
                  </div>
                )}
            </div>
    </div>);
  }

  validateTechBotUser = () => {
    return fetch(`https://recruitingmonk-v2.azurewebsites.net/bot/techbot/${this.props.ip}`,{
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
      let isUserValid = await this.validateTechBotUser()
      console.log(isUserValid)
      if(!isUserValid){
        return Swal.fire({
          icon: "info",
          title: "Oops..",
          text: "You have Reached your max limit. Please SignUp/Login the Platform",
        });
      }
    }

    if(!this.state.text)
        this.state.text="-";
    if(this.props.booleanathonInitated){
      this.props.submitBooleanResponse(this.state.text);
    }
    else
    this.props.submitQuestionInputAnswer(this.state.text);
    
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