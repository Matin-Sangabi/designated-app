import { useState } from "react";


const AddElement = ({ index, formik }) => {
  let counter = index;
  const [typeInput , setTypeInput] = useState(false);
  function format(input) {
    var nStr = input.value + "";
    nStr = nStr.replace(/,/g, "");
    var x = nStr.split(".");
    var x1 = x[0];
    var x2 = x.length > 1 ? "." + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, `$1,$2`); //"$1" + "," + "$2"
    }
    input.value = x1 + x2;
    input.value.length > 1 ? setTypeInput(true) : setTypeInput(false); 
  }
  return (
    <div className="flex items-center justify-between gap-x-2 w-full relative">
      <span className="p-2 rounded-md bg-gray-100">{(counter += 1)}</span>
      <textarea
        placeholder={`شرح کالا ${counter}`}
        {...formik.getFieldProps(`desc[${index}].title`)}
        className="h-10 resize-none rounded-md p-2 bg-gray-100 flex-1 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 border-none outline-none transition-all ease-in-out duration-300"
      ></textarea>
      <div className="relative">
        <textarea
          {...formik.getFieldProps(`desc[${index}].price`)}
          onInput={(e) => format(e.target)}
          placeholder="قیمت"
          className="py-2 resize-none h-10 px-2 rounded-md bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 border-none outline-none transition-all ease-in-out duration-300"
        />
       {typeInput &&  <span className="absolute bottom-4 left-4">ريال</span>}
      </div>
    </div>
  );
};

export default AddElement;
