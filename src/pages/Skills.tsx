import AddSkillModal from "@/components/modals/AddSkillModal";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import EditSkillModal from "@/components/modals/EditSkillModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteSkillMutation,
  useGetSkillsQuery,
} from "@/redux/features/skills/skillsApi";
import { ISkill } from "@/types/global";
import { useState } from "react";

const Skills = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<ISkill | null>(null);

  const { data: skills, isLoading } = useGetSkillsQuery(undefined);

  const [deleteSkill] = useDeleteSkillMutation();

  const handleOpenDeleteModal = (skill: ISkill) => {
    setSelectedSkill(skill);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSkill = async () => {
    if (selectedSkill) {
      return deleteSkill(selectedSkill._id).unwrap();
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="pt-2 px-2 md:pt-6 md:px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-semibold">All Skills</h1>
        <AddSkillModal />
      </div>
      <div className="w-full h-[1px] bg-primary my-6 opacity-30" />

      {skills?.data?.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No skills found</p>
          <p className="text-sm">Start by adding skill</p>
        </div>
      ) : (
        <Table className="mb-4 border-b border-b-gray-200">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skills?.data?.map((skill: ISkill) => (
              <TableRow key={skill._id}>
                <TableCell>
                  <img
                    src={skill.image}
                    alt={skill.name}
                    className="w-10 h-10 object-cover rounded-md"
                  />
                </TableCell>
                <TableCell className="font-medium">{skill.name}</TableCell>

                <TableCell>{skill.title}</TableCell>
                <TableCell className="md:space-x-4">
                  <EditSkillModal skillData={skill} />
                  <Button
                    onClick={() => handleOpenDeleteModal(skill)}
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
            onDelete={handleDeleteSkill}
            title="Delete User"
            description="Are you sure you want to delete this user?"
          />
        </Table>
      )}
    </div>
  );
};

export default Skills;
