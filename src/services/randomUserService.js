import axios from 'axios'
import { fallbackTeamMembers } from '../utils/fallbackData'

const RANDOM_USER_API_URL = 'https://randomuser.me/api'

// Вспомогательные функции
const positions = [
  'Senior Partner',
  'Associate',
  'Associate Partner',
  'Senior Architect',
  'Design Director',
  'Interior Designer',
  'Project Manager'
]

function getRandomPosition(index) {
  return positions[index % positions.length]
}

function generateRandomBio() {
  const bios = [
    'Passionate about sustainable design and innovative architectural solutions.',
    'With over 15 years of experience in residential and commercial projects.',
    'Specializes in modern minimalist architecture and interior design.',
    'Award-winning architect with a focus on environmentally conscious design.',
    'Expert in transforming spaces to meet unique client needs.'
  ]
  return bios[Math.floor(Math.random() * bios.length)]
}

function generateSocialLinks() {
  return [
    { network: 'linkedin', href: '#', label: 'LinkedIn' },
    { network: 'twitter', href: '#', label: 'Twitter' }
  ]
}

export const randomUserService = {
  // Получить случайных пользователей
  async getRandomUsers(options = {}) {
    const defaultOptions = {
      results: 10,
      gender: null,
      nat: null,
      seed: 'wishbone'
    }

    const params = { ...defaultOptions, ...options }

    try {
      const response = await axios.get(RANDOM_USER_API_URL, { params })
      return response.data.results
    } catch (error) {
      console.error('RandomUser API error:', error)
      throw error // Перебрасываем ошибку, чтобы она была поймана в getTeamMembers
    }
  },

  // Получить одного пользователя
  async getOneUser(seed = 'default') {
    try {
      const response = await axios.get(RANDOM_USER_API_URL, {
        params: { results: 1, seed }
      })
      return response.data.results[0] || null
    } catch (error) {
      console.error('RandomUser get one error:', error)
      return null
    }
  },

  // Получить команду пользователей
  async getTeamMembers(count = 5) {
    try {
      const users = await this.getRandomUsers({ results: count, seed: 'wishbone-team' })
      
      return users.map((user, index) => ({
        id: user.login.uuid,
        name: `${user.name.first} ${user.name.last}`,
        firstName: user.name.first,
        lastName: user.name.last,
        email: user.email,
        phone: user.cell,
        image: user.picture.large,
        imageMedium: user.picture.medium,
        imageThumb: user.picture.thumbnail,
        city: user.location.city,
        country: user.location.country,
        position: getRandomPosition(index),
        bio: generateRandomBio(),
        socialLinks: generateSocialLinks()
      }))
    } catch (error) {
      console.error('RandomUser API error, using fallback data:', error)
      // Возвращаем fallback данные, если API недоступно
      return fallbackTeamMembers.slice(0, count)
    }
  }
}
