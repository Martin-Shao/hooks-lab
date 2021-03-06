import React, { useState, useEffect } from 'react'
import { Button } from 'antd'


function UseEffectDemo() {

  const [count, setCount] = useState(0)
  const [positions, setPositions] = useState({ x: 0, y: 0 })
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  })

  const onResize = () => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
  }

  useEffect(() => {
    console.info('add effect', positions.x)
    const updateMouse = (e) => {
      console.info('inner')
      setPositions({ x: e.clientX, y: e.clientY })
    }

    document.addEventListener('click', updateMouse)
    return () => {
      console.info('remove effect', positions.x)
      document.removeEventListener('click', updateMouse)
    }
  })

  useEffect(() => {
    console.info('count useEffect...')
    document.title = count
  }, [count])

  useEffect(() => {
    console.info('resize useEffect...')
    window.addEventListener('resize', onResize, false)
    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [])

  const onClick = () => console.info('click...')

  useEffect(() => {
    document.querySelector('#size').addEventListener('click', onClick, false)
    return () => {
      document.querySelector('#size').removeEventListener('click', onClick, false)
    }
  })

  const { width, height } = size
  return (
    <>
      <Button
        onClick={() => setCount(count + 1)}
      >
        Click: ({count})
    </Button>
      {
        count % 2
          ? <span id="size">size: {width}x{height}</span>
          : <p id="size">size: {width}x{height}</p>
      }
      {
        <div>
          <p>X : {positions.x}, Y : {positions.y}</p>
        </div>
      }
    </>
  )
}

export default UseEffectDemo
