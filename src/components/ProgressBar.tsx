import { useState, useEffect } from 'react';
import {bar} from '../types/common';

/*

*/

const TIME_TO_COMPLETE = 3500;
const UPDATE_INTERVAL = 20;
const BAR_MAX_WIDTH = 200;

type ProgressBarProps = {
  attributes: bar,
  onBarCompleted: (barId: number) => void,
};

function ProgressBar({ attributes, onBarCompleted }: ProgressBarProps) {
  const [barProgressWidth, setBarProgressWidth] = useState(0);

  useEffect(() => {
    if (attributes.status === 'ready' || attributes.status === 'completed') {
      return;
    }
    console.log('ProgressBar useEffect going to start', attributes)

    const startTime = Date.now();
    
    const intervalId = setInterval(() => {
      const elapsedTime = Date.now() - startTime;

      if (elapsedTime >= TIME_TO_COMPLETE) {
        console.log(`interval: invoke onBarCompleted(${attributes.id})`)
        setBarProgressWidth(BAR_MAX_WIDTH);
        onBarCompleted(attributes.id);
        clearInterval(intervalId);
        return;
      }
      setBarProgressWidth((elapsedTime / TIME_TO_COMPLETE) * BAR_MAX_WIDTH);

      return () => {
        clearInterval(intervalId);
      }
    }, UPDATE_INTERVAL);
  }, [attributes, onBarCompleted]);

  return (
    <>
      <div
        style={{
          width: `${BAR_MAX_WIDTH}px`,
          height: '20px',
          border: 'dotted grey 1px',
        }}
      >
        <div
          style={{
            backgroundColor: 'green',
            width: `${barProgressWidth}px`,
            height: '20px',
          }}
        ></div>
      </div>
      {/* <div>
        status: {attributes.status}
        <br />
        id: {attributes.id}
      </div> */}
    </>
  );
}

export default ProgressBar;
