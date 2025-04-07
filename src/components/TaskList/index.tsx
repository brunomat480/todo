import { Counters } from '@/components/Counters/indes';
import { TaskCard } from '@/components/TaskCard';

import styles from './styles.module.css';

export function TaskList() {
  return (
    <div className={styles.container}>
      <Counters />
      <div className={styles.taskList}>
        {/* <EmptyList /> */}

        <div>
          <TaskCard />
        </div>
      </div>
    </div>
  );
}
