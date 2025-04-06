import { AddTaskInput } from '@/components/AddTaskInput';
import { Header } from '@/components/Header';
import '@/global.css';

export function App() {
  return (
    <>
      <Header />

      <main>
        <AddTaskInput placeholder="Adicione uma nova tarefa" />
      </main>
    </>
  );
}
