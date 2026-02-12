import axios from 'axios'

const UNSPLASH_API_URL = 'https://api.unsplash.com'
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || ''

const unsplashClient = axios.create({
  baseURL: UNSPLASH_API_URL,
  headers: {
    'Authorization': `Client-ID ${ACCESS_KEY}`
  }
})

export const unsplashService = {
  // Получить случайные изображения по запросу
  async getRandomPhotos(query = 'architecture', count = 10) {
    console.log('unsplashService.getRandomPhotos called with query:', query, 'count:', count)
    try {
      console.log('Unsplash API URL:', `${UNSPLASH_API_URL}/photos/random`)
      const response = await unsplashClient.get('/photos/random', {
        params: {
          query,
          count,
          orientation: 'landscape'
        }
      })
      console.log('Unsplash API response status:', response.status)
      console.log('Unsplash API response data:', response.data)
      return response.data
    } catch (error) {
      console.error('Unsplash API error:', error)
      if (error.response) {
        console.error('Error response status:', error.response.status)
        console.error('Error response data:', error.response.data)
      }
      return []
    }
  },

  // Поиск изображений
  async searchPhotos(query, page = 1, perPage = 20) {
    try {
      const response = await unsplashClient.get('/search/photos', {
        params: {
          query,
          page,
          per_page: perPage
        }
      })
      return response.data
    } catch (error) {
      console.error('Unsplash search error:', error)
      return { results: [], total: 0 }
    }
  },

  // Получить конкретное изображение
  async getPhoto(photoId) {
    try {
      const response = await unsplashClient.get(`/photos/${photoId}`)
      return response.data
    } catch (error) {
      console.error('Unsplash get photo error:', error)
      return null
    }
  },

  // Получить изображения коллекции
  async getCollectionPhotos(collectionId, page = 1) {
    try {
      const response = await unsplashClient.get(`/collections/${collectionId}/photos`, {
        params: { page, per_page: 20 }
      })
      return response.data
    } catch (error) {
      console.error('Unsplash collection error:', error)
      return []
    }
  }
}
