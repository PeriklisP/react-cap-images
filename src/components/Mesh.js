import React, { Component } from "react";
import Picture from "./Picture";

export default class Mesh extends Component {
  state = {};
  render() {
    return (
      <div className="Mesh">
        {this.props.images.map((picture, index) => {
          const gridClass = this.props.startImage[index];
          return (
            <Picture gridClass={gridClass} url={picture.url} key={picture.id} />
          );
        })}
      </div>
    );
  }
}
