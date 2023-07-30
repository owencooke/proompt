import {
  BrowserRouter as BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Library from "./pages/Library";

function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/library" element={<Library />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
