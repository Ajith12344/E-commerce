const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ObjectId } = mongoose.Types;

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const uri = 'mongodb+srv://ajithhuggi41:Ajith%40123@cluster0.yz8lvqz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('MongoDB connection error:', err));

// Define a Product schema
const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    category: String,
    price: Number,
    image: String,
    rating: Number,
    description: String
});

const Product = mongoose.model('Product', productSchema);

// API endpoint to get product by ID
app.get('/api/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findOne({ id: parseInt(productId) });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API endpoint to get related products by category
app.get('/api/products', async (req, res) => {
    const { category, limit } = req.query;
    try {
        const query = category ? { category } : {};
        const products = await Product.find(query).limit(parseInt(limit) || 0);
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const cartItemSchema = new mongoose.Schema({
    id: Number,
    name: String,
    image: String,
    price: Number,
    quantity: Number
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

// Routes
app.get('/cart', async (req, res) => {
    try {
        const cartItems = await CartItem.find();
        res.json(cartItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/cart', async (req, res) => {
    try {
        const newItem = new CartItem(req.body);
        await newItem.save();
        res.json(newItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/cart/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedItem = await CartItem.findOneAndUpdate({ id: parseInt(id) }, req.body, { new: true });
        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Example route in server.js to handle fetching cart items
app.get('/cart', (req, res) => {
    // Fetch cart items from MongoDB Atlas
    Cart.find()
        .then(cartItems => {
            res.json(cartItems); // Return cart items as JSON
        })
        .catch(err => {
            console.error('Error fetching cart items:', err);
            res.status(500).send('Error fetching cart items'); // Handle error
        });
});


app.delete('/cart/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await CartItem.findOneAndDelete({ id: parseInt(id) });
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Define a checkout schema
const checkoutSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    address: String,
    address2: String,
    country: String,
    state: String,
    zip: String,
    paymentMethod: String,
    cardName: String,
    cardNumber: String,
    cardExpiration: String,
    cardCVV: String,
    totalAmount: String,
    createdAt: { type: Date, default: Date.now }
});

const Checkout = mongoose.model('Checkout', checkoutSchema);

// Route to handle checkout
app.post('/checkout', async (req, res) => {
    const checkoutDetails = req.body;
    try {
        const newCheckout = new Checkout(checkoutDetails);
        await newCheckout.save();
        res.status(201).json(newCheckout);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
app.get('/checkout', async (req, res) => {
    try {
        const cartItems = await Checkout.find();
        res.json(cartItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
app.get('/checkout/latest', async (req, res) => {
    try {
        const latestCheckout = await Checkout.findOne().sort({ createdAt: -1 });
        if (!latestCheckout) {
            return res.status(404).json({ message: 'Checkout not found' });
        }
        res.json(latestCheckout);
    } catch (err) {
        console.error('Error fetching latest checkout:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// Define a schema for the contact form
const contactSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    need: String,
    message: String,
  });
  
  // Create a model for the contact form
  const Contact = mongoose.model('Contact', contactSchema);
  
  // API endpoint to handle form submissions
  app.post('/api/contact', async (req, res) => {
    const { firstname, lastname, email, need, message } = req.body;
  
    const newContact = new Contact({
      firstname,
      lastname,
      email,
      need,
      message,
    });
  
    try {
      const savedContact = await newContact.save();
      res.status(201).json(savedContact);
    } catch (error) {
      res.status(400).json({ error: 'Failed to save contact' });
    }
  });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
