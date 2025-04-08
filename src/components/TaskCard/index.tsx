import { Trash } from '@phosphor-icons/react';

import { ITask } from '@/@types/ITask';

import styles from './styles.module.css';

interface ITaskCard {
  task: ITask;
  onMarkingTaskAsCompleted: (value: number) => void;
  onDeleteTask: (value: number) => void;
}

export function TaskCard({
  task,
  onMarkingTaskAsCompleted,
  onDeleteTask,
}: ITaskCard) {
  return (
    <div className={styles.task}>
      <div>
        <input
          checked={task.is_completed}
          onChange={() => onMarkingTaskAsCompleted(task.id)}
          type="checkbox"
          name=""
          id=""
        />
        <p className={task.is_completed ? styles.completed : ''}>
          {task.description}
        </p>
      </div>

      <button onClick={() => onDeleteTask(task.id)} type="button">
        <Trash size={24} />
      </button>
    </div>
  );
}
