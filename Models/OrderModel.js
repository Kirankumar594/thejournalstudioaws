import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    title: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    personalization: String,
    paperType: String,
    color: String,
    image: String,
});

const orderSchema = new mongoose.Schema(
    {
        customer: {
            fullName: String,
            email: String,
            phone: String,
            address: String,
            city: String,
            state: String,
            postalCode: String,
            country: String,
        },
        items: [orderItemSchema],
        paymentMethod: { type: String, required: true },
        subtotal: { type: Number, required: true },
        shippingFee: { type: Number, required: true },
        totalAmount: { type: Number, required: true },
        shipmentStatus: {
            type: String,
            enum: ["pending", "shipped", "delivered", "cancelled"],
            default: "pending",
        },
        orderDate: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
