import { useState } from "react";
import { format } from "../../utils/degitInputs";

const AddElement = ({ index, formik }) => {
  let counter = index;
  const [typeInput, setTypeInput] = useState(false);
  function changeHandler(e) {
    format(e.target);
    e.target.value.length > 1 ? setTypeInput(true) : setTypeInput(false);
  }
  return (
    <div className="flex flex-col md:flex-row px-1 md:px-4 pt-4 pb-2 gap-2  w-full relative">
      <label className="flex flex-1 flex-col gap-2 ">
        <span className="text-sm text-slate">شرح کار {counter +=1}</span>
        <textarea
          placeholder={`شرح کالا `}
          {...formik.getFieldProps(`desc[${index}].title`)}
          className="py-2 resize-none h-10 px-2 rounded-md bg-white focus:ring-2 focus:ring-primary focus:ring-offset-2 border-none outline-none transition-all ease-in-out duration-300"
        ></textarea>
      </label>
      <div className=" flex flex-col gap-2">
        <span className="text-sm text-slate">قیمت</span>
        <textarea
          {...formik.getFieldProps(`desc[${index}].price`)}
          onInput={changeHandler}
          placeholder="قیمت"
          className="py-2 resize-none h-10 px-2 rounded-md bg-white focus:ring-2 focus:ring-primary focus:ring-offset-2 border-none outline-none transition-all ease-in-out duration-300"
        />
        {typeInput && <span className="absolute bottom-4 left-6 ">ريال</span>}
      </div>
    </div>
  );
};

export default AddElement;
