import { Impulze } from '../../types/Impulze'

const mockImpulzes: Impulze[] = [
  {
    name: 'Test impulze #1',
    description: 'This is a testing impulze',
    period: (
      1 * 60 * 60 + // 1 hour
      2 * 60 + // 2 minutes
      3 // 3 seconds
    ) * 1000 // to milliseconds
  },
  {
    name: 'Test impulze #2',
    description: 'This is another testing impulze',
    period: 5000
  }
]

export default mockImpulzes
