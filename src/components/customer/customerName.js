const CustomerName = ({ isSmall = false, customer }) => {
  return (
    <div
      className={`flex items-center gap-x-4 ${isSmall && "justify-between"}`}
    >
      <span
        className={`${
          isSmall ? "w-10 h-10" : "w-8 h-8"
        } rounded-full flex items-center justify-center text-white bg-violet-500`}
      >
        {customer.name.charAt(0)}
      </span>
      <h1 className={`font-semibold ${isSmall ? "text-lg" : "text-base"}`}>
        {customer.name}
      </h1>
    </div>
  );
};

export default CustomerName;
