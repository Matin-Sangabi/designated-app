import Link from "next/link";
import { useRouter } from "next/router";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const Pagination = ({ customer , path }) => {
  const router = useRouter();
  const paginateArray = Array.from(
    { length: customer.totalPages },
    (_, i) => i + 1
  );
  const onPagination = (id) => {
    router.push(
      {
        pathname: path,
        query: { page: id },
      },
      undefined,
      { shallow: false }
    );
  };
  const routerPages = (params) => {
    // console.log(params);
    const { page: currentQuery } = router.query;
    switch (params) {
      case "next": {
        const nextPage = currentQuery ? Number(currentQuery) + 1 : 1;
        router.push(`${path}?page=${String(nextPage)}`);
        break;
      }
      case "prev": {
        const prevPage = currentQuery - 1;
        router.push(
          {
            pathname: path,
            query: { page: prevPage },
          },
          undefined,
          { shallow: false }
        );
        break;
      }
    }
  };
  return (
    <nav className="" aria-label="Page navigation example">
      <ul className="flex items-center gap-x-2" style={{ direction: "ltr" }}>
        <li>
          <button
            onClick={() => routerPages("prev")}
            disabled={!customer.hasPrevPage ? true : false}
            className="w-7 disabled:bg-slate-300 disabled:hover:text-slate-500 disabled:w-5 disabled:h-5 h-7 text-sm flex items-center justify-center rounded-full ring-1 ring-violet-200 text-slate-600 hover:text-slate-100 hover:bg-violet-500 transition-all ease-in-out duration-300"
          >
            <HiChevronLeft />
          </button>
        </li>
        {paginateArray.map((item, i) => {
          return (
            <li key={i}>
              <button
                onClick={() => onPagination(i)}
                className={`w-7 h-7 ${
                  item === Number(customer.page)
                    ? "bg-violet-500 text-slate-100"
                    : "bg-gray-50 text-slate-600"
                }  text-sm flex items-center justify-center rounded-full ring-1 ring-violet-200  hover:text-slate-100 hover:bg-violet-500 transition-all ease-in-out duration-300`}
              >
                {item}
              </button>
            </li>
          );
        })}
        <li>
          <button
            onClick={() => routerPages("next")}
            className="w-7 disabled:bg-slate-300 disabled:hover:text-slate-500 disabled:w-5 disabled:h-5 h-7 text-sm flex items-center justify-center rounded-full ring-1 ring-violet-200 text-slate-600 hover:text-slate-100 hover:bg-violet-500 transition-all ease-in-out duration-300"
            disabled={!customer.hasNextPage ? true : false}
          >
            <HiChevronRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
