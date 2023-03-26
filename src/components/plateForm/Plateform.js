import { useEffect, useState } from "react";

const PlateForm = ({ formik, plate = null }) => {
  const [ssnValues, setValue] = useState(
    plate || {
      ssn1: "",
      ssn2: "",
      ssn3: "",
      ssn4: "",
    }
  );
  const numOfFields = 4;
  const changeHandler = (e) => {
    const { maxLength, value, name } = e.target;
    const [fieldName, fieldIndex] = name.split("-");
    if (value.length >= maxLength) {
      // Check if it's not the last input field
      if (parseInt(fieldIndex, 10) < numOfFields) {
        // Get the next input field
        const nextSibling = document.querySelector(
          `input[name=ssn-${parseInt(fieldIndex, 10) + 1}]`
        );

        // If found, focus the next field
        if (nextSibling !== null) {
          nextSibling.focus();
        }
      }
    }
    setValue({
      ...ssnValues,
      [`ssn${fieldIndex}`]: value,
    });
  };
  useEffect(() => {
    formik.values.plate = JSON.stringify(ssnValues);
  }, [ssnValues, formik.values.plate]);
  return (
    <div className="flex items-center gap-x-2">
      <div className="relative">
        <input
          name="ssn-4"
          value={ssnValues.ssn4}
          onChange={changeHandler}
          type="text"
          className="text-sm p-1 border-none outline-none focus:ring-violet-400 transition-all ease-in-out duration-300 ring-2 ring-violet-200 rounded-md w-14 text-left"
          maxLength={2}
          placeholder="63"
        />
        <span className="absolute text-xs  rounded-r-md flex items-center  bg-slate-700 text-slate-100 ring-2 ring-slate-700 top-0 right-0 h-full">
          ایران
        </span>
      </div>
      <input
        name="ssn-3"
        onChange={changeHandler}
        value={ssnValues.ssn3}
        type="text"
        className=" text-center text-sm p-1 border-none outline-none focus:ring-violet-400 transition-all ease-in-out duration-300 ring-2 ring-violet-200 rounded-md w-16"
        maxLength={3}
        placeholder="123"
      />
      <input
        name="ssn-2"
        onChange={changeHandler}
        type="text"
        value={ssnValues.ssn2}
        className=" text-center text-sm p-1 border-none outline-none focus:ring-violet-400 transition-all ease-in-out duration-300 ring-2 ring-violet-200 rounded-md w-10"
        maxLength={1}
        placeholder="ع"
      />
      <input
        name="ssn-1"
        onChange={changeHandler}
        value={ssnValues.ssn1}
        type="text"
        className=" text-center text-sm p-1 border-none outline-none focus:ring-violet-400 transition-all ease-in-out duration-300 ring-2 ring-violet-200 rounded-md w-12"
        maxLength={2}
        placeholder="12"
      />
    </div>
  );
};

export default PlateForm;
