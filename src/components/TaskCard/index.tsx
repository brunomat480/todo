import { Trash } from '@phosphor-icons/react';
import { useEffect, useRef } from 'react';

import { ITask } from '@/@types/ITask';

import styles from './styles.module.css';

interface ITaskCard {
  task: ITask;
  // eslint-disable-next-line react/no-unused-prop-types, react/require-default-props
  isPeding?: boolean;
  onMarkingTaskAsCompleted: (value: string) => void;
  onDeleteTask: (value: string) => Promise<void>;
}

export function TaskCard({
  task,
  onMarkingTaskAsCompleted,
  onDeleteTask,
  isPeding,
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
    <div className={styles.task} style={{ opacity: !isPeding ? 1 : 0.5 }}>
      <div>
        <input
          disabled={isPeding}
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

      <button
        disabled={isPeding}
        onClick={() => onDeleteTask(task.id)}
        type="button"
      >
        <Trash size={24} />
      </button>
    </div>
  );
}
