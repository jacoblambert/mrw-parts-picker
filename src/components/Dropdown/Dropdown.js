const Dropdown = ({ options, id, multiple, onChange, value, placeholder }) => {
  // This function correctly handles the change event and passes it up
  const handleChange = (event) => {
    onChange(event);
  };

  return (
    <div className="relative inline-block w-64">
      <select
        id={id}
        value={value || ""} // Ensure a default value is set
        onChange={handleChange}
        multiple={multiple}
        className="block appearance-none w-full bg-white border border-black text-black py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      >
        <option value="" disabled>
          {placeholder || `Select ${id}`}
        </option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;