import DefaultProgressBar from "./example/DefaultProgressBar";
import GreenProgressBar from "./example/GreenProgressBar";

const MainApp = () => {
  return (
    <div>
      <GreenProgressBar />
      <div style={{ marginTop: 50 }} />
      <DefaultProgressBar />
    </div>
  );
};

export default MainApp;
