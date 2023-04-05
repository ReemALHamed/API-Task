export const DetailSection = ({
  icon,
  text,
  onPress = null,
  isRow = false,
}) => (
  <div
    onClick={onPress}
    className="flex items-center flex-wrap mt-[20px]  w-full border-r-2 last:border-r-0"
    style={{
      flexDirection: isRow ? "row" : "column",
      justifyContent: isRow ? "flex-start" : "center",
      alignItems: "center",
    }}
  >
    {icon}
    <span className=" max-w-[90%] text-center">{text}</span>
  </div>
);
