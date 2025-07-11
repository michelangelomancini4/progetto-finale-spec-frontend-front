import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FruitDetailsPage from "./pages/FruitDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fruits/:id" element={<FruitDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
