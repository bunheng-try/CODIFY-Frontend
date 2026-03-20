import React from "react";
import { useProducts } from "../../features/test/products/hooks/useProducts";
import ProductCard from "../../features/test/products/components/ProductCard";
import { Link } from "react-router-dom";

const ProductList: React.FC = () => {
  const { data, isLoading, isError, error } = useProducts();

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div>
      <Link to="/">Go to Home</Link>
      <Link to="/products">Go to Products</Link>
      <div className="product-grid">
        {data?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;