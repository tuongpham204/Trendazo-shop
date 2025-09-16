import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserRoutes from "./routes/UserRoutes";
import PaymentRoutes from "./routes/PaymentRoutes";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: true,
    });
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />

        <Route path="/payment/*" element={<PaymentRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
