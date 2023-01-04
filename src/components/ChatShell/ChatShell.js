import React, { Component, createRef, useEffect, useState } from "react";
import MessageShell from "../MessageShell/MessageShell";
import TechSkillShell from "../TechSkillShell/TechSkillShell";
import { a as questionsObj } from "./../utils/questions2";
import { getNewChatId } from "./../utils/helper";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import "./ChatShell.css";
import {
  levels,
  experiences,
  levelNames,
  experienceNames,
} from "../../sourcingBotCombos";
const $ = window.$;

function mobileAndTabletcheck() {
  var check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

let techChat = {
  chatId: "tech111111",
  user: "guest",
  lastmessage: "Your Technical Assistant",
  timestamp: Date.now(),
  icon: "fellowbot.png",
  title: "Tech Skill Bot",
};

let chatChat = {
  chatId: "HIRE1111111",
  user: "guest",
  lastmessage: "Your Hiring Assistant",
  timestamp: Date.now(),
  icon: "fellowbot.png",
  title: "Fellow Bot",
};
let boolChat = {
  chatId: "BOOL1111111",
  user: "guest",
  lastmessage: "Your Boolean Bot",
  timestamp: Date.now(),
  icon: "fellowbot.png",
  title: "Boolean Bot",
};

const Bot = (props) => {
  return (
    <div className="app-layout" id="layout">
      <div>
        <MessageShell {...props} />
      </div>
    </div>
  );
};

const TechBot = (props) => {
  const [sourcingInputViewState,setSourcingInputViewState] = useState("");
  
  useEffect(() => {
    if(props.sourcingInputView){
      setSourcingInputViewState(props.sourcingInputView)
    }
  },[props.sourcingInputView])
  return (
    <div className="app-layout">
      <div>
        <TechSkillShell {...props} sourcingInputViewState={sourcingInputViewState} />
      </div>
    </div>
  );
};

class CHatShell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeviceMobile:
        mobileAndTabletcheck() || ($(window).width() <= "768" ? true : false),
      isWidthOfMobile: $(window).width() <= "768" ? true : false,
      currentChatId: "CHAT545454545",
      domain: "landing_page",
      isActiveChatListInMobile: false,
      currentCandidate: {},
      currentJob: {},
      currentRecruiter: {},
      currentChatMembers: [],
      questions: questionsObj.questions,
      displaysearchResults: false,
      searchUrl: "",
      sourcingInputView: {
        Site: "",
        Skills: "",
        Location: "",
        Role: "",
        Experience: "",
        Level: "",
        Current_Employer: "",
        Exclude_Skills: "",
        Source_From: null,
      },
      userObj: {
        ip: "",
      },
    };
    this.requiredErrorRef = createRef();
    this.contentWrapperRef = createRef();
    this.messageBoxRef = createRef();
    this.searchResultsRef = createRef();
    this.searchResultsWrapperRef = createRef();
    this.headerRef = createRef();
    this.submitBtnRef = createRef();
  }

  searchResults = async (e, searchInfoObj) => {
    let {
      site,
      skills,
      location,
      designation,
      curr_employer,
      exclude_skills,
      model,
      level,
      experience,
    } = searchInfoObj;
    console.log(searchInfoObj);
    if (
      (site === "" &&
        skills === "" &&
        location === "" &&
        designation === "" &&
        curr_employer === "" &&
        experience &&
        exclude_skills === "" &&
        !model) ||
      site === "" ||
      skills === "" ||
      designation === "" ||
      (designation === "SDE/Developer/Software Engineer" && level === "") ||
      experience === ""
    ) {
      this.requiredErrorRef.current.classList.remove("none");
      e.preventDefault();
      return;
    }
    if (!this.requiredErrorRef.current.classList.contains("none"))
      this.requiredErrorRef.current.classList.add("none");

    //update sourcing input view to show user next time
    this.setState({sourcingInputView:Object.assign({},{...this.state.sourcingInputView},
      {
        Skills:skills,
        Location:location,
        Current_Employer:curr_employer,
        Exclude_Skills:exclude_skills,
      })})

    console.log({sourcingInputView:Object.assign({},{...this.state.sourcingInputView},
      {
        Skills:skills,
        Location:location,
        Current_Employer:curr_employer,
        Exclude_Skills:exclude_skills,
      })})
    //submit the form
    this.submitBtnRef.current.click();

    //save search info to generate combinations on reload
    window.localStorage.setItem("searchInfoObj", JSON.stringify(searchInfoObj));

    this.setState({ displaysearchResults: true }, () => {
      window.localStorage.setItem("chatShellState", JSON.stringify(this.state));
      this.updateUiToShowResults();
    });
  };

  updateUiToShowResults = () => {
    if (!($(window).width() <= "900")) {
      this.contentWrapperRef.current &&
        this.contentWrapperRef.current.classList.add(
          "content-wrapper-with-search"
        );
      if (this.messageBoxRef.current)
        this.messageBoxRef.current.style.maxWidth = "50%";
    } else {
      if (this.messageBoxRef.current)
        this.messageBoxRef.current.style.display = "none";
    }

    this.searchResultsWrapperRef.current &&
      this.searchResultsWrapperRef.current.classList.remove("none");
    this.searchResultsRef.current &&
      this.searchResultsRef.current.classList.remove("none");
  };

  closeSearchResults = () => {
    this.setState({ displaysearchResults: false }, () => {
      window.localStorage.setItem("chatShellState", JSON.stringify(this.state));
      if (this.messageBoxRef.current) {
        this.messageBoxRef.current.style.maxWidth = "";
        this.messageBoxRef.current.style.display = "block";
      }

      this.contentWrapperRef.current &&
        this.contentWrapperRef.current.classList.remove(
          "content-wrapper-with-search"
        );
      this.searchResultsWrapperRef.current &&
        this.searchResultsWrapperRef.current.classList.add("none");
      this.searchResultsRef.current &&
        this.searchResultsRef.current.classList.add("none");
      // eslint-disable-next-line no-restricted-globals
      location.href = location.origin + location.pathname;
    });
  };

  setSearchUrl = (searchInfoObj) => {
    let model_id = searchInfoObj.model,
      url = ``,
      {
        site,
        skills,
        location,
        experience,
        designation,
        level,
        curr_employer,
        exclude_skills,
      } = searchInfoObj;
    if (site) url += `site:${site}`;
    if (skills) {
      skills = skills.trim().replaceAll(","," ")
      url += ` ${skills}`;
    }
    if (location) url += ` "${location}"`;
    if (designation) {
      if (model_id !== 1) {
        url += ` intitle:${level ? level : designation}`;
      }
    }
    if (curr_employer) url += ` "${curr_employer}"`;
    if (exclude_skills) url += ` -"${exclude_skills}"`;
    if (model_id === 1) {
      if (level && designation === "SDE/Developer/Software Engineer")
        url += ` ${levels[level][0]}`;
      else url += ` intitle:"${designation}"`;
      console.log(url);
    } else {
      if (level === levelNames[0])
        url += ` ${experiences[experienceNames[0]][0]}`;
      else if (experience) url += ` ${experiences[experience][0]}`;
    }
    this.setState({ searchUrl: url }, () => console.log(this.state.searchUrl));
  };

  render() {
    return (
      <div className="allMessages">
        <div
          className="row no-mrg"
          style={{ paddingTop: 0, background: "white" }}
        >
          <Switch>
            <Route strict path="/recruiting/fellowbot">
              <Bot
                {...this.state}
                route="fellowbot"
                requiredErrorRef={this.requiredErrorRef}
                // history={this.props.history}
                messageBoxRef={this.messageBoxRef}
                searchResultsRef={this.searchResultsRef}
                searchResultsWrapperRef={this.searchResultsWrapperRef}
                contentWrapperRef={this.contentWrapperRef}
                headerRef={this.headerRef}
                closeSearchResults={this.closeSearchResults}
                setSearchUrl={this.setSearchUrl}
                searchResults={this.searchResults}
                updateCurrentChat={(obj) => this.setState({ currentChat: obj })}
                switchToTechSkillBot={() => this.switchToTechSkillBot()}
                switchToTechChatBot={() => this.init()}
                setUserObj={(obj) =>
                  this.setState({ userObj: this.props.userInfo })
                }
                currentChat={chatChat}
                ip={this.props.userInfo.ip}
                user={
                  "FellowBot  <span style='font-weight:500;'>Recruiting Assistant</span>"
                }
              />
            </Route>
            {/* sourcing bot is within component TechBot */}
            <Route path="/recruiting/sourcingbot">
              <TechBot
                {...this.state}
                setSourcingInputView={(obj) => this.setState(obj)}
                route="sourcingbot"
                requiredErrorRef={this.requiredErrorRef}
                messageBoxRef={this.messageBoxRef}
                searchResultsRef={this.searchResultsRef}
                searchResultsWrapperRef={this.searchResultsWrapperRef}
                contentWrapperRef={this.contentWrapperRef}
                headerRef={this.headerRef}
                closeSearchResults={this.closeSearchResults}
                setSearchUrl={this.setSearchUrl}
                searchResults={this.searchResults}
                submitBtnRef={this.submitBtnRef}
                updateCurrentChat={(obj) => this.setState({ currentChat: obj })}
                switchToTechSkillBot={() => this.switchToTechSkillBot()}
                switchToTechChatBot={() => this.init()}
                setUserObj={(obj) =>
                  this.setState({ userObj: this.props.userInfo })
                }
                currentChat={chatChat}
                user={
                  "Sourcing - Bot  <span style='font-weight:500;'>Recruiting Assistant</span>"
                }
              />
            </Route>

            <Router>
              <Route
                strict
                exact
                path="/techbot"
                render={(props) => {
                  return (
                    <TechBot
                      {...this.state}
                      history={props.history}
                      route="fellowbot"
                      updateCurrentChat={(obj) =>
                        this.setState({ currentChat: obj })
                      }
                      switchToTechSkillBot={() => this.switchToTechSkillBot()}
                      switchToTechChatBot={() => this.init()}
                      setUserObj={(obj) =>
                        this.setState({ userObj: this.props.userInfo })
                      }
                      currentChat={techChat}
                      ip={this.props.userInfo.ip}
                      user={
                        "FellowMonk - <span style='font-weight:500;'>Technical Assistant</span>"
                      }
                    />
                  );
                }}
              />
            </Router>
          </Switch>
        </div>
      </div>
    );
  }

  // Note -- sender key will be replaced with email to user id
  // user and chat model will move to server

  switchToTechSkillBot() {
    let chatId = localStorage.getItem("chatId");
    if (!chatId) {
      chatId = getNewChatId();
      localStorage.setItem("chatId", chatId);
    }

    this.setState({
      currentChatId: chatId,
    });
  }

  init() {
    let chatId = localStorage.getItem("chatId");
    if (!chatId) {
      chatId = getNewChatId();
      localStorage.setItem("chatId", chatId);
    }

    this.setState({
      currentChatId: chatId,
    });
  }

  componentDidUpdate() {
    if ($(window).width() <= "900" && this.messageBoxRef.current) {
      if (this.state.displaysearchResults) {
        this.messageBoxRef.current.style.display = "none";
        this.headerRef.current.style.padding = "0px";
      } else {
        this.messageBoxRef.current.style.display = "block";
        this.headerRef.current.style.padding = "5px 15px 4px";
      }
    } else {
      if (this.messageBoxRef.current)
        this.messageBoxRef.current.style.display = "block";
      if (this.headerRef.current)
        this.headerRef.current.style.padding = "5px 15px 4px";
      if (
        this.contentWrapperRef.current &&
        this.state.displaysearchResults &&
        !this.contentWrapperRef.current.classList.contains(
          "content-wrapper-with-search"
        )
      )
        this.contentWrapperRef.current.classList.add(
          "content-wrapper-with-search"
        );
    }

  }

  componentDidMount() {
    const isStatePresent = JSON.parse(
      window.localStorage.getItem("chatShellState")
    );
    const chatShellState = isStatePresent || this.state;

    chatShellState.isDeviceMobile =
      mobileAndTabletcheck() || ($(window).width() <= "768" ? true : false);
    chatShellState.isWidthOfMobile = $(window).width() <= "768" ? true : false;
    console.log(chatShellState);

    this.setState(chatShellState, () => {
      if (this.state.displaysearchResults) {
        this.updateUiToShowResults();
      }

      // eslint-disable-next-line no-restricted-globals
      if (!location.search.startsWith("?q=") && this.state.displaysearchResults)
        this.closeSearchResults();
    });

    if (this.state.isWidthOfMobile) {
      $("#info-box").addClass("ripple");
      let timerRef = setTimeout(() => {
        $("#info-box").removeClass("ripple");
      }, 2000 * 60);
      $("#info-box").click(() => {
        $("#info-box").removeClass("ripple");
        clearTimeout(timerRef);
      });
    }

    //localStorage.clear();
    // this.init();

    window.onresize = () => {
      if (
        $(window).width() <= 768 &&
        this.state.isWidthOfMobile != true &&
        this.state.isDeviceMobile == false
      ) {
        console.log("resized", "mobile width");
        this.setState({ isWidthOfMobile: true, isDeviceMobile: true });
      } else if (
        $(window).width() > 768 &&
        this.state.isWidthOfMobile != false &&
        this.state.isDeviceMobile == true
      ) {
        console.log("resized", "desktop width");
        this.setState({ isWidthOfMobile: false, isDeviceMobile: false });
      }
    };
  }

  componentWillUnmount() {
    window.onresize = null;
    window.localStorage.setItem("chatShellState", JSON.stringify(this.state));
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthorized: state.authUser.isAuthorized,
    userInfo: state.info.info,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CHatShell);
