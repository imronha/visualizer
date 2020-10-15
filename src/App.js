import React, {Component} from 'react';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import Navbar from './Navbar/Navbar';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar></Navbar>
        <SortingVisualizer></SortingVisualizer>
      </div>
    );
  }
}

// export default App;
