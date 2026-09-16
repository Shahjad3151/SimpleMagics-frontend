'use client'
import { create } from 'zustand'

interface AuthState {
  token: string | null
  userId: number | null
  isAdmin: boolean
  profileCompleted: boolean
  setAuth: (token: string, userId: number, isAdmin: boolean, profileCompleted: boolean) => void
  clearAuth: () => void
  isAuthenticated: () => boolean
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: typeof window !== 'undefined' ? localStorage.getItem('ep_token') : null,
  userId: typeof window !== 'undefined' ? Number(localStorage.getItem('ep_uid')) || null : null,
  isAdmin: typeof window !== 'undefined' ? localStorage.getItem('ep_admin') === 'true' : false,
  profileCompleted: typeof window !== 'undefined' ? localStorage.getItem('ep_profile') === 'true' : false,
  
  setAuth: (token, userId, isAdmin, profileCompleted) => {
    localStorage.setItem('ep_token', token)
    localStorage.setItem('ep_uid', String(userId))
    localStorage.setItem('ep_admin', String(isAdmin))
    localStorage.setItem('ep_profile', String(profileCompleted))
    set({ token, userId, isAdmin, profileCompleted })
  },
  
  clearAuth: () => {
    localStorage.removeItem('ep_token')
    localStorage.removeItem('ep_uid')
    localStorage.removeItem('ep_admin')
    localStorage.removeItem('ep_profile')
    set({ token: null, userId: null, isAdmin: false, profileCompleted: false })
  },
  
  isAuthenticated: () => !!get().token,
}))
