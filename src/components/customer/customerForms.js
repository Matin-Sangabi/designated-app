const CustomersInputs = ({ type, name, placeholder }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="placeholder:text-xs outline-none border-none rounded-lg ring-1 ring-slate-500 p-1 focus:ring-offset-2 focus:ring-2 focus:text-base text-sm focus:ring-slate-500 transition-all ease-in-out duration-300"
    />
  );
};

export default CustomersInputs;

