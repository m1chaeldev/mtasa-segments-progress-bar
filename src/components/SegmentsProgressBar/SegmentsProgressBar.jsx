import { useEffect, useRef, useState } from "react";
import "./SegmentsProgressBar.css";

const getProgressBarWidthKey = (index) => `progress-bar-${index}`;

const getDefaultProgressBarWidth = (segments) => {
  let s = {};
  for (let index = 0; index < segments; index++) {
    s[getProgressBarWidthKey(index)] = 0;
  }

  return s;
};

const useSegmentsProgressBar = ({
  segments,
  initXP,
  initNextLevelXP,
  onLevelUp,
  segmentClassName = "",
  progressBarClassName = "",
  borderRadius = 4,
  gap = 2,
  segmentWidth = 30,
  segmentHeight = 18,
}) => {
  const segmentsArr = Array.from(Array(segments).keys());
  const [progressBarWidths, setProgressBarWidths] = useState(
    getDefaultProgressBarWidth(segments)
  );
  const [playerXP, setPlayerXP] = useState(initXP);
  const [nextLevelXP, setNextLevelXP] = useState(initNextLevelXP);
  const [restXP, setRestXP] = useState(0);
  const [isLevelUp, setIsLevelUp] = useState(false);
  const requestRef = useRef();
  let currentXP = playerXP;
  let giveAmount = 0;

  const fillSegment = () => {
    const max1SegmentXP = nextLevelXP / segments;
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

    if (currentXP + updateScorePerSecond >= nextLevelXP) {
      setIsLevelUp(true);
      setRestXP(giveAmount);
      requestRef.current = undefined;

      if (isLevelUp) {
        onLevelUp();
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

    const getSegmentStyles = (i) => ({
      borderRadius:
        i === 0
          ? firstElementBorderRadius
          : i === segmentsArr.length - 1
          ? lastElementBorderRadius
          : 0,
      width: segmentWidth,
      height: segmentHeight,
    });

    const getProgressBarStyles = (i) => ({
      width: progressBarWidths[getProgressBarWidthKey(i)] + "%",
    });

    return (
      <div className="row" style={{ gap }}>
        {segmentsArr.map((_, i) => (
          <div
            key={i.toString()}
            className={`segment ${segmentClassName}`}
            style={getSegmentStyles(i)}
          >
            <div
              className={`progress-bar ${progressBarClassName}`}
              style={getProgressBarStyles(i)}
            />
          </div>
        ))}
      </div>
    );
  };

  return {
    SegmentsProgressBar: SegmentsProgressBarComponent,
    giveXP,
    playerXP,
    nextLevelXP,
    setNextLevelXP,
    segments,
  };
};

export default useSegmentsProgressBar;
