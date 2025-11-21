import '@/global.css';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';

import { ITask } from '@/@types/ITask';
import { AddTask } from '@/components/AddTask';
import { Header } from '@/components/Header';
import { TaskList } from '@/components/TaskList';
import { api } from '@/lib/api';

import styles from './styles.module.css';

export function App() {
  const [tasksList, setTaksList] = useState<ITask[]>([]);

  async function addNewTask(task: ITask) {
    setTaksList((state) => [...state, task]);
  }

  async function handleDeleteTask(id: string) {
    try {
      await api.delete(`/tasks/${id}`);
      const { data } = await api.get('/tasks');
      setTaksList(data);
    } catch {
      toast.error('Erro ao deletar tarefa, tente novamente!');
    }
  }

  useEffect(() => {
    async function fetchTasks() {
      try {
        const { data } = await api.get('/tasks');

        setTaksList(data);
      } catch {
        setTaksList([]);
      }
    }

    fetchTasks();
  }, []);

  function handleMarkingTaskAsCompleted(id: string) {
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

  // function handleDeleteTask(id: string) {
  //   setTaksList((state) => state.filter((task) => task.id !== id));
  // }

  return (
    <>
      <Toaster position="top-right" richColors />
      <Header />

      <main className={styles.main}>
        <AddTask onAddNewTask={addNewTask} />
        <TaskList
          tasksList={tasksList}
          onMarkingTaskAsCompleted={handleMarkingTaskAsCompleted}
          onDeleteTask={handleDeleteTask}
        />
      </main>
    </>
  );
}
