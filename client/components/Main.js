import React from 'react';
import axios from 'axios';

import Spots from './Spots';
import AddSpot from './AddSpot';
import Map from './Map';
import Header from './Header';
import Stats from './Stats';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      spots: [],
      selectedSpot: {},
      totalCompleted: 0,
      totalRemaining: 0,
      percentCompleted: '0%',
    };
    this.getSpot = this.getSpot.bind(this);
    this.addSpot = this.addSpot.bind(this);
    this.updateSpot = this.updateSpot.bind(this);
    this.deleteSpot = this.deleteSpot.bind(this);
  }
  async getSpot(spotId) {
    try {
      const response = await axios.get(`/api/spots/${spotId}`);
      const selectedSpot = response.data;
      return this.setState({ selectedSpot });
    } catch (err) {
      console.log(err);
    }
  }
  async addSpot(name) {
    try {
      const response = await axios.post('/api/spots/', {
        name,
      });
      const newSpot = response.data;
      return this.setState({ spots: [...this.state.spots, newSpot] });
    } catch (err) {
      console.log(err);
    }
  }

  async updateSpot(id) {
    try {
      const response = await axios.put(`/api/spots/${id}`);
      const updatedSpot = response.data;
      console.log('updated spot', updatedSpot);
      const newSpots = [
        ...this.state.spots,
        (this.state.spots[id] = updatedSpot),
      ];
      console.log('new spot', newSpots);
      const totalCompleted = newSpots.filter(spot => {
        spot.status === 'Complete';
      });
      const totalRemaining = newSpots.length - totalCompleted;
      const percentCompleted = totalRemaining / totalCompleted;
      return this.setState({
        spots: newSpots,
        totalCompleted,
        totalRemaining,
        percentCompleted,
      });
    } catch (err) {
      console.log(err);
    }
  }
  completeSpot(spot) {
    console.log('complete!');
    spot.completed = !spot.compeleted;
    this.updateSpot(spot.id);
  }
  async deleteSpot(id) {
    try {
      const response = await axios.delete(`/api/spots/${id}`);
      const deletedSpot = response.data;
      return this.setState({ spots });
    } catch (err) {
      console.log(err);
    }
  }

  async componentDidMount() {
    try {
      const response = await axios.get('/api/spots');
      const spots = response.data;
      console.log('component did mount', spots);
      this.setState({ spots });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return (
      <div>
        <div>
          <Header />
          <Stats
            totalCompleted={this.state.totalCompleted}
            totalRemaining={this.state.totalRemaining}
            percentCompleted={this.state.percentCompleted}
          />
        </div>
        <div id="main">
          <Spots
            spots={this.state.spots}
            getSpot={this.getSpot}
            addSpot={this.addSpot}
            updateSpot={this.updateSpot}
            deleteSpot={this.deleteSpot}
            completeSpot={this.completeSpot}
          />
          <Map />
        </div>
      </div>
    );
  }
}
