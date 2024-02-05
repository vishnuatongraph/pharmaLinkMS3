const ToggleButtonGroup = ({
  label,
  values,
  selectedValue,
  onButtonClick,
}: any) => {
  return (
    <div className="mb-4 flex justify-between font-inter">
      <label
        className="block text-dark text-xl mb-2 font-semibold leading-6 text-left"
        htmlFor={label}
      >
        {label}
      </label>
      <div className="flex">
        {values.map((value: string) => (
          <button
            key={value}
            type="button"
            className={`${
              selectedValue === value
                ? "bg-blue-500 bg-aqua text-white "
                : "bg-gray-300 text-greysixty"
            } hover:bg-blue-700 border border-[#E1E1E1]  text-sm px-4 py-2 mr-2  font-semibold w-[73px] h-[40px] rounded-lg `}
            onClick={() => onButtonClick(value)}
          >
            {value.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToggleButtonGroup;
