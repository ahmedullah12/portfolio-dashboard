import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useGetExperiencesQuery } from "@/redux/features/experience/experienceApi";
import {
    useDeleteProjectMutation
} from "@/redux/features/projects/projectsApi";
import { IExperience } from "@/types/global";
import { useState } from "react";
import { Link } from "react-router-dom";

const Experiences = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<IExperience | null>(null);

  const { data: experiences, isLoading } = useGetExperiencesQuery(undefined);
  const [deleteProject] = useDeleteProjectMutation();

  const handleOpenDeleteModal = (experience: IExperience) => {
    setSelectedExperience(experience);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteProject = async () => {
    if (selectedExperience) {
      return deleteProject(selectedExperience._id).unwrap();
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="pt-2 px-2 md:pt-6 md:px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-semibold">All Experiences</h1>
        <Link to="/add-experience">
          <Button size={"sm"}>Add Experience</Button>
        </Link>
      </div>
      <div className="w-full h-[1px] bg-primary my-6 opacity-30" />

      {experiences?.data?.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No experience found</p>
          <p className="text-sm">Start by adding experience</p>
        </div>
      ) : (
        <Table className="mb-4 border-b border-b-gray-200">
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {experiences?.data?.map((experience: IExperience) => (
              <TableRow key={experience._id}>
                <TableCell>
                  {experience.company}
                </TableCell>
                <TableCell className="font-medium">{experience.designation}</TableCell>
                <TableCell className="font-medium">
                  {experience.startDate}
                </TableCell>
                <TableCell className="font-medium">
                  {experience.endDate}
                </TableCell>
                <TableCell className="md:space-x-4">
                  <Link to={`/edit-experience/${experience._id}`}>
                    <Button size={"sm"}>Edit</Button>
                  </Link>
                  <Button
                    onClick={() => handleOpenDeleteModal(experience)}
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

export default Experiences;