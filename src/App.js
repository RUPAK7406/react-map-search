import React, { Component } from 'react';
import './App.css';
import data from './data'
import GoogleMapReact from 'google-map-react'
import Marker from './components/marker'
import Stadium from './components/stadium'
class App extends Component {
    constructor(props){
        super(props);
        this.state ={
            stadiums:[],
            allStadiums:[],
            selectedStadium: null,
            search: ''
        }
    }

    componentDidMount(){
        this.setState({
            stadiums: data,
            allStadiums: data
        })
    }
    selectStadium=(stadium)=>{
        this.setState({
            selectedStadium:stadium
        })
    };
    handleChange=(event)=>{
        this.setState({
            search: event.target.value,
            stadiums: this.state.allStadiums.filter((stadium)=> new RegExp(this.state.search,'i').exec(stadium.name))
        });
    };
  render() {
      let center={
          lat:51.527452,
          lng:-0.124975
      };
      if (this.state.selectedStadium){
          center={
              lat: this.state.selectedStadium.lat,
              lng: this.state.selectedStadium.lng
          }
      }
    return (
        <div className="app">
            <div className="main">
                <div className="search">
                    <input
                        type='text'
                        placeholder="Search.."
                        value={this.state.search}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="stadiums">
                    {this.state.stadiums.map((stadium) => {
                        return <Stadium
                            key={stadium.name}
                            stadium={stadium}
                            handleClick={this.selectStadium}
                        ></Stadium>
                    })}
                </div>
            </div>
            <div className="map">
                <GoogleMapReact
                    center={center}
                    zoom={5}
                >
                    {this.state.stadiums.map((stadium) => {
                        return <Marker
                            key={stadium.name}
                            lat={stadium.lat}
                            lng={stadium.lng}
                            text={stadium.capacity}
                            selected={stadium === this.state.selectedStadium}
                        ></Marker>
                    })}
                </GoogleMapReact>
            </div>
        </div>
    );
  }
}

export default App;
