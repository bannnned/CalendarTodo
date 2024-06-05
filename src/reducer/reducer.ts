import { Task } from '../components/type';

// типы
export type State = {
  tasks: Task[];
};

export type Action =
  | { type: 'LOAD_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'DEL_TASK'; payload: number };

//
export const init = {
  tasks: [],
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOAD_TASKS':
      return {
        ...state,
        tasks: action.payload,
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'DEL_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((el) => el.id != action.payload),
      };
    default: {
      return state;
    }
  }
};
