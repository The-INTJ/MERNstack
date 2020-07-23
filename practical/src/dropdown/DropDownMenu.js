import React, {Component} from 'react';
import './DropDownMenu.css';


const DropDownMenu = (props) => {

    let dropDownItems = (
        <ul>
        {
            props.items.map((item) => {
                return <li>{item.name}</li>
            })  
        }
        </ul>
    ) 


    return (

        <div  className="dropdown" >
         <div className="button-dd" onClick={props.clicked}>Select Item</div>
            { props.show ? dropDownItems : null}
        </div>
    );
}

export default DropDownMenu;