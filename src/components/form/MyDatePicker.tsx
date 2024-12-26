import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "../ui/label";

interface MyDatePickerProps {
  name: string;
  label: string;
  classname: string;
  required?: boolean;
}

export function MyDatePicker({ name, label, required, classname }: MyDatePickerProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={classname}>
      <Label className="text-primary">{label}</Label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? "This field is required" : false,
        }}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full border-2 justify-start text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2" />
                {field.value
                  ? format(field.value, "PPP")
                  : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => field.onChange(date?.toISOString())}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
