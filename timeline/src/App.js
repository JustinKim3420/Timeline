import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Chesspage from "./components/Chesspage";
import Githubpage from "./components/Githubpage";
import { Route, Switch } from "react-router-dom";
import Overlay from './components/Overlay'

const App = () => {
  return (
    <div className="full-page">
      <Overlay />
      <Navbar />
      <Switch>
        <Route path="/Chess">
          <Chesspage />
        </Route>
        <Route path="/Github">
          <Githubpage />
        </Route>
        <Route path="/">
          <Homepage />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
