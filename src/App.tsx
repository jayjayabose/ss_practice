import './App.css';
import ProgressBar from './components/ProgressBar';
import { useState } from 'react';

/*
Reqs:
Create a button that adds progress bars to the DOM on click

Implementaton:
 state: collection reprenting progress bars
 button: onlcick 
*/

function App() {
  const [bars, setBars] = useState([]);
  const addBar = () => {
    console.log('addBar', bars)
    const newBars = bars.concat([bars.length])
    setBars(newBars)
    console.log('addBar', newBars)

  }

  return (
    <>
      <p>Here we go, Yo!</p>

      {bars.map((bar) => {
        return <ProgressBar key={bar}/>;
      })}
      <button onClick={addBar}>add bar</button>
    </>
  );
}

export default App;
