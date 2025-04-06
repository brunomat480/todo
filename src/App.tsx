import { AddTask } from '@/components/AddTask';
import { Header } from '@/components/Header';
import '@/global.css';

export function App() {
  return (
    <>
      <Header />

      <main>
        <AddTask />
      </main>
    </>
  );
}
