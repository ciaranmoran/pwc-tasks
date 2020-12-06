import '@testing-library/jest-dom/extend-expect';
import { renderHook, act, HookResult } from '@testing-library/react-hooks';
import useTaskList from './useTaskList';

const addNewTask = (result: HookResult<any>, description: string) => {
  const inputEvent = { target: { value: description } };
  act(() => result.current.handleTaskInput(inputEvent));
  expect(result.current.newTask).toEqual(description);

  const buttonEvent = { preventDefault() {} } as React.MouseEvent<HTMLButtonElement, MouseEvent>;
  act(() => result.current.handleTaskAddition(buttonEvent));
};

describe('useTaskList', () => {
  it('should render the useTaskList hook, returning default values', () => {
    const { result } = renderHook(() => useTaskList());

    expect(result.current.tasks).toEqual([]);
    expect(result.current.newTask).toEqual('');
    expect(result.current.sortKeys).toEqual(['', 'description', 'priority']);
    expect(result.current.selectedSortKey).toEqual('');
    expect(result.current.sortDirection).toEqual('ascending');
    expect(result.current.getCompletedTasks()).toEqual([]);
  });

  it('should update the new task to be added', () => {
    const { result } = renderHook(() => useTaskList());

    const inputEvent = { target: { value: 'abc' } };

    act(() => result.current.handleTaskInput(inputEvent));
    expect(result.current.newTask).toEqual('abc');
  });

  it('should add the new task to list and clear the newTask holder', () => {
    const { result } = renderHook(() => useTaskList());

    // add a task called 'abc'
    addNewTask(result, 'abc');

    // check if 'abc' has been added with the default values
    expect(result.current.tasks).toEqual([
      {
        description: 'abc',
        isComplete: false,
        priority: 1,
      },
    ]);

    // test it has been cleared
    expect(result.current.newTask).toEqual('');
  });

  it('should not update the task list on Add when the newTask is empty', () => {
    const { result } = renderHook(() => useTaskList());

    // add a task called 'abc'
    addNewTask(result, 'abc');

    // check if 'abc' has been added with the default values
    expect(result.current.tasks).toEqual([
      {
        description: 'abc',
        isComplete: false,
        priority: 1,
      },
    ]);

    // test it has been cleared
    expect(result.current.newTask).toEqual('');

    // try to add an empty task
    const buttonEvent = { preventDefault() {} } as React.MouseEvent<HTMLButtonElement, MouseEvent>;
    act(() => result.current.handleTaskAddition(buttonEvent));
    // expect no change
    expect(result.current.tasks).toEqual([
      {
        description: 'abc',
        isComplete: false,
        priority: 1,
      },
    ]);
  });

  it('should not update the task list on Add when the newTask is a duplicate', () => {
    const { result } = renderHook(() => useTaskList());

    // add a task called 'abc'
    addNewTask(result, 'abc');

    // check if 'abc' has been added with the default values
    expect(result.current.tasks).toEqual([
      {
        description: 'abc',
        isComplete: false,
        priority: 1,
      },
    ]);

    // test it has been cleared
    expect(result.current.newTask).toEqual('');

    // try to add a dupe task
    addNewTask(result, 'abc');

    // expect no change
    expect(result.current.tasks).toEqual([
      {
        description: 'abc',
        isComplete: false,
        priority: 1,
      },
    ]);
  });

  it('should delete a task', () => {
    const { result } = renderHook(() => useTaskList());

    // add a task called 'abc'
    addNewTask(result, 'abc');

    // check if 'abc' has been added with the default values
    expect(result.current.tasks).toEqual([
      {
        description: 'abc',
        isComplete: false,
        priority: 1,
      },
    ]);

    // test it has been cleared
    expect(result.current.newTask).toEqual('');

    // add another task
    addNewTask(result, 'def');

    // expect two unique tasks
    expect(result.current.tasks).toEqual([
      {
        description: 'abc',
        isComplete: false,
        priority: 1,
      },
      {
        description: 'def',
        isComplete: false,
        priority: 1,
      },
    ]);

    // delete first task
    const mouseEvent = {} as React.MouseEvent<HTMLButtonElement, MouseEvent>;
    act(() =>
      result.current.handleTaskDeletion({
        description: 'abc',
        isComplete: false,
        priority: 1,
      })(mouseEvent),
    );

    // expect second task only
    expect(result.current.tasks).toEqual([
      {
        description: 'def',
        isComplete: false,
        priority: 1,
      },
    ]);
  });

  it('should complete a task', () => {
    const { result } = renderHook(() => useTaskList());

    // add a task called 'abc'
    addNewTask(result, 'abc');

    // check if 'abc' has been added with the default values
    expect(result.current.tasks).toEqual([
      {
        description: 'abc',
        isComplete: false,
        priority: 1,
      },
    ]);

    // complete 'abc'
    const changeEvent = { target: { checked: true } };

    act(() =>
      result.current.handleTaskCompletion({
        description: 'abc',
        isComplete: false,
        priority: 1,
      })(changeEvent),
    );

    expect(result.current.tasks).toEqual([
      {
        description: 'abc',
        isComplete: true,
        priority: 1,
      },
    ]);
  });

  it('should not change tasks on an attempt to complete an unmatched task', () => {
    const { result } = renderHook(() => useTaskList());

    // add a task called 'abc'
    addNewTask(result, 'abc');

    // check if 'abc' has been added with the default values
    expect(result.current.tasks).toEqual([
      {
        description: 'abc',
        isComplete: false,
        priority: 1,
      },
    ]);

    // "complete" rogue 'abcd'
    const changeEvent = { target: { checked: true } };

    act(() =>
      result.current.handleTaskCompletion({
        description: 'abcd',
        isComplete: false,
        priority: 1,
      })(changeEvent),
    );

    // expect 'abc' to remain incomplete
    expect(result.current.tasks).toEqual([
      {
        description: 'abc',
        isComplete: false,
        priority: 1,
      },
    ]);
  });

  it('should update task priority', () => {
    const { result } = renderHook(() => useTaskList());

    // add some tasks
    addNewTask(result, 'abc');
    addNewTask(result, 'def');

    // check if tasks have been added with the default values
    expect(result.current.tasks).toEqual([
      {
        description: 'abc',
        isComplete: false,
        priority: 1,
      },
      {
        description: 'def',
        isComplete: false,
        priority: 1,
      },
    ]);

    // update task abc's priority
    const changeEvent = { target: { value: 2 } };

    act(() =>
      result.current.handleTaskPrioritisation({
        description: 'abc',
        isComplete: false,
        priority: 1,
      })(changeEvent),
    );

    // expect 'abc' to have a priority of 2 and 'def' to remain untouched
    expect(result.current.tasks).toEqual([
      {
        description: 'abc',
        isComplete: false,
        priority: 2,
      },
      {
        description: 'def',
        isComplete: false,
        priority: 1,
      },
    ]);
  });

  it('should toggle the sort direction', () => {
    const { result } = renderHook(() => useTaskList());

    const currentDirection = 'ascending';
    const toggledDirection = 'descending';
    // expect default value
    expect(result.current.sortDirection).toEqual(currentDirection);

    const changeEvent = {};

    act(() => result.current.handleSortDirectionToggle(currentDirection)(changeEvent));

    // expect updated values
    expect(result.current.sortDirection).toEqual(toggledDirection);
  });

  it('should the sort the tasks by ascending description', () => {
    const { result } = renderHook(() => useTaskList());

    const currentDirection = 'ascending';
    const sortKey = 'description';

    // add some tasks in descending order
    addNewTask(result, 'c');
    addNewTask(result, 'b');
    addNewTask(result, 'a');

    // expect default (ascending) sort direction
    expect(result.current.sortDirection).toEqual(currentDirection);

    // expect default (empty) sort key
    expect(result.current.selectedSortKey).toEqual('');

    // set the sort key
    const changeEvent = { target: { value: sortKey } };
    act(() => result.current.handleTaskSort(changeEvent));

    // expect set sort key
    expect(result.current.selectedSortKey).toEqual(sortKey);

    // expect ascending tasks
    expect(result.current.tasks).toEqual([
      {
        description: 'a',
        isComplete: false,
        priority: 1,
      },
      {
        description: 'b',
        isComplete: false,
        priority: 1,
      },
      {
        description: 'c',
        isComplete: false,
        priority: 1,
      },
    ]);
  });

  it('should the sort the tasks by descending description', () => {
    const { result } = renderHook(() => useTaskList());

    // update sort direction sort direction
    const currentDirection = 'ascending';
    const toggledDirection = 'descending';
    expect(result.current.sortDirection).toEqual(currentDirection);
    const changeEvent = {};
    act(() => result.current.handleSortDirectionToggle(currentDirection)(changeEvent));
    expect(result.current.sortDirection).toEqual(toggledDirection);

    const sortKey = 'description';

    // add some tasks in ascending order
    addNewTask(result, 'a');
    addNewTask(result, 'b');
    addNewTask(result, 'c');

    // set the sort key
    expect(result.current.selectedSortKey).toEqual('');
    const sortKeyChangeEvent = { target: { value: sortKey } };
    act(() => result.current.handleTaskSort(sortKeyChangeEvent));
    expect(result.current.selectedSortKey).toEqual(sortKey);

    // expect descending tasks
    expect(result.current.tasks).toEqual([
      {
        description: 'c',
        isComplete: false,
        priority: 1,
      },
      {
        description: 'b',
        isComplete: false,
        priority: 1,
      },
      {
        description: 'a',
        isComplete: false,
        priority: 1,
      },
    ]);
  });

  it('should not alter the sort order given a sort key that is not defined in the sortKeys', () => {
    const { result } = renderHook(() => useTaskList());

    const sortKey = 'rogueKey';

    // add some tasks in jumbled order
    addNewTask(result, 'b');
    addNewTask(result, 'a');
    addNewTask(result, 'c');

    // set the sort key
    expect(result.current.selectedSortKey).toEqual('');
    const sortKeyChangeEvent = { target: { value: sortKey } };
    act(() => result.current.handleTaskSort(sortKeyChangeEvent));
    // expect no change to selected sort key
    expect(result.current.selectedSortKey).toEqual('');

    // expect unaltered order
    expect(result.current.tasks).toEqual([
      {
        description: 'b',
        isComplete: false,
        priority: 1,
      },
      {
        description: 'a',
        isComplete: false,
        priority: 1,
      },
      {
        description: 'c',
        isComplete: false,
        priority: 1,
      },
    ]);
  });

  it('should return only the completed tasks', () => {
    const { result } = renderHook(() => useTaskList());

    // add some tasks in jumbled order
    addNewTask(result, 'a');
    addNewTask(result, 'b');
    addNewTask(result, 'c');

    // complete 'b'
    const changeEvent = { target: { checked: true } };

    act(() =>
      result.current.handleTaskCompletion({
        description: 'b',
        isComplete: false,
        priority: 1,
      })(changeEvent),
    );

    // expect only b to be completed
    expect(result.current.tasks).toEqual([
      {
        description: 'a',
        isComplete: false,
        priority: 1,
      },
      {
        description: 'b',
        isComplete: true,
        priority: 1,
      },
      {
        description: 'c',
        isComplete: false,
        priority: 1,
      },
    ]);

    const completedTasks = result.current.getCompletedTasks();

    // expect only b returned
    expect(completedTasks).toEqual([
      {
        description: 'b',
        isComplete: true,
        priority: 1,
      },
    ]);
  });
});
