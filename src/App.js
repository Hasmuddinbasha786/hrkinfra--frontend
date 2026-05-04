import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import PropertyDetail from "./PropertyDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;