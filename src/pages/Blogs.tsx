import AddBlogModal from "@/components/modals/AddBlogModal";

const Blogs = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-semibold">All Blogs</h1>
        <AddBlogModal />
      </div>
      <div className="w-full h-[1px] bg-primary my-6 opacity-30" />
    </div>
  );
};

export default Blogs;