import './App.css'
import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = ({ todos, onDelete }: { todos: Todo[], onDelete: (id: number) => void }) => (
  <ul className="todo-list">
    {todos.map((todo) => (
      <TodoItem 
        key={todo.id} 
        todo={todo} 
        onDelete={onDelete} 
      />
    ))}
  </ul>
);

const TodoItem = ({ todo, onDelete }: { todo: Todo, onDelete: (id: number) => void }) => (
  <div className="todo">
    <li>{todo.text}</li>
    <button 
      className="delete-button" 
      onClick={() => onDelete(todo.id)}
    >
      Delete
    </button>
  </div>
);

const EmptyTodo = () => (
  <div className="empty">
    <p>No task found</p>
  </div>
);

function App() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  
  const addTodo = (): void => {
    if (todo.trim() === '') {
      return ;
    }
    const newTodo: Todo = {
      id: Date.now(),
      text: todo,
      completed: false
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setTodo('');
  };

  const deleteTodo = (id: number): void => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  return (
    <div className="App">
      <h1>React ToDo App</h1>
      <div className="input-wrapper">
        <input 
          type="text" 
          name="todo" 
          placeholder="Add a new todo" 
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button className="add-button" onClick={addTodo}>Add</button>
      </div>
      
      {todos.length > 0 
        ? <TodoList todos={todos} onDelete={deleteTodo} />
        : <EmptyTodo />
      }
    </div>
  );
}

export default App
