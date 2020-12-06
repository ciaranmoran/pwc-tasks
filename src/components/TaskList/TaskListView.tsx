import { FC } from 'react';

interface Props {
  tasks: Task[];
  newTask: string;
  handleTaskInput: HandleTaskInput;
  handleTaskAddition: HandleTaskAddition;
  handleTaskCompletion: HandleTaskCompletion;
  handleTaskDeletion: HandleTaskDeletion;
  handleTaskPrioritisation: HandleTaskPrioritisation;
}

interface TaskProps {
  task: Task;
  handleTaskCompletion: HandleTaskCompletion;
  handleTaskDeletion: HandleTaskDeletion;
  handleTaskPrioritisation: HandleTaskPrioritisation;
}

const TaskRow: FC<TaskProps> = ({ task, handleTaskCompletion, handleTaskDeletion, handleTaskPrioritisation }) => (
  <tr style={{ display: 'flex', flexDirection: 'row' }}>
    <td>
      <div style={{ textDecoration: task.isComplete ? 'line-through' : 'none' }}>{task.description}</div>
    </td>
    <td>
      <div>
        <input type='checkbox' onChange={handleTaskCompletion(task)} checked={task.isComplete} />
      </div>
    </td>
    <td>
      <div>
        <select value={task.priority} onChange={handleTaskPrioritisation(task)}>
          <option value={1}>Low</option>
          <option value={2}>Medium</option>
          <option value={3}>High</option>
        </select>
      </div>
    </td>
    <td>
      <div>
        <button onClick={handleTaskDeletion(task)}>delete</button>
      </div>
    </td>
  </tr>
);

const TaskListView: FC<Props> = ({
  tasks,
  newTask,
  handleTaskInput,
  handleTaskAddition,
  handleTaskCompletion,
  handleTaskDeletion,
  handleTaskPrioritisation,
}) => {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div>
          <b>Total</b>
          {tasks.length}
        </div>
        <div>
          <b>Completed</b>
          {tasks.filter(({ isComplete }) => isComplete).length}
        </div>
      </div>
      <form>
        <input type='text' onChange={handleTaskInput} value={newTask} />
        <button onClick={handleTaskAddition} type='submit'>
          Add
        </button>
      </form>
      <table>
        <caption>TODO</caption>
        <thead>
          <tr>
            <th>Task</th>
            <th>Complete</th>
            <th>Priority</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskRow key={task.id} {...{ task, handleTaskCompletion, handleTaskDeletion, handleTaskPrioritisation }} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskListView;
