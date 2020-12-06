import '@testing-library/jest-dom/extend-expect';
import { renderHook } from '@testing-library/react-hooks';
import useTaskList from './useTaskList';

describe('useTaskList', () => {
  it('should render useTaskList hook', () => {
    const { result } = renderHook(() => useTaskList());

    console.log(result);
  });
});
