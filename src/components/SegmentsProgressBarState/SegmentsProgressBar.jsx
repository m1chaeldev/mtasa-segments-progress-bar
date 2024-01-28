import { useEffect, useRef, useState } from "react";

const getProgressBarWidthKey = (index) => `progress-bar-${index}`;

const getDefaultProgressBarWidth = (segments) => {
  let s = {};
  for (let index = 0; index < segments; index++) {
    s[getProgressBarWidthKey(index)] = 0;
  }

  return s;
};

const Counter = () => {
  const segments = 5;
  const nextLevel = 5000;
  const borderRadius = 4;
  const segmentsArr = Array.from(Array(segments).keys());
  const [progressBarWidths, setProgressBarWidths] = useState(
    getDefaultProgressBarWidth(segments)
  );
  const [playerXP, setPlayerXP] = useState(700);
  const [restXP, setRestXP] = useState(0);
  const [isLevelUp, setIsLevelUp] = useState(false);
  const requestRef = useRef();
  let currentXP = playerXP;
  let giveAmount = 0;

  const fillSegment = () => {
    const max1SegmentXP = nextLevel / segments;
    const filled = currentXP / max1SegmentXP;
    const indexToFill = Math.floor(filled);
    const filledPercent = (filled - indexToFill) * 100;
    let newProgressBarWidths = {};

    for (let index = 0; index < segments; index++) {
      newProgressBarWidths[getProgressBarWidthKey(index)] =
        index < indexToFill ? 100 : index > indexToFill ? 0 : filledPercent;
    }
    setProgressBarWidths(newProgressBarWidths);
  };

  const animate = () => {
    if (giveAmount <= 0) {
      requestRef.current = undefined;
      return;
    }

    const updateScorePerSecond = giveAmount >= 10 ? 10 : giveAmount;

    if (currentXP + updateScorePerSecond >= nextLevel) {
      setIsLevelUp(true);
      setRestXP(giveAmount);
      requestRef.current = undefined;

      if (isLevelUp) {
        console.log("Level Up!");
        setIsLevelUp(false);
      }
      return;
    }

    giveAmount -= updateScorePerSecond;
    currentXP += updateScorePerSecond;
    setPlayerXP((c) => c + updateScorePerSecond);
    fillSegment();

    if (requestRef.current) requestAnimationFrame(requestRef.current);
  };

  const giveXP = (value) => {
    giveAmount = value;
    requestRef.current = animate;
    requestAnimationFrame(requestRef.current);
  };

  useEffect(() => {
    fillSegment();
  }, []);

  useEffect(() => {
    if (restXP > 0) {
      setPlayerXP(0);
      setRestXP(0);
      giveXP(restXP);
    }
  }, [restXP]);

  const SegmentsProgressBarComponent = () => {
    const firstElementBorderRadius = `${borderRadius}px 0px 0px ${borderRadius}px`;
    const lastElementBorderRadius = `0px ${borderRadius}px ${borderRadius}px 0px`;

    return (
      <div style={{ marginTop: 40 }}>
        <div id="segments-bar" className="row" style={{ gap: 4 }}>
          {segmentsArr.map((_, i) => (
            <div
              key={i.toString()}
              className={`segment`}
              style={{
                borderRadius:
                  i === 0
                    ? firstElementBorderRadius
                    : i === segmentsArr.length - 1
                    ? lastElementBorderRadius
                    : 0,
                width: 40,
                height: 25,
              }}
            >
              <div
                className={`progress-bar`}
                style={{
                  width: progressBarWidths[getProgressBarWidthKey(i)] + "%",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <SegmentsProgressBarComponent />
      <button onClick={() => giveXP(Math.floor(Math.random() * 1000) + 500)}>
        Test
      </button>
    </div>
  );
};

export default Counter;
