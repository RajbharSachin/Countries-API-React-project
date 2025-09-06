import { useEffect, useState } from "react"

export function useWindowSize() { // using hook is simply a Reusable Function
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
      })
      useEffect(() => {
        window.addEventListener('resize', () => {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          })
        })
      }, [])

      return windowSize
}