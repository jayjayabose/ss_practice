import { useState, useEffect } from 'react';
import {Status} from '../types/common';

const TIME_TO_COMPLETE = 3500;
const UPDATE_INTERVAL = 50;
const BAR_MAX_WIDTH = 200;

type ProgressBarProps = {
  id: number,
  status: Status,
  onBarCompleted: (id: number) => void,
};

function ProgressBar({ id, status, onBarCompleted }: ProgressBarProps) {
  const [barProgressWidth, setBarProgressWidth] = useState(0);

  useEffect(() => {
    if (status === 'ready' || status === 'completed') {
      return;
    }

    const startTime = Date.now();
    
    const intervalId = setInterval(() => {
      const elapsedTime = Date.now() - startTime;

      if (elapsedTime >= TIME_TO_COMPLETE) {
        setBarProgressWidth(BAR_MAX_WIDTH);
        onBarCompleted(id);
        clearInterval(intervalId);
        return;
      }
      setBarProgressWidth((elapsedTime / TIME_TO_COMPLETE) * BAR_MAX_WIDTH);

      return () => {
        clearInterval(intervalId);
      }
    }, UPDATE_INTERVAL);
  }, [id, status, onBarCompleted]);

  return (
    <>
      <div style={{display: 'flex', justifyContent: 'center'}}>
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
      <button>X</button>
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
