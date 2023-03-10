import React, {Component} from 'react';
class BooleanInput extends Component{

  constructor(props){
    super(props);
    this.state={
        text:""
    };
  }

  render(){
    return (<div>
        <div className="box-footer">
                {this.props.userInputActive?(<form onSubmit={(e)=>{
                  e.preventDefault();
                  this.sendBoolean();
                }}>
                    <div className="input-group">
                        <input id="chat-input" type="text" name="Boolean" 
                        placeholder="Type Here ..." className="form-control" value={this.state.text}
                        autoComplete="off"
                        onChange={(e)=>{
                          this.setState({text:e.target.value})
                          this.props.updateAutoSelect(e.target.value);}
                        }
                        /> 

                        <span className="input-group-btn">
                        <button  type="submit" className="btn btn-primary btn-flat" 
                        style={{padding:"6px 10px",borderRadius:"2px 2px 2px 0px"}}
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
                    <a href="javascript:void(0)" className="input-cover"></a>
                    {/* <a href="javascript:void(0)" className="input-cover">You'll type here shortly</a> */}
                  </div>
                )}
            </div>
    </div>);
  }

  sendBoolean(){
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
export default BooleanInput;