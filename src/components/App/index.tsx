/* eslint-disable indent */
import '@/global.css';
import { CircleNotch } from '@phosphor-icons/react';
import { useEffect, useState, useTransition } from 'react';
import { Toaster } from 'sonner';

import { ITask } from '@/@types/ITask';
import { AddTask } from '@/components/AddTask';
import { Chat, IMessage } from '@/components/Chat';
import { Header } from '@/components/Header';
import { TaskList } from '@/components/TaskList';
import { api } from '@/lib/api';

import styles from './styles.module.css';

interface IChatResponse {
  action: 'create' | 'delete' | 'complete' | 'list' | 'chat';
  response: string;
  data: ITask[];
}

export function App() {
  const [tasksList, setTaksList] = useState<ITask[]>([]);
  const [isLoadingTaskList, setIsLoadingTaskList] = useTransition();

  async function addNewTask(task: ITask) {
    setTaksList((state) => [...state, task]);
  }

  async function deleteTask(id: string) {
    setTaksList((prevState) => prevState.filter((task) => task.id !== id));
  }

  useEffect(() => {
    function fetchTasks() {
      setIsLoadingTaskList(async () => {
        try {
          const { data } = await api.get('/tasks');

          setTaksList(data);
        } catch {
          setTaksList([]);
        }
      });
    }

    fetchTasks();
  }, []);

  async function markingTaskAsCompleted(taskUpdate: ITask) {
    setTaksList((prevState) =>
      prevState.map((task) => (task.id === taskUpdate.id ? taskUpdate : task)),
    );
  }

  async function sendSendMessageChat(message: string): Promise<IMessage> {
    const { data } = await api.post<IChatResponse>('/ai/chat', {
      message,
    });

    // eslint-disable-next-line indent
    switch (data.action) {
      case 'create': {
        setTaksList((state) => [...state, ...data.data]);
        break;
      }
      case 'complete': {
        setTaksList((prevState) => {
          const updates = new Map(data.data.map((t) => [t.id, t]));

          return prevState.map((task) =>
            updates.has(task.id) ? updates.get(task.id)! : task,
          );
        });
        break;
      }
      case 'delete': {
        const idsToRemove = new Set(data.data.map((t) => t.id));

        setTaksList((prevState) =>
          prevState.filter((task) => !idsToRemove.has(task.id)),
        );
        break;
      }
      default:
        break;
    }

    return {
      id: Date.now(),
      text: data.response,
      sender: 'system',
      timestamp: new Date(),
    };
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <Header />

      <main className={styles.main}>
        <AddTask addNewTask={addNewTask} />
        {!isLoadingTaskList ? (
          <TaskList
            tasksList={tasksList}
            markingTaskAsCompleted={markingTaskAsCompleted}
            deleteTask={deleteTask}
          />
        ) : (
          <div className={styles['loading-spinner']}>
            <CircleNotch />
          </div>
        )}
      </main>

      <Chat sendSendMessageChat={sendSendMessageChat} />
    </>
  );
}
