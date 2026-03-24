import { describe, it, expect } from 'vitest'
import { formatPrice } from '../Mcontext/WineContextProvider'

describe('formatPrice', () => {
  it('formats a number as Hungarian Forint', () => {
    const result = formatPrice(1000)
    expect(result).toContain('1000')
    expect(result).toContain('Ft')
  })

  it('formats a larger number', () => {
    const result = formatPrice(25000)
    expect(result).toContain('25')
    expect(result).toContain('000')
    expect(result).toContain('Ft')
  })

  it('formats a small number', () => {
    expect(formatPrice(500)).toBe('500 Ft')
  })

  it('formats zero', () => {
    expect(formatPrice(0)).toBe('0 Ft')
  })
})
