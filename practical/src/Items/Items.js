import React from 'react';
import './Items.css';

const Items = (props) => {
    let value = props.value
    if(isNaN(value) || value < 0) {
        value = 0;
    }
    return (
        <div className={props.class}>
            <label>{props.itemName}</label>
            <input type="text" onChange={props.changed} value={value}></input>
        </div>
    );
}


export default Items;