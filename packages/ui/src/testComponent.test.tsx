import { render } from '@testing-library/react'
import { TestComponent } from './TestComponent'

describe('test Testcomponent', () => {
  it('should render', () => {
    render(<TestComponent />)
    expect(true).toBeTruthy()
  })
})
