import useSegmentsProgressBar from "./components/SegmentsProgressBar";

const MainApp = () => {
  const segmentsBar1 = useSegmentsProgressBar({
    id: "bar1",
    segments: 5,
    initXP: 100,
    initNextLevelXP: 5000,
    onLevelUp() {
      console.log("Bar 1 Level Up!");
    },
    segmentClassName: "xin-chao",
    progressBarClassName: "xin-chao",
  });
  const { SegmentsProgressBar: SegmentsBar1 } = segmentsBar1;

  const segmentsBar2 = useSegmentsProgressBar({
    id: "bar2",
    segments: 10,
    initXP: 1000,
    initNextLevelXP: 2000,
    onLevelUp() {
      console.log("Bar 2 Level Up!");
    },
  });
  const { SegmentsProgressBar: SegmentsBar2 } = segmentsBar2;

  return (
    <div>
      <SegmentsBar1 />
      <button
        style={{ marginTop: 16 }}
        onClick={() => {
          segmentsBar1.giveXP(Math.floor(Math.random() * 1000) + 500);
        }}
      >
        Give random xp for bar 1
      </button>
      <div style={{ marginTop: 50 }} />
      <SegmentsBar2 />
      <button
        style={{ marginTop: 16 }}
        onClick={() => {
          segmentsBar2.giveXP(Math.floor(Math.random() * 1000) + 500);
        }}
      >
        Give random xp for bar 2
      </button>
    </div>
  );
};

export default MainApp;
