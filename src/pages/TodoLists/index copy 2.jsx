import React, { useState, useRef, useCallback, memo } from 'react'

import './index.css'
import { useEffect } from 'react';

import {
  createSet,
  createAdd,
  createToggle,
  createRemove
} from './actions'

let idSeq = Date.now();

const LS_KEY = '_$-todos_';

function bindActionCreators(actionCreators, dispatch) {
  const ret = {};

  for (let key in actionCreators) {
    ret[key] = function (...args) {
      const actionCreactor = actionCreators[key]
      const action = actionCreactor(...args)
      dispatch(action)
    }
  }

  return ret;
}

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
  function TodoItem(props) {
    const {
      todo: { id, text, complete },
      removeTodo,
      toggleTodo,
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
  function Todos(props) {
    const { todos, removeTodo, toggleTodo } = props
    return (
      <ul>
        {
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              toggleTodo={toggleTodo}
            />
          ))
        }
      </ul>
    )
  }
)

function TodoLists() {

  const [todos, setTodos] = useState([])

  const dispatch = useCallback(
    (action) => {
      const { type, payload } = action
      switch (type) {
        case 'set':
          setTodos(payload)
          break;
        case 'add':
          setTodos(todos => [...todos, payload])
          break;
        case 'remove':
          setTodos(todos => todos.filter(
            todo => todo.id !== payload
          ))
          break;
        case 'toggle':
          setTodos(todos => todos.map(
            todo => (
              todo.id === payload
                ? { ...todo, complete: !todo.complete }
                : todo
            )
          ))
          break;
        default:
          return ''
      }
    },
    [],
  )

  useEffect(() => {
    const todos = JSON.parse(window.localStorage.getItem(LS_KEY) || '[]')
    // setTodos(todos)
    dispatch(createSet(todos))
  }, [dispatch])

  useEffect(() => {
    window.localStorage.setItem(LS_KEY, JSON.stringify(todos))
  }, [todos])

  return (
    <div className="todo-list">
      <Control
        {
        ...bindActionCreators({
          addTodo: createAdd
        }, dispatch)
        }
      />
      <Todos
        {
        ...bindActionCreators({
          removeTodo: createRemove,
          toggleTodo: createToggle,
        }, dispatch)
        }
        todos={todos}
      />
    </div>
  )
}

export default TodoLists
