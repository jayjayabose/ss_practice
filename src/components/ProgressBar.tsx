import { useState, useEffect } from 'react';

const TIME_TO_COMPLETE = 10000;
const BAR_MAX_WIDTH = 200;

function ProgressBar() {
  const [barProgressWidth, setBarProgressWidth] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    const intervalId = setInterval(() => {
      const elapsedTime = Date.now() - startTime;

      if (elapsedTime >= TIME_TO_COMPLETE) {
        setBarProgressWidth(BAR_MAX_WIDTH);
        clearInterval(intervalId);
        return;
      }
      setBarProgressWidth((elapsedTime / TIME_TO_COMPLETE) * BAR_MAX_WIDTH)
    }, 200);

  }, []);

  return (
    <>
      <div
        style={{ width: `${BAR_MAX_WIDTH}px`, height: '20px', border: 'dotted grey 1px' }}
      >
        <div
          style={{ backgroundColor: 'green', width: `${barProgressWidth}px`, height: '20px' }}
        ></div>
      </div>
    </>
  );
}

export default ProgressBar;
