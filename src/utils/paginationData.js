export async function pagintionData(query, data) {
  const { page, size } = query;
  const { limit, offset } = getPagination(page, size);
  const allCustomers = await data.findById(query.designatedId);

  const totalDocs = allCustomers.salesInvoices.length;
  const currentPage = page !== "0" ? Number(page) + 1 : 1;
  const customer = await data.find(
    { _id: query.designatedId },
    { _id: 0, salesInvoices: { $slice: [offset, limit] } }
  )

  const document = JSON.parse(JSON.stringify(allCustomers));
  const cust = { ...document, salesInvoices: customer[0].salesInvoices };
  const totalPages = Math.round(totalDocs / limit);
  let pagingCounter = offset + 1;
  const result = {
    docs: cust,
    offset,
    totalDocs,
    limit,
    page: currentPage,
    currentPage,
    totalPages,
    pagingCounter,
    hasPrevPage:
      pagingCounter !== 1 && pagingCounter <= totalDocs ? true : false,
    hasNextPage: totalPages === 1 || pagingCounter >= totalDocs ? false : true,
  };
  return result;
}

const getPagination = (page, size) => {
  const limit = size ? +size : 2;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};
