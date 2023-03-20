import dbConnect from "../../../server/utils/db_connet";
import designated from "../../../server/models/designated";
dbConnect();
export default async function handler(req, res) {
  const data = {
    author: {
      name: "matin",
      userName: "maher",
      email: "sangabiWprk@gmail.com",
      password: "Ms22121",
    },
    name: "matin",
    phone: "0917564654",
    plate: "$",
    salesInvoices: [
      {
        createdAt: new Date().toISOString(),
        desc: [
          {
            title: "install windows",
            price: "120,000,000 $",
          },
          {
            title: "install windows 2",
            price: "120,000,000 $",
          },
        ],
        payment: [{ createdAt: new Date().toISOString(), pay: "120,000,000$" }],
      },
    ],
    totalPrice: 24000000,
    remaining: 12000000,
  };
  await designated.create(data);
  const des = await designated.find({});
  return res.status(201).json({ des });
}
