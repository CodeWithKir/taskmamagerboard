// TaskForm.jsx
import { useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !dueDate.trim()) return;
    onAddTask(title, description, dueDate);
    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <Box mb={4} bg="white" p={4} borderRadius="md" boxShadow="md" borderWidth="1px" borderColor="gray.200">
      <form onSubmit={handleSubmit}>
        <Flex direction={{ base: "column", md: "row" }} align="center" justify="space-between">
          <FormControl flex="1" mr={{ base: 0, md: 4 }} mb={{ base: 4, md: 0 }}>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl flex="1" mr={{ base: 0, md: 4 }} mb={{ base: 4, md: 0 }}>
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
          <FormControl flex="1" mr={{ base: 0, md: 4 }} mb={{ base: 4, md: 0 }}>
            <FormLabel>Due Date</FormLabel>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="teal" mt={{ base: 4, md: 0 }}>
            Add Task
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default TaskForm;
