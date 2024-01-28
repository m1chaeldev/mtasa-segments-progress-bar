import DefaultProgressBar from "./example/DefaultProgressBar";
import GreenProgressBar from "./example/GreenProgressBar";
import SegmentsProgressBarState from "./components/SegmentsProgressBarState";

const MainApp = () => {
  return (
    <div>
      <GreenProgressBar />
      <div style={{ marginTop: 50 }} />
      <DefaultProgressBar />
      <SegmentsProgressBarState />
    </div>
  );
};

export default MainApp;
