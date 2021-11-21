import { render, SelectorMatcherOptions } from '@testing-library/vue'
import { Matcher } from '@testing-library/dom'
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

type GetByTextFunction = (
  text: Matcher,
  options?: SelectorMatcherOptions | undefined,
  waitForElementOptions?: unknown
) => HTMLElement

const assertImpulzeInfoIsPresent = (
  getByTextSelector: GetByTextFunction,
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
