// Task.jsx
import { useState } from "react";
import { Box, Text, IconButton, Input, Button } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const Task = ({ task, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdate({
      ...task,
      title: editedTitle,
      description: editedDescription,
      dueDate: editedDueDate,
    });
    setIsEditing(false);
  };

  return (
    <Box
      bg="white"
      p={4}
      borderRadius="md"
      boxShadow="md"
      borderWidth="1px"
      borderColor="gray.200"
      mb={4}
      width="100%"
    >
      {isEditing ? (
        <>
          <Input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            mb={2}
            variant="flushed"
          />
          <Input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            mb={2}
            variant="flushed"
          />
          <Input
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
            mb={4}
            variant="flushed"
          />
          <Button colorScheme="teal" size="sm" onClick={handleSaveClick}>
            Save
          </Button>
        </>
      ) : (
        <>
          <Text fontSize="lg" fontWeight="bold" mb={2} color="teal.600">
            {task.title}
          </Text>
          <Text fontSize="md" mb={2} color="gray.700">
            {task.description}
          </Text>
          <Text fontSize="sm" fontStyle="italic" color="gray.500" mb={2}>
            Due Date: {task.dueDate}
          </Text>
          <IconButton
            aria-label="Edit Task"
            icon={<EditIcon />}
            colorScheme="blue"
            size="sm"
            mr={2}
            onClick={handleEditClick}
          />
          <IconButton
            aria-label="Delete Task"
            icon={<DeleteIcon />}
            colorScheme="red"
            size="sm"
            onClick={onDelete}
          />
        </>
      )}
    </Box>
  );
};

export default Task;
