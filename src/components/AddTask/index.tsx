import { PlusCircle } from '@phosphor-icons/react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'sonner';

import { ITask } from '@/@types/ITask';
import { api } from '@/lib/api';

import styles from './styles.module.css';

interface IAddTaskProps {
  onAddNewTask: (value: ITask) => void;
}

export function AddTask({ onAddNewTask }: IAddTaskProps) {
  const [description, setDescription] = useState('');
  const [taskValidate, setTaskValidate] = useState('');

  function handleTask(event: ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);

    setTaskValidate('');
  }

  async function handleAddNewTask(event: FormEvent) {
    event.preventDefault();

    if (!description) {
      setTaskValidate('Preencha o campo');
      return;
    }

    try {
      const { data } = await api.post('/tasks', {
        description,
      });
      onAddNewTask(data);
    } catch {
      toast.error('Erro ao criar tarefa, tente novamente!');
    }

    setDescription('');
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
      <button type="submit" disabled={isNewTaskEmpty} className={styles.button}>
        Criar
        <PlusCircle size={24} weight="regular" />
      </button>
    </form>
  );
}
