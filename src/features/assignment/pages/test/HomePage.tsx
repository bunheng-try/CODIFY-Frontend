import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../../../shared/components/test/SideBar";
import SidebarToggleButton from "../../../../shared/components/test/SidebarToggleButton";
import ThemeToggleButton from "../../../../shared/components/test/ToggleTheme";

const HomePage: React.FC = () => {
  return (
    <div>
      <Sidebar></Sidebar>
      <div className="container">
        <div>
          <SidebarToggleButton></SidebarToggleButton>
          <ThemeToggleButton></ThemeToggleButton>
        </div>
        <h1>Home Page</h1>
        <Link to="/products">Go to Products</Link>
      </div>
    </div>
  );
};

export default HomePage;
