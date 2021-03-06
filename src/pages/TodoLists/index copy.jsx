import React, { useState, useRef, useCallback, memo } from 'react'

import './index.css'
import { useEffect } from 'react';

let idSeq = Date.now();

const LS_KEY = '_$-todos_';

const Control = memo(
  function Control(props) {
    const { addTodo } = props
    const inputRef = useRef()
    const onSubmit = (e) => {
      e.preventDefault();

      const newText = inputRef.current.value.trim();

      if (newText.length === 0) return;

      addTodo({
        id: ++idSeq,
        text: newText,
        complete: false,
      })

      inputRef.current.value = '';
    }
    return (
      <div className="control">
        <h1>todos</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            ref={inputRef}
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </div>
    )
  }
)

const TodoItem = memo(
  function (props) {
    const {
      todo: { id, text, complete },
      toggleTodo,
      removeTodo
    } = props

    const onChange = () => {
      toggleTodo(id)
    }

    const onRemove = () => {
      removeTodo(id)
    }

    console.info('TodoItem is rendering', id)
    return (
      <li className="todo-item">
        <input
          type="checkbox"
          onChange={onChange}
          checked={complete}
        />
        <label className={complete ? 'complete' : ''}>{text}</label>
        <button onClick={onRemove}>&#xd7;</button>
      </li>
    )
  }
)

const Todos = memo(
  function (props) {
    const { todos, toggleTodo, removeTodo } = props
    return (
      <ul>
        {
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              removeTodo={removeTodo}
            />
          ))
        }
      </ul>
    )
  }
)

function TodoLists() {

  const [todos, setTodos] = useState([])

  const addTodo = useCallback(
    (todo) => {
      setTodos(todos => [...todos, todo])
    },
    []
  )

  const removeTodo = useCallback(
    (id) => {
      setTodos(todos => todos.filter(
        todo => todo.id !== id
      ))
    },
    []
  )

  const toggleTodo = useCallback(
    (id) => {
      setTodos(todos => todos.map(
        todo => (
          todo.id === id
            ? { ...todo, complete: !todo.complete }
            : todo
        )
      ))
    },
    []
  )

  useEffect(() => {
    const todos = JSON.parse(window.localStorage.getItem(LS_KEY) || '[]')
    setTodos(todos)
  }, [])

  useEffect(() => {
    window.localStorage.setItem(LS_KEY, JSON.stringify(todos))
  }, [todos])

  return (
    <div className="todo-list">
      <Control addTodo={addTodo} />
      <Todos
        todos={todos}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
      />
    </div>
  )
}

export default TodoLists
