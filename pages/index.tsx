import type { NextPage as Page } from 'next'

import { useAppDispatch, useAppSelector } from '../client-store/hooks'

const Home: Page = () => {
  const counter = useAppSelector(s => s.testCounter.value)
  const dispatch = useAppDispatch()

  const addOne = () => dispatch({ type: 'counter/increment' })

  return (
    <div>
      <span>{counter}</span>
      <button onClick={addOne}>add 1</button>
    </div>
  )
}

export default Home
