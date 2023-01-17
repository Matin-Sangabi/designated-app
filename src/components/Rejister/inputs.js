const RegisterInputs = ({ formik, name, type, placeholder }) => {
  return (
    <>
      <input
        type={type}
        name={name}
        {...formik.getFieldProps(`${name}`)}
        placeholder={placeholder}
        className="p-2 border-none outline-none ring-2 bg-gray-100 rounded-sm ring-gray-400 focus:ring-offset-2 transition-all ease-in-out duration-300"
      />
    </>
  );
};

export default RegisterInputs;
