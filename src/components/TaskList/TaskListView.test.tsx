import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskListView from './TaskListView';

test('renders TaskListView', () => {
  const props = {
    tasks: [
      {
        description: 'a',
        isComplete: false,
        priority: 1,
      },
      {
        description: 'b',
        isComplete: true,
        priority: 2,
      },
      {
        description: 'c',
        isComplete: true,
        priority: 3,
      },
    ],
    newTask: '',
    sortKeys: [],
    selectedSortKey: '',
    sortDirection: 'ascending',
    handleTaskInput: jest.fn(),
    handleTaskAddition: jest.fn(),
    handleTaskCompletion: jest.fn(),
    handleTaskDeletion: jest.fn(),
    handleTaskPrioritisation: jest.fn(),
    handleTaskSort: jest.fn(),
    handleSortDirectionToggle: jest.fn(),
    completedTaskCount: 0,
    currentDate: {
      day: 'Monday',
      month: 'Dec',
      date: '7',
      year: '2020',
    },
  };

  //@ts-ignore - jest mocks make typescript sad. ignore for now (not important here)
  render(<TaskListView {...props} />);

  const displayDate = screen.getByText(/Dec 7, 2020/i);

  expect(displayDate).toBeInTheDocument();
});
