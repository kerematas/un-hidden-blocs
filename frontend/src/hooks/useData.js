import { useState, useEffect } from 'react'

export function useData(file) {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch(`/data/${file}`)
      .then(r => r.json())
      .then(setData)
  }, [file])
  return data
}
