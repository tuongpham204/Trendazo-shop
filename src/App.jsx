import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserRoutes from "./routes/UserRoutes";
import PaymentRoutes from "./routes/PaymentRoutes";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { DarkModeProvider } from "./context/DarkModeContext"; // Đúng đường dẫn

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <DarkModeProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/payment/*" element={<PaymentRoutes />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
