import { ITask } from '@/@types/ITask';
import { Counters } from '@/components/Counters/indes';
import { EmptyList } from '@/components/EmptyList';
import { TaskCard } from '@/components/TaskCard';

import styles from './styles.module.css';

interface ITaskList {
  tasksList: ITask[];
  onMarkingTaskAsCompleted: (value: number) => void;
  onDeleteTask: (value: number) => void;
}

export function TaskList({
  tasksList,
  onMarkingTaskAsCompleted,
  onDeleteTask,
}: ITaskList) {
  return (
    <div className={styles.container}>
      <Counters />
      <div className={styles.taskList}>
        {tasksList.length > 0 ? (
          <div className={styles.tasks}>
            {tasksList.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onMarkingTaskAsCompleted={onMarkingTaskAsCompleted}
                onDeleteTask={onDeleteTask}
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
