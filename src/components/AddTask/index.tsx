import { CircleNotch, PlusCircle } from '@phosphor-icons/react';
import { ChangeEvent, FormEvent, useState, useTransition } from 'react';
import { toast } from 'sonner';

import { ITask } from '@/@types/ITask';
import { api } from '@/lib/api';

import styles from './styles.module.css';

interface IAddTaskProps {
  addNewTask: (value: ITask) => void;
}

export function AddTask({ addNewTask }: IAddTaskProps) {
  const [description, setDescription] = useState('');
  const [taskValidate, setTaskValidate] = useState('');
  const [isCreatingTask, setIsCreatingTask] = useTransition();

  function handleTask(event: ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);

    setTaskValidate('');
  }

  function handleAddNewTask(event: FormEvent) {
    event.preventDefault();

    if (!description) {
      setTaskValidate('Preencha o campo');
      return;
    }

    setIsCreatingTask(async () => {
      try {
        const { data } = await api.post('/tasks', {
          description,
        });
        addNewTask(data);
        setDescription('');
      } catch {
        toast.error('Erro ao criar tarefa, tente novamente!');
      }
    });
  }

  const isNewTaskEmpty = !description;

  return (
    <form noValidate onSubmit={handleAddNewTask} className={styles.addTask}>
      <div className={styles.input}>
        <input
          value={description}
          onChange={handleTask}
          placeholder="Adicione uma nova tarefa"
          required
          className={taskValidate && styles.validate}
        />
        {taskValidate && <span>{taskValidate}</span>}
      </div>
      <button
        type="submit"
        disabled={isNewTaskEmpty || isCreatingTask}
        className={styles.button}
      >
        {!isCreatingTask ? (
          <>
            Criar
            <PlusCircle size={24} weight="regular" />
          </>
        ) : (
          <>
            Criando...
            <CircleNotch size={20} weight="bold" className={styles.loading} />
          </>
        )}
      </button>
    </form>
  );
}
