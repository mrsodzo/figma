import { ref } from 'vue'
import { unsplashService } from '../services/unsplashService'

export function useUnsplash() {
  const photos = ref([])
  const loading = ref(false)
  const error = ref(null)
  const hasAccessKey = ref(!!import.meta.env.VITE_UNSPLASH_ACCESS_KEY)

  // Получить случайные фото
  const fetchRandomPhotos = async (query = 'architecture', count = 10) => {
    console.log('useUnsplash.fetchRandomPhotos called')
    loading.value = true
    error.value = null
    
    try {
      console.log('Calling unsplashService.getRandomPhotos')
      const result = await unsplashService.getRandomPhotos(query, count)
      console.log('unsplashService.getRandomPhotos result:', result)
      photos.value = result
    } catch (e) {
      console.error('Error in fetchRandomPhotos:', e)
      error.value = e.message
    } finally {
      loading.value = false
      console.log('fetchRandomPhotos completed')
    }
  }

  // Поиск фото
  const searchPhotos = async (query, page = 1) => {
    loading.value = true
    error.value = null
    
    try {
      const result = await unsplashService.searchPhotos(query, page)
      photos.value = result.results
      return result
    } catch (e) {
      error.value = e.message
      return { results: [], total: 0 }
    } finally {
      loading.value = false
    }
  }

  return {
    photos,
    loading,
    error,
    hasAccessKey,
    fetchRandomPhotos,
    searchPhotos
  }
}
