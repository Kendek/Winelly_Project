import { describe, it, expect } from 'vitest'

describe('Email Validation Regex', () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/

  it('validates correct email format', () => {
    expect(emailRegex.test('test@example.com')).toBe(true)
    expect(emailRegex.test('user.name@domain.org')).toBe(true)
    expect(emailRegex.test('john.doe@company.hu')).toBe(true)
  })

  it('rejects invalid email format', () => {
    expect(emailRegex.test('invalid')).toBe(false)
    expect(emailRegex.test('invalid@')).toBe(false)
    expect(emailRegex.test('@domain.com')).toBe(false)
    expect(emailRegex.test('user@.com')).toBe(false)
    expect(emailRegex.test('user@domain')).toBe(false)
  })
})

describe('Password Validation Regex', () => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  it('validates correct password format', () => {
    expect(passwordRegex.test('Password1!')).toBe(true)
    expect(passwordRegex.test('Secure123@')).toBe(true)
    expect(passwordRegex.test('MyP@ssw0rd')).toBe(true)
  })

  it('rejects password without uppercase', () => {
    expect(passwordRegex.test('password1!')).toBe(false)
  })

  it('rejects password without lowercase', () => {
    expect(passwordRegex.test('PASSWORD1!')).toBe(false)
  })

  it('rejects password without number', () => {
    expect(passwordRegex.test('Password!')).toBe(false)
  })

  it('rejects password without special character', () => {
    expect(passwordRegex.test('Password1')).toBe(false)
  })

  it('rejects password shorter than 8 characters', () => {
    expect(passwordRegex.test('Pass1!')).toBe(false)
  })
})
