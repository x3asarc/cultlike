// Zustand stores for Cultural Events Platform
// Based on MASTER_PROMPT.md state management patterns

import { create } from 'zustand'
import type { QuizState, EventFilters, User } from './types'

// Quiz flow state management (location → month → type → results)
interface QuizStore extends QuizState {
  setLocation: (locationId: string) => void
  setMonth: (month: number) => void
  setType: (typeId: string) => void
  nextStep: () => void
  prevStep: () => void
  reset: () => void
  isComplete: () => boolean
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  location: null,
  month: null,
  type: null,
  step: 1,
  
  setLocation: (locationId: string) => {
    set({ location: locationId })
    // Auto-advance to month step
    if (get().step === 1) {
      set({ step: 2 })
    }
  },
  
  setMonth: (month: number) => {
    set({ month })
    // Auto-advance to type step
    if (get().step === 2) {
      set({ step: 3 })
    }
  },
  
  setType: (typeId: string) => {
    set({ type: typeId })
    // Auto-advance to results step
    if (get().step === 3) {
      set({ step: 4 })
    }
  },
  
  nextStep: () => {
    const currentStep = get().step
    if (currentStep < 4) {
      set({ step: (currentStep + 1) as 1 | 2 | 3 | 4 })
    }
  },
  
  prevStep: () => {
    const currentStep = get().step
    if (currentStep > 1) {
      set({ step: (currentStep - 1) as 1 | 2 | 3 | 4 })
    }
  },
  
  reset: () => set({ 
    location: null, 
    month: null, 
    type: null, 
    step: 1 
  }),
  
  isComplete: () => {
    const state = get()
    return !!(state.location && state.month && state.type)
  }
}))

// Event filtering state (for event listing page)
interface EventFilterStore {
  filters: EventFilters
  setLocationFilter: (locationId?: string) => void
  setMonthFilter: (month?: number) => void
  setTypeFilter: (typeId?: string) => void
  setPriceFilter: (min?: number, max?: number) => void
  setRadiusFilter: (radius?: number, userLat?: number, userLng?: number) => void
  clearFilters: () => void
  getActiveFiltersCount: () => number
}

export const useEventFilterStore = create<EventFilterStore>((set, get) => ({
  filters: {},
  
  setLocationFilter: (locationId?: string) => {
    set(state => ({
      filters: { ...state.filters, locationId }
    }))
  },
  
  setMonthFilter: (month?: number) => {
    set(state => ({
      filters: { ...state.filters, month }
    }))
  },
  
  setTypeFilter: (typeId?: string) => {
    set(state => ({
      filters: { ...state.filters, typeId }
    }))
  },
  
  setPriceFilter: (priceMin?: number, priceMax?: number) => {
    set(state => ({
      filters: { ...state.filters, priceMin, priceMax }
    }))
  },
  
  setRadiusFilter: (radius?: number, userLat?: number, userLng?: number) => {
    set(state => ({
      filters: { ...state.filters, radius, userLat, userLng }
    }))
  },
  
  clearFilters: () => set({ filters: {} }),
  
  getActiveFiltersCount: () => {
    const filters = get().filters
    return Object.values(filters).filter(value => 
      value !== undefined && value !== null
    ).length
  }
}))

// User authentication state
interface AuthStore {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  clearUser: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  
  setUser: (user: User | null) => {
    set({ user, isLoading: false })
  },
  
  setLoading: (isLoading: boolean) => {
    set({ isLoading })
  },
  
  clearUser: () => {
    set({ user: null, isLoading: false })
  }
}))

// Feature flags store (Phase 2/3 management)
interface FeatureFlagStore {
  flags: {
    RECOMMENDATIONS: boolean
    MEMBERSHIP_PAYWALL: boolean
    VENUE_ANALYTICS_PAID: boolean
    COMMUNITY_FEATURES: boolean
    INFLUENCER_PROGRAM: boolean
  }
  updateFlag: (flag: keyof FeatureFlagStore['flags'], enabled: boolean) => void
}

export const useFeatureFlagStore = create<FeatureFlagStore>((set) => ({
  flags: {
    RECOMMENDATIONS: false,        // Phase 2, Month 6
    MEMBERSHIP_PAYWALL: false,     // Phase 2, Month 3
    VENUE_ANALYTICS_PAID: false,   // Phase 2, Month 3
    COMMUNITY_FEATURES: false,     // Phase 3, Month 7
    INFLUENCER_PROGRAM: false,     // Phase 3, Month 9
  },
  
  updateFlag: (flag, enabled) => {
    set(state => ({
      flags: { ...state.flags, [flag]: enabled }
    }))
  }
}))

// UI state store (modals, loading states, etc.)
interface UIStore {
  isModalOpen: boolean
  modalContent: 'login' | 'review' | 'share' | null
  isPageLoading: boolean
  toastMessage: string | null
  openModal: (content: 'login' | 'review' | 'share') => void
  closeModal: () => void
  setPageLoading: (loading: boolean) => void
  showToast: (message: string) => void
  hideToast: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  isModalOpen: false,
  modalContent: null,
  isPageLoading: false,
  toastMessage: null,
  
  openModal: (content) => {
    set({ isModalOpen: true, modalContent: content })
  },
  
  closeModal: () => {
    set({ isModalOpen: false, modalContent: null })
  },
  
  setPageLoading: (isPageLoading) => {
    set({ isPageLoading })
  },
  
  showToast: (toastMessage) => {
    set({ toastMessage })
    // Auto-hide after 3 seconds
    setTimeout(() => {
      set({ toastMessage: null })
    }, 3000)
  },
  
  hideToast: () => {
    set({ toastMessage: null })
  }
}))

// Custom hooks for easier usage
export const useFeatureFlags = () => {
  const { flags } = useFeatureFlagStore()
  return flags
}

// Quiz flow helpers
export const useQuizProgress = () => {
  const { step, location, month, type, isComplete } = useQuizStore()
  
  const progress = step / 4 * 100
  const canProceed = {
    1: !!location,
    2: !!month,
    3: !!type,
    4: isComplete()
  }
  
  return {
    step,
    progress,
    canProceed: canProceed[step as keyof typeof canProceed],
    isComplete: isComplete()
  }
}