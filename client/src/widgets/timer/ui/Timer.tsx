import React, { useEffect, useState, type FC } from 'react'
import { formatTime } from '../lib'

export const Timer: FC<{ initialTime?: number }> = ({ initialTime = 0 }) => {
  const [time, setTime] = useState(initialTime)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return <span>{formatTime(time)}</span>
}
