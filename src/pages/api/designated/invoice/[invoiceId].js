import dbConnect from "../../../../server/utils/db_connet";
import designated from "../../../../server/models/designated";
dbConnect();
export default async function handler(req, res) {
  const { method, query, body } = req;
  if (method === "GET") {
    const customer = await designated.findById(query.invoiceId);
    const sales = customer.salesInvoices.find(
      (item) => item.id === query.invoice
    );
    return res.status(200).json({ customer: customer, salesInvoices: sales });
  } else if (method === "PUT") {
    const payment = {
      createdAt: new Date().toISOString(),
      pay: body.payment,
    };
    const course = {
      _id: query.invoiceId,
      "salesInvoices._id": query.invoice,
    };
    const updateDocument = {
      $set: { "salesInvoices.$.remaining": body.remain },
    };
    const pushDocument = {
      $push: { "salesInvoices.$.payment": payment },
    };
    await designated.updateOne(course, updateDocument);
    await designated.updateOne(course, pushDocument);
    const customer = await designated.findById(query.invoiceId);
    const remaining = customer.salesInvoices.reduce((arr, curr) => {
      return arr + curr.remaining;
    }, 0);
    customer.remaining = remaining;
    await customer.save();
    const sales = customer.salesInvoices.find(
      (item) => item.id === query.invoice
    );
    const customerData = await designated.find({});
    return res.status(200).json({
      message: "پرداختی جدید با موفقیت ثبت شد",
      customer: customerData,
      sales,
    });
  }
}
