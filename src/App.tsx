// https://3.basecamp.com/3695031/buckets/33084981/documents/6619703339
import './App.css';
import ProgressBar from './components/ProgressBar';
import { useEffect, useState } from 'react';
import { bar } from './types/common';

/*

REQS

Add a button next to each progress bar 
on click remove the progress bar from the DOM 
 - maintian 5 concurrent rule

IMP


*/

function App() {
  console.log('App: render');
  const [bars, setBars] = useState<bar[]>([]);
  const MAX_CONCURRENT_BARS = 1;

  const handleAddBar = () => {
    const newBar = {
      id: bars.length,
      status: 'ready' as const,
    };
    setBars((prev) => prev.concat(newBar));
  };

  const handleBarCompleted = (barId: number) => {
    setBars(prev => {
      return prev.map(bar => {
        if (bar.id === barId) {
          console.log('handleBarCompleted ', {...bar, status: 'completed'}, Date.now());
          return {...bar, status: 'completed'};
        }
        return bar;
      });
    })
  };



  useEffect(() => {
    const tryStartMaxBars = () => {
      const runningBarsCount = bars.filter(bar => bar.status === 'running').length;
      const maxBarsRunning = runningBarsCount >= MAX_CONCURRENT_BARS;
      const noBarsAreReady = !bars.some((bar) => bar.status === 'ready');
  
      console.log('App tryStartMaxBars:', 'maxBarsRunning', maxBarsRunning, 'noBarsAreReady', noBarsAreReady)
  
      if (maxBarsRunning || noBarsAreReady) {
        return;
      }
  
      console.log('App tryStartMaxBars:', 'start some bars, yo');
  
      const barsToStartCount = MAX_CONCURRENT_BARS - runningBarsCount;
      setBars(prev => {
        let barsStartedCount = 0;
        return prev.map(bar => {
          if (barsStartedCount < barsToStartCount && bar.status === 'ready') {
            barsStartedCount +=1;
            return {...bar, status: 'running'}
          }
          return bar;
        });
      });
    };    
    console.log('App: useEffect(, [bars])');
    tryStartMaxBars();
  }, [bars]);

  return (
    <>
      {bars.map((bar) => {
        return (
          <ProgressBar
            key={bar.id}
            attributes={bar}
            onBarCompleted={handleBarCompleted}
          />
        );
      })}
      <div>
        <button onClick={handleAddBar}>add bar</button>
        <ul>
          {bars.map((bar) => {
            return (
              <li key={bar.id}>
                id: {bar.id}, status: {bar.status}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
