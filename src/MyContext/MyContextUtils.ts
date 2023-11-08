import { Dispatch, SetStateAction } from 'react';
import { HandleUpdateSearchValueType } from './MyContextTypes';

export default function createHandleUpdateSearchValue(
  setSearchValue: Dispatch<SetStateAction<string>>
): HandleUpdateSearchValueType {
  return (newValue: string) => {
    setSearchValue(newValue);
  };
}
