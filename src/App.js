import { Route, Routes } from "react-router-dom";
import FetchData from "./screens/FetchData";
import EventDetailsScreen from "./screens/EventDetailsScreen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FetchData />} />
      <Route path="/EventDetailsScreen" element={<EventDetailsScreen />} />
    </Routes>
  );
}

export default App;
