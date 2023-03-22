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
          desc: data.desc,
          payment: [
            {
              createdAt: new Date().toISOString(),
              pay: data.payment ? data.payment :  0,
            },
          ],
        },
      ],
      totalPrice: data.totalPrice,
      remaining: data.remain,
    };
    await designated.create(des);
    return res.status(201).json({ message: "کاربر با موفقیت اضافه شد" });
  }
}

