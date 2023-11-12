export interface SearchBarProps {
  defaultValue?: string;
  value?: string;
  label: string;
  onChange: (value: string) => void;
}
