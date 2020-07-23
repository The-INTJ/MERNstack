import React, {Component} from 'react';
import axios from 'axios';

import './App.css';
import Items from './Items/Items';
import Items2 from './Items/Items2';
import DropDownMenu from './dropdown/DropDownMenu';
import HistoryItem from './Items/HistoryItem';




class App extends Component {


  state = {
    foods: [
      {name: 'Apples', value: 0},
      {name: 'Corn', value: 0},
      {name: 'Hobbies', value: 0},
      {name: 'Corn2', value: 0}
    ],
    // Will store ARRAYS of foods -- arrays of arrays of objects
    pastOrders: [
    ],
    // STYLES
    itemsStyle: "inline",
    items2Style: "inline2",
    newItem: "",
    deleteItem: "",
    showDropDown: false
  }


  historyChangedHandler = () => {
    axios.get('http://localhost:5000/history')
      .then(res => {
        const history = res.data;
        let newHistory = [];
        
        for(let i = 0; i < history.length; i++) {
          let currentRow = [];
          let objData = history[i].order;
          if(objData) { // null check
            for(let x = 0; x < objData.length; x++) {
              currentRow = [...currentRow, objData[x]];
            }
            newHistory = [...newHistory, currentRow];
          }
        }
        

        this.setState({
          pastOrders: newHistory
        })
      })
  }

  amountChangedHandler = (event, index) => {
    // Creating variable precisely matching each object in the food array
    let changedFood = {name: this.state.foods[index].name, value: parseFloat(event.target.value)};

    // Map function to access each object. [] cast it at the end to match foods
    const newFoods = [...this.state.foods.map((food, newIndex) => {
      return newIndex === index ? changedFood : food; // Returns all old elements or the changed one
    })]
    this.setState({
      foods: newFoods
    })
  }

  submitOrderAPIHandler = async (currentOrder) => {
    try { 
      const response = await fetch('http://localhost:5000/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentOrder)
      });
 
      const responseData = await response.json();
    } catch (error) {
      console.log(error);
    }

    this.historyChangedHandler();
  }

  submitOrderHandler = () => {
    const newHistoryItem = [...this.state.foods];
    const updatedHistory = [...this.state.pastOrders, newHistoryItem];

    this.submitOrderAPIHandler(newHistoryItem);

    const zeroedFoods = this.state.foods.map((food) => {
      return {name: food.name, value: 0}
    });

    this.setState({
      foods: zeroedFoods,
    })
  }

  deletePastOrderHandler = (index) => {
    let historyID;
    axios.get('http://localhost:5000/history')
      .then(res => {
        historyID = res.data[index]['_id'];
        axios.delete('http://localhost:5000/history', historyID);
      })
      

    // let remadeHistory = [...this.state.pastOrders];
    // remadeHistory.splice(index, 1);

    // this.setState({
    //   pastOrders: remadeHistory
    // })
  }

  addRowHandler = () => {
    if(this.state.newItem) {
      this.setState({
        foods: [...this.state.foods, {name: this.state.newItem, value: 0}]
      })
    }
  }

  deleteRowHandler = () => {
    let remadeFoods = [...this.state.foods];
    // Finding index
    let index = -1;
    let counter = 0;
    for(let i = 0; i < this.state.foods.length; i++) {
      if(this.state.foods[i].name === this.state.deleteItem) {
        index = counter;
      }
      counter = counter + 1;
    }
    if(index >= 0) {
      remadeFoods.splice(index, 1);
      this.setState({
        foods: remadeFoods
      })
    }


  }

  dropDownStateChange = () => {
    const dropDownState = this.state.showDropDown;
    this.setState({
      showDropDown: !dropDownState
    })
  }

  render() {

    let items = (
          this.state.foods.map((food, index) => {
            return <Items 
            itemName={food.name} 
            value={food.value}
            class={this.state.itemsStyle}
            key={index}
            changed={(event) => this.amountChangedHandler(event, index)}
            />
          })
    );

    let items2 = (
      this.state.foods.map((food, index) => {
            return <Items2 
            itemName={food.name} 
            value={food.value}
            class={this.state.items2Style}
            key={index}
            />
          })
    );

    let pastOrders = this.state.pastOrders.map((orders, index) => {
        return (
          <div className="cont-1"> {
            [...orders].map((item, i) => {
              return (
                <HistoryItem 
                itemName={item.name} 
                value={item.value}
                class={this.state.itemsStyle}
                key={index}
                />
              )
            })
          } 
          <button className="button-del" onClick={() => this.deletePastOrderHandler(index)}>Delete</button>
          </div>
        );
    });
  

    return (
      <div className="App App-header">
        <div><h1>Shopping Cart</h1></div>
        <div className="cont-1">
          <div className="cont-2">{items}</div>
          <div className="spacer"></div>
          <div className="cont-2">{items2}</div>
        </div>

        <div className="add-delete-cont-1">
          <div className="add-delete-cont-2">
            <div className="add-delete-item" onClick={this.addRowHandler}>Add Item</div>
            <textarea
            className="add-item-text"
            type="text" 
            onChange={(event) => {this.setState({newItem: event.target.value})}}
            value={this.state.newItem}></textarea>
            <div className="add-delete-item"
            onClick={this.deleteRowHandler}>Delete Item</div>
          </div>

          <DropDownMenu 
          items={this.state.foods} 
          show={this.state.showDropDown} 
          clicked={() => this.dropDownStateChange()}>Select Item</DropDownMenu>
        </div>

        <div className="wrap"><button className="button" onClick={this.submitOrderHandler}>Submit</button></div>
        {/* ------------------- */}
        <button onClick={this.historyChangedHandler}>API</button>
          {/* ------------------- */}
        <div className="cont-2"><label>History</label></div>
        <div className="cont-3">{pastOrders}</div>
        


      </div>
    );
  }
}

export default App;
