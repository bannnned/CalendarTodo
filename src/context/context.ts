import { Dispatch, createContext } from 'react';
import { Action, init, type State } from '../reducer/reducer';

type typeInitContext = {
  currentDate: string;
  setCurrentDate: (value: string) => void;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  state: State;
  dispatch: Dispatch<Action>;
};

const initContext: typeInitContext = {
  currentDate: '',
  setCurrentDate: () => {},
  isModalOpen: false,
  setIsModalOpen: () => {},
  state:  init ,
  dispatch:() => {},
};

export const appСontext = createContext(initContext);
