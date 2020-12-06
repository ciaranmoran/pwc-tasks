type Priority = 1 | 2 | 3;

interface Task {
  id: number;
  description: string;
  isComplete: boolean;
  priority: Priority;
}

type HandleTaskInput = (event: ChangeEvent<HTMLInputElement>) => void;
type HandleTaskAddition = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
type HandleTaskCompletion = (task: Task) => (event: ChangeEvent<HTMLInputElement>) => void;
type HandleTaskDeletion = (task: Task) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
type HandleTaskPrioritisation = (task: Task) => (event: ChangeEvent<HTMLSelectElement>) => void;
