import express from "express";
import {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
} from "../Controllers/OrderController.js";

const router = express.Router();

// POST /api/orders - create new order
router.post("/orders", createOrder);

// GET /api/orders - get all orders (admin)
router.get("/orders", getOrders);

// GET /api/orders/:id - get single order by ID (optional)
router.get("/orders/:id", getOrderById);

router.put("/orders/:id/status", updateOrderStatus);


router.patch('/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const updates = req.body; // expect { status: 'completed' } or { shipmentStatus: 'shipped' }

    const order = await Order.findByIdAndUpdate(orderId, updates, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating order status' });
  }
});

export default router;
