//const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const API_URL = process.env.NEXT_PUBLIC_API_URL || ''

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('ep_token') : null
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${API_URL}${path}`, { ...options, headers })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Request failed' }))
    throw new ApiError(res.status, err.detail || 'Something went wrong')
  }
  return res.json()
}

// Auth
export const authApi = {
  register: (email: string, password: string) =>
    request<any>('/api/auth/register', { method: 'POST', body: JSON.stringify({ email, password }) }),
  login: (email: string, password: string) =>
    request<any>('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  me: () => request<any>('/api/auth/me'),
}

// Students
export const studentApi = {
  createProfile: (data: any) =>
    request<any>('/api/students/profile', { method: 'POST', body: JSON.stringify(data) }),
  getProfile: () => request<any>('/api/students/profile'),
  getDashboard: () => request<any>('/api/students/dashboard'),
}

// Tests
export const testApi = {
  startTest: (data: { session_type: string; domain?: string; technology?: string }) =>
    request<any>('/api/tests/start', { method: 'POST', body: JSON.stringify(data) }),
  submitTest: (data: any) =>
    request<any>('/api/tests/submit', { method: 'POST', body: JSON.stringify(data) }),
  getHistory: () => request<any>('/api/tests/history'),
}

// Results
export const resultApi = {
  getResult: (id: number) => request<any>(`/api/results/${id}`),
  getMyResults: () => request<any>('/api/results/my/all'),
}

// Admin
export const adminApi = {
  getStats: () => request<any>('/api/admin/stats'),
  getStudents: () => request<any>('/api/admin/students'),
  getStudentReport: (id: number) => request<any>(`/api/admin/students/${id}/report`),
}

// Questions (admin)
export const questionApi = {
  getQuestions: (params?: any) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : ''
    return request<any[]>(`/api/questions${q}`)
  },
  createQuestion: (data: any) =>
    request<any>('/api/questions', { method: 'POST', body: JSON.stringify(data) }),
  updateQuestion: (id: number, data: any) =>
    request<any>(`/api/questions/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteQuestion: (id: number) =>
    request<any>(`/api/questions/${id}`, { method: 'DELETE' }),
}

// Bookings (Career Counseling / Student Guidance / Free Expert Counseling)
export const bookingApi = {
  requestCareerCounseling: (data: any) =>
    request<any>('/api/bookings/career-counseling', { method: 'POST', body: JSON.stringify(data) }),
  requestStudentGuidance: (data: any) =>
    request<any>('/api/bookings/student-guidance', { method: 'POST', body: JSON.stringify(data) }),
  requestFreeCounseling: (data: any) =>
    request<any>('/api/bookings/free-counseling', { method: 'POST', body: JSON.stringify(data) }),
}

export { ApiError }
