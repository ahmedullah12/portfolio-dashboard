import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChangeEvent, useState } from "react";
import MyForm from "../form/MyForm";
import MyInput from "../form/MyInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Label } from "../ui/label";
import { MySelect } from "../form/MySelect";
import toast from "react-hot-toast";
import { useAddSkillMutation } from "@/redux/features/skills/skillsApi";

const titleOptions = [
  { value: "Frontend", label: "Frontend" },
  { value: "Backend", label: "Backend" },
  { value: "Others", label: "Others" },
];

const AddSkillModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [addSkill, { isLoading }] = useAddSkillMutation();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!selectedImage) return toast.error("Please select an image");

    const formData = new FormData();

    if (selectedImage) formData.append("image", selectedImage);
    formData.append("data", JSON.stringify(data));

    try {
      const res = await addSkill(formData).unwrap();
      if (res.success === true) {
        toast.success(res.message);
        setSelectedImage(null);
        setIsOpen(false);
      }
    } catch (err: any) {
      toast.error(err.data.message);
      console.log(err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Add Skill</Button>
      </DialogTrigger>
      <DialogContent className="min-h-[300px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primary">
            Add Skill
          </DialogTitle>
        </DialogHeader>

        <MyForm onSubmit={handleSubmit}>
          <div className="space-y-4">
            <MyInput
              width="max-w-[400px]"
              type="text"
              name="name"
              label="Skill Name"
            />

            <div className="max-w-[400px]">
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

            <MySelect
              label="Title"
              name="title"
              className="max-w-[400px]"
              options={titleOptions}
            />
          </div>

          <div className="my-4">
            <button
              className="px-4 py-1 bg-primary text-white rounded-md font-semibold"
              type="submit"
              disabled={isLoading}
            >
              Add
            </button>
          </div>
        </MyForm>
      </DialogContent>
    </Dialog>
  );
};

export default AddSkillModal;
