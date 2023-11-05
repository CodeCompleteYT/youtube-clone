"use client";

import MediaUpload from "@/components/shared/MediaUpload";
import TextArea from "@/components/shared/TextArea";
import Image from "next/image";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { FaRegSquarePlus } from "react-icons/fa6";

interface VideoUploadFormProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  changeValue: (id: string, value: string) => void;
  thumbnailSrc: string;
  isLoading: boolean;
}

const VideoUploadForm: React.FC<VideoUploadFormProps> = ({
  register,
  errors,
  changeValue,
  thumbnailSrc,
  isLoading,
}) => {
  return (
    <div className="w-full md:w-3/5 flex flex-col gap-6">
      <TextArea
        register={register}
        id="title"
        label="Title (required)"
        errors={errors}
        disabled={isLoading}
        changeValue={changeValue}
        required
      />
      <TextArea
        register={register}
        id="description"
        label="Description (required)"
        errors={errors}
        disabled={isLoading}
        changeValue={changeValue}
        required
      />
      <div>
        <label className="block mb-2">Thumbnail</label>
        <MediaUpload
          onChange={(value) => !isLoading && changeValue("thumbnailSrc", value)}
        >
          {thumbnailSrc ? (
            <Image
              src={thumbnailSrc}
              alt="thumbnail"
              height="112"
              width="192"
              className={`h-28 w-48 overflow-hidden rounded-md ${
                !isLoading ? "cursor-pointer" : ""
              }`}
            />
          ) : (
            <div
              id="thumbnailSrc"
              {...register("thumbnailSrc", { required: true })}
              className={`h-28 w-48 bg-zinc-800 rounded-md flex items-center justify-center cursor-pointer border-[1px] ${
                errors["thumbnailSrc"] ? "border-red-500" : "border-zinc-500"
              }`}
            >
              <FaRegSquarePlus className="h-6 w-6" />
            </div>
          )}
        </MediaUpload>
      </div>
    </div>
  );
};

export default VideoUploadForm;
