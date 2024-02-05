const ErrorMessage = ({ message, id }: { message: string; id: string }) => {
  const positionStyle =
    id === "termsAndCondition" ? "absolute top-[24px]" : "absolute top-[90px]";
  return (
    <>
      <div
        className={`text-red ${positionStyle}`}
        style={{ color: "red", fontSize: "12px" }}
      >
        {message}
      </div>
    </>
  );
};

export default ErrorMessage;
