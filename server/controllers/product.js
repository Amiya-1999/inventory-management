const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

//Get all product
exports.getProducts = async (req, res) => {
  try {
    const products = await db.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "Products not found" });
    }
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add new product
exports.addProduct = async (req, res) => {
  const { name, description, category, price, quantity, imageUrl } = req.body;

  try {
    const newProduct = await db.product.create({
      data: {
        name,
        description,
        category,
        price,
        quantity,
        imageUrl,
      },
    });
    res.status(201).json({ product: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update quantity
exports.updateQuantity = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const updatedProduct = await db.product.update({
      where: { id },
      data: { quantity },
    });
    res.status(200).json({ product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await db.product.delete({
      where: { id },
    });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
