import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEditBlogMutation } from "@/redux/features/blogs/blogsApi";
import { ChangeEvent, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import MyForm from "../form/MyForm";
import MyInput from "../form/MyInput";
import MyTextEditor from "../form/MyTextEditor";
import { Label } from "../ui/label";
import { IBlog } from "@/types/global";

interface EditBlogModalProps {
  blogData: IBlog;
}

const EditBlogModal = ({ blogData }: EditBlogModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [editBlog, { isLoading }] = useEditBlogMutation();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();

    if (selectedImage) formData.append("image", selectedImage);
    formData.append("data", JSON.stringify(data));

    try {
      const res = await editBlog({
        id: blogData._id,
        payload: formData,
      }).unwrap();
      if (res.success === true) {
        toast.success(res.message);
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
        <Button size="sm">Edit</Button>
      </DialogTrigger>
      <DialogContent className="min-h-[300px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primary">
            Edit Blog
          </DialogTitle>
        </DialogHeader>

        <MyForm onSubmit={handleSubmit} defaultValues={blogData}>
          <div className="space-y-4">
            <MyInput
              width="w-full"
              type="text"
              name="title"
              label="Blog Title"
              required={true}
            />

            <div className="w-full">
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

            <div>
              <MyTextEditor name="text" label="Add Texts" required={true} />
            </div>
          </div>

          <div className="my-4">
            <button
              className="px-4 py-1 bg-primary text-white rounded-md font-semibold"
              type="submit"
              disabled={isLoading}
            >
              Edit
            </button>
          </div>
        </MyForm>
      </DialogContent>
    </Dialog>
  );
};

export default EditBlogModal;