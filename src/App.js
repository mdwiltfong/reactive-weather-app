import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Weather } from "./components/Weather";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Weather />} />
      </Routes>
    </div>
  );
}

export default App;
