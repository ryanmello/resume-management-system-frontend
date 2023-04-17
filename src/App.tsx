import { useContext } from "react";
import { ThemeContext } from "./context/theme.context";
import Navbar from "./components/navbar/Navbar.component";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Companies from "./pages/companies/Companies";
import Jobs from "./pages/jobs/Jobs";
import Candidates from "./pages/candidates/Candidates";

function App() {
  const {darkMode} = useContext(ThemeContext);

  const appStyles = darkMode ? "app dark" : "app"

  return (
    <div className={appStyles}>
      <Navbar/>
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/companies" element={<Companies/>}></Route>
          <Route path="/jobs" element={<Jobs/>}></Route>
          <Route path="/candidates" element={<Candidates/>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
