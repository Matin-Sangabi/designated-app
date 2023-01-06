const InputsTag = ({formik , type , name , placeholder}) => {
  return (
    <label className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-x-2">
        {placeholder} :
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          {...formik.getFieldProps(`${name}`)}
          className={`p-2 rounded-md bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 border-none outline-none transition-all ease-in-out duration-300 ${
            formik.errors[name] && formik.touched[name] && "ring-2 ring-rose-600"
          }`}
        />
      </div>
      {formik.errors[name] && formik.touched[name] && <small className="text-red-600 animate-pulse">{formik.errors[name]}</small>}
    </label>
  );
};

export default InputsTag;
