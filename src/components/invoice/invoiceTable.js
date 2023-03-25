const InvoiceTable = ({ salesInvoices }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full  text-sm text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs  uppercase bg-violet-300 text-gray-800 print:bg-gray-700 print:text-slate-300">
          <tr>
            <th scope="col" className="px-6 py-3">
              ردیف
            </th>
            <th scope="col" className="px-6 py-3">
              شرح کالا
            </th>
            <th scope="col" className="px-6 py-3">
              قیمت
            </th>
          </tr>
        </thead>
        <tbody className="bg-violet-50 print:bg-slate-200 print:text-slate-800">
          {salesInvoices.desc.map((sale, index) => {
            return (
              <tr
                key={sale._id}
                className="text-gray-800 border-b border-gray-700 whitespace-nowrap"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap "
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4">{sale.title}</td>
                <td className="px-6 py-4">{sale.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
