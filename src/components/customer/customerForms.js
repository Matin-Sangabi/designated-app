const CustomersInputs = ({ type, name, placeholder, formik }) => {
  return (
    <input
      type={type}
      name={name}
      {...formik.getFieldProps(`${name}`)}
      placeholder={placeholder}
      className="placeholder:text-xs outline-none border-none rounded-lg ring-1 ring-violet-200 p-1 focus:ring-offset-2 focus:ring-2  text-sm focus:ring-violet-200 transition-all ease-in-out duration-300"
    />
  );
};

export default CustomersInputs;
