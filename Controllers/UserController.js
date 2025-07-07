import User from '../Models/UserModel.js';

// Create new order/user
export const createUser = async (req, res) => {
  try {
    const userData = req.body;

    const user = new User(userData);  // Fixed typo here
    await user.save();

    res.status(201).json({ message: 'Order created successfully', user });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Server error creating order' });
  }
};

// Get all users/orders
export const getUser = async (req, res) => {
  try {
    const user = await User.find().sort({ createdAt: -1 });
    res.json({ data: user });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Server error fetching orders' });
  }
};
