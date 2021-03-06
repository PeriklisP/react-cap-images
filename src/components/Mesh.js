import React, { Component } from "react";
import Picture from "./Picture";
import { gridPositions } from "../constants/gridPositions";
// import _ from "lodash";
import swap from "../util/swap";

export default class Mesh extends Component {
  // TODO - modify largeImagePosition, redundant state of truth
  state = {
    images: [],
    largePos: this.props.largePos
  };

  /**
   * This waits for parent App component to resolve Axios API call to image store
   * So it can pass the full props data
   * to this component
   * which can then seed this component's local state
   * Why this is necessary is because `Mesh` handles the core logic of the app
   * `App` only handles seeding of data
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.images !== nextProps.meshImages) {
      return {
        images: nextProps.meshImages
      };
    }
  }
  onClick = e => {
    e.persist();
    const currentID = e.target.dataset.location.substring(1);
    let { largePos } = this.state;
    console.log(currentID, "currentID");
    console.log(largePos, "largePos");

    /**
     * The following below is where core logic of app sits
     * It calculates how states move from one to another
     * A variable X is described in comments but never defined
     * This defines the distance, between a large image and the distance
     * of the element clicked
     *
     * There are 8 unique state transitions, each commented out
     * Please see the README doc for more information on how it works
     *
     * Chop a piece of paper up
     * Label each transition out, and animate by hand
     */
    // Only do things if not large image clicked
    if (currentID !== largePos) {
      // Hover Left - Scenario 1,2,3,4, X positive
      if (currentID < largePos) {
        // X = 1, B hovered left
        if (largePos - currentID == 2) {
          let newImg = this.state.images;
          newImg[largePos].position = "g" + (largePos + 2);
          newImg[largePos - 2].position = "b" + (largePos - 2);
          newImg[largePos - 1].position = "g" + (largePos + 3);
          this.setState({
            images: newImg,
            largePos: largePos - 2
          });
        }
        // X = 1, C hovered left
        if (largePos - currentID == 1) {
          // Calculate new grid positions
          let newImg = this.state.images;
          newImg[largePos].position = "g" + (largePos + 3); // A > C
          newImg[largePos - 2].position = "g" + (largePos + 2); // B > B
          newImg[largePos - 1].position = "b" + (largePos - 2); // C > A
          // Because B moves from left to right of A
          // Swap index positions of new B and new A,
          // [arr[0], arr[1]] = [arr[1], arr[0]];
          swap(newImg, largePos - 2, largePos - 1);
          // Push changes
          this.setState({
            images: newImg,
            largePos: largePos - 2
          });
        }
        // X = 2, D hovered left
        if (largePos - currentID == 4) {
          let newImg = this.state.images;
          newImg[largePos].position = "g" + (largePos + 2);
          newImg[largePos - 2].position = "g" + (largePos + 0);
          newImg[largePos - 1].position = "g" + (largePos + 3);
          newImg[largePos - 4].position = "b" + (largePos - 4);
          newImg[largePos - 3].position = "g" + (largePos + 1);

          // If the 4th item in array was largePos
          // The order 1st item swapped with 2nd
          // The order 3rd item swapped with 4th
          swap(newImg, largePos - 2, largePos - 3);
          swap(newImg, largePos - 0, largePos - 1);

          this.setState({
            images: newImg,
            largePos: largePos - 4
          });
        }
        // X = 2, E hovered left
        if (largePos - currentID == 3) {
          let newImg = this.state.images;
          newImg[largePos].position = "g" + (largePos + 3);
          newImg[largePos - 2].position = "g" + (largePos + 2);
          newImg[largePos - 1].position = "g" + (largePos + 1);
          newImg[largePos - 4].position = "g" + (largePos - 0);
          newImg[largePos - 3].position = "b" + (largePos - 4);

          // Chop a piece of paper up
          // Label each transition out, and animate by hand
          // If the 4th item in array was largePos
          // swap 0 and 1
          //     -4    -3
          // swap 2 and 3
          //     -2    -1
          swap(newImg, largePos - 4, largePos - 3);
          swap(newImg, largePos - 2, largePos - 1);

          this.setState({
            images: newImg,
            largePos: largePos - 4
          });
        }
        // Hover Right - Scenario 1,2,3,4, X negative
      } else if (currentID > largePos) {
        // X = 1, B hovered right
        if (currentID - largePos == 4) {
          let newImg = this.state.images;
          newImg[largePos].position = "g" + (largePos + 0);
          newImg[largePos + 1].position = "b" + (largePos + 2);
          newImg[largePos + 2].position = "g" + (largePos + 1);

          // If 4th item, largePos = 2
          // swap 3rd and 4th item
          // or   +1   and +2 from largePos
          swap(newImg, largePos + 1, largePos + 2);
          this.setState({
            images: newImg,
            largePos: largePos + 2
          });
        }
        // X = 1, C hovered right
        if (currentID - largePos == 5) {
          let newImg = this.state.images;
          newImg[largePos].position = "g" + (largePos + 1);
          newImg[largePos + 1].position = "g" + (largePos + 0);
          newImg[largePos + 2].position = "b" + (largePos + 2);

          // If 4th item, largePos = 2
          // swap 2nd and 3rd item
          // or   +0   and +1 from largePos
          swap(newImg, largePos + 0, largePos + 1);
          this.setState({
            images: newImg,
            largePos: largePos + 2
          });
        }
        // X = 2, D hovered right
        if (currentID - largePos == 6) {
          let newImg = this.state.images;
          newImg[largePos].position = "g" + (largePos + 0);
          newImg[largePos + 1].position = "g" + (largePos + 2);
          newImg[largePos + 2].position = "g" + (largePos + 1);
          newImg[largePos + 3].position = "b" + (largePos + 4);
          newImg[largePos + 4].position = "g" + (largePos + 3);

          // Chop a piece of paper up
          // Label each transition out, and animate by hand
          // If the 2nd item, largePos = 2
          // the 3rd and 4th item swapped
          //     +1      +2
          // the 5th and 6th item swapped
          //     +3      +4
          swap(newImg, largePos + 1, largePos + 2);
          swap(newImg, largePos + 3, largePos + 4);

          this.setState({
            images: newImg,
            largePos: largePos + 4
          });
        }
        // X = 2, E hovered right
        if (currentID - largePos == 7) {
          let newImg = this.state.images;
          newImg[largePos].position = "g" + (largePos + 1);
          newImg[largePos + 1].position = "g" + (largePos + 0);
          newImg[largePos + 2].position = "g" + (largePos + 3);
          newImg[largePos + 3].position = "g" + (largePos + 2);
          newImg[largePos + 4].position = "b" + (largePos + 4);

          // Chop a piece of paper up
          // Label each transition out, and animate by hand
          // If the 2nd item, largePos = 2
          // the 2nd and 3rd item swapped
          //     +0      +1
          // the 4th and 5th item swapped
          //     +2      +3
          swap(newImg, largePos + 0, largePos + 1);
          swap(newImg, largePos + 2, largePos + 3);

          this.setState({
            images: newImg,
            largePos: largePos + 4
          });
        }
      }
    }
  };
  render() {
    let pictureItems = "";
    if (this.state.images.length > 0) {
      pictureItems = (
        <>
          {this.state.images.map(picture => {
            let gridID = picture.position;
            console.log(gridID, "gridID");
            let gridRow = gridPositions[gridID][0];
            let gridColumn = gridPositions[gridID][1];
            return (
              <Picture
                onClick={this.onClick}
                gridID={picture.position}
                gridRow={gridRow}
                gridColumn={gridColumn}
                url={picture.url}
                key={picture.id}
                order={picture.order}
                // index={index}
              />
            );
          })}
        </>
      );
    } else {
      pictureItems = <div>Loading ...</div>;
    }
    return <div className="Mesh">{pictureItems}</div>;
  }
}
