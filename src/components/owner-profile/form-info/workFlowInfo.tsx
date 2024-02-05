import { workFlowInfoData } from "./form-info-data";

const WorkFlowInfo = () => {
  return (
    <div>
      <h2 className="text-xl w-full font-inter text-dark font-semibold mb-[21px]">
        {workFlowInfoData.heading}
      </h2>
      {workFlowInfoData.data.map((item, index) => {
        return (
          <ul
            key={index}
            className="list-disc ml-6 font-inter text-sm font-normal leading-7 text-left text-greyEighty"
          >
            <li>{item.value}</li>
          </ul>
        );
      })}

      {workFlowInfoData.list.map((sublist, subindex) => {
        return (
          <ul
            key={subindex}
            className="list-none ml-6 font-inter text-sm font-normal leading-[21px] text-left text-greyEighty"
          >
            <li>-{sublist.value}</li>
          </ul>
        );
      })}
      <p className="ml-6 font-inter text-sm font-normal leading-7 text-left text-greyEighty">
        if you need new basket tags click add
      </p>
    </div>
  );
};

export default WorkFlowInfo;
