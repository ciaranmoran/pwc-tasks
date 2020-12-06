type Priority = 1 | 2 | 3;
type SortKey = '' | 'description' | 'priority';
type SortDirection = 'ascending' | 'descending';

interface Task {
  description: string;
  isComplete: boolean;
  priority: Priority;
}

type HandleTaskInput = (event: ChangeEvent<HTMLInputElement>) => void;
type HandleTaskAddition = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
type HandleTaskCompletion = (task: Task) => (event: ChangeEvent<HTMLInputElement>) => void;
type HandleTaskDeletion = (task: Task) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
type HandleTaskPrioritisation = (task: Task) => (event: ChangeEvent<HTMLSelectElement>) => void;
type HandleTaskSort = (event: ChangeEvent<HTMLSelectElement>) => void;
type HandleSortDirectionToggle = (direction: SortDirection) => (event: ChangeEvent<HTMLSelectElement>) => void;
type GetCompletedTasks = () => Task[];

type SortByKey = (arr: any[], key: string, direction: SortDirection) => any[];
