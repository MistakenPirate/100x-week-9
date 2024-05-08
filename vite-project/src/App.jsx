import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function useTodos(n) {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios.get("https://sum-server.100xdevs.com/todos")
        .then(res => {
          setTodos(res.data.todos)
          setLoading(false)
        })
    }, n * 1000)

    // Cleanup function to clear interval when component unmounts or n changes
    return () => clearInterval(intervalId)
  }, [n])

  return { todos, loading }
}

function useOnline() {
  const [online, setOnline] = useState(window.navigator.onLine)
  useEffect(() => {
    const handleOnline = () => {
      setOnline(true)
    }

    const handleOffline = () => {
      setOnline(false)
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
  }
    , [])

  return online
}

function useMouseMove() {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    setPos({ x: e.clientX, y: e.clientY })
  }
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }

  }, [])
  return pos
}

function useTimer(fn, timeout) {
  // const [time, setTime] = useState(0)
  useEffect(() => {
    const interval = setInterval(fn, timeout)
    return () => clearInterval(interval)
  }, [])

  // return time
}

function useDebounce(value, timeout) {
  const [debouncedValue, setDebouncedValue] = useState("")
  useEffect(() => {
    let v = setTimeout(() => setDebouncedValue(value), timeout)
    return()=>{
      clearTimeout(v)
    }
  }, [value])
  return debouncedValue
}

function App() {
  // const { todos, loading } = useTodos(5)
  // const online = useOnline()
  // const mousePointer = useMouseMove()
  // const [time, setTime] = useState(0)
  // useTimer(()=>setTime(t=>t+1), 1000)

  const [inputValue, setInputValue] = useState("")
  const debouncedValue = useDebounce(inputValue, 500)

  return (
    <div>
      {/* You are {online ? "Online" : "Offline"}
      {loading ? "Loading" : todos.map(todo => <Track key={todo.id} todo={todo} />)} */}
      {/* Your position is {mousePointer.x},{mousePointer.y} */}
      {/* Counter is {time} */}
      Debounced value is {debouncedValue}
      <input type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder='Search..' />
    </div>
  )
};

function Track({ todo }) {
  return (
    <>
      {todo.title}
      <br />
      {todo.description}
    </>
  )
}

export default App
