import { CSSProperties, ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  buttonStyle?: CSSProperties;
}
