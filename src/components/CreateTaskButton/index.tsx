import { PlusCircle } from '@phosphor-icons/react';
import { ButtonHTMLAttributes } from 'react';

import styles from './styles.module.css';

interface ICreateTaskButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function CreateTaskButton({ ...props }: ICreateTaskButtonProps) {
  return (
    <button type="button" className={styles.button} {...props}>
      Criar
      <PlusCircle size={24} weight="regular" />
    </button>
  );
}
