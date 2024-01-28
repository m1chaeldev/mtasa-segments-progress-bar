import useSegmentsProgressBar from "../../components/SegmentsProgressBar/SegmentsProgressBar";
import "./GreenProgressBar.css";

const GreenProgressBar = () => {
  const greenBar = useSegmentsProgressBar({
    id: "green-bar",
    segments: 5,
    initXP: 780,
    initNextLevelXP: 5000,
    onLevelUp() {
      alert("Green-Bar Level Up!");
    },
    segmentClassName: "custom-segment",
    progressBarClassName: "custom-progress-bar",
    borderRadius: 16,
    gap: 6,
    segmentWidth: 50,
    segmentHeight: 24,
  });
  const { SegmentsProgressBar } = greenBar;

  return (
    <div>
      <SegmentsProgressBar />
      <button
        style={{ marginTop: 16 }}
        onClick={() => {
          greenBar.giveXP(Math.floor(Math.random() * 1000) + 500);
        }}
      >
        Give random xp for Green-Bar
      </button>
    </div>
  );
};

export default GreenProgressBar;
