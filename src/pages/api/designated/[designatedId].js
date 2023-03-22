import dbConnect from "../../../server/utils/db_connet";
import designated from "../../../server/models/designated";
dbConnect();
export default async function handler(req, res) {
  const { method, query, body } = req;
  if (method === "GET") {
    const customer = await designated.findById(query.designatedId);
    return res.status(200).json({ customer });
  }
}
