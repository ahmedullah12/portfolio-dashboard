import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteProjectMutation,
  useGetProjectsQuery,
} from "@/redux/features/projects/projectsApi";
import { IProject } from "@/types/global";
import { format } from "date-fns";
import { useState } from "react";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";

const Projects = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

  const { data: projects, isLoading } = useGetProjectsQuery(undefined);
  const [deleteProject] = useDeleteProjectMutation();

  const handleOpenDeleteModal = (project: IProject) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteProject = async () => {
    if (selectedProject) {
      return deleteProject(selectedProject._id).unwrap();
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="pt-2 px-2 md:pt-6 md:px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-semibold">All Skills</h1>
        <Link to="/add-project">
          <Button size={"sm"}>Add Project</Button>
        </Link>
      </div>
      <div className="w-full h-[1px] bg-primary my-6 opacity-30" />

      {projects?.data?.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No project found</p>
          <p className="text-sm">Start by adding project</p>
        </div>
      ) : (
        <Table className="mb-4 border-b border-b-gray-200">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects?.data?.map((project: IProject) => (
              <TableRow key={project._id}>
                <TableCell>
                  <img
                    src={project.image}
                    alt="project"
                    className="w-10 h-10 object-cover rounded-md"
                  />
                </TableCell>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell className="font-medium">
                  {format(project.date, "PPP")}
                </TableCell>
                <TableCell className="md:space-x-4">
                  <Link to={`/edit-project/${project._id}`}>
                    <Button size={"sm"}>Edit</Button>
                  </Link>
                  <Button
                    onClick={() => handleOpenDeleteModal(project)}
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
            onDelete={handleDeleteProject}
            title="Delete Project"
            description="Are you sure you want to delete this Project?"
          />
        </Table>
      )}
    </div>
  );
};

export default Projects;
