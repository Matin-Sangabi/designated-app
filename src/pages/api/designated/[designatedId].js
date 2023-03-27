import dbConnect from "../../../server/utils/db_connet";
import designated from "../../../server/models/designated";
dbConnect();
export default async function handler(req, res) {
  const { method, query, body } = req;
  if (method === "GET") {
    const { page, size } = query;
    const { limit, offset } = getPagination(page, size);
    const allCustomers = await designated.findById(query.designatedId);
    const totalDocs = allCustomers.salesInvoices.length;
    const currentPage = page !== "0" ? Number(page) + 1 : 1;
    const customer = await designated.find(
      { _id: query.designatedId },
      { _id: 0, salesInvoices: { $slice: [offset, limit] } }
    );
    let pagingCounter = offset + 1;
    const data = {
      customer,
      offset,
      totalDocs,
      limit,
      page: currentPage,
      currentPage,
      totalPages: Math.round(totalDocs / limit),
      pagingCounter,
      hasPrevPage: pagingCounter !== 1 &&  pagingCounter <= totalDocs ? true : false,
      hasNextPage: pagingCounter >= totalDocs ? false : true,
    };
    return res.status(200).json({ data });
  } else if (method === "DELETE") {
    const customer = await designated.findById(query.designatedId);
    const customerInvoice = customer.salesInvoices.find(
      (item) => item._id == query.delete
    );
    const totalPrice = customer.totalPrice - customerInvoice.totalPrice;
    const remaining = customer.remaining - customerInvoice.remaining;
    const status = customer.remaining > 0 ? "بدهکار" : "تسویه";
    await designated.updateOne(
      { _id: query.designatedId },
      {
        $set: { totalPrice, remaining, status },
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
    const status = value.remain > 0 ? "بدهکار" : "تسویه";
    const salesInvoices = {
      createdAt: new Date().toISOString(),
      totalPrice: value.totalPrice,
      remaining: value.remain,
      desc: value.desc,
      payment: [
        value.payment
          ? {
              createdAt: new Date().toISOString(),
              pay: value.payment,
            }
          : null,
      ],
      status,
    };
    customer.salesInvoices.push(salesInvoices);
    customer.totalPrice += value.totalPrice;
    customer.remaining += value.remain;
    customer.status = status;
    await customer.save();
    const customerList = await designated.find({});
    return res
      .status(200)
      .json({ message: "فاکتور با موفقیت ثبت شد", customer: customerList });
  } else if (method === "PUT") {
    const { value } = body;
    const customer = await designated.findById(query.designatedId);
    customer.name = value.name;
    customer.phone = value.phone;
    customer.plate = value.plate;
    await customer.save();
    return res.status(201).json({ message: "کاربر با موفقیت ویرایش شد " });
  }
}
const getPagination = (page, size) => {
  const limit = size ? +size : 2;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};
