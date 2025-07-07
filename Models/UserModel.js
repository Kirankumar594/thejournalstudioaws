import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  postalCode: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true, default: 'India' },
  payment: { 
    type: String, 
    enum: ['cod', 'upi', 'card'], 
    default: 'cod' 
  },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);
export default User;
