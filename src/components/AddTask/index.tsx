import { PlusCircle } from '@phosphor-icons/react';
import { ChangeEvent, FormEvent, useState } from 'react';

import styles from './styles.module.css';

interface IAddTaskProps {
  onAddNewTask: (value: string) => void;
}

export function AddTask({ onAddNewTask }: IAddTaskProps) {
  const [task, setTask] = useState('');
  const [taskValidate, setTaskValidate] = useState('');

  function handleTask(event: ChangeEvent<HTMLInputElement>) {
    setTask(event.target.value);

    setTaskValidate('');
  }

  function handleAddNewTask(event: FormEvent) {
    event.preventDefault();

    if (!task) {
      setTaskValidate('Preencha o campo');
      return;
    }

    onAddNewTask(task);
    setTask('');
  }

  const isNewTaskEmpty = !task;

  return (
    <form noValidate onSubmit={handleAddNewTask} className={styles.addTask}>
      <div className={styles.input}>
        <input
          value={task}
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
