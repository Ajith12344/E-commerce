const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Example data (replace with your actual database or data source)
const products = [
    {
        "id": 1,
        "name": "Green Dress with Details",
        "category": "Clothes",
        "price": 400,
        "image": "assets/images/clothes.jpeg",
        "rating": 3,
        "description":"Aj clothes"
    },
    {
        "id": 2,
        "name": "Red Shoes",
        "category": "Shoes",
        "price": 800,
        "image": "assets/images/music.jpg",
        "rating": 4
    },
    {
        "id": 3,
        "name": "Blue Handbag",
        "category": "Accessories",
        "price": 600,
        "image": "assets/images/clothes.jpeg",
        "rating": 5
    }
];

// Middleware
app.use(cors()); // Enable CORS for all routes

// Routes
app.get('/api/products', (req, res) => {
    // Simulate database query or external API call
    res.json(products);
});

// Endpoint to get product by ID
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(prod => prod.id === productId);
  if (product) {
      res.json(product);
  } else {
      res.status(404).json({ message: 'Product not found' });
  }
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
