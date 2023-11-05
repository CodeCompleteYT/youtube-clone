"use client";

import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

import Avatar, { AvatarSize } from "../Avatar";
import Button from "../Button";
import Input from "../Input";
import { useContext, useState } from "react";
import MediaUpload from "../MediaUpload";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CreateChannelModalContext } from "@/context/CreateChannelModalContext";

const CreateChannelModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const createChannelModal = useContext(CreateChannelModalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      handle: "",
      imageSrc: "",
    },
  });

  const imageSrc = watch("imageSrc");

  const handleImageUpload = (value: string) => {
    setValue("imageSrc", value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/channels", data)
      .then(() => {
        toast.success("Channel created successfully");
        createChannelModal?.onClose();
        router.refresh();
      })
      .catch(() => {
        toast.error("Couldnot create a channel");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return createChannelModal?.isOpen ? (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center z-50 bg-zinc-800 w-3/5 max-w-2xl rounded-xl">
      <h1 className="text-xl p-3 border-b border-neutral-700">
        How you&apos;ll appear
      </h1>
      <div className="flex flex-col items-center py-3 gap-4">
        <Avatar size={AvatarSize.large} imageSrc={imageSrc} />
        <MediaUpload onChange={handleImageUpload}>
          <Button type="primary">Upload picture</Button>
        </MediaUpload>

        <Input
          id="name"
          label="Name"
          disabled={isLoading}
          register={register}
          errors={errors}
          pattern={{
            value: /^[a-zA-Z0-9 ]*$/,
            message: "Invalid name format",
          }}
          required
          className="w-3/4"
        />
        <Input
          id="handle"
          label="Handle"
          disabled={isLoading}
          register={register}
          errors={errors}
          pattern={{
            value: /^[a-z0-9_-]{3,16}$/,
            message: "Invalid handle format",
          }}
          required
          className="w-3/4"
        />
      </div>

      <div className="p-3 border-t border-neutral-700 flex justify-end gap-3">
        <Button type="secondary" onClick={createChannelModal.onClose}>
          Cancel
        </Button>
        <Button type="primary" onClick={handleSubmit(onSubmit)}>
          Create Channel
        </Button>
      </div>
    </div>
  ) : null;
};

export default CreateChannelModal;
