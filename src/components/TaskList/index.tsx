import { ITask } from '@/@types/ITask';
import { Counters } from '@/components/Counters/indes';
import { EmptyList } from '@/components/EmptyList';
import { TaskCard } from '@/components/TaskCard';

import styles from './styles.module.css';

interface ITaskList {
  tasksList: ITask[];
  // eslint-disable-next-line react/require-default-props
  // isPeding?: boolean;
  markingTaskAsCompleted: (value: ITask) => void;
  deleteTask: (value: string) => Promise<void>;
}

export function TaskList({
  tasksList,
  // isPeding,
  markingTaskAsCompleted,
  deleteTask,
}: ITaskList) {
  return (
    <div className={styles.container}>
      <Counters tasksList={tasksList} />
      <div className={styles.taskList}>
        {tasksList.length > 0 ? (
          <div className={styles.tasks}>
            {tasksList.map((task) => (
              <TaskCard
                // isPeding={isPeding}
                key={task.id}
                task={task}
                markingTaskAsCompleted={markingTaskAsCompleted}
                deleteTask={deleteTask}
              />
            ))}
          </div>
        ) : (
          <EmptyList />
        )}
      </div>
    </div>
  );
}
