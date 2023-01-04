import React, { useEffect, useState, memo } from "react";
import Home from "./components/Home";
import Leaderboard from "./Rank/Leaderboard";
import Testimonial from "./components/Testimonials/Testimonial";

function Main(props) {
  const [quizDetails,setQuizDetails] = useState({
    all:{},
    java:{},
    boolean:{},
    ui:{},
    devops:{},
  }); 

  const fetchLeaderBoardData = () => {
    fetch(`https://recruitingmonk-v2.azurewebsites.net/quiz/leaderboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(
        (response) => {
          if (response.ok) {
            console.log(response);
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            error.response = response;
            throw error;
          }
        }
      )
      .then((response) => response.json())
      .then((data) => {
       return setQuizDetails(prevDetails => ({
         ...prevDetails,
          all: data.allQuizDetails,
          boolean: data.booleanQuizDetails,
          ui: data.uiQuizDetails,
          java: data.javaQuizDetails,
          devops: data.devopsQuizDetails,
       }))
      }).catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => fetchLeaderBoardData(),1500)
    return () => clearTimeout(timeout);
  },[]);

  return (
    <div>
      <Home
        uid={props.uid}
        uiRecruiters={quizDetails.ui.quizContestantsCount}
        booleanRecruiters={quizDetails.boolean.quizContestantsCount}
        devopsRecruiters={quizDetails.devops.quizContestantsCount}
        javaRecruiters={quizDetails.java.quizContestantsCount}
      />
      <Leaderboard
        key={quizDetails.all.leaderBoard}
        uiQuizDetails={quizDetails.ui}
        allQuizDetails={quizDetails.all}
        booleanQuizDetails={quizDetails.boolean}
        javaQuizDetails={quizDetails.java}
        devopsQuizDetails={quizDetails.devops}
      />
      <Testimonial />
    </div>
  );
}
export default memo(Main);
