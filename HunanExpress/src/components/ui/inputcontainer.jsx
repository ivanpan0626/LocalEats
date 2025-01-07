import PropTypes from "prop-types";

export default function InputContainer({ label, bgColor, children, error }) {
  return (
    <div style={{ backgroundColor: bgColor }}>
      <label
        className={`inline-block ml-2 text-base ${
          error ? "text-red-400" : "text-gray-600"
        }`}
      >
        {label}
      </label>
      <div className="px-2 py-1.5 h-10 flex items-center">{children}</div>
    </div>
  );
}

InputContainer.propTypes = {
  label: PropTypes.string, // label must be a string and is required
  bgColor: PropTypes.string, // bgColor is optional and should be a string
  children: PropTypes.node.isRequired, // children must be valid React nodes (like input or other elements)
};
