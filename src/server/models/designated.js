import mongoose from "mongoose";

const designatedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  plate: {
    type: String,
    unique: true,
  },
  totalPrice: { type: Number, required: true },
  remaining: { type: Number, required: true },
  status: { type: String, required: true },
  salesInvoices: [
    {
      createdAt: { type: String, required: true },
      totalPrice: { type: Number },
      remaining: { type: Number },
      status: { type: String, required: true },
      desc: [
        {
          title: { type: String, required: true },
          price: { type: String, required: true },
        },
      ],
      payment: [
        {
          createdAt: { type: String , required :false},
          pay: { type: String  ,required :false},
        },
      ],
    },
  ],
});

export default mongoose.models.Des || mongoose.model("Des", designatedSchema);
/**
 * author: [
    {
      name: { type: String, required: true },
      userName: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
    },
  ],
 */
