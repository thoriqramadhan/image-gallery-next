import React from "react";
import PropTypes from "prop-types";

export function Input({ name, type = "text", placeholder }) {
  const forName = name.toLowerCase();
  return (
    <div className="my-5">
      <label
        htmlFor={forName}
        className="text-xl block font-medium tracking-wide my-3"
      >
        {name}
      </label>
      <input
        type={type}
        name={forName}
        id={forName}
        placeholder={placeholder ?? ""}
        className="block border px-3 py-2 rounded-md w-full font-medium tracking-wider"
      />
    </div>
  );
}
Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
};
