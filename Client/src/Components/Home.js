import React, { Component } from "react";
import axios from 'axios';
import "../Style/Home.css";
import QuickSearch from "./QuickSearch";
import Welcome from "./Welcome";
export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      mealtypes: []
    }
  }
  componentDidMount() {
    axios({
      url: 'http://localhost:8000/locations',
      method: "GET",
      headers: { 'Content-Type': 'application/JSON' }
    })
      .then(res => {
        this.setState({ locations: res.data.locations })
      })
      .catch(err => console.log(err))

    //Mealtypes
    axios({
      url: 'http://localhost:8000/mealtypes',
      method: 'GET',
      headers: { 'Content-Type': 'application/JSON' }
    })
      .then(res => {
        this.setState({ mealtypes: res.data.mealtypes })
      })
      .catch(err => console.log(err))
  }
  render() {
    const { locations, mealtypes } = this.state;
    return (
      <>
        <Welcome locationData={locations} />
        {/* QuickSearch */}
        <QuickSearch mealtypesData={mealtypes} />
      </>
    );
  }
}
