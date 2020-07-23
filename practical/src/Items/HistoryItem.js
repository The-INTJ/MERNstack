import React from 'react';
import './Items.css';

const HistoryItem = (props) => {
    var value = props.value
    if(isNaN(value) || value < 0) {
        value = 0;
    }
    return (
        <div className={props.class}>
            <label><strong>{props.itemName}:</strong></label>
            <label className="number-label" type="text" defaultValue={value}>{value}</label>
            <div className="hspacer"></div>
        </div>
    );
}

export default HistoryItem;