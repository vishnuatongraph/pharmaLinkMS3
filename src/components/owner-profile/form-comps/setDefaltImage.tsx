import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { getBucketImageUrl } from "@/utils/helpers/supabase-bucket";
import Image from "next/image";

interface imageProps {
  isOpen: boolean;
  onClose: any;
  onSave: any;
}

const images = [
  "default_images/attachme.png",
  "default_images/attachment.png",
  "default_images/attachment1.png",
  "default_images/attachment4444.png",
  "default_images/attament.png",
];

const SetDefaultImage = (props: imageProps) => {
  const { isOpen, onClose, onSave } = props;
  const [selectedImage, setSelectedImage] = useState<string>("");

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="inline-block align-middle bg-white rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-semibold text-[#4C4C58]"
                    >
                      Set Default logo
                    </Dialog.Title>
                    <div className="mt-2 flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        {images.map((image, index) => (
                          <div key={index}>
                            <Image
                              alt="logo"
                              src={getBucketImageUrl(image)}
                              className={`${
                                image == selectedImage
                                  ? "border-2 border-aqua"
                                  : "border border-[#DFDFDF]"
                              } rounded-[10px]`}
                              width={210}
                              height={100}
                              onClick={() => {
                                setSelectedImage(image);
                              }}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="w-full flex items-center justify-center">
                        <button
                          onClick={() => {
                            onSave(selectedImage), onClose(false);
                          }}
                          className="w-[100px] inline-flex justify-center rounded-md border p-[15px] bg-[#2CBFCA] font-medium text-white"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SetDefaultImage;
