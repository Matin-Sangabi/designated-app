const InputsTag = ({formik , type , name , placeholder}) => {
  return (
    <label className="flex flex-col md:flex-row  md:items-center gap-2">
        <span className="text-slate px-2"> {placeholder} :</span>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          {...formik.getFieldProps(`${name}`)}
          className={`p-2 rounded-md bg-white focus:ring-2 focus:ring-primary focus:ring-offset-2 border-none outline-none transition-all ease-in-out duration-300 ${
            formik.errors[name] && formik.touched[name] && "ring-2 ring-rose"
          }`}
        />
   
      {formik.errors[name] && formik.touched[name] && <small className="text-rose animate-pulse">{formik.errors[name]}</small>}
    </label>
  );
};

export default InputsTag;
