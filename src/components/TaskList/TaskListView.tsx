import { FC } from 'react';

interface Props {
  tasks: Task[];
  newTask: string;
  sortKeys: SortKey[];
  selectedSortKey: SortKey;
  sortDirection: SortDirection;
  handleTaskInput: HandleTaskInput;
  handleTaskAddition: HandleTaskAddition;
  handleTaskCompletion: HandleTaskCompletion;
  handleTaskDeletion: HandleTaskDeletion;
  handleTaskPrioritisation: HandleTaskPrioritisation;
  handleTaskSort: HandleTaskSort;
  handleSortDirectionToggle: HandleSortDirectionToggle;
  getCompletedTasks: GetCompletedTasks;
}

interface TaskProps {
  task: Task;
  handleTaskCompletion: HandleTaskCompletion;
  handleTaskDeletion: HandleTaskDeletion;
  handleTaskPrioritisation: HandleTaskPrioritisation;
}

const Task: FC<TaskProps> = ({ task, handleTaskCompletion, handleTaskDeletion, handleTaskPrioritisation }) => (
  <div style={{ display: 'flex', flexDirection: 'row' }}>
    <div style={{ textDecoration: task.isComplete ? 'line-through' : 'none' }}>{task.description}</div>
    <div>
      <input type='checkbox' onChange={handleTaskCompletion(task)} checked={task.isComplete} />
    </div>
    <div>
      <select value={task.priority} onChange={handleTaskPrioritisation(task)}>
        <option value={1}>Low</option>
        <option value={2}>Medium</option>
        <option value={3}>High</option>
      </select>
    </div>
    <div>
      <button onClick={handleTaskDeletion(task)}>delete</button>
    </div>
  </div>
);

const TaskListView: FC<Props> = ({
  tasks,
  newTask,
  sortKeys,
  selectedSortKey,
  sortDirection,
  handleTaskInput,
  handleTaskAddition,
  handleTaskCompletion,
  handleTaskDeletion,
  handleTaskPrioritisation,
  handleTaskSort,
  handleSortDirectionToggle,
  getCompletedTasks,
}) => {
  return (
    <div>
      <h3>Task List</h3>
      <div style={{ display: 'flex' }}>
        <div>
          <b>Total</b>
          {tasks.length}
        </div>
        <div>
          <b>Completed</b>
          {getCompletedTasks().length}
        </div>
        <div>
          <b>Sort by </b>
          <select value={selectedSortKey} onChange={handleTaskSort}>
            {sortKeys.map((sortKey) => (
              <option key={sortKey} value={sortKey}>
                {sortKey}
              </option>
            ))}
          </select>
        </div>
        <div>
          <b>direction:</b>
          <button onClick={handleSortDirectionToggle(sortDirection)}>{sortDirection}</button>
        </div>
      </div>
      <form>
        <input type='text' onChange={handleTaskInput} value={newTask} />
        <button onClick={handleTaskAddition} type='submit'>
          Add
        </button>
      </form>

      {tasks.map((task) => (
        <Task key={task.description} {...{ task, handleTaskCompletion, handleTaskDeletion, handleTaskPrioritisation }} />
      ))}
    </div>
  );
};

export default TaskListView;
