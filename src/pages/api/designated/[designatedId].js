import dbConnect from "../../../server/utils/db_connet";
import designated from "../../../server/models/designated";
import mongoose from "mongoose";
dbConnect();
export default async function handler(req, res) {
  const { method, query, body } = req;
  if (method === "GET") {
    const customer = await designated.findById(query.designatedId);
    return res.status(200).json({ customer });
  } else if (method === "DELETE") {
    const customer = await designated.findById(query.designatedId);
    const customerInvoice = customer.salesInvoices.find(
      (item) => item._id == query.delete
    );
    const totalPrice = customer.totalPrice - customerInvoice.totalPrice;
    const remaining = customer.remaining - customerInvoice.remaining;
    console.log(totalPrice, remaining);
    await designated.updateOne(
      { _id: query.designatedId },
      {
        $set: { totalPrice, remaining },
        $pull: {
          salesInvoices: { _id: query.delete },
        },
      }
    );
    const oneCustomer = await designated.findById(query.designatedId);
    return res
      .status(200)
      .json({ message: "آیتم با موفقیت حذف شد", customer: { oneCustomer } });
  }
}
