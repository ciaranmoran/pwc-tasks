import TasklistView from './TaskListView';
import useTaskList from './useTaskList';

const TaskList = () => {
  const {
    tasks,
    newTask,
    handleTaskInput,
    handleTaskAddition,
    handleTaskDeletion,
    handleTaskCompletion,
    handleTaskPrioritisation,
  } = useTaskList();

  const viewProps = {
    tasks,
    newTask,
    handleTaskInput,
    handleTaskAddition,
    handleTaskDeletion,
    handleTaskCompletion,
    handleTaskPrioritisation,
  };

  return <TasklistView {...viewProps} />;
};

export default TaskList;
