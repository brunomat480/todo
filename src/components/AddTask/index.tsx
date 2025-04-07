import { AddTaskInput } from '@/components/AddTaskInput';
import { CreateTaskButton } from '@/components/CreateTaskButton';

import styles from './styles.module.css';

export function AddTask() {
  return (
    <div className={styles.addTask}>
      <AddTaskInput placeholder="Adicione uma nova tarefa" />
      <CreateTaskButton />
    </div>
  );
}
