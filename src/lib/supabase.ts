import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper function to create client (consistent with MASTER_PROMPT pattern)
export const createSupabaseClient = () => supabase

// Mock data helpers for v1 deployment (will be replaced with real Supabase queries)
export const supabaseHelpers = {
  // Mock locations for quiz
  async getLocations() {
    return [
      { id: '1', name: 'Innere Stadt', event_count: 25 },
      { id: '2', name: 'Leopoldstadt', event_count: 18 },
      { id: '3', name: 'Mariahilf', event_count: 12 },
      { id: '4', name: 'Neubau', event_count: 8 },
      { id: '5', name: 'Josefstadt', event_count: 6 }
    ]
  },

  // Mock months for quiz
  async getMonthsForLocation(locationId: string) {
    return [1, 2, 3, 4, 5, 6] // Jan-June 2025
  },

  // Mock event types for quiz
  async getEventTypesForLocationAndMonth(locationId: string, month: number) {
    return [
      { id: '1', name: 'Opera', icon: '🎭' },
      { id: '2', name: 'Classical Concert', icon: '🎼' },
      { id: '3', name: 'Theater', icon: '🎪' },
      { id: '4', name: 'Ballet', icon: '🩰' },
      { id: '5', name: 'Jazz', icon: '🎷' }
    ]
  },

  // Mock events for results
  async getEventsForQuiz(filters: any) {
    return Array.from({ length: 6 }, (_, i) => ({
      id: `event-${i + 1}`,
      title: `Cultural Event ${i + 1}`,
      venue: 'Wiener Staatsoper',
      date: `2025-01-${15 + i}`,
      price: 50 + (i * 10),
      description: 'A wonderful cultural experience awaits you.',
      image: null
    }))
  }
}