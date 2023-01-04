import React, {Component} from 'react';
import './MessageList.css';
import TextMessage from '../TextMessage/TextMessage';
import TextMessage1 from '../TextMessage/TextMessage1';
import TextMessage2 from '../TextMessage/TextMessage2';
import SingleOption from '../SingleOption/SingleOption';
import MultiOptions from '../MultiOptions/MultiOptions';
import RangeSelector from '../RangeSelector/RangeSelector';

const $=window.$;

const ChatDate=(props)=>{return (
    <div className="direct-chat-msg msg_left row" style={{padding:15}}>
    <div className="chat-date text-center"> 
        <p> {new Date().toLocaleDateString()}</p>
    </div>
    </div>
);}

class MessageList extends Component{

  constructor(props){
    super(props);
    this.state={
      searchToolVisible:true
    };
  }

  componentWillUnmount(){
    this.setSearchToolVisibility();
  } 
  setSearchToolVisibility = () => {
    this.setState({searchToolVisible:false},() => console.log(this.state.searchToolVisible))
  }

  render(){
    console.log(this.state.searchToolVisible)
    let previousSender="";
    return (<div 
    id="messages-list-cont2"
    >
                    <ChatDate/>     
                   {this.props.route === 'fellowbot' && this.props.messages.map((obj,index)=>
                   { let messageBySender=(obj.user!=undefined);
                     let previousBySameSender=(previousSender==obj.user);
                     previousSender=obj.user;
                    
                     if(index==0){
                       previousBySameSender="false";
                     }

                     return this.returnMessageElement(obj,messageBySender.toString(),
                     previousBySameSender.toString(),index,this.props.botimage,this.props,this.setSearchToolVisibility)}
                   )}
    </div>);
  }


  returnMessageElement(obj,messageBySender,previousBySameSender,index,botimage,props,setSearchToolVisibility){
    // console.log(obj,messageBySender,previousBySameSender);
    switch(obj.element){
      case "Single Choice":if(obj.id == "jikZukjOX3afwJTVOz4j")
        return <SingleOption messageObj={obj} 
                    submitSingleChoiceAnswer={this.props.submitSingleChoiceAnswer}
                                    messageBySender={messageBySender}  
                                    botimage={botimage}
                                    list={true}
                                    {...props}
                                    previousBySameSender={previousBySameSender} key={index}
                                    setSearchToolVisibility={setSearchToolVisibility}
                                    />;
        else return <SingleOption messageObj={obj} 
        submitSingleChoiceAnswer={this.props.submitSingleChoiceAnswer}
                        messageBySender={messageBySender}  
                        botimage={botimage}
                        {...props}
                        previousBySameSender={previousBySameSender} key={index}
                        setSearchToolVisibility={setSearchToolVisibility}
                        />;

      case "Statement":return <TextMessage messageObj={obj} 
      submitSingleChoiceAnswer={this.props.submitSingleChoiceAnswer}
                                messageBySender={messageBySender} 
                                botimage={botimage}
                                previousBySameSender={previousBySameSender} key={index}/>;
      case "Message":return <TextMessage2 messageObj={obj} 
      submitSingleChoiceAnswer={this.props.submitSingleChoiceAnswer}
                                excludedSkills={props.excludedSkills}
                                messageBySender={messageBySender}   
                                botimage={botimage}
                                previousBySameSender={previousBySameSender} key={index}/>;
      case "MessageOption":return <TextMessage1 messageObj={obj} 
      submitSingleChoiceAnswer={this.props.submitSingleChoiceAnswer}
                                messageBySender={messageBySender} 
                                botimage={botimage}
                                excludedSkills={props.excludedSkills}
                                {...props}
                                previousBySameSender={previousBySameSender} key={index}/>;

      case "Question":return <TextMessage messageObj={obj}
                                        messageBySender={messageBySender} botimage={botimage} 
                                        previousBySameSender={previousBySameSender} key={index}/>;

      case "Multi Choice":return <MultiOptions messageObj={obj}   
                  submitMultipleChoiceAnswer={this.props.submitMultipleChoiceAnswer}       
                              messageBySender={messageBySender}        botimage={botimage}
                               previousBySameSender={previousBySameSender} key={index}/>;

      case "Email":return <TextMessage messageObj={obj}            
                            messageBySender={messageBySender}      botimage={botimage}
                        previousBySameSender={previousBySameSender} key={index}/>;

      case "Suggest":return <TextMessage messageObj={obj}              
                          messageBySender={messageBySender}         botimage={botimage}
                   previousBySameSender={previousBySameSender} key={index}/>;

      case "Range":return <RangeSelector messageObj={obj}  
      submitRangeSelectAnswer={this.props.submitRangeSelectAnswer}          
                            messageBySender={messageBySender}   botimage={botimage}
                           previousBySameSender={previousBySameSender} key={index}/>;

      case "Contact":return <TextMessage messageObj={obj}       
                                messageBySender={messageBySender}   botimage={botimage} 
                               previousBySameSender={previousBySameSender} key={index}/>;

      case "Number":return <TextMessage messageObj={obj}           
                             messageBySender={messageBySender}      botimage={botimage}    
                     previousBySameSender={previousBySameSender} key={index}/>;

      case "Rating":return <TextMessage messageObj={obj}               
                         messageBySender={messageBySender}     botimage={botimage}         
             previousBySameSender={previousBySameSender} key={index}/>;

      case "Date Picker":return <TextMessage messageObj={obj}           
                             messageBySender={messageBySender}       botimage={botimage}  
                      previousBySameSender={previousBySameSender} key={index}/>;

      case "Links":return <TextMessage messageObj={obj}               
                         messageBySender={messageBySender}      botimage={botimage}      
               previousBySameSend er={previousBySameSender} key={index}/>;
      default:return null;
    }
  }

  componentDidMount(){
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    })
  }

}

export default MessageList;