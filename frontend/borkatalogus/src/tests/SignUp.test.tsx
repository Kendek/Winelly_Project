import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import SignUp from '../Mcomponents/SignUp'

const mockFlipForm = vi.fn()
vi.mock('../MServices/AccountService', () => ({
  SetNewUserData: vi.fn(),
}))

describe('SignUp Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all input fields', () => {
    render(<SignUp flipForm={mockFlipForm} />)
    expect(screen.getByPlaceholderText('John')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Doe')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('john@example.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument()
  })

  it('updates firstName state on input change', () => {
    render(<SignUp flipForm={mockFlipForm} />)
    const firstNameInput = screen.getByPlaceholderText('John') as HTMLInputElement
    fireEvent.change(firstNameInput, { target: { value: 'John' } })
    expect(firstNameInput.value).toBe('John')
  })

  it('updates lastName state on input change', () => {
    render(<SignUp flipForm={mockFlipForm} />)
    const lastNameInput = screen.getByPlaceholderText('Doe') as HTMLInputElement
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } })
    expect(lastNameInput.value).toBe('Doe')
  })

  it('updates email state on input change', () => {
    render(<SignUp flipForm={mockFlipForm} />)
    const emailInput = screen.getByPlaceholderText('john@example.com') as HTMLInputElement
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    expect(emailInput.value).toBe('test@example.com')
  })

  it('updates password state on input change', () => {
    render(<SignUp flipForm={mockFlipForm} />)
    const passwordInput = screen.getByPlaceholderText('Enter your password') as HTMLInputElement
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } })
    expect(passwordInput.value).toBe('Password123!')
  })

  it('toggles password visibility', () => {
    render(<SignUp flipForm={mockFlipForm} />)
    const passwordInput = screen.getByPlaceholderText('Enter your password') as HTMLInputElement
    expect(passwordInput.type).toBe('password')
    
    const toggleButton = screen.getByRole('button', { name: '' })
    fireEvent.click(toggleButton)
    expect(passwordInput.type).toBe('text')
  })

  it('renders Create Account button', () => {
    render(<SignUp flipForm={mockFlipForm} />)
    expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument()
  })

  it('renders sign in link', () => {
    render(<SignUp flipForm={mockFlipForm} />)
    expect(screen.getByText('Sign in')).toBeInTheDocument()
  })
})
