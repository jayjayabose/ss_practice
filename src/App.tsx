import './App.css';
import ProgressBar from './components/ProgressBar';
import { useEffect, useState, useRef } from 'react';
import { bar } from './types/common';

/*
Reqs
  only 1 progress bar can be animating at a time, 
  but you can still add progress bars to the DOM on button click. 
  The next progress begins after previous bar has completed 

Imp:
  bars 
     status: readyToRun, running, finishedRunning
     are added as 'readyToRun'
     on complete, invoke: runtNextBar
     does not start by default, starts when status changed to running
  app
    handleAddBar. runtNextBar if none are running



*/


function App() {
  console.log('App: render')
  const [bars, setBars] = useState<bar[]>([]);
  const barsRef = useRef(bars);

  useEffect(() => {
    barsRef.current = bars
  }, [bars]);
  
  const handleAddBar = () => {
    const newBar = {
      id: bars.length,
      status: 'ready' as const,
    }
    const newBars = [...bars, newBar];
    console.log('handleAddBar', 'bars', 'newBars', bars, newBars)
    setBars(newBars);
  }

  const handlBarCompleted = (barId: number) => {
    // console.log('handleBarCompleted', barId, Date.now());
    const bars = barsRef.current;
    const newBars = bars.slice();
    const completedBarIdx = bars.findIndex((bar) => {
      return bar.id === barId
    })
    const completedBar = {... newBars[completedBarIdx], status: 'completed'} as bar;
    newBars[completedBarIdx] = completedBar;
    setBars(newBars);
    console.log('handlBarCompleted', 'bars', 'newBars', bars, newBars)
  }

  const tryStartNextBar = () => {
    console.log('tryStartNextBar invoked', 'bars', bars);
    const aBarIsRunning = bars.some((bar) => bar.status === 'running');
    const noBarsAreReady = !(bars.some((bar) => bar.status === 'ready'));

    if (aBarIsRunning || noBarsAreReady) {
      return;
    }
    
    console.log('tryStartNextBar start next bar');
    
    const newBars = bars.slice();
    // console.log('tryStartNextBar a', newBars, bars); 
    const startBarIdx = newBars.findIndex((bar) => {
      return bar.status === 'ready';
    })

    const startBar = {... newBars[startBarIdx], status: 'running' as const};
    newBars[startBarIdx] = startBar;
    // console.log('tryStartNextBar b', newBars, bars); // wrong
    setBars(newBars);

  }

  useEffect(() => {tryStartNextBar()}, [bars]);

  return (
    <>
      {bars.map((bar) => {
        return <ProgressBar key={bar.id} attributes={bar} onBarCompleted={handlBarCompleted}/>;
      })}
      <div>
        <button onClick={handleAddBar}>add bar</button>
        <ul>
        {bars.map((bar) => {
          return <li key={bar.id}>id: {bar.id}, status: {bar.status}</li>
        })}
        </ul>
      </div>
    </>
  );
}

export default App;
