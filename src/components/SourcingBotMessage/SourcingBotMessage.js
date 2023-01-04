import React, { useEffect, useState } from "react";
import "./SourcingBotMessage.css";

export default function SourcingBotMessage({ message, botimage, openEditor, mobileAndTabletcheck }) {
  const [inputView,setInputView] = useState("");

  useEffect(() => {
    let chatShellState = JSON.parse(window.localStorage.getItem('chatShellState'));
    console.log(chatShellState?.sourcingInputView)
    if(chatShellState?.sourcingInputView?.Site) setInputView(chatShellState?.sourcingInputView)
  },[])
  
  return (
    <div>
      <div
        className={
          "direct-chat-msg msg_left row " +
          (!message.byBot && "msg_right")
        }
      >
        <div className="row" style={{ display: "flex" }}>
          {message.byBot && (
            <span>
              <img src={botimage} alt="monkbot" className="direct-chat-img" />
            </span>
          )}
          <span className="message_box msg_gap">
            {message.byBot ? (
              message.content
            ) : (
              <div
                className="message width-90"
                data-placement="right"
              >
                {inputView.Site && (
                  <div className="input-view">
                    <span
                  onClick={openEditor}
                  className="comment-option bubble-animate no-select"
                  style={{
                    cursor: mobileAndTabletcheck() ? "none" : "pointer",
                    maxWidth:'30%',
                    textAlign:'center'
                  }}
                >
                  Edit
                </span>
                    {inputView.Site && (
                      <div className="input-view-item">
                        <strong>Site </strong> :
                        <span>{inputView.Site}</span>
                      </div>
                    )}
                    {inputView.Skills && (
                      <div className="input-view-item">
                        <strong>Skills </strong> :
                        <span>{inputView.Skills}</span>
                      </div>
                    )}
                    {inputView.Location && (
                      <div className="input-view-item">
                        <strong>Location </strong> :
                        <span>{inputView.Location}</span>
                      </div>
                    )}
                    {inputView.Role && (
                      <div className="input-view-item">
                        <strong>Role </strong> :
                        <span>{inputView.Role}</span>
                      </div>
                    )}
                    {inputView.Experience && (
                      <div className="input-view-item">
                        <strong>Experience </strong> :
                        <span>{inputView.Experience}</span>
                      </div>
                    )}
                    {inputView.Level && (
                      <div className="input-view-item">
                        <strong>Level </strong> :
                        <span>{inputView.Level}</span>
                      </div>
                    )}
                    {inputView.Current_Employer && (
                      <div className="input-view-item">
                        <strong>Current Employer </strong> :
                        <span>{inputView.Current_Employer}</span>
                      </div>
                    )}
                    {inputView.Exclude_Skills && (
                      <div className="input-view-item">
                        <strong>Exclude Skills </strong> :
                        <span>{inputView.Exclude_Skills}</span>
                      </div>
                    )}
                    {inputView.Source_From && (
                      <div className="input-view-item">
                        <strong>Source From </strong> :
                        <span>{inputView.Source_From}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
