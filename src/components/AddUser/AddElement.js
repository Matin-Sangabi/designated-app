const AddElement = ({index , formik }) => {
    let counter = index;
  return (
    <div className="flex items-center justify-between gap-x-2 w-full relative">
        <span className="p-2 rounded-md bg-gray-100">{counter +=1}</span>
      <textarea
        placeholder="شرح کالا 1"
        {...formik.getFieldProps(`desc[${index}].title`)}
        className="h-10 resize-none rounded-md p-2 bg-gray-100 flex-1 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 border-none outline-none transition-all ease-in-out duration-300"
      ></textarea>
      <input
        type="number"
        step="any"
        placeholder="قیمت"
        {...formik.getFieldProps(`desc[${index}].price`)}
        className=" h-10 px-2 rounded-md bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 border-none outline-none transition-all ease-in-out duration-300"
      />
    </div>
  );
};

export default AddElement;
