const RegisterInputs = ({ formik, name, type, placeholder , persianName }) => {
  return (
    <label className="flex flex-col w-full gap-y-2 ">
      <span className="text-lg text-slate ">{persianName}</span>
      <input
        type={type}
        name={name}
        {...formik.getFieldProps(`${name}`)}
        placeholder={placeholder}
        className=" p-2 w-full flex  border-none outline-none ring-1 bg-transparent rounded-lg ring-bubble-gum focus:ring-offset-2 transition-all ease-in-out duration-300"
      />
    </label>
  );
};

export default RegisterInputs;
