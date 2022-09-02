import { StatsBase } from 'fs'
import type { NextPage as Page } from 'next'

import { useSelector } from 'react-redux'
import { State } from '../client-store/initialState'

const Home: Page = () => {
  const counter = useSelector<State, number>((state) => state.testValue.counter)

  return (
    <div>
      <span>{counter}</span>
      <button>add 1</button>
    </div>
  )
}

export default Home
