//React Select new styles
export const customStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    boxShadow: "none",
    border: 0,
    outline: state.isFocused ? "3px solid #ac162c" : baseStyles.backgroundColor,
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isSelected && "#ac162c",
    "&:hover": {
      backgroundColor: state.isSelected ? "#ac162c" : "#ac162d4e",
    },
  }),
};
