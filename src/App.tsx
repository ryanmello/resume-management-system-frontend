import { useContext, lazy, Suspense } from "react";
import { ThemeContext } from "./context/theme.context";
import Navbar from "./components/navbar/Navbar.component";
import { Routes, Route } from "react-router-dom";
import Jobs from "./pages/jobs/Jobs";
import Candidates from "./pages/candidates/Candidates";
import Spinner from "./components/spinner/Spinner";

const Home = lazy(() => import("./pages/home/Home"));
const Companies = lazy(() => import("./pages/companies/Companies"));

function App() {
  const {darkMode} = useContext(ThemeContext);

  const appStyles = darkMode ? "app dark" : "app"

  return (
    <div className={appStyles}>
      <Navbar/>
      <div className="wrapper">
        <Suspense fallback={<Spinner/>}>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/companies" element={<Companies/>}></Route>
            <Route path="/jobs" element={<Jobs/>}></Route>
            <Route path="/candidates" element={<Candidates/>}></Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
