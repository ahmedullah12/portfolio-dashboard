import { Controller, useFormContext } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Label } from "../ui/label";

interface IProps {
  name: string;
  label: string;
  required?: boolean;
}

export default function MyTextEditor({ name, label, required }: IProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <Label className="text-primary">{label}</Label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? "This field is required" : false,
        }}
        render={({ field }) => (
          <ReactQuill
            value={field.value || ""}
            onChange={field.onChange}
            className={`h-[100px] my-2 ${errors[name] ? "border-red-500" : ""}`}
          />
        )}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
