import Link from "next/link";

const categories = [
  { label: "All Products", value: "all" },
  { label: "Fruits & Vegetables", value: "FruitsAndVegetables" },
  { label: "Dairy & Bakery", value: "DairyAndBakery" },
  { label: "Grains & Staples", value: "GrainsAndStaples" },
  { label: "Snacks & Beverages", value: "SnacksAndBeverages" },
  { label: "Cooking Essentials", value: "CookingEssentials" },
];

const Sidebar = ({ selected, onSelect, isLoggedIn }) => {
  return (
    <aside className="w-64 h-full bg-white border-r shadow-md p-4 fixed top-16 left-0">
      <button
        disabled={!isLoggedIn}
        title={!isLoggedIn ? "Login to Add" : ""}
        onClick={() => onSelect("add")}
        className={`w-full bg-blue-500 text-white py-2 px-4 mb-4 rounded hover:bg-blue-600 ${
          isLoggedIn ? "cursor-pointer" : "cursor-not-allowed opacity-90"
        }`}
      >
        + Add Product
      </button>
      <nav className="space-y-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            className={`block w-full text-left px-4 py-2 rounded ${
              selected === cat.value
                ? "bg-blue-100 font-semibold"
                : "hover:bg-gray-100"
            }`}
            onClick={() => onSelect(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
