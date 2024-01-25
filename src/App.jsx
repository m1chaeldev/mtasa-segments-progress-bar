import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [segments, setSegments] = useState(5);

  let updateScorePerSecondAmount = 0;
  let xp = 0;
  let nextLevel = 5000;
  let addScore = 0;

  const giveXP = (value = addScore) => {
    if (addScore === 0) {
      updateScorePerSecondAmount = Math.round(value / 50) || 1;
      addScore = value;
      checkFull();
      return giveXP();
    }

    const updateXPWithAnimation = () => {
      addScore -= updateScorePerSecondAmount;
      xp += updateScorePerSecondAmount;

      // Up level
      if (xp >= nextLevel) {
        const restScore = addScore;
        resetProgressBar();
        giveXP(restScore);
        return;
      }

      checkFull();

      if (addScore <= 0) {
        addScore = 0;
        return;
      } else requestAnimationFrame(updateXPWithAnimation);
    };

    updateXPWithAnimation();
  };

  const checkFull = () => {
    const current = xp,
      next = nextLevel;
    const segmentProgress = 100 / segments;
    const currentPercent = (current * 100) / next;
    const filled = Math.floor(currentPercent / segmentProgress);

    for (let index = 0; index < segments; index++) {
      if (index === 0 && filled === 0) {
        const p = (currentPercent / segmentProgress) * 100;
        document.getElementById(`progress-bar${index}`).style.width = p + "%";
        break;
      }

      if (filled - index >= 1) {
        document.getElementById(`progress-bar${index}`).style.width = "100%";
      } else {
        const p = ((currentPercent / segmentProgress) % filled) * 100;
        document.getElementById(`progress-bar${index}`).style.width = p + "%";
        break;
      }
    }
  };

  const resetProgressBar = () => {
    updateScorePerSecondAmount = 0;
    xp = 0;
    addScore = 0;

    for (let index = 0; index < segments; index++) {
      const el = document.getElementById(`progress-bar${index}`);
      if (el) el.style.width = 0 + "%";
    }
  };

  useEffect(() => {
    resetProgressBar();
  }, [segments]);

  return (
    <div>
      <div id="segments-bar" className="row">
        {Array.from(Array(segments).keys()).map((_, i) => (
          <div className="segment" key={i.toString()}>
            <div className="progress-bar" id={`progress-bar${i}`} />
          </div>
        ))}
      </div>
      <button
        style={{ marginTop: 16 }}
        onClick={() => {
          giveXP(Math.floor(Math.random() * 1000) + 500);
        }}
      >
        Give random xp
      </button>
      <div className="segments-setting">
        <input
          id="segment-input"
          placeholder={`current segments: ${segments}`}
        />
        <button
          onClick={() => {
            setSegments(Number(document.getElementById("segment-input").value));
          }}
        >
          Set segments
        </button>
      </div>
    </div>
  );
}

export default App;
