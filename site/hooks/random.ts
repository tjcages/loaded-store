import { useState, useEffect } from 'react'

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function useRandomize(min: number, max: number) {
  const [number, setNumber] = useState(0)

  useEffect(() => {
    setNumber(random(min, max))

    const randomize = () => {
      setTimeout(() => {
        setNumber(random(min, max))

        randomize()
      }, random(2, 4) * 1000)
    }
    return randomize()
  }, [max, min])

  return number
}

export function useRandom(min: number, max: number) {
  const [number, setNumber] = useState(0)

  useEffect(() => {
    setNumber(random(min, max))
  }, [max, min])

  return number
}
