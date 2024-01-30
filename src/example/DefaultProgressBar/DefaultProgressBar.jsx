import useSegmentsProgressBar from "../../components/SegmentsProgressBar";

const DefaultProgressBar = () => {
  const defaultBar = useSegmentsProgressBar({
    segments: 8,
    initXP: 2200,
    initNextLevelXP: 5000,
    onLevelUp() {
      alert("Default-Bar Level Up!");
    },
  });
  const { SegmentsProgressBar } = defaultBar;

  return (
    <div>
      <SegmentsProgressBar />
      <button
        style={{ marginTop: 16 }}
        onClick={() => {
          defaultBar.giveXP(Math.floor(Math.random() * 1000) + 500);
        }}
      >
        Add random xp for Default-Bar
      </button>
    </div>
  );
};

export default DefaultProgressBar;
