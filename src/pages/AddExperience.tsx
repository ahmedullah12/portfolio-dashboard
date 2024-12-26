import { MyDatePicker } from "@/components/form/MyDatePicker";
import MyForm from "@/components/form/MyForm";
import MyInput from "@/components/form/MyInput";
import MyTextarea from "@/components/form/MyTextarea";
import { Button } from "@/components/ui/button";
import { useAddExperienceMutation } from "@/redux/features/experience/experienceApi";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddExperience = () => {
  const [addExperience, { isLoading }] =
    useAddExperienceMutation();

  const navigate = useNavigate();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await addExperience(data).unwrap();
      if (res.success === true) {
        toast.success(res.message);
        navigate("/experiences");
      }
    } catch (err: any) {
      toast.error(err.data.message);
      console.log(err);
    }
  };

  return (
    <div className="pt-2 px-2 md:pt-6 md:px-6">
      <div className="w-[80%] mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-center mb-6">
          Add Experience
        </h1>

        <MyForm onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 my-4">
            <MyInput
              name="company"
              label="Company"
              type="text"
              width="max-w-[400px]"
            />
            <MyInput
              name="designation"
              label="Designation"
              type="text"
              width="max-w-[400px]"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 ">
            <MyDatePicker
              classname="max-w-[400px]"
              name="startDate"
              label="Start Date"
              required={true}
            />
            <MyDatePicker
              classname="max-w-[400px]"
              name="endDate"
              label="End Date"
              required={true}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 my-4">
            <MyTextarea
              name="description"
              label="Description"
              width="max-w-[400px]"
              rows={3}
            />
            <MyInput
              name="location"
              label="Location"
              type="text"
              width="max-w-[400px]"
            />
          </div>
          <div>
            <Button disabled={isLoading} type="submit">
              Submit
            </Button>
          </div>
        </MyForm>
      </div>
    </div>
  );
};

export default AddExperience;
