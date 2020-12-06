import TasklistView from './TaskListView';
import useTaskList from './useTaskList';

const TaskList = () => {
  return <TasklistView {...useTaskList()} />;
};

export default TaskList;
