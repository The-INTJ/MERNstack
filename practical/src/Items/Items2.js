import React from 'react';
import './Items.css';

const Items = (props) => {
    var value = props.value;
    if(isNaN(value) || value < 0) {
        value = 0;
    }
    return (
        <div className={props.class}>
            <input type="text" value={value} readOnly></input>
            <label>{props.itemName}</label>
        </div>
    );
}

export default Items;