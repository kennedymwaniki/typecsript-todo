import { useReducer } from "react";


useReducer
///interface for my todos
interface Todo {
    id: number;
    todo: string;
    completed: boolean;
  }
  
  //they types for the actions that will be dispatched
  type Action =
    | { type: "addTodo"; payload: { text: string } }
    | { type: "deleteTodo"; payload: { id: number } }
    | { type: "editTodo"; payload: { id: number; text: string } }
    | { type: "toggleTodo"; payload: { id: number } };
  
  ///my initial array of todos

  
  // my todoRedcer function
  const todoReducer = (state: Todo[], action: Action): Todo[] => {
    switch (action.type) {
      case "addTodo":
        return [
          ...state,
          { id: state.length + 1, todo: action.payload.text, completed: false },
        ];
      case "deleteTodo":
        return state.filter((todo) => todo.id !== action.payload.id);
      case "editTodo":
        return state.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, todo: action.payload.text }
            : todo
        );
      case "toggleTodo":
        return state.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        );
      default:
        return state;
    }
  }

export default todoReducer