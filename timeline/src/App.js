import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Chesspage from "./components/Chesspage";
import Githubpage from "./components/Githubpage";
import Apexpage from "./components/Apexpage";
import Resultspage from "./components/Resultspage";
import { Route, Routes } from "react-router-dom";
import Overlay from "./components/Overlay";

const App = () => {
  return (
    <div className="full-page">
      <Overlay />
      <Navbar />
      <Routes>
        <Route path="/results/:searchedUsername" element={<Resultspage/>}/>
        <Route path="/Chess" element={<Chesspage />} />
        <Route path="/Github" element={<Githubpage />} />
        <Route path="/Apex" element={<Apexpage />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
};

export default App;
