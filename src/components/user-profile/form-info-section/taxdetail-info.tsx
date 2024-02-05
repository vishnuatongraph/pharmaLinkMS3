const TaxDetailFormInfo = () => {
  return (
    <>
      <div className="font-inter">
        <h2 className="text-xl font-semibold mb-4 leading-6 text-left text-dark">
          This section should be as follow:
        </h2>{" "}
        <ul className="list-disc flex flex-col gap-5 ml-8 text-base font-normal text-dark">
          {" "}
          <li className="leading-6">
            Are you Incorporated? If yes, please :
            <ol className="list-decimal list-inside ml-8 leading-4 my-[14px] ">
              <li style={{ listStyleType: "lower-roman" }}>
                State the name of the company:
              </li>
              <li style={{ listStyleType: "lower-roman", margin: "10px 0px" }}>
                Enter the Quebec enterprise Number (NEQ):{" "}
              </li>
            </ol>
          </li>
          <li>
            Please not to forget for payments deposit
            <ol className="list-decimal list-inside ml-8">
              <li style={{ listStyleType: "lower-roman", margin: "10px 0px" }}>
                TPS number:
              </li>
              <li style={{ listStyleType: "lower-roman" }}>TVQ number:</li>
            </ol>
          </li>
          <li>Please not to forget for payments deposit.</li>
        </ul>
      </div>
    </>
  );
};

export default TaxDetailFormInfo;
