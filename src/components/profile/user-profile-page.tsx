import UserProfile from "../user-profile";
import FormInfoSection from "../user-profile/form-info-section";

const UserProfilePage = () => {
  return (
    <>
      <>
        <div className="w-full lg:w-[58.1vw] h-full">
          <UserProfile />
        </div>
        <div className="max-w-[415px] p-5 h-full border-t-[10px] border-t-aqua rounded-t-lg bg-white flex flex-col gap-[30px]">
          <FormInfoSection />
        </div>
      </>
    </>
  );
};

export default UserProfilePage;
