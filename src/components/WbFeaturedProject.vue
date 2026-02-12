<template>
  <section class="wb-featured-project" :class="sectionClasses">
    <WbContainer :size="containerSize">
      <div class="wb-featured-project__wrapper">
        <div v-if="image" class="wb-featured-project__image">
          <WbImage
            :src="image.src"
            :alt="image.alt || title"
            :lazy="false"
            :rounded="true"
            shadow="large"
          />
        </div>
        
        <div class="wb-featured-project__content">
          <div v-if="label" class="wb-featured-project__label">
            <WbBadge :variant="labelVariant">{{ label }}</WbBadge>
          </div>
          
          <h2 v-if="title" class="wb-featured-project__title">
            {{ title }}
          </h2>
          
          <p v-if="description" class="wb-featured-project__description">
            {{ description }}
          </p>
          
          <div v-if="$slots.details" class="wb-featured-project__details">
            <slot name="details" />
          </div>
          
          <div v-if="$slots.stats || stats" class="wb-featured-project__stats">
            <slot name="stats">
              <div v-for="(stat, index) in stats" :key="index" class="wb-featured-project__stat">
                <span class="wb-featured-project__stat-value">{{ stat.value }}</span>
                <span class="wb-featured-project__stat-label">{{ stat.label }}</span>
              </div>
            </slot>
          </div>
          
          <div v-if="$slots.actions || actionLink" class="wb-featured-project__actions">
            <slot name="actions">
              <WbButton
                v-if="actionLink"
                :variant="actionLink.variant || 'primary'"
                :size="actionLink.size || 'large'"
                @click="handleAction"
              >
                {{ actionLink.text }}
              </WbButton>
            </slot>
          </div>
        </div>
      </div>
    </WbContainer>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import WbContainer from './WbContainer.vue'
import WbImage from './WbImage.vue'
import WbBadge from './WbBadge.vue'
import WbButton from './WbButton.vue'

const props = defineProps({
  image: {
    type: Object,
    default: null
  },
  label: {
    type: String,
    default: ''
  },
  labelVariant: {
    type: String,
    default: 'primary'
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  stats: {
    type: Array,
    default: () => []
  },
  actionLink: {
    type: Object,
    default: null
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'dark', 'light', 'image-left'].includes(value)
  },
  containerSize: {
    type: String,
    default: 'large'
  }
})

const emit = defineEmits(['action'])

const sectionClasses = computed(() => ({
  [`wb-featured-project--${props.variant}`]: true,
  'wb-featured-project--image-left': props.variant === 'image-left'
}))

const handleAction = () => {
  emit('action')
}
</script>

<style scoped>
.wb-featured-project {
  padding: var(--wb-spacing-2xl) 0;
  background-color: var(--wb-color-gray-50);
}

.wb-featured-project__wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--wb-spacing-xl);
}

.wb-featured-project__image {
  order: 0;
}

.wb-featured-project__image :deep(.wb-image) {
  width: 100%;
}

.wb-featured-project__content {
  order: 1;
  max-width: 600px;
}

.wb-featured-project__label {
  margin-bottom: var(--wb-spacing-md);
}

.wb-featured-project__title {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-3xl);
  font-weight: var(--wb-font-weight-bold);
  color: var(--wb-color-gray-900);
  line-height: var(--wb-line-height-sm);
  margin-bottom: var(--wb-spacing-md);
  letter-spacing: -0.02em;
}

.wb-featured-project__description {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-lg);
  font-weight: var(--wb-font-weight-normal);
  color: var(--wb-color-gray-600);
  line-height: var(--wb-line-height-base);
  margin-bottom: var(--wb-spacing-lg);
}

.wb-featured-project__details {
  margin-bottom: var(--wb-spacing-lg);
}

.wb-featured-project__stats {
  display: flex;
  gap: var(--wb-spacing-lg);
  margin-bottom: var(--wb-spacing-lg);
  flex-wrap: wrap;
}

.wb-featured-project__stat {
  display: flex;
  flex-direction: column;
}

.wb-featured-project__stat-value {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-2xl);
  font-weight: var(--wb-font-weight-bold);
  color: var(--wb-color-primary-500);
  line-height: var(--wb-line-height-sm);
}

.wb-featured-project__stat-label {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-sm);
  font-weight: var(--wb-font-weight-normal);
  color: var(--wb-color-gray-500);
  line-height: var(--wb-line-height-base);
}

.wb-featured-project__actions {
  display: flex;
  gap: var(--wb-spacing-md);
}

/* Variant: dark */
.wb-featured-project--dark {
  background-color: var(--wb-color-gray-800);
}

.wb-featured-project--dark .wb-featured-project__title {
  color: var(--wb-color-white);
}

.wb-featured-project--dark .wb-featured-project__description {
  color: var(--wb-color-gray-300);
}

.wb-featured-project--dark .wb-featured-project__stat-value {
  color: var(--wb-color-primary-400);
}

.wb-featured-project--dark .wb-featured-project__stat-label {
  color: var(--wb-color-gray-400);
}

/* Variant: light */
.wb-featured-project--light {
  background-color: var(--wb-color-white);
}

/* Variant: image-left */
.wb-featured-project--image-left .wb-featured-project__wrapper {
  flex-direction: row;
  align-items: center;
}

.wb-featured-project--image-left .wb-featured-project__image {
  flex: 1;
  max-width: 50%;
}

.wb-featured-project--image-left .wb-featured-project__content {
  flex: 1;
  max-width: 50%;
}

@media (min-width: 1024px) {
  .wb-featured-project__title {
    font-size: var(--wb-font-size-4xl);
  }
  
  .wb-featured-project__stat-value {
    font-size: var(--wb-font-size-3xl);
  }
}

@media (max-width: 768px) {
  .wb-featured-project {
    padding: var(--wb-spacing-xl) 0;
  }
  
  .wb-featured-project__title {
    font-size: var(--wb-font-size-2xl);
  }
  
  .wb-featured-project__stats {
    gap: var(--wb-spacing-md);
  }
  
  .wb-featured-project__actions {
    flex-direction: column;
  }
  
  .wb-featured-project__actions :deep(.wb-button) {
    width: 100%;
  }
  
  .wb-featured-project--image-left .wb-featured-project__wrapper {
    flex-direction: column;
  }
  
  .wb-featured-project--image-left .wb-featured-project__image,
  .wb-featured-project--image-left .wb-featured-project__content {
    max-width: 100%;
  }
}
</style>
