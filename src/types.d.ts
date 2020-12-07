interface Task {
  description: string;
  isComplete: boolean;
  priority: Priority;
}

interface PriorityIconMap {
  [key: string]: any;
}

type Priority = 1 | 2 | 3;
type SortKey = 'Sort by...' | 'description' | 'priority';
type SortDirection = '' | 'ascending' | 'descending';

type HandleTaskInput = (event: ChangeEvent<HTMLInputElement>) => void;
type HandleTaskAddition = (event: React.FormEvent<HTMLFormElement>) => void;
type HandleTaskCompletion = (task: Task) => (event: ChangeEvent<HTMLInputElement>) => void;
type HandleTaskDeletion = (task: Task) => (event: MouseEvent<HTMLLIElement, MouseEvent>) => void;
type HandleTaskPrioritisation = (task: Task) => (event: ChangeEvent<HTMLSelectElement>) => void;
type HandleTaskSort = (event: ChangeEvent<HTMLSelectElement>) => void;
type HandleSortDirectionToggle = (direction: SortDirection) => (event: ChangeEvent<HTMLSelectElement>) => void;

type GetCompletedTasks = () => Task[];

type SortByKey = (arr: any[], key: string, direction: SortDirection) => any[];
