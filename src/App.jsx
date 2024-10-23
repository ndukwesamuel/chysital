import { BrowserRouter, Route, Routes } from "react-router-dom";

import JobListing from "./components/JobListing";
import "./App.css";
import Details from "./components/Details";

// import './main.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<JobListing />} />
        <Route path="/user-details" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
