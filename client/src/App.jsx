import {
  BrowserRouter as BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Library from "./pages/Library";
import Prompt from "./pages/Prompt";

function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/library" element={<Library />} />
          <Route exact path="/prompt/:id" element={<Prompt />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
