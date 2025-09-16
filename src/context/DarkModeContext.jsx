import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types"; // Thêm import này

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
  const [dark, setDark] = useState(false); // Default light mode

  useEffect(() => {
    // Toggle class 'dark' trên <html> để Tailwind áp dụng
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  // Load từ localStorage nếu muốn persist (optional, nhưng khuyến nghị)
  useEffect(() => {
    const savedDark = localStorage.getItem("darkMode");
    if (savedDark !== null) {
      setDark(JSON.parse(savedDark));
    }
  }, []);

  // Lưu vào localStorage khi dark thay đổi
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(dark));
  }, [dark]);

  return (
    <DarkModeContext.Provider value={{ dark, setDark }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Thêm propTypes cho DarkModeProvider (fix lỗi ESLint)
DarkModeProvider.propTypes = {
  children: PropTypes.node.isRequired, // 'node' phù hợp cho children (có thể là element, string, number, v.v.)
};

export { DarkModeProvider }; // Export named export
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within DarkModeProvider");
  }
  return context;
};
