import React, { Component } from "react";
import Picture from "./components/Picture";
import Mesh from "./components/Mesh";
import "./App.scss";
import axios from "axios";
import { startingPositions } from "./constants/startingPositions";
require("dotenv").config();

class App extends Component {
  state = {
    images: []
  };

  componentDidMount() {
    const apiKey = "Bearer " + process.env.REACT_APP_AIRTABLE_KEY;
    axios
      .get("https://api.airtable.com/v0/appjyRSLnk3amftj3/Table%201", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: apiKey
        }
      })
      .then(res => {
        // Extract relevant data from Airtable API, and append each picture's grid position
        const images = res.data.records
          .map(item => item.fields.Attachments[0])
          .map((item, index) => {
            item.position = startingPositions[index];
            item.order = index % 9; // Defines the image order for both meshes, 0 to 9
            return item;
          });
        this.setState({ images });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    console.log(this.state.images);
    const topImages = this.state.images.slice(0, 9);
    const bottomImages = this.state.images.slice(9, 18);
    return (
      <div className="App">
        <Mesh
          swapImageOrder={this.swapImageOrder}
          meshImages={topImages}
          largePos={2}
        />
        <Mesh
          swapImageOrder={this.swapImageOrder}
          meshImages={bottomImages}
          largePos={6}
        />
      </div>
    );
  }
}

export default App;
