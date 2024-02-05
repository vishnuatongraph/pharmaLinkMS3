export default function LoginHeader({
  children,
  title,
  description,
  lineheight,
}: any) {
  return (
    <>
      <div className="my-[30px] font-inter">
        <h1 className="font-inter text-[34px] font-semibold leading-[41px] text-dark">
          {title}
        </h1>
        <p
          className={` ${lineheight} font-inter text-[16px] font-medium leading-[19px] text-dark mt-[10px]`}
        >
          {description} {children}
        </p>
      </div>
    </>
  );
}
