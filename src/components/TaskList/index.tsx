import clipboardImg from '@/assets/img/clipboard.png';
import { Counters } from '@/components/Counters/indes';

import styles from './styles.module.css';

export function TaskList() {
  return (
    <div className={styles.container}>
      <Counters />

      <div className={styles.taskList}>
        <div>
          <img src={clipboardImg} alt="Prancheta" />

          <p>
            <strong>Você ainda não tem tarefas cadastradas</strong> <br /> Crie
            tarefas e organize seus itens a fazer
          </p>
        </div>
      </div>
    </div>
  );
}
