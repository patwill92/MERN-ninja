import React from 'react';
import ReactDOM from 'react-dom';
let createReactClass = require('create-react-class');
import axios from 'axios';

let Ninja = createReactClass({
  getInitialState(){
    return({
      ninjas: []
    });
  },
  render(){
    let ninjas = this.state.ninjas;
    ninjas = ninjas.map(function(ninja, index){
      return(
        <li key={index}>
          <span className={ninja.obj.available}></span>
          <span className="name">{ninja.obj.name}</span>
          <span className="rank">{ninja.obj.rank}</span>
          <span className="dist">{Math.floor(ninja.dis / 1000)} km</span>
        </li>
      );
    });
    return(
      <div id="ninja-container">
        <form id="search" onSubmit={this.handleSubmit}>
          <label>Enter your Latitude:</label>
          <input type="text" ref="lat" placeholder="latitude" required />
          <label>Enter your Longitude:</label>
          <input type="text" ref="lng" placeholder="longitude" required />
          <input type="submit" value="Find Ninjas" />
        </form>
        <ul>{ninjas}</ul>
      </div>
    );
  },
  handleSubmit(event){
    event.preventDefault();
    let lng = this.refs.lng.value;
    let lat = this.refs.lat.value;
    let url = `/api/ninjas?lng=${lng}&lat=${lat}`;

    axios.get(url).then((res) => {
      this.setState({
        ninjas: res.data
      });
    });
  }
});

ReactDOM.render(<Ninja />, document.getElementById('root'));