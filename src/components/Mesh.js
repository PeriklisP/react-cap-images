import React, { Component } from "react";
import Picture from "./Picture";

export default class Mesh extends Component {
  render() {
    return (
      <div className="Mesh">
        {this.props.images.map(picture => {
          return <Picture url={picture.url} key={picture.id} />;
        })}
      </div>
    );
  }
}
