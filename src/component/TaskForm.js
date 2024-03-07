import React, { useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("todo");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !dueDate.trim()) return;
    onAddTask(title, description, dueDate, status);
    setTitle("");
    setDescription("");
    setDueDate("");
    setStatus("todo");
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
          <FormControl flex="1" mr={{ base: 0, md: 4 }} mb={{ base: 4, md: 0 }}>
            <FormLabel>Status</FormLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="todo">To Do</option>
              <option value="inProgress">In Progress</option>
              <option value="done">Done</option>
            </Select>
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
