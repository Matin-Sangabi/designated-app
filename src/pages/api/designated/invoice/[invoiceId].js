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
    const status = body.remain > 0 ? "بدهکار" : "تسویه ";
    const payment = {
      createdAt: new Date().toISOString(),
      pay: body.payment,
    };
    const course = {
      _id: query.invoiceId,
      "salesInvoices._id": query.invoice,
    };
    const updateDocument = {
      $set: {
        "salesInvoices.$.remaining": body.remain,
        "salesInvoices.$.status": status,
      },
    };
    const pullDocument = {
      $pull: { "salesInvoices.$.payment": { $in: [null] } },
    };
    const pushDocument = {
      $push: { "salesInvoices.$.payment": payment },
    };
    await designated.updateOne(course, updateDocument);
    await designated.updateOne(course, pushDocument);
    await designated.updateOne(course, pullDocument);
    const customer = await designated.findById(query.invoiceId);
    const remaining = customer.salesInvoices.reduce((arr, curr) => {
      return arr + curr.remaining;
    }, 0);
    customer.remaining = remaining;
    customer.status = remaining > 0 ? "بدهکار " : "تسویه";
    await customer.save();
    const sales = customer.salesInvoices.find(
      (item) => item.id === query.invoice
    );
    const customerData = await designated.findById(query.invoiceId);
    return res.status(200).json({
      message: "پرداختی جدید با موفقیت ثبت شد",
      customer: customerData,
      sales,
    });
  }
}
