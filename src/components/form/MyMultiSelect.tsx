import { Controller } from "react-hook-form";
import { Label } from "../ui/label";
import Select from "react-select";

interface Option {
  value: string;
  label: string;
}

interface IProps {
  name: string;
  label: string;
  className?: string;
  options: Option[];
  optionsLoading?: boolean;
}

const MyMultiSelect = ({
  name,
  label,
  className,
  options,
  optionsLoading,
}: IProps) => {
  return (
    <div className={className}>
      <Label className="text-primary">{label}</Label>
      <Controller
        name={name}
        rules={{ required: "At least one category is required" }}
        render={({ field, fieldState: { error } }) => (
          <div>
            <Select
              {...field}
              isMulti
              options={options}
              isLoading={optionsLoading}
              placeholder="Select categories"
              className="basic-multi-select"
              classNamePrefix="select"
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default MyMultiSelect;
