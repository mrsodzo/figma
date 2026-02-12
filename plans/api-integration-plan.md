# План интеграции API в проект Wishbone

## Обзор интеграции

### Цели интеграции
1. Заменить статические данные на динамические из API
2. Продемонстрировать возможности компонентов в работе с реальными данными
3. Создать демонстрационную страницу с реальными API-запросами
4. Сохранить обратную совместимость с существующим контентом

### Рекомендуемая структура
```
src/
├── services/
│   ├── unsplashService.js    # Сервис для работы с Unsplash API
│   └── randomUserService.js   # Сервис для работы с RandomUser API
├── composables/
│   ├── useUnsplash.js        # Vue composable для Unsplash
│   └── useRandomUser.js      # Vue composable для RandomUser
├── components/
│   └── ApiDemo.vue           # Компонент для демонстрации API
├── App.vue                    # Обновить с интеграцией API
└── main.js                    # Добавить загрузку шрифтов
```

---

## Этап 1: Подготовка проекта

### 1.1 Установка дополнительных зависимостей
```bash
npm install axios
```

### 1.2 Настройка конфигурации API
Создать файл `.env` для хранения ключей:
```
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

### 1.3 Обновление vite.config.js
Добавить поддержку переменных окружения:
```javascript
export default defineConfig({
  plugins: [vue()],
  define: {
    'import.meta.env.VITE_UNSPLASH_ACCESS_KEY': JSON.stringify(process.env.VITE_UNSPLASH_ACCESS_KEY)
  }
})
```

---

## Этап 2: Создание сервисов API

### 2.1 Сервис Unsplash (src/services/unsplashService.js)

```javascript
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
    try {
      const response = await unsplashClient.get('/photos/random', {
        params: {
          query,
          count,
          orientation: 'landscape'
        }
      })
      return response.data
    } catch (error) {
      console.error('Unsplash API error:', error)
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
```

### 2.2 Сервис RandomUser (src/services/randomUserService.js)

```javascript
import axios from 'axios'

const RANDOM_USER_API_URL = 'https://randomuser.me/api'

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
      return []
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
      socialLinks: generateSocialLinks(user)
    }))
  }
}

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

function generateSocialLinks(user) {
  return [
    { network: 'linkedin', href: '#', label: 'LinkedIn' },
    { network: 'twitter', href: '#', label: 'Twitter' }
  ]
}
```

---

## Этап 3: Создание Vue Composables

### 3.1 Composables для Unsplash (src/composables/useUnsplash.js)

```javascript
import { ref, computed } from 'vue'
import { unsplashService } from '../services/unsplashService'

export function useUnsplash() {
  const photos = ref([])
  const loading = ref(false)
  const error = ref(null)
  const hasAccessKey = ref(!!import.meta.env.VITE_UNSPLASH_ACCESS_KEY)

  // Получить случайные фото
  const fetchRandomPhotos = async (query = 'architecture', count = 10) => {
    loading.value = true
    error.value = null
    
    try {
      photos.value = await unsplashService.getRandomPhotos(query, count)
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
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
```

### 3.2 Composables для RandomUser (src/composables/useRandomUser.js)

```javascript
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
```

---

## Этап 4: Создание компонента API Demo

### 4.1 Компонент ApiDemo.vue (src/components/ApiDemo.vue)

```vue
<template>
  <section class="api-demo">
    <WbContainer>
      <WbSectionHeader
        title="API Integration Demo"
        subtitle="Demonstrating dynamic data loading from external APIs"
        level="h2"
        align="center"
        size="large"
      />

      <!-- Unsplash Demo Section -->
      <div class="demo-section">
        <h3 class="demo-title">Unsplash Architecture Photos</h3>
        
        <div v-if="!unsplash.hasAccessKey.value" class="warning">
          ⚠️ Please add VITE_UNSPLASH_ACCESS_KEY to your .env file
        </div>
        
        <div v-else>
          <WbButton 
            variant="primary" 
            :loading="unsplash.loading.value"
            @click="loadArchitecturePhotos"
          >
            Load Architecture Photos
          </WbButton>

          <div v-if="unsplash.error.value" class="error">
            {{ unsplash.error.value }}
          </div>

          <WbGrid :columns="3" gap="medium" :mobile-columns="1" :tablet-columns="2">
            <WbCard
              v-for="photo in unsplash.photos.value"
              :key="photo.id"
              shadow="medium"
              :padding="'small'"
            >
              <template #default>
                <WbImage
                  :src="photo.urls.regular"
                  :alt="photo.description || 'Architecture'"
                  :rounded="true"
                />
                <p class="photo-credit">
                  Photo by 
                  <a :href="photo.user.links.html" target="_blank">
                    {{ photo.user.name }}
                  </a>
                </p>
              </template>
            </WbCard>
          </WbGrid>
        </div>
      </div>

      <WbSpacer size="large" />

      <!-- RandomUser Demo Section -->
      <div class="demo-section">
        <h3 class="demo-title">Team Members from RandomUser API</h3>
        
        <WbButton 
          variant="secondary" 
          :loading="randomUser.loading.value"
          @click="loadTeamMembers"
        >
          Generate Team Members
        </WbButton>

        <div v-if="randomUser.error.value" class="error">
          {{ randomUser.error.value }}
        </div>

        <WbGrid :columns="5" gap="medium" :mobile-columns="1" :tablet-columns="2">
          <WbTeamCard
            v-for="member in randomUser.teamMembers.value"
            :key="member.id"
            :image="{ src: member.image, alt: member.name }"
            :name="member.name"
            :position="member.position"
            :bio="member.bio"
            :social-links="member.socialLinks"
            variant="default"
          />
        </WbGrid>
      </div>
    </WbContainer>
  </section>
</template>

<script setup>
import { useUnsplash } from '../composables/useUnsplash'
import { useRandomUser } from '../composables/useRandomUser'
import WbContainer from './WbContainer.vue'
import WbSection from './WbSection.vue'
import WbSectionHeader from './WbSectionHeader.vue'
import WbGrid from './WbGrid.vue'
import WbCard from './WbCard.vue'
import WbImage from './WbImage.vue'
import WbButton from './WbButton.vue'
import WbTeamCard from './WbTeamCard.vue'
import WbSpacer from './WbSpacer.vue'

const unsplash = useUnsplash()
const randomUser = useRandomUser()

const loadArchitecturePhotos = () => {
  unsplash.fetchRandomPhotos('architecture interior design', 6)
}

const loadTeamMembers = () => {
  randomUser.fetchTeamMembers(5)
}
</script>

<style scoped>
.api-demo {
  padding: var(--wb-spacing-2xl) 0;
}

.demo-section {
  margin-bottom: var(--wb-spacing-2xl);
}

.demo-title {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-xl);
  font-weight: var(--wb-font-weight-semibold);
  color: var(--wb-color-gray-900);
  margin-bottom: var(--wb-spacing-lg);
}

.warning {
  padding: var(--wb-spacing-md);
  background-color: var(--wb-color-warning-50);
  color: var(--wb-color-warning-700);
  border-radius: var(--wb-radius-md);
  margin-bottom: var(--wb-spacing-lg);
}

.error {
  padding: var(--wb-spacing-md);
  background-color: var(--wb-color-danger-50);
  color: var(--wb-color-danger-700);
  border-radius: var(--wb-radius-md);
  margin: var(--wb-spacing-lg) 0;
}

.photo-credit {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-xs);
  color: var(--wb-color-gray-600);
  margin-top: var(--wb-spacing-sm);
}

.photo-credit a {
  color: var(--wb-color-primary-600);
  text-decoration: none;
}

.photo-credit a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .demo-section {
    margin-bottom: var(--wb-spacing-xl);
  }
}
</style>
```

---

## Этап 5: Интеграция в App.vue

### 5.1 Обновление App.vue

```vue
<template>
  <div class="app-container">
    <!-- Существующие секции остаются без изменений -->
    
    <!-- Новая секция API Demo -->
    <ApiDemo />
  </div>
</template>

<script setup>
import ApiDemo from './components/ApiDemo.vue'
// ... остальные импорты
</script>
```

---

## Этап 6: Альтернативные сценарии использования

### 6.1 Полная интеграция с Unsplash

Заменить статические изображения на динамические:

```vue
<script setup>
const featuredProjects = ref([])

onMounted(async () => {
  const result = await unsplashService.searchPhotos('modern architecture', 1, 3)
  featuredProjects.value = result.results.map(photo => ({
    src: photo.urls.regular,
    alt: photo.alt_description,
    title: photo.description || 'Modern Architecture Project',
    credit: photo.user.name
  }))
})
</script>
```

### 6.2 Гибридный подход

Использовать API как fallback для статических данных:

```vue
<script setup>
const teamMembers = ref([
  // Статические данные
  { name: 'Stephen Collier', position: 'Senior Partner', image: '/static/photo1.jpg' },
  // Динамические данные из API
  ...dynamicTeamMembers.value
])
</script>
```

---

## Этап 7: Обработка ошибок и edge cases

### 7.1 Fallback данные

Создать файл fallbackData.js с резервными данными:

```javascript
export const fallbackArchitecturePhotos = [
  {
    id: 'fallback-1',
    urls: {
      regular: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
    },
    user: { name: 'Fallback Architect' },
    description: 'Sample architecture photo'
  }
  // ... дополнительные fallback изображения
]

export const fallbackTeamMembers = [
  {
    id: 'fallback-1',
    name: 'Fallback Member',
    position: 'Senior Partner',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    bio: 'Sample bio text'
  }
]
```

### 7.2 Политика повторных запросов

```javascript
async function fetchWithRetry(service, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await service()
    } catch (error) {
      if (i === maxRetries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)))
    }
  }
}
```

---

## Checklist интеграции

- [ ] Установить axios
- [ ] Создать .env файл с ключом Unsplash
- [ ] Создать папку services/
- [ ] Реализовать unsplashService.js
- [ ] Реализовать randomUserService.js
- [ ] Создать папку composables/
- [ ] Реализовать useUnsplash.js
- [ ] Реализовать useRandomUser.js
- [ ] Создать компонент ApiDemo.vue
- [ ] Интегрировать ApiDemo в App.vue
- [ ] Протестировать интеграцию
- [ ] Добавить обработку ошибок
- [ ] Добавить fallback данные
- [ ] Обновить документацию

---

## Дополнительные API для рассмотрения

### Pexels API
Альтернатива Unsplash с похожими возможностями. Может использоваться как дополнительный источник изображений.

### JSONPlaceholder API
Для демонстрации работы с текстовыми данными (новости, посты, комментарии) в блоговой секции.

### REST Countries API
Для получения информации о странах и городах, что может быть полезно для локаций проектов.
