import AddBlogModal from "@/components/modals/AddBlogModal";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import EditBlogModal from "@/components/modals/EditBlogModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteBlogMutation, useGetBlogsQuery } from "@/redux/features/blogs/blogsApi";
import { IBlog } from "@/types/global";
import { useState } from "react";

const Blogs = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<IBlog | null>(null);

  const { data: blogs, isLoading } = useGetBlogsQuery(undefined)

  const [deleteBlog] = useDeleteBlogMutation();

  const handleOpenDeleteModal = (blog: IBlog) => {
    setSelectedBlog(blog);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteBlog = async () => {
    if (selectedBlog) {
      return deleteBlog(selectedBlog._id).unwrap();
    }
  };

  if(isLoading) return <div>Loading...</div>
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-semibold">All Blogs</h1>
        <AddBlogModal />
      </div>
      <div className="w-full h-[1px] bg-primary my-6 opacity-30" />

      {blogs?.data?.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No blog found</p>
          <p className="text-sm">Start by adding blog</p>
        </div>
      ) : (
        <Table className="mb-4 border-b border-b-gray-200">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs?.data?.map((blog: IBlog) => (
              <TableRow key={blog._id}>
                <TableCell>
                  <img
                    src={blog.blogImage}
                    alt="blog"
                    className="w-10 h-10 object-cover rounded-md"
                  />
                </TableCell>
                <TableCell className="font-medium">{blog.title}</TableCell>
                <TableCell className="md:space-x-4">
                  <EditBlogModal blogData={blog}/>
                  <Button
                    onClick={() => handleOpenDeleteModal(blog)}
                    size={"sm"}
                    variant={"destructive"}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onOpenChange={setIsDeleteModalOpen}
            onDelete={handleDeleteBlog}
            title="Delete Blog"
            description="Are you sure you want to delete this blog?"
          />
        </Table>
      )}
    </div>
  );
};

export default Blogs;