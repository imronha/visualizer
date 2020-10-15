import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// const ANIMATION_SPEED_MS = 1;
// const NUMBER_OF_ARRAY_BARS = 100;
// const PRIMARY_COLOR = 'turquoise';
// const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sorting: false,
      array: [],
      animationSpeed: 1,
      numOfBars: 100,
      primaryColor: '#21CE99',
      secondaryColor: 'red',
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    if (this.sorting == true) {
      return;
    }
    const array = [];
    const {numOfBars} = this.state;
    for (let i = 0; i < numOfBars; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({array});
    // console.log(array);
  }

  mergeSort() {
    this.setState({sorting: true});
    console.log('merge sort sorting set to true');
    const animations = getMergeSortAnimations(this.state.array);
    const {animationSpeed, primaryColor, secondaryColor} = this.state;

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? secondaryColor : primaryColor;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * animationSpeed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * animationSpeed);
      }
    }
  }

  quickSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  heapSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  bubbleSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }
  handleSpeedChange(e) {
    // e.preventDefault();
    this.setState({
      animationSpeed: e.target.value,
    });
    console.log(e.target.value);
  }

  // onChangeHandler(e) {
  //   e.preventDefault();
  //   this.setState({animationSpeed: e.target.value});
  //   console.log(e.target.value);
  // }
  render() {
    const {array, primaryColor} = this.state;

    return (
      <div className="array-container">
        <div className="button-container">
          <ul>
            <li>
              <button onClick={() => this.resetArray()}>
                Generate New Array
              </button>
            </li>
            <li>
              <button onClick={() => this.mergeSort()}>Merge Sort</button>
            </li>
            <li>
              <button onClick={() => this.quickSort()}>Quick Sort</button>
            </li>
            <li>
              <button onClick={() => this.heapSort()}>Heap Sort</button>
            </li>
            <li>
              <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
            </li>
            <li>
              <button onClick={() => this.testSortingAlgorithms()}>
                Test Sorting Algorithms (BROKEN)
              </button>
            </li>
          </ul>
          <div className="input-container">
            <form>
              <label>Current Speed: </label>
              <input
                type="text"
                name="speed"
                value={this.state.animationSpeed}
                onChange={e => this.handleSpeedChange(e)}
              />
            </form>
          </div>
        </div>

        <div className="array-bar-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: primaryColor,
                height: `${value}px`,
              }}></div>
          ))}
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
