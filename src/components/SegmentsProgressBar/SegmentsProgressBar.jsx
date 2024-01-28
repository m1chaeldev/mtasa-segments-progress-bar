import { useEffect } from "react";
import "./SegmentsProgressBar.css";

function useSegmentsProgressBar({
  id,
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
}) {
  let xp = initXP;
  let nextLevelXP = initNextLevelXP;
  let addScore = 0;
  let updateScorePerSecondAmount = 0;
  const elementId = id;

  useEffect(() => {
    checkToFillSegmentBars();
  }, []);

  const generateSegmentsBarId = (index) => {
    return `${elementId}-${index}`;
  };

  const giveXP = (value = addScore) => {
    if (addScore === 0) {
      updateScorePerSecondAmount = Math.round(value / 50) || 1;
      addScore = value;
      checkToFillSegmentBars();
      return giveXP();
    }

    const updateXPWithAnimation = () => {
      addScore -= updateScorePerSecondAmount;
      xp += updateScorePerSecondAmount;

      // Up level
      if (xp >= nextLevelXP) {
        const restScore = addScore;
        resetProgressBar();
        giveXP(restScore);
        onLevelUp();
        return;
      }

      checkToFillSegmentBars();

      if (addScore <= 0) {
        addScore = 0;
        return;
      } else requestAnimationFrame(updateXPWithAnimation);
    };

    updateXPWithAnimation();
  };

  const checkToFillSegmentBars = () => {
    const current = xp,
      next = nextLevelXP;
    const segmentProgress = 100 / segments;
    const currentPercent = (current * 100) / next;
    const filled = Math.floor(currentPercent / segmentProgress);

    for (let index = 0; index < segments; index++) {
      const segmentsBarId = generateSegmentsBarId(index);
      if (index === 0 && filled === 0) {
        const p = (currentPercent / segmentProgress) * 100;
        document.getElementById(segmentsBarId).style.width = p + "%";
        break;
      }

      if (filled - index >= 1) {
        document.getElementById(segmentsBarId).style.width = "100%";
      } else {
        const p = ((currentPercent / segmentProgress) % filled) * 100;
        document.getElementById(segmentsBarId).style.width = p + "%";
        break;
      }
    }
  };

  const resetProgressBar = () => {
    updateScorePerSecondAmount = 0;
    xp = 0;
    addScore = 0;

    for (let index = 0; index < segments; index++) {
      const el = document.getElementById(generateSegmentsBarId(index));
      if (el) el.style.width = 0 + "%";
    }
  };

  const SegmentsProgressBarComponent = () => {
    const segmentsArr = Array.from(Array(segments).keys());
    const firstElementBorderRadius = `${borderRadius}px 0px 0px ${borderRadius}px`;
    const lastElementBorderRadius = `0px ${borderRadius}px ${borderRadius}px 0px`;

    return (
      <div>
        <div id="segments-bar" className="row" style={{ gap }}>
          {segmentsArr.map((_, i) => (
            <div
              key={i.toString()}
              className={`segment ${segmentClassName}`}
              style={{
                borderRadius:
                  i === 0
                    ? firstElementBorderRadius
                    : i === segmentsArr.length - 1
                    ? lastElementBorderRadius
                    : 0,
                width: segmentWidth,
                height: segmentHeight,
              }}
            >
              <div
                id={generateSegmentsBarId(i)}
                className={`progress-bar ${progressBarClassName}`}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return {
    SegmentsProgressBar: SegmentsProgressBarComponent,
    giveXP,
    xp,
    nextLevelXP,
    segments,
  };
}

export default useSegmentsProgressBar;
