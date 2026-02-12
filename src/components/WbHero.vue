<template>
  <section class="wb-hero" :class="heroClasses">
    <WbContainer :size="containerSize">
      <div class="wb-hero__content">
        <div v-if="badge" class="wb-hero__badge">
          <WbBadge :variant="badgeVariant">{{ badge }}</WbBadge>
        </div>
        
        <h1 v-if="title" class="wb-hero__title">
          {{ title }}
        </h1>
        
        <p v-if="description" class="wb-hero__description">
          {{ description }}
        </p>
        
        <div v-if="$slots.buttons || primaryButton || secondaryButton" class="wb-hero__buttons">
          <slot name="buttons">
            <WbButton
              v-if="primaryButton"
              :variant="primaryButton.variant || 'primary'"
              :size="primaryButton.size || 'large'"
              @click="handlePrimaryClick"
            >
              {{ primaryButton.text }}
            </WbButton>
            <WbButton
              v-if="secondaryButton"
              :variant="secondaryButton.variant || 'outline'"
              :size="secondaryButton.size || 'large'"
              @click="handleSecondaryClick"
            >
              {{ secondaryButton.text }}
            </WbButton>
          </slot>
        </div>
      </div>
      
      <div v-if="image" class="wb-hero__image">
        <WbImage
          :src="image.src"
          :alt="image.alt || title"
          :lazy="false"
          :rounded="true"
          shadow="large"
        />
      </div>
    </WbContainer>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import WbContainer from './WbContainer.vue'
import WbImage from './WbImage.vue'
import WbButton from './WbButton.vue'
import WbBadge from './WbBadge.vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  badge: {
    type: String,
    default: ''
  },
  badgeVariant: {
    type: String,
    default: 'primary'
  },
  image: {
    type: Object,
    default: null
  },
  primaryButton: {
    type: Object,
    default: null
  },
  secondaryButton: {
    type: Object,
    default: null
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'centered', 'dark'].includes(value)
  },
  containerSize: {
    type: String,
    default: 'large'
  }
})

const emit = defineEmits(['primary-click', 'secondary-click'])

const heroClasses = computed(() => ({
  [`wb-hero--${props.variant}`]: true,
  'wb-hero--with-image': !!props.image
}))

const handlePrimaryClick = () => {
  emit('primary-click')
}

const handleSecondaryClick = () => {
  emit('secondary-click')
}
</script>

<style scoped>
.wb-hero {
  padding: var(--wb-spacing-2xl) 0;
  background-color: var(--wb-color-gray-50);
  position: relative;
  overflow: hidden;
}

.wb-hero__content {
  max-width: 600px;
}

.wb-hero__badge {
  margin-bottom: var(--wb-spacing-md);
}

.wb-hero__title {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-4xl);
  font-weight: var(--wb-font-weight-bold);
  line-height: var(--wb-line-height-sm);
  color: var(--wb-color-gray-900);
  margin-bottom: var(--wb-spacing-md);
  letter-spacing: -0.02em;
}

.wb-hero__description {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-lg);
  font-weight: var(--wb-font-weight-normal);
  line-height: var(--wb-line-height-base);
  color: var(--wb-color-gray-600);
  margin-bottom: var(--wb-spacing-lg);
}

.wb-hero__buttons {
  display: flex;
  gap: var(--wb-spacing-md);
  flex-wrap: wrap;
}

.wb-hero__image {
  margin-top: var(--wb-spacing-xl);
}

/* Variant: centered */
.wb-hero--centered {
  text-align: center;
}

.wb-hero--centered .wb-hero__content {
  max-width: 800px;
  margin: 0 auto;
}

.wb-hero--centered .wb-hero__buttons {
  justify-content: center;
}

/* Variant: dark */
.wb-hero--dark {
  background-color: var(--wb-color-gray-800);
}

.wb-hero--dark .wb-hero__title {
  color: var(--wb-color-white);
}

.wb-hero--dark .wb-hero__description {
  color: var(--wb-color-gray-300);
}

/* With image layout */
.wb-hero--with-image .wb-hero__content {
  max-width: 100%;
}

@media (min-width: 1024px) {
  .wb-hero {
    padding: var(--wb-spacing-3xl) 0;
  }
  
  .wb-hero--with-image {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--wb-spacing-2xl);
    align-items: center;
  }
  
  .wb-hero--centered.wb-hero--with-image {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .wb-hero__title {
    font-size: var(--wb-font-size-5xl);
  }
  
  .wb-hero__image {
    margin-top: 0;
  }
}

@media (max-width: 768px) {
  .wb-hero {
    padding: var(--wb-spacing-xl) 0;
  }
  
  .wb-hero__title {
    font-size: var(--wb-font-size-3xl);
  }
  
  .wb-hero__buttons {
    flex-direction: column;
  }
  
  .wb-hero__buttons :deep(.wb-button) {
    width: 100%;
  }
}
</style>
