import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResortHome from "@/pages/ResortHome";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ResortHome />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
