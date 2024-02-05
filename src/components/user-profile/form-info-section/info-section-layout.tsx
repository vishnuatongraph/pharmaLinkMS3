import { InfoSectionProps, Item } from "@/utils/types/types";

const InfoSectionLayout = ({
  heading,
  listItems,
  paraItem,
}: InfoSectionProps) => {
  return (
    <>
      <div>
        <h2 className="text-xl w-full font-inter text-dark font-semibold">
          {heading}
        </h2>
        {paraItem && <p> {paraItem}</p>}
        <ul className="list-disc ml-6 mt-4 font-inter text-sm font-normal leading-7 text-left text-greyEighty">
          {listItems &&
            listItems.map((item: Item, i: number) => (
              <li key={`${item}-${i}`}>{item.value}</li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default InfoSectionLayout;
