import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NewsPage from "./pages/NewsPage";
import PreferencePage from "./pages/PreferencePage";
import NewsFeed from "./pages/NewsFeed";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Allow access to signup page even if unauthenticated
    if (!isAuthenticated && location.pathname !== "/signup") {
      navigate("/login");
    }
  }, [isAuthenticated, navigate, location.pathname]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={isAuthenticated ? <NewsFeed /> : <LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/preferences" element={isAuthenticated ? <PreferencePage /> : <LoginPage />} />
        <Route path="/news" element={isAuthenticated ? <NewsPage /> : <LoginPage />} />
        <Route path="/news_feed" element={isAuthenticated ? <NewsFeed /> : <LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
