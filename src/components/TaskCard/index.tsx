import { Trash } from '@phosphor-icons/react';
import { useEffect, useRef } from 'react';

import { ITask } from '@/@types/ITask';

import styles from './styles.module.css';

interface ITaskCard {
  task: ITask;
  onMarkingTaskAsCompleted: (value: string) => void;
  onDeleteTask: (value: string) => Promise<void>;
}

export function TaskCard({
  task,
  onMarkingTaskAsCompleted,
  onDeleteTask,
}: ITaskCard) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleMarkTaskCompletedPressingEnterKey(event: KeyboardEvent) {
      const inputElement = inputRef.current;

      if (
        document.activeElement === inputElement &&
        inputElement?.type === 'checkbox' &&
        event.key === 'Enter'
      ) {
        event.preventDefault();
        onMarkingTaskAsCompleted(inputElement?.value);
      }
    }

    document.addEventListener(
      'keypress',
      handleMarkTaskCompletedPressingEnterKey,
    );

    return () =>
      document.removeEventListener(
        'keypress',
        handleMarkTaskCompletedPressingEnterKey,
      );
  }, [task, onMarkingTaskAsCompleted]);

  return (
    <div className={styles.task}>
      <div>
        <input
          value={task.id}
          checked={task.is_completed}
          onChange={() => onMarkingTaskAsCompleted(task.id)}
          type="checkbox"
          ref={inputRef}
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
