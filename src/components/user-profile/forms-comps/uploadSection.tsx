"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import { EducationData } from "@/utils/constants/education";
import { FaRegFileAlt } from "react-icons/fa";
import { useDropzone } from "react-dropzone";

interface UploadSectionProps {
  // onFileUpload: () => void;
  label?: string;
  text?: string;
  colorText?: string;
  handleFileChange?: any;
  file?: File | string;
  blur?: any;
}

const UploadSection: React.FC<UploadSectionProps> = ({
  label,
  text,
  colorText,
  handleFileChange,
  file,
  blur,
}) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    handleFileChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop,
  });
  return (
    <div className="flex flex-col gap-[16px] text-sm font-normal leading-[17px] text-left">
      <label className="text-dark">{label}</label>
      <div
        {...getRootProps()}
        className="w-full flex justify-center items-center gap-[18px] h-[112px] border rounded-lg border-greyborder p-[15px]"
      >
        <label
          htmlFor="fileInput"
          className="relative w-[45.32px] h-[45.32px] cursor-pointer flex justify-center items-center"
        >
          {file ? (
            <FaRegFileAlt style={{ width: "40px", height: "35px" }} />
          ) : (
            <>
              <Image src={EducationData.uploadIcon} alt="icon" />
              <Image
                src={EducationData.uploadArrow}
                alt="icon"
                className="absolute top-[11px] left-[16.5px]"
              />
            </>
          )}
          <input
            {...getInputProps()}
            type="file"
            id="fileInput"
            name="fileInput"
            onBlur={blur}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </label>
        {file ? (
          <p className="text-black cursor-pointer">
            {typeof file == "string" ? file : file.name}
          </p>
        ) : (
          <p>
            {text}
            <br />
            <span className="text-aqua underline cursor-pointer">
              {colorText}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadSection;
