import type { NextPage as Page } from 'next'

// see https://swr.bootcss.com/docs/typescript
import useSWR, { Fetcher } from 'swr'

import { useAppDispatch, useAppSelector } from '../client-store/hooks'
import type { ApiTestData } from './api/test'

const fetcher: Fetcher<ApiTestData, string> = (url: string) => fetch(url).then((res) => res.json()) as Promise<ApiTestData>

const Home: Page = () => {
  const counter = useAppSelector(s => s.testCounter.value)
  const dispatch = useAppDispatch()

  const addOne = () => dispatch({ type: 'counter/increment' })

  const { data, error } = useSWR('/api/test', fetcher)

  let message: string
  if (error) message = 'failed to load: error = "' + String(error) + '"'
  if (!data) message = 'loading...'
  else message = data.status

  return (
    <div>
      <div>API status: ${message}</div>
      <span>{counter}</span>
      <button onClick={addOne}>add 1</button>
    </div>
  )
}

export default Home
