import { useRef, useEffect } from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (param?: any) => any
}

const useOutsideClick = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        props.callback()
      }
    }

    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [props])

  return ref
}

export default useOutsideClick
