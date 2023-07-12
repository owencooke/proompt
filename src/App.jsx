import {
  BrowserRouter as BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";

function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
