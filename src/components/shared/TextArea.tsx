import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface TextAreaProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  changeValue: (id: string, value: string) => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  disabled,
  required,
  register,
  errors,
  changeValue,
}) => {
  return (
    <div className="relative">
      <div
        contentEditable={true}
        onInput={(e) => changeValue?.(id, e.currentTarget.innerText || "")}
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        className={`peer w-full px-4 pt-8 pb-2 min-h-[100px] rounded-md outline-none border-[1px] bg-stone-950 transition ${
          errors[id]
            ? "border-red-500 focus:border-red-500"
            : "border-zinc-500 focus:border-blue-400"
        } disabled:opacity-70 disabled:cursor-not-allowed`}
      />
      <label
        htmlFor={id}
        className={`absolute bg-stone-950 px-1 top-2 left-4 z-[1] ${
          errors[id] ? "text-red-500" : "text-zinc-500"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default TextArea;
