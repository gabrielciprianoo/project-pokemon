import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string;
  code?: string;
}

export default function ErrorMessage({ message, code }: ErrorMessageProps) {
  return (
    <div className={styles.error}>
      <p className={styles.error__title}>Error</p>
      <p className={styles.error__message}>{message}</p>
      {code && <p className={styles.error__code}>{code}</p>}
    </div>
  );
}
