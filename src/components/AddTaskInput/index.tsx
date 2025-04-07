import { InputHTMLAttributes } from 'react';

import styles from './styles.module.css';

interface IAddTaskInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function AddTaskInput({ ...props }: IAddTaskInputProps) {
  return <input className={styles.input} {...props} />;
}
