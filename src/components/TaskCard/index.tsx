import { Trash } from '@phosphor-icons/react';

import { ITask } from '@/@types/ITask';

import styles from './styles.module.css';

interface ITaskCard {
  task: ITask;
  onSelectingTaskToMarkAsCompleted: (value: number) => void;
}

export function TaskCard({
  task,
  onSelectingTaskToMarkAsCompleted,
}: ITaskCard) {
  return (
    <div className={styles.task}>
      <div>
        <input
          checked={task.is_completed}
          onChange={() => onSelectingTaskToMarkAsCompleted(task.id)}
          type="checkbox"
          name=""
          id=""
        />
        <p className={task.is_completed ? styles.completed : ''}>
          {task.description}
        </p>
      </div>

      <button type="button">
        <Trash size={24} />
      </button>
    </div>
  );
}
