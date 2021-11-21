import { render } from '@testing-library/vue'
import ActiveImpulzeList from './ActiveImpulzeList.vue'

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

describe('ActiveImpulzeList', () => {
  it('should display all provided impulze names in the list', () => {
    const { getByText } = render(ActiveImpulzeList, {
      props: {
        activeImpulzes: impulzeList,
      },
    })

    getByText(impulzeList[0].name)
    getByText(impulzeList[1].name)
  })
})
