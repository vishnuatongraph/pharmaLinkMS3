import { workInfoSectionData } from "./info-section-data";
import InfoSectionLayout from "./info-section-layout";

const WorkSectionInfo = () => {
  return (
    <>
      <InfoSectionLayout
        heading={workInfoSectionData.firstSection.heading}
        listItems={workInfoSectionData.firstSection.data}
      />
      <InfoSectionLayout
        heading={workInfoSectionData.secondSection.heading}
        listItems={workInfoSectionData.secondSection.data}
      />
      <InfoSectionLayout
        heading={workInfoSectionData.thirdSection.heading}
        listItems={workInfoSectionData.thirdSection.data}
      />
      <InfoSectionLayout
        heading={workInfoSectionData.fourthSection.heading}
        paraItem={workInfoSectionData.fourthSection.paraItem}
      />
    </>
  );
};

export default WorkSectionInfo;
