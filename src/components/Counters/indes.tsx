import { ITask } from '@/@types/ITask';

import styles from './styles.module.css';

interface ICounters {
  tasksList: ITask[];
}

export function Counters({ tasksList }: ICounters) {
  const numberOfTasks = tasksList.reduce(
    (acc, task) => {
      acc.created += 1;
      if (task.is_completed) {
        acc.completed += 1;
      }

      return acc;
    },
    {
      created: 0,
      completed: 0,
    },
  );

  const { created, completed } = numberOfTasks;

  return (
    <div className={styles.counters}>
      <div>
        <small>Tarefas criadas</small>
        <span>{created}</span>
      </div>

      <div>
        <small>Concluídas</small>
        <span>{created > 0 ? `${completed} de ${created}` : created}</span>
      </div>
    </div>
  );
}
