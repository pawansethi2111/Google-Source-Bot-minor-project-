import React, { useEffect, useRef, useState } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import {
  levels,
  levelNames,
  experienceNames,
  experiences,
} from "../../sourcingBotCombos";
import "./SearchHeader.css";

const SearchHeader = (props) => {
  const navRef = useRef(null);
  const [comboNames, setComboNames] = useState([]);
  const [comboValues, setComboValues] = useState([]);
  const [activeSearch, setActiveSearch] = useState(
    window.localStorage.getItem("sourcingBotComboIndex")
  );

  useEffect(() => {
    let searchInfoObj = JSON.parse(
      window.localStorage.getItem("searchInfoObj")
    );
    if (searchInfoObj) {
      //generate combinations dynamically
      let model_id = searchInfoObj.model,
        url = ``,
        {
          site,
          skills,
          location,
          designation,
          level,
          experience,
          curr_employer,
          exclude_skills,
        } = searchInfoObj;
      if (site) url += `site:${site}`;
      if (location) url += ` "${location}"`;
      if (curr_employer) url += ` "${curr_employer}"`;
      if (exclude_skills) url += ` -"${exclude_skills}"`;
      if (skills) {
        skills = skills.trim().replaceAll(","," ")
        url += ` ${skills}`;
      }

      let names = [],
        search;

      if (model_id === 1) {
        let designations = [],
          results = [];
        if (designation === "SDE/Developer/Software Engineer") {
          designations = levels[level];
            for (let role of designations) {
              search = url + ` ${role}`;
              results.push(search);
              names.push(`Search${results.length}`);
            }
        } else {
          url += ` intitle:"${designation}"`;
            results.push(url);
            names.push(`Search${results.length}`);
          }
        setComboValues(results);
        console.log(url);
      } else {
        let expCombos = experiences[experience],
          results = [];
          for (let exp of expCombos) {
            search =
              url +
              ` intitle:"${
                designation === "SDE/Developer/Software Engineer"
                  ? level
                  : designation
              }" ${exp}`;
            results.push(search);
            names.push(`Search${results.length}`);
          }
        setComboValues(results);
      }

      setComboNames(names);
    }
  }, []);

  useEffect(() => {
    //set active search combination
    const elements = document.querySelectorAll(".search-option");
    let index = activeSearch ? activeSearch : 0;
    elements[index] && elements[index].classList.add("active-search-option");
    if (elements) {
      navRef.current.style.gridTemplateColumns = `repeat(${
        comboNames.length + 1
      },1fr)`;
      console.log("STYLE");
    }
  }, [comboNames.length]);

  const changeActiveSearch = (e) => {
    const elements = document.querySelectorAll(".search-option");
    const pos = e.currentTarget.getAttribute("pos");
    
    elements[activeSearch].classList.remove("active-search-option");

    elements[pos].classList.add("active-search-option");
    setActiveSearch(pos);

    //save current search combo to localstorage
    window.localStorage.setItem("sourcingBotComboIndex", pos);

    //search combination url
    // eslint-disable-next-line no-restricted-globals
    location.href = location.origin + location.pathname + "?q=" + comboValues[pos];
  };
  return (
    <div className="search-nav" ref={navRef}>
      {comboNames.map((el, index) => (
        <span
          id={"search-option" + `${index}`}
          key={index}
          pos={index}
          className="search-option"
          onClick={changeActiveSearch}
        >
          {el}
          <SearchIcon pos={index} />
        </span>
      ))}
      <div className="more-options" onClick={props.toggleMoreOptions}>
        <MoreVertIcon />
        <span>More</span>
      </div>
    </div>
  );
};

export default SearchHeader;
