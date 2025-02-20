import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Menu } from "antd";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  // Get active menu item
  const getSelectedKey = () => {
    if (location.pathname.startsWith("/news_feed")) return "news_feed";
    if (location.pathname.startsWith("/news")) return "news";
    if (location.pathname.startsWith("/preferences")) return "preferences";
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = isAuthenticated
    ? [
        { key: "news_feed", label: <Link to="/news_feed">News Feed</Link> },
        { key: "news", label: <Link to="/news">News Articles</Link> },
        {
          key: "preferences",
          label: <Link to="/preferences">Preferences</Link>,
        },
        {
          key: "logout",
          label: (
            <Button type="link" onClick={handleLogout}>
              Logout
            </Button>
          ),
        },
      ]
    : [
        { key: "login", label: <Link to="/login">Login</Link> },
        { key: "signup", label: <Link to="/signup">Signup</Link> },
      ];

  return (
    <Menu
      mode="horizontal"
      theme="dark"
      selectedKeys={[getSelectedKey()]}
      style={{ justifyContent: "center" }}
      items={menuItems}
    />
  );
};

export default Navbar;
