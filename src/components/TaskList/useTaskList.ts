import { useState } from 'react';
import { sortByKey } from 'utils';

const sortKeyPlaceholder = 'Sort by...';

const useTaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task['description']>('');
  const [selectedSortKey, setSelectedSortKey] = useState<SortKey>(sortKeyPlaceholder);
  const [sortDirection, setSortDirection] = useState<SortDirection>('ascending');

  // define a list of keys we'll allow the user to sort on
  const sortKeys: SortKey[] = [sortKeyPlaceholder, 'description', 'priority'];

  // the task description is set here by the user on input,
  // all other attributes are programatically assigned or defaulted when Add is clicked
  const handleTaskInput: HandleTaskInput = (event) => {
    const {
      target: { value },
    } = event;

    setNewTask(value);
  };

  const handleTaskAddition: HandleTaskAddition = (event) => {
    // prevent form submission whilst retaining the ability to add on Return
    event.preventDefault();

    if (!newTask) {
      return;
    }

    const [dupeTask] = tasks.filter(({ description }) => description === newTask);

    if (dupeTask) {
      return;
    }

    // priority is defaulted to 1 (low)
    const priority: Priority = 1;

    const taskToAdd = {
      description: newTask,
      isComplete: false,
      priority,
    };

    const updatedTasks = [...tasks, taskToAdd];
    const sortedTasks = sortByKey(updatedTasks, selectedSortKey, sortDirection);

    setTasks(sortedTasks);
    setNewTask('');
  };

  const handleTaskDeletion: HandleTaskDeletion = (task) => () => {
    setTasks(tasks.filter(({ description }) => description !== task.description));
  };

  const handleTaskCompletion: HandleTaskCompletion = (updatedTask) => (event) => {
    const {
      target: { checked: isComplete },
    } = event;

    const updatedTasks = tasks.map((task) => {
      if (task.description === updatedTask.description) {
        return { ...task, isComplete };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const handleTaskPrioritisation: HandleTaskPrioritisation = (taskToPrioritise) => (event) => {
    const {
      target: { value },
    } = event;

    const priority: Priority = value;

    const updatedTasks = tasks.map((task) => {
      if (task.description === taskToPrioritise.description) {
        return { ...task, priority };
      }
      return task;
    });

    const sortedTasks = sortByKey(updatedTasks, selectedSortKey, sortDirection);

    setTasks(sortedTasks);
  };

  const handleSortDirectionToggle: HandleSortDirectionToggle = (currentDirection) => () => {
    const toggleMap: { [key: string]: SortDirection } = {
      ascending: 'descending',
      descending: 'ascending',
    };

    const newSortDirection = toggleMap[currentDirection];

    setSortDirection(newSortDirection);

    const sortedTasks = sortByKey(tasks, selectedSortKey, newSortDirection);

    setTasks(sortedTasks);
  };

  const handleTaskSort: HandleTaskSort = (event) => {
    const {
      target: { value },
    } = event;

    const sortKey: SortKey = value;

    // guards
    if (!sortKeys.includes(sortKey)) {
      return;
    }
    if (sortKey === sortKeyPlaceholder) {
      return;
    }

    setSelectedSortKey(sortKey);

    const sortedTasks = sortByKey(tasks, sortKey, sortDirection);

    setTasks(sortedTasks);
  };

  const getCompletedTasks = () => tasks.filter(({ isComplete }) => isComplete);

  return {
    tasks,
    newTask,
    sortKeys,
    selectedSortKey,
    sortDirection,
    handleTaskInput,
    handleTaskAddition,
    handleTaskDeletion,
    handleTaskCompletion,
    handleTaskPrioritisation,
    handleTaskSort,
    handleSortDirectionToggle,
    getCompletedTasks,
  };
};

export default useTaskList;
