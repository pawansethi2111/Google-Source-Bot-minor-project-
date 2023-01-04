import React from 'react';
import './Dropdown.css';

const Dropdown = (props) => {
    const { el, dropdownAction }  = props;

    return(<div ref={el} className="search-more-options none">
        {/* <div onClick={() => dropdownAction("signup")}>Sign up</div> */}
        <div onClick={() => dropdownAction("download")} >Download Results</div>
        <div onClick={() => dropdownAction("close")}>
            Close
        </div>
    </div>)
}

export default Dropdown;