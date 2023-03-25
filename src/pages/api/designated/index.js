import dbConnect from "../../../server/utils/db_connet";
import designated from "../../../server/models/designated";
dbConnect();
export default async function handler(req, res) {
  const { method, body } = req;
  if (method === "POST") {
    const { value: data } = body;
    const des = {
      name: data.name,
      phone: data.phone,
      plate: data.plate,
      salesInvoices: [
        {
          createdAt: new Date().toISOString(),
          totalPrice: data.totalPrice,
          remaining: data.remain,
          desc: data.desc,
          payment: [
            data.payment
              ? {
                  createdAt: new Date().toISOString(),
                  pay: data.payment,
                }
              : null,
          ],
          status: data.remain > 0 ? "بدهکار" : "تسویه",
        },
      ],
      totalPrice: data.totalPrice,
      remaining: data.remain,
      status: data.remain > 0 ? "بدهکار" : "تسویه",
    };
    await designated.create(des);
    return res.status(201).json({ message: "کاربر با موفقیت اضافه شد" });
  } else if (method === "GET") {
    const Customers = await designated.find({});
    return res.status(200).json({ Customers });
  }
}
