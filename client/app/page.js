"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/sidebar";
import ProductCard from "@/components/product-card";
import AddProductModal from "@/components/add-product";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState("all");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchProducts = async (category) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    try {
      const res = await axios.get(`${apiUrl}/api/products`);
      const data = res.data.products || [];
      setProducts(
        category && category !== "all"
          ? data.filter((p) => p.category === category)
          : data
      );
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);

    fetchProducts(selected);
  }, [selected]);

  const handleSelect = (val) => {
    if (val === "add") {
      setShowModal(true);
    } else {
      setSelected(val);
    }
  };

  return (
    <div className="flex">
      <Sidebar
        selected={selected}
        onSelect={handleSelect}
        isLoggedIn={isLoggedIn}
      />

      <main className={`md:ml-64 mt-20 p-6 w-full bg-gray-50 min-h-screen`}>
        <h1 className="text-2xl font-bold mb-6">
          {selected === "all"
            ? "All Products"
            : selected.replace(/([A-Z])/g, " $1")}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isLoggedIn={isLoggedIn}
              refreshProducts={() => fetchProducts(selected)}
            />
          ))}
        </div>
        <AddProductModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onProductAdded={() => fetchProducts(selected)}
        />
      </main>
    </div>
  );
};

export default HomePage;
