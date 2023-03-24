import dbConnect from "../../../server/utils/db_connet";
import designated from "../../../server/models/designated";
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
      .json({ message: "فاکتور با موفقیت حذف شد", customer: oneCustomer });
  } else if (method === "POST") {
    const { value } = body;
    const customer = await designated.findById(query.designatedId);

    const salesInvoices = {
      createdAt: new Date().toISOString(),
      totalPrice: value.totalPrice,
      remaining: value.remain,
      desc: value.desc,
      payment: [
        {
          createdAt: new Date().toISOString(),
          pay: value.payment ? value.payment : 0,
        },
      ],
    };
    customer.salesInvoices.push(salesInvoices);
    customer.totalPrice += value.totalPrice;
    customer.remaining += value.remain;
    await customer.save();
    const customerList = await designated.find({});
    return res
      .status(200)
      .json({ message: "فاکتور با موفقیت ثبت شد", customer: customerList });
  }
}
