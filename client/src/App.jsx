import {
  BrowserRouter as BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Protected from "./components/Protected";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Library from "./pages/Library";
import Prompt from "./pages/Prompt";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/login" element={<SignIn />} />
          <Route
            exact
            path="/library"
            element={
              <Protected>
                <Library />
              </Protected>
            }
          />
          <Route exact path="/prompt/:id" element={<Prompt />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
