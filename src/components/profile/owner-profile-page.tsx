import OwnerProfile from "../owner-profile";
import FormInfoSectionOwner from "../owner-profile/form-info";

const OwnerProfilePage = () => {
  return (
    <>
      <div className="w-[58.1vw] h-full pb-6">
        <OwnerProfile />
      </div>
      <div className="max-w-[415px] p-5 h-full border-t-[10px] border-t-aqua rounded-t-lg bg-white flex flex-col gap-[30px]">
        <FormInfoSectionOwner />
      </div>
    </>
  );
};

export default OwnerProfilePage;
