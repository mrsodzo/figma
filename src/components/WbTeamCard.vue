<template>
  <div class="wb-team-card" :class="cardClasses">
    <div class="wb-team-card__image-wrapper">
      <WbImage
        v-if="image"
        :src="image.src"
        :alt="image.alt || name"
        :lazy="true"
        :rounded="true"
        shadow="medium"
      />
      <div v-else class="wb-team-card__placeholder">
        <slot name="placeholder">
          <span class="wb-team-card__initials">{{ initials }}</span>
        </slot>
      </div>
    </div>
    
    <div class="wb-team-card__info">
      <h3 v-if="name" class="wb-team-card__name">
        {{ name }}
      </h3>
      <p v-if="position" class="wb-team-card__position">
        {{ position }}
      </p>
      <p v-if="bio" class="wb-team-card__bio">
        {{ bio }}
      </p>
    </div>
    
    <div v-if="socialLinks && socialLinks.length" class="wb-team-card__social">
      <WbSocialIcon
        v-for="link in socialLinks"
        :key="link.network"
        :network="link.network"
        :href="link.href"
        :label="link.label"
        size="small"
        variant="minimal"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import WbImage from './WbImage.vue'
import WbSocialIcon from './WbSocialIcon.vue'

const props = defineProps({
  image: {
    type: Object,
    default: null
  },
  name: {
    type: String,
    default: ''
  },
  position: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  socialLinks: {
    type: Array,
    default: () => []
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'featured', 'minimal'].includes(value)
  }
})

const initials = computed(() => {
  if (!props.name) return '?'
  return props.name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const cardClasses = computed(() => ({
  [`wb-team-card--${props.variant}`]: true
}))
</script>

<style scoped>
.wb-team-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--wb-spacing-lg);
  background-color: var(--wb-color-white);
  border-radius: var(--wb-radius-lg);
  transition: all var(--wb-transition-base);
}

.wb-team-card__image-wrapper {
  width: 120px;
  height: 120px;
  margin-bottom: var(--wb-spacing-md);
  border-radius: var(--wb-radius-full);
  overflow: hidden;
}

.wb-team-card__image-wrapper :deep(.wb-image) {
  width: 100%;
  height: 100%;
}

.wb-team-card__image-wrapper :deep(.wb-image img) {
  object-fit: cover;
}

.wb-team-card__placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--wb-color-primary-100);
  color: var(--wb-color-primary-600);
}

.wb-team-card__initials {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-2xl);
  font-weight: var(--wb-font-weight-bold);
}

.wb-team-card__info {
  margin-bottom: var(--wb-spacing-md);
}

.wb-team-card__name {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-lg);
  font-weight: var(--wb-font-weight-semibold);
  color: var(--wb-color-gray-900);
  line-height: var(--wb-line-height-lg);
  margin-bottom: var(--wb-spacing-xs);
}

.wb-team-card__position {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-sm);
  font-weight: var(--wb-font-weight-medium);
  color: var(--wb-color-primary-500);
  line-height: var(--wb-line-height-base);
  margin-bottom: var(--wb-spacing-sm);
}

.wb-team-card__bio {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-sm);
  font-weight: var(--wb-font-weight-normal);
  color: var(--wb-color-gray-600);
  line-height: var(--wb-line-height-base);
}

.wb-team-card__social {
  display: flex;
  gap: var(--wb-spacing-sm);
}

/* Variant: featured */
.wb-team-card--featured {
  padding: var(--wb-spacing-xl);
}

.wb-team-card--featured .wb-team-card__image-wrapper {
  width: 160px;
  height: 160px;
}

/* Variant: minimal */
.wb-team-card--minimal {
  padding: var(--wb-spacing-md);
  background-color: transparent;
}

.wb-team-card--minimal .wb-team-card__image-wrapper {
  width: 80px;
  height: 80px;
}

/* Hover effect */
.wb-team-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--wb-shadow-lg);
}

.wb-team-card--featured:hover {
  box-shadow: var(--wb-shadow-xl);
}

@media (max-width: 640px) {
  .wb-team-card {
    padding: var(--wb-spacing-md);
  }
  
  .wb-team-card__image-wrapper {
    width: 100px;
    height: 100px;
  }
}
</style>
