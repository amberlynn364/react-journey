import { CSSProperties, ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  buttonStyle?: CSSProperties;
}
