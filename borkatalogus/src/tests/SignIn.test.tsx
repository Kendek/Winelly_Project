import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import SignIn from '../Mcomponents/SignIn'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

vi.mock('../MServices/AccountService', () => ({
  SetUserLogin: vi.fn(),
}))

describe('SignIn Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders email and password inputs', () => {
    render(<SignIn flipForm={() => {}} />)
    expect(screen.getByPlaceholderText('john@example.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument()
  })

  it('updates email state on input change', () => {
    render(<SignIn flipForm={() => {}} />)
    const emailInput = screen.getByPlaceholderText('john@example.com') as HTMLInputElement
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    expect(emailInput.value).toBe('test@example.com')
  })

  it('updates password state on input change', () => {
    render(<SignIn flipForm={() => {}} />)
    const passwordInput = screen.getByPlaceholderText('Enter your password') as HTMLInputElement
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    expect(passwordInput.value).toBe('password123')
  })

  it('toggles password visibility', () => {
    render(<SignIn flipForm={() => {}} />)
    const passwordInput = screen.getByPlaceholderText('Enter your password') as HTMLInputElement
    expect(passwordInput.type).toBe('password')
    
    const toggleButton = screen.getByRole('button', { name: '' })
    fireEvent.click(toggleButton)
    expect(passwordInput.type).toBe('text')
  })

  it('renders Sign In button', () => {
    render(<SignIn flipForm={() => {}} />)
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument()
  })

  it('renders create account link', () => {
    render(<SignIn flipForm={() => {}} />)
    expect(screen.getByText('Create one')).toBeInTheDocument()
  })
})
