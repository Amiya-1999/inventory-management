"use client";

import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";

const categories = [
  "FruitsAndVegetables",
  "DairyAndBakery",
  "GrainsAndStaples",
  "SnacksAndBeverages",
  "CookingEssentials",
];

const AddProductModal = ({ isOpen, onClose, onProductAdded }) => {
  const { setSidebarOpen } = useAuth();
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "FruitsAndVegetables",
    price: "",
    quantity: "",
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (form.name === "" || form.quantity === "") {
      alert("Name and Quantity are required fields.");
      return;
    }
    try {
      const payload = {
        ...form,
        price: form.price ? parseFloat(form.price) : undefined,
        quantity: parseFloat(form.quantity),
      };

      await axios.post(`${apiUrl}/api/products`, payload);
      onProductAdded();
      onClose();
      setForm({
        name: "",
        description: "",
        category: "FruitsAndVegetables",
        price: "",
        quantity: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 pt-40 md:mt-0 overflow-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <button
          className="absolute top-2 right-3 text-gray-500 text-xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>
        <div className="space-y-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border px-4 py-2 rounded"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border px-4 py-2 rounded"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.replace(/([A-Z])/g, " $1")}
              </option>
            ))}
          </select>
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
            placeholder="Price (optional)"
            className="w-full border px-4 py-2 rounded"
          />
          <input
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            type="number"
            placeholder="Quantity"
            className="w-full border px-4 py-2 rounded"
            required
          />
          <button
            onClick={() => {
              handleSubmit();
              setSidebarOpen(false);
            }}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
