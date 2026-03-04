import styles from "./Button.module.css"

type ButtonProps = {
  readonly onClick: () => void;
  readonly disabled?: boolean;
  readonly children: React.ReactNode;
};

const Button = ({ onClick, disabled, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={styles.button}
    >
      {children}
    </button>
  );
};

export default Button;