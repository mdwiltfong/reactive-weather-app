import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Weather } from "./components/Weather";
console.log(process.env.REACT_APP_MOCK);
console.log(process.env);
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Weather />} />
      </Routes>
    </div>
  );
}

export default App;
