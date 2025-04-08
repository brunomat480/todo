import '@/global.css';
import { useState } from 'react';

import { ITask } from '@/@types/ITask';
import { AddTask } from '@/components/AddTask';
import { Header } from '@/components/Header';
import { TaskList } from '@/components/TaskList';

import styles from './styles.module.css';

export function App() {
  const [tasksList, setTaksList] = useState<ITask[]>([]);

  function addNewTask(description: string) {
    setTaksList((state) => [
      ...state,
      { id: tasksList.length + 1, description, is_completed: false },
    ]);
  }

  function markingTaskAsCompleted(id: number) {
    setTaksList((state) =>
      state.map((task) => {
        if (task.id === id) {
          const is_completed = !task.is_completed;
          return { ...task, is_completed };
        }

        return task;
      }),
    );
  }

  return (
    <>
      <Header />

      <main className={styles.main}>
        <AddTask onAddNewTask={addNewTask} />
        <TaskList
          tasksList={tasksList}
          onMarkingTaskAsCompleted={markingTaskAsCompleted}
        />
      </main>
    </>
  );
}
