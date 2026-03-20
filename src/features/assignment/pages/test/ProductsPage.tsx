import React from "react";
import Sidebar from "../../../../shared/components/test/SideBar";
import SidebarToggleButton from "../../../../shared/components/test/SidebarToggleButton";
import { Link } from "react-router-dom";

const ProductsPage: React.FC = () => {

  return (
    <div>
      <Sidebar></Sidebar>
      <div className="container">
        <div>
          <SidebarToggleButton></SidebarToggleButton>
        </div>
        <h1>Products</h1>
        <Link to="/">Go to home</Link>
        <Link to="/products-list">Go to Products List</Link>
      </div>
    </div>
  );
};

export default ProductsPage;
