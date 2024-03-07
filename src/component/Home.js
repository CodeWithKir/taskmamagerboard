import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import TaskForm from "./TaskForm";
import Task from "./Task";
import { Box, Flex, VStack, useColorModeValue } from "@chakra-ui/react";
import { v4 as uuid } from "uuid";

const COLUMN_IDS = {
  TODO: "todo",
  IN_PROGRESS: "inProgress",
  DONE: "done",
};

export const Home = () => {
  const [tasks, setTasks] = useState({
    [COLUMN_IDS.TODO]: [],
    [COLUMN_IDS.IN_PROGRESS]: [],
    [COLUMN_IDS.DONE]: [],
  });

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    const startColumn = tasks[source.droppableId];
    const finishColumn = tasks[destination.droppableId];

    if (startColumn === finishColumn) {
      const newTasks = [...startColumn];
      const [removed] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, removed);

      setTasks({
        ...tasks,
        [source.droppableId]: newTasks,
      });
    } else {
      const startTasks = [...startColumn];
      const finishTasks = [...finishColumn];

      const [removed] = startTasks.splice(source.index, 1);
      finishTasks.splice(destination.index, 0, {
        ...removed,
        status: destination.droppableId,
      });

      setTasks({
        ...tasks,
        [source.droppableId]: startTasks,
        [destination.droppableId]: finishTasks,
      });
    }
  };

  const addTask = (title, description, dueDate, status) => {
    const newTask = {
      id: uuid(),
      title,
      description,
      dueDate,
      status,
    };

    setTasks((prevTasks) => ({
      ...prevTasks,
      [status]: [...prevTasks[status], newTask],
    }));
  };

  const deleteTask = (taskId) => {
    const updatedTasks = {};
    Object.keys(tasks).forEach((columnId) => {
      updatedTasks[columnId] = tasks[columnId].filter(
        (task) => task.id !== taskId
      );
    });
    setTasks(updatedTasks);
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = { ...tasks };
    const columnToUpdate = Object.keys(updatedTasks).find((columnId) =>
      updatedTasks[columnId].some((task) => task.id === updatedTask.id)
    );

    updatedTasks[columnToUpdate] = updatedTasks[columnToUpdate].map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );

    setTasks(updatedTasks);
  };

  const bgColor = useColorModeValue("gray.100", "gray.700");

  const getColumnTitle = (columnId) => {
    switch (columnId) {
      case COLUMN_IDS.TODO:
        return "To Do";
      case COLUMN_IDS.IN_PROGRESS:
        return "In Progress";
      case COLUMN_IDS.DONE:
        return "Done";
      default:
        return "";
    }
  };

  return (
    <Flex direction="column" align="center" p={4} bg={useColorModeValue("gray.50", "gray.800")}>
      <Box mb={4}>
        <TaskForm onAddTask={addTask} />
      </Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Flex justify="center" w="100%">
          {Object.keys(tasks).map((columnId) => (
            <Box
              key={columnId}
              mx={4}
              bg={bgColor}
              p={4}
              borderRadius="md"
              boxShadow="md"
              borderWidth="1px"
              borderColor="gray.200"
              w={{ base: "100%", md: "100%", lg: "100%" }}
            >
              <VStack spacing={4} w="100%">
                <Box fontWeight="bold" fontSize="lg" mb={2}>
                  {getColumnTitle(columnId)}
                </Box>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided) => (
                    <VStack
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      spacing={4}
                      w="100%"
                    >
                      {tasks[columnId].map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <Box
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              w="100%"
                            >
                              <Task
                                task={task}
                                onDelete={() => deleteTask(task.id)}
                                onUpdate={updateTask}
                              />
                            </Box>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </VStack>
                  )}
                </Droppable>
              </VStack>
            </Box>
          ))}
        </Flex>
      </DragDropContext>
    </Flex>
  );
};
