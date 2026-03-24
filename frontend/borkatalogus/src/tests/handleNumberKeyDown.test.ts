import { describe, it, expect, vi } from 'vitest'
import { handleNumberKeyDown } from '../Ksrc/AdminPages/AdminFetch'

describe('handleNumberKeyDown', () => {
  it('allows number keys (0-9)', () => {
    const preventDefault = vi.fn()
    
    const event1 = { which: 48, preventDefault } as unknown as React.KeyboardEvent<HTMLInputElement>
    handleNumberKeyDown(event1)
    expect(preventDefault).not.toHaveBeenCalled()

    const event2 = { which: 57, preventDefault } as unknown as React.KeyboardEvent<HTMLInputElement>
    handleNumberKeyDown(event2)
    expect(preventDefault).not.toHaveBeenCalled()
  })

  it('blocks non-number keys', () => {
    const preventDefault = vi.fn()
    
    const event = { which: 65, preventDefault } as unknown as React.KeyboardEvent<HTMLInputElement>
    handleNumberKeyDown(event)
    expect(preventDefault).toHaveBeenCalled()
  })

  it('blocks special characters', () => {
    const preventDefault = vi.fn()
    
    const event = { which: 33, preventDefault } as unknown as React.KeyboardEvent<HTMLInputElement>
    handleNumberKeyDown(event)
    expect(preventDefault).toHaveBeenCalled()
  })
})
