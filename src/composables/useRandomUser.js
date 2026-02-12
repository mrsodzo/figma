import { ref } from 'vue'
import { randomUserService } from '../services/randomUserService'

export function useRandomUser() {
  const users = ref([])
  const teamMembers = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Получить случайных пользователей
  const fetchRandomUsers = async (options = {}) => {
    loading.value = true
    error.value = null
    
    try {
      users.value = await randomUserService.getRandomUsers(options)
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  // Получить команду
  const fetchTeamMembers = async (count = 5) => {
    loading.value = true
    error.value = null
    
    try {
      teamMembers.value = await randomUserService.getTeamMembers(count)
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    teamMembers,
    loading,
    error,
    fetchRandomUsers,
    fetchTeamMembers
  }
}
