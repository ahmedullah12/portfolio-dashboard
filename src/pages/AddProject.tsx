import { MyDatePicker } from "@/components/form/MyDatePicker";
import MyForm from "@/components/form/MyForm";
import MyInput from "@/components/form/MyInput";
import MyMultiSelect from "@/components/form/MyMultiSelect";
import MyTextEditor from "@/components/form/MyTextEditor";
import { Button } from "@/components/ui/button";
import { useAddProjectMutation } from "@/redux/features/projects/projectsApi";
import { useGetSkillsQuery } from "@/redux/features/skills/skillsApi";
import { ISkill } from "@/types/global";
import { Label } from "@radix-ui/react-label";
import { ChangeEvent, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { data: skills, isLoading } = useGetSkillsQuery(undefined);
  const [addProject, { isLoading: addProductLoading }] = useAddProjectMutation();

  const navigate = useNavigate();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const tagsOptions = skills?.data?.map((skill: ISkill) => ({
    value: skill.name,
    label: skill.name,
  }));

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!selectedImage) return toast.error("Please select an image");

    const formData = new FormData();

    formData.append("image", selectedImage);

    const payload = {
      ...data,
      tags: data.tags.map((tag: any) => tag.value),
    };

    formData.append("data", JSON.stringify(payload));

    try {
      const res = await addProject(formData).unwrap();
      if (res.success === true) {
        toast.success(res.message);
        navigate("/projects");
      }
    } catch (err: any) {
      toast.error(err.data.message);
      console.log(err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="pt-2 px-2 md:pt-6 md:px-6">
      <div className="w-[80%] mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-center mb-6">
          Add Project
        </h1>

        <MyForm onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 ">
            <MyInput
              name="title"
              label="Project Title"
              type="text"
              width="max-w-[400px]"
            />
            <MyDatePicker
              classname="max-w-[400px]"
              name="date"
              label="Date"
              required={true}
            />
          </div>

          <div className="max-w-[500px] mt-4 mb-16">
            <MyTextEditor
              name="description"
              label="Description"
              required={true}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 ">
            <div className="max-w-[400px] mt-4 md:mt-0">
              <Label className="text-primary text-sm font-semibold">
                Image
              </Label>
              <label
                className="flex bg-white h-10 w-full ps-3 cursor-pointer items-center justify-start rounded-lg border-2 border-default-200 text-sm text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                htmlFor="image"
              >
                {selectedImage ? selectedImage.name : "Image"}
              </label>
              <input
                className="hidden"
                id="image"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>

            <MyMultiSelect
              name="tags"
              label="Tags"
              className="max-w-[400px]"
              options={tagsOptions}
              optionsLoading={isLoading}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 my-4">
            <MyInput
              name="github"
              label="Github Link"
              type="text"
              width="max-w-[400px]"
            />
            <MyInput
              name="live"
              label="Live Link"
              type="text"
              width="max-w-[400px]"
            />
          </div>

          <div>
            <Button disabled={addProductLoading} type="submit">Submit</Button>
          </div>
        </MyForm>
      </div>
    </div>
  );
};

export default AddProject;
