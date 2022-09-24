import React, { memo } from "react";
import Countdown, { zeroPad } from "react-countdown";
const TimerDisplay = (props) => {
  const { time, audio } = props;
  const playBtn = document.querySelector(".audio-settings .playbtn");
  return (
    <Countdown
      key={time}
      date={Date.now() + time * 60000}
      intervalDelay={0}
      zeroPadTime={2}
      onComplete={() => {
        audio.current.stop();
        playBtn.click();
        console.log("completed!");
      }}
      renderer={renderer}
    />
  );
};
const renderer = ({ hours, minutes, seconds }) => {
  return (
    <span>
      {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
    </span>
  );
};

export default memo(TimerDisplay);
