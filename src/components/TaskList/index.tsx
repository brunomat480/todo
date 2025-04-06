import styles from './styles.module.css';

export function TaskList() {
  return (
    <div className={styles.taskList}>
      <div className={styles.counters}>
        <div>
          <small>Tarefas criadas</small>
          <span>0</span>
        </div>

        <div>
          <small>Concluídas</small>
          <span>0</span>
        </div>
      </div>
    </div>
  );
}
