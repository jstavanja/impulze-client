import { render } from '@testing-library/vue'
import { convertMillisecondsToSeconds } from '../utils/time'
import Impulze from './Impulze.vue'

const dummyImpulze = {
  name: 'Test impulze #2',
  description: 'This is a testing impulze',
  period: 10000,
}

describe('Impulze', () => {
  it('should display the impulze information', () => {
    const { getByText } = render(Impulze, {
      props: {
        impulze: dummyImpulze,
      },
    })

    getByText(dummyImpulze.name)
    getByText(dummyImpulze.description)
    getByText(`${convertMillisecondsToSeconds(dummyImpulze.period)} s`)
  })
})
