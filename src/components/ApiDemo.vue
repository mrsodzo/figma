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
        
        <div v-if="!unsplash.hasAccessKey" class="warning">
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

          <div v-if="unsplash.error" class="error">
            {{ unsplash.error }}
          </div>

          <div v-if="unsplash.photos.value && unsplash.photos.value.length > 0">
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
      </div>

      <WbSpacer size="2xl" />

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

        <div v-if="randomUser.error" class="error">
          {{ randomUser.error }}
        </div>

        <div v-if="randomUser.teamMembers.value && randomUser.teamMembers.value.length > 0">
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
  console.log('loadArchitecturePhotos called')
  unsplash.fetchRandomPhotos('architecture interior design', 6).then(() => {
    console.log('unsplash.photos:', unsplash.photos.value)
  }).catch(err => {
    console.error('Error loading photos:', err)
  })
}

const loadTeamMembers = () => {
  console.log('loadTeamMembers called')
  randomUser.fetchTeamMembers(5).then(() => {
    console.log('randomUser.teamMembers:', randomUser.teamMembers.value)
  }).catch(err => {
    console.error('Error loading team members:', err)
  })
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
