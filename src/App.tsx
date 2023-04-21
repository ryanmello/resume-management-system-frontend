import { useContext, lazy, Suspense } from "react";
import { ThemeContext } from "./context/theme.context";
import Navbar from "./components/navbar/Navbar.component";
import { Routes, Route } from "react-router-dom";
import Spinner from "./components/spinner/Spinner";

const Home = lazy(() => import("./pages/home/Home"));
const Companies = lazy(() => import("./pages/companies/Companies"));
const AddCompany = lazy(() => import("./pages/companies/AddCompany"));
const Jobs = lazy(() => import("./pages/jobs/Jobs"));
const AddJob = lazy(() => import("./pages/jobs/AddJob"));
const Candidates = lazy(() => import("./pages/candidates/Candidates"));
const AddCandidate = lazy(() => import("./pages/candidates/AddCandidate"))

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
              <Route path="/companies/add" element={<AddCompany/>}></Route>
            <Route path="/jobs" element={<Jobs/>}></Route>
              <Route path="/jobs/add" element={<AddJob/>}></Route>
            <Route path="/candidates" element={<Candidates/>}></Route>
              <Route path="/candidates/add" element={<AddCandidate/>}></Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
