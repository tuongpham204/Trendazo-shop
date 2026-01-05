<<<<<<< HEAD
=======
/* eslint-disable react/prop-types */

// import { useState } from "react";
>>>>>>> 7d547c3fb925bf43a14909c4a62d0a20a8bec4d9

const Input = (props) => {
  const {
    name,
    type,
    placeholder,
    register,
    error,
    handleKeyDown,
    handleFocus,
    isCursorVisible,
  } = props;
  return (
    <div>
      <input
        {...register(name)}
        className={`h-[62px] w-[100%] pl-[20px] outline-none rounded-lg text-[16px] text-[#5c5c5c] border-solid border-[1px] ${
          error ? "border-red-500" : "border-[#c9c9c9]"
        }`}
        name={name}
        type={type}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        required
        style={{
          caretColor: isCursorVisible ? "black" : "transparent",
        }}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
