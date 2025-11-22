import { Trash } from '@phosphor-icons/react';
import { useCallback, useEffect, useRef, useTransition } from 'react';
import { toast } from 'sonner';

import { ITask } from '@/@types/ITask';
import { api } from '@/lib/api';

import styles from './styles.module.css';

interface ITaskCard {
  task: ITask;
  // eslint-disable-next-line react/no-unused-prop-types, react/require-default-props
  // isPeding?: boolean;
  markingTaskAsCompleted: (value: ITask) => void;
  deleteTask: (value: string) => Promise<void>;
}

export function TaskCard({
  task,
  markingTaskAsCompleted,
  deleteTask,
  // isPeding,
}: ITaskCard) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isPedingTask, setIsPedingTask] = useTransition();

  const handleMarkingTaskAsCompleted = useCallback(
    async (id: string) => {
      setIsPedingTask(async () => {
        try {
          const { data } = await api.patch(`/tasks/${id}/toggle`);

          markingTaskAsCompleted(data);
        } catch {
          toast.error('Ocorreu um erro, tente novamente!');
        }
      });
    },
    [markingTaskAsCompleted],
  );

  useEffect(() => {
    function handleMarkTaskCompletedPressingEnterKey(event: KeyboardEvent) {
      const inputElement = inputRef.current;

      if (
        document.activeElement === inputElement &&
        inputElement?.type === 'checkbox' &&
        event.key === 'Enter'
      ) {
        event.preventDefault();
        handleMarkingTaskAsCompleted(task.id);
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
  }, [task, markingTaskAsCompleted, handleMarkingTaskAsCompleted]);

  const handleDeleteTask = useCallback(
    async (id: string) => {
      setIsPedingTask(async () => {
        try {
          await api.delete(`/tasks/${id}`);

          deleteTask(id);
        } catch {
          toast.error('Erro ao deletar tarefa, tente novamente!');
        }
      });
    },
    [deleteTask],
  );

  return (
    <div className={styles.task} style={{ opacity: !isPedingTask ? 1 : 0.5 }}>
      <div>
        <input
          disabled={isPedingTask}
          value={task.id}
          checked={task.is_completed}
          onChange={() => handleMarkingTaskAsCompleted(task.id)}
          type="checkbox"
          ref={inputRef}
        />
        <p className={task.is_completed ? styles.completed : ''}>
          {task.description}
        </p>
      </div>

      <button
        disabled={isPedingTask}
        onClick={() => handleDeleteTask(task.id)}
        type="button"
      >
        <Trash size={24} />
      </button>
    </div>
  );
}
