import React, { useState, useEffect } from "react";
import { FormControl, TextField, makeStyles, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { levelNames, experienceNames } from '../../sourcingBotCombos';
import './MessageForm.css';

const useStyle = makeStyles((theme) => ({
    formInput:{
        padding:"0.1rem",
        margin:0.5,
        display:'grid',
        gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",
        overflowX:'hidden'
    },
    formField:{
      margin:"7px 15px",
      fontSize:"1.3rem",
      maxWidth:"250px",
      justifyContent:'flex-end'
    },
    formBtn:{
      fontSize:"0.7rem",
      padding:"0.5rem",
      margin:"1rem",
      borderRadius:"1.9em"
    }
}))

const allSites = [
  {
    key:`#1`,
    name:"Linkedin",
    url:"linkedin.com/in"
  },
]

const designations = [
  "SDE/Developer/Software Engineer",
  "UI Developer",
  "SDET",
  "Devops Engineer",
  "Android Developer",
  "IOS Developer",
]

const models = [
  {
    id:1,
    name:'Top Product Companies'
  },
  {
    id:2,
    name:'From Anywhere'
  }
];

const siteMap = {
  "linkedin.com/in":"Linkedin",
  "github.com":"Github",
  "stackoverflow.com":"StackOverflow" 
}

let searchInfoObj = {
  site:"",
  skills:"",
  location:"",
  designation:"",
  experience:"",
  level:"",
  curr_employer:"",
  exclude_skills:"",
  model:null
}

const MessageForm = (props) => {
        const classes = useStyle();
        const [siteName,setSiteName] = useState("");
        const [designationValue,setDesignationValue] = useState("");
        const [modelName,setModelName] = useState("Source From");
        let savedSearchObj = JSON.parse(window.localStorage.getItem('searchInfoObj'));
        savedSearchObj = savedSearchObj?savedSearchObj:searchInfoObj;
        const [searchInfo,setSearchInfo] = useState(savedSearchObj);
        
        const { previousBySameSender, searchResults, searchUrl, setSearchUrl, requiredErrorRef, submitBtnRef, setSourcingInputView, sourcingInputViewState } = props;
        let marginTop = previousBySameSender == "true" ? 4 : 0;
        
        const handleSiteChange = (e) => {
          setSiteName(siteMap[e.target.value]);
          // console.log("setSourcingInputView",setSourcingInputView)
          setSourcingInputView({sourcingInputView:Object.assign({},{...sourcingInputViewState},{Site:siteMap[e.target.value]})})
          setSearchInfo(Object.assign({},{...searchInfo},{site:e.target.value}));
        }

        const handleDesignationChange = (e) => {
          setDesignationValue(e.target.value);
          setSourcingInputView({sourcingInputView:Object.assign({},{...sourcingInputViewState},{Role:e.target.value})})
          setSearchInfo(Object.assign({},{...searchInfo},{designation:e.target.value}));
        }

        const handleLevelChange = (e) => {
          setSourcingInputView({sourcingInputView:Object.assign({},{...sourcingInputViewState},{Level:e.target.value})})
          setSearchInfo(Object.assign({},{...searchInfo},{level:e.target.value}));
        }

        const handleExperienceChange = (e) => {
          const sameAsPrevModel = (e.target.value === experienceNames[0] && (searchInfo.level === levelNames[0] || searchInfo.level === levelNames[1]));
          setSourcingInputView({sourcingInputView:Object.assign({},{...sourcingInputViewState},{Experience:e.target.value,Source_From:sameAsPrevModel?models[1].name:sourcingInputViewState["Source_From"]})})
          setSearchInfo(Object.assign({},{...searchInfo},{experience:e.target.value,model:sameAsPrevModel?1:searchInfo.model}));
        }

        const handleModelChange = (e) => {
          console.log({model:e.target})
          setSearchInfo(Object.assign({},{...searchInfo},{model:Number(e.target.value)}))
          setSourcingInputView({sourcingInputView:Object.assign({},{...sourcingInputViewState},{Source_From:e.target.value?models[Number(e.target.value)-1]?.name:""})})
        }

        const invokeSearchResults = (e) => {
          window.localStorage.setItem('sourcingBotComboIndex',0)
          window.localStorage.setItem('searchInfoObj',JSON.stringify(searchInfo))
          searchResults(e,searchInfo);
        }

        useEffect(() => {
          setSearchUrl(searchInfo);
        },[searchInfo])

        // useEffect(() => {
        //   setTimeout(() => {
        //     const coreSearchString = document.querySelector(".gcsc-find-more-on-google");
        //     if(coreSearchString) coreSearchString.style.display = 'none';
      
        //     //check captcha
        //     let recaptcha = document.querySelector('.recaptcha-checkbox');
        //     recaptcha && recaptcha.click();
        //   },5000)
        // },[])
    
      return(
            <div
            >
            <p className="editor-title">Candidate Sourcing Tool</p>
              <form action="/recruiting/sourcingbot" method='get' noValidate>
                <FormControl className={classes.formInput}>
                  <div id="form-select-wrapper" className="input-fit">
                    <select
                      onChange={handleSiteChange}
                      placeholder="Site"
                      className="form-select"
                      style={{fontSize:'1rem'}}
                      defaultValue={searchInfo.site}
                      required
                    >
                      <option value="" style={{fontSize:'1rem'}}>
                      Site*
                      </option>
                      {allSites.map(site => {
                          return <option key={site.key} value={site.url} style={{fontSize:'1rem',cursor:"pointer"}}>{site.name}</option>
                      })
                      }
                    </select>
                  </div>
                    <TextField defaultValue={searchInfo.skills} onChange={(e) => setSearchInfo(Object.assign({},{...searchInfo},{skills:`${e.target.value}`}))} required label="Skills" type="text" className={classes.formField} InputLabelProps={{style: {fontSize: '1rem'}}} inputProps={{style: {fontSize: '1rem'}, spellCheck:'false'}}></TextField>
                    <TextField defaultValue={searchInfo.location} onChange={(e) => setSearchInfo(Object.assign({},{...searchInfo},{location:`${e.target.value}`}))} label="Location" type="text" className={classes.formField} InputLabelProps={{style: {fontSize: '1rem'}}} inputProps={{style: {fontSize: '1rem'}, spellCheck:'false'}}></TextField>
                  <div id="form-select-wrapper" className="input-fit">
                    <select
                      onChange={handleDesignationChange}
                      placeholder="Role"
                      className="form-select"
                      style={{fontSize:'1rem'}}
                      defaultValue={searchInfo.designation}
                      required
                    >
                      <option value="" style={{fontSize:'1rem'}}>
                      Role*
                      </option>
                      {designations.map((designation,index) => {
                          return <option key={index} value={designation} style={{fontSize:'1rem',cursor:"pointer"}}>{designation}</option>
                      })
                      }
                    </select>
                  </div>
                  {searchInfo.designation === 'SDE/Developer/Software Engineer' &&
                  <div id="form-select-wrapper" className="input-fit">
                  <select
                    onChange={handleLevelChange}
                    placeholder="Level"
                    className="form-select"
                    style={{fontSize:'1rem'}}
                    defaultValue={searchInfo.level}
                    required
                  >
                    <option value="" style={{fontSize:'1rem'}}>
                    Level*
                    </option>
                    {levelNames.map((level,index) => {
                        return <option key={index} value={level} style={{fontSize:'1rem',cursor:"pointer"}}>{level}</option>
                    })
                    }
                  </select>
                </div>
                  }
                  <div id="form-select-wrapper" className="input-fit">
                  <select
                    onChange={handleExperienceChange}
                    placeholder={searchInfo.experience ? searchInfo.experience : "Experience*"}
                    className="form-select"
                    style={{fontSize:'1rem'}}
                    defaultValue={searchInfo.experience}
                    required
                  >
                    <option value="" style={{fontSize:'1rem'}}>
                    Experience*
                    </option>
                    {experienceNames.map((experience,index) => {
                        return <option key={index} value={experience} style={{fontSize:'1rem',cursor:"pointer"}}>{experience}</option>
                    })
                    }
                  </select>
                </div>
                    <TextField defaultValue={searchInfo.curr_employer} onChange={(e) => setSearchInfo(Object.assign({},{...searchInfo},{curr_employer:`${e.target.value}`}))} label="Current Employer" type="text" className={classes.formField} InputLabelProps={{style: {fontSize: '1rem'}}} inputProps={{style: {fontSize: '1rem'}, spellCheck:'false'}}></TextField>
                    <TextField defaultValue={searchInfo.exclude_skills} onChange={(e) => setSearchInfo(Object.assign({},{...searchInfo},{exclude_skills:`${e.target.value}`}))} label="Exclude Skills" type="text" className={classes.formField} InputLabelProps={{style: {fontSize: '1rem'}}} inputProps={{style: {fontSize: '1rem'}, spellCheck:'false'}}></TextField>
                 <div style={{borderBottom:'1px solid rgb(85, 84, 84)'}} className="input-fit">
                  <select
                      onChange={handleModelChange}
                      placeholder={searchInfo.model ? models[searchInfo.model-1]?.name:"Source From"}
                      className="form-select"
                      style={{fontSize:'1rem'}}
                      defaultValue={searchInfo.model}
                    >
                    <option value="" style={{fontSize:'1rem'}}>
                      Source From
                    </option>
                      {models.map((model,i) => {
                          return <option key={i} value={model.id} style={{fontSize:'1rem'}}>{model.name}</option>
                      })
                      }
                  </select>
                 </div>
                </FormControl>
                <p className="required-error none" ref={requiredErrorRef}>Field with * are required</p>
                <button type="submit" ref={submitBtnRef} name="q" value={`${searchUrl}`} ></button>
                  <Button onClick={(e) => invokeSearchResults(e)} variant="outlined" value={`${searchUrl}`} className={classes.formBtn} size="small" endIcon={<SearchIcon/>} style={{color:"#0077E5"}}>Search</Button>
              </form>
            </div>
    )
}

export default MessageForm;