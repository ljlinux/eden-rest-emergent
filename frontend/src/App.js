import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResortHome from "@/pages/ResortHome";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import Shop from "@/pages/Shop";
import Tours from "@/pages/Tours";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ResortHome />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
