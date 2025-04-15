import { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

const ProductCard = ({ product, isLoggedIn, refreshProducts }) => {
  const [showInput, setShowInput] = useState(false);
  const [newQty, setNewQty] = useState(product.quantity);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await axios.put(
        `http://localhost:8000/api/products/${product.id}/quantity`,
        {
          quantity: parseFloat(newQty),
        }
      );
      setShowInput(false);
      refreshProducts();
    } catch (err) {
      console.error("Failed to update quantity:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8000/api/products/${product.id}`);
      refreshProducts();
    } catch (err) {
      console.error("Failed to delete product:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded shadow p-4 bg-white relative">
      <h2 className="text-lg font-semibold">{product.name}</h2>
      {product.description && (
        <p className="text-sm text-gray-600">{product.description}</p>
      )}
      <div className="mt-2 text-sm">
        {product.price && <p>💰 Price: ₹{product.price}</p>}
        <p>📦 Quantity: {product.quantity}</p>
      </div>

      {showInput && (
        <div className="mt-2 flex gap-2 items-center">
          <input
            type="number"
            min="0"
            step="1"
            value={newQty}
            onChange={(e) => setNewQty(e.target.value)}
            className="border rounded px-2 py-1 text-sm w-20"
          />
          <button
            onClick={handleUpdate}
            disabled={loading}
            className={`px-2 py-1 bg-blue-500 text-white text-sm rounded ${
              loading ? "cursor-not-allowed opacity-90" : "cursor-pointer"
            }`}
          >
            {loading ? (
              <div className="flex items-center gap-1">
                <Loader2 className="animate-spin w-4 h-4 text-white" />
                Saving...
              </div>
            ) : (
              "Save"
            )}
          </button>
          <button
            onClick={() => setShowInput(false)}
            className="text-sm text-gray-500 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      )}

      {!showInput && (
        <div className="flex gap-2 mt-4">
          <button
            disabled={!isLoggedIn}
            onClick={() => setShowInput(true)}
            className={`px-3 py-1 bg-yellow-300 text-sm rounded disabled:opacity-50 ${
              isLoggedIn ? "cursor-pointer" : "cursor-not-allowed opacity-90"
            }`}
            title={!isLoggedIn ? "Login to edit" : ""}
          >
            Update
          </button>
          <button
            disabled={!isLoggedIn}
            onClick={handleDelete}
            className={`px-3 py-1 bg-red-400 text-sm rounded text-white disabled:opacity-50 ${
              isLoggedIn ? "cursor-pointer" : "cursor-not-allowed opacity-90"
            }`}
            title={!isLoggedIn ? "Login to delete" : ""}
          >
            {loading ? (
              <div className="flex items-center gap-1">
                <Loader2 className="animate-spin w-4 h-4 text-white" />
                Deleting...
              </div>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
