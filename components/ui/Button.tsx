import styles from "./Button.module.css"

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
  readonly onClick: () => void;
  readonly children: React.ReactNode;
  readonly disabled?: boolean;
  readonly variant?: ButtonVariant;
};

const Button = ({ onClick, disabled, children, variant = 'primary' }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;