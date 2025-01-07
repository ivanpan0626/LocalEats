import React from "react";
import PropTypes from "prop-types";
import InputContainer from "./inputcontainer";
import classNames from "classnames";

function Input(
  {
    label,
    type = "text",
    placeholder,
    defaultValue,
    onChange,
    onBlur,
    name,
    error,
    className,
  },
  ref
) {
  const getErrorMessage = () => {
    if (!error) return;
    if (error.message) return error.message;
    switch (error.type) {
      case "required":
        return "This Field Is Required";
      case "minLength":
        return "Field Is Too Short";
      default:
        return "*";
    }
  };

  return (
    <InputContainer label={label} error={error}>
      <input
        ref={ref}
        defaultValue={defaultValue}
        type={type}
        placeholder={error ? error.message : placeholder}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        className={classNames(
          `flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`,
          className // Add custom className provided by the parent
        )}
      />
    </InputContainer>
  );
}

export default React.forwardRef(Input);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  name: PropTypes.string,
  error: PropTypes.shape({
    message: PropTypes.string,
    type: PropTypes.string,
  }),
  className: PropTypes.string,
};
