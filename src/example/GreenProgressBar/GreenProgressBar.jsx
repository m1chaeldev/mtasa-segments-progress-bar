import useSegmentsProgressBar from "../../components/SegmentsProgressBar";
import "./GreenProgressBar.css";

const GreenProgressBar = () => {
  const greenBar = useSegmentsProgressBar({
    segments: 5,
    initXP: 4900,
    initNextLevelXP: 5000,
    onLevelUp() {
      greenBar.setNextLevelXP(greenBar.nextLevelXP + 1000);
      alert("Green-Bar Level Up!");
    },
    segmentClassName: "custom-segment",
    progressBarClassName: "custom-progress-bar",
    borderRadius: 16,
    gap: 12,
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
          greenBar.giveXP(1100);
        }}
      >
        Add 1100 xp for Green-Bar
      </button>
    </div>
  );
};

export default GreenProgressBar;
