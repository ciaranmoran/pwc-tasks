import { useState } from 'react';

const useTaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task['description']>('');

  // the task description is set here by the user on input,
  // all other attributes are programatically assigned or defaulted when Add is clicked
  const handleTaskInput: HandleTaskInput = (event) => {
    const {
      target: { value },
    } = event;

    setNewTask(value);
  };

  const handleTaskAddition: HandleTaskAddition = (event) => {
    // prevent form submission while retaining the ability to add on Return
    event.preventDefault();

    if (!newTask) {
      return;
    }

    // lop off the last task in the list and increment its id,
    // default the id to 1 where a last task doesn't exist (i.e. list is empty)
    const [lastTask] = tasks.slice(-1);
    const id = lastTask ? lastTask.id + 1 : 1;
    // priority is defaulted to 1 (low)
    const priority: Priority = 1;

    const taskToAdd = {
      id,
      description: newTask,
      isComplete: false,
      priority,
    };

    setTasks([...tasks, taskToAdd]);
    setNewTask('');
  };

  const handleTaskDeletion: HandleTaskDeletion = (task) => () => {
    setTasks(tasks.filter(({ id }) => id !== task.id));
  };

  const handleTaskCompletion: HandleTaskCompletion = (updatedTask) => (event) => {
    const {
      target: { checked: isComplete },
    } = event;

    const updatedTasks = tasks.map((task) => {
      if (task.id === updatedTask.id) {
        return { ...task, isComplete };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const handleTaskPrioritisation: HandleTaskPrioritisation = (updatedTask) => (event) => {
    const {
      target: { value },
    } = event;

    const priority: Priority = value;

    const updatedTasks = tasks.map((task) => {
      if (task.id === updatedTask.id) {
        return { ...task, priority };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  return {
    tasks,
    newTask,
    handleTaskInput,
    handleTaskAddition,
    handleTaskDeletion,
    handleTaskCompletion,
    handleTaskPrioritisation,
  };
};

export default useTaskList;
