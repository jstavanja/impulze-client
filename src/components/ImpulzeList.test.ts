import { render, fireEvent } from '@testing-library/vue'
import { Impulze } from '../types/Impulze'
import { convertMillisecondsToSeconds } from '../utils/time'
import ImpulzeList from './ImpulzeList.vue'

const impulzeList = [
  {
    name: 'Test impulze #1',
    description: 'This is a testing impulze',
    period: 10000,
  },
  {
    name: 'Test impulze #2',
    description: 'This is another testing impulze',
    period: 5000,
  },
]

const assertImpulzeInfoIsPresent = (
  getByTextSelector: Function,
  impulzeInfo: Impulze
) => {
  getByTextSelector(impulzeInfo.name)
  getByTextSelector(impulzeInfo.description)
  getByTextSelector(`${convertMillisecondsToSeconds(impulzeInfo.period)} s`)
}

describe('ImpulzeList', () => {
  it('should display all provided impulzes in the list', () => {
    const { getByText } = render(ImpulzeList, {
      props: {
        impulzes: impulzeList,
      },
    })

    assertImpulzeInfoIsPresent(getByText, impulzeList[0])
    assertImpulzeInfoIsPresent(getByText, impulzeList[1])
  })
})
