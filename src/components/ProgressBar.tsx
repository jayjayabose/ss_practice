import { useState, useEffect } from 'react';
import {bar} from '../types/common';

/*
Note: onBarCompleted is invoked twice. why?
*/

const TIME_TO_COMPLETE = 5000;
const BAR_MAX_WIDTH = 200;

type ProgressBarProps = {
  attributes: bar,
  onBarCompleted: (barId: number) => void,
};

function ProgressBar({ attributes, onBarCompleted }: ProgressBarProps) {
  const [barProgressWidth, setBarProgressWidth] = useState(0);

  useEffect(() => {
    if (attributes.status !== 'running') {
      return;
    }
    const startTime = Date.now();
    let completed = false;
    
    const intervalId = setInterval(() => {
      const elapsedTime = Date.now() - startTime;

      if (elapsedTime >= TIME_TO_COMPLETE && completed === false) {
        // console.log('ProgressBar debug a', 'completed', completed)
        completed = true;
        setBarProgressWidth(BAR_MAX_WIDTH);
        onBarCompleted(attributes.id);
        clearInterval(intervalId);
        // console.log('ProgressBar debug b', 'completed', completed)
        return;
      }
      setBarProgressWidth((elapsedTime / TIME_TO_COMPLETE) * BAR_MAX_WIDTH);
    }, 200);
  }, [attributes.status]);

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
      <div>
        status: {attributes.status}
        <br />
        id: {attributes.id}
      </div>
    </>
  );
}

export default ProgressBar;
