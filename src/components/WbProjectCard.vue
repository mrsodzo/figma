<template>
  <article class="wb-project-card" :class="cardClasses">
    <div class="wb-project-card__image-wrapper">
      <WbImage
        v-if="image"
        :src="image.src"
        :alt="image.alt || title"
        :lazy="true"
        :rounded="true"
        shadow="medium"
      />
      <div v-if="category" class="wb-project-card__category">
        <WbBadge :variant="categoryVariant">{{ category }}</WbBadge>
      </div>
    </div>
    
    <div class="wb-project-card__content">
      <h3 v-if="title" class="wb-project-card__title">
        {{ title }}
      </h3>
      <p v-if="description" class="wb-project-card__description">
        {{ description }}
      </p>
    </div>
    
    <div v-if="$slots.footer || link" class="wb-project-card__footer">
      <slot name="footer">
        <WbLink
          v-if="link"
          :href="link.href"
          :variant="link.variant || 'primary'"
          underline
        >
          {{ link.text || 'View Project' }}
        </WbLink>
      </slot>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import WbImage from './WbImage.vue'
import WbBadge from './WbBadge.vue'
import WbLink from './WbLink.vue'

const props = defineProps({
  image: {
    type: Object,
    default: null
  },
  category: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  link: {
    type: Object,
    default: null
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'featured', 'minimal'].includes(value)
  },
  categoryVariant: {
    type: String,
    default: 'primary'
  }
})

const cardClasses = computed(() => ({
  [`wb-project-card--${props.variant}`]: true
}))
</script>

<style scoped>
.wb-project-card {
  display: flex;
  flex-direction: column;
  background-color: var(--wb-color-white);
  border-radius: var(--wb-radius-lg);
  overflow: hidden;
  transition: all var(--wb-transition-base);
}

.wb-project-card__image-wrapper {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.wb-project-card__image-wrapper :deep(.wb-image) {
  width: 100%;
  height: 100%;
}

.wb-project-card__image-wrapper :deep(.wb-image img) {
  object-fit: cover;
  transition: transform var(--wb-transition-slow);
}

.wb-project-card:hover .wb-project-card__image-wrapper :deep(.wb-image img) {
  transform: scale(1.05);
}

.wb-project-card__category {
  position: absolute;
  top: var(--wb-spacing-md);
  left: var(--wb-spacing-md);
}

.wb-project-card__content {
  padding: var(--wb-spacing-lg);
  flex: 1;
}

.wb-project-card__title {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-lg);
  font-weight: var(--wb-font-weight-semibold);
  color: var(--wb-color-gray-900);
  line-height: var(--wb-line-height-lg);
  margin-bottom: var(--wb-spacing-sm);
}

.wb-project-card__description {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-sm);
  font-weight: var(--wb-font-weight-normal);
  color: var(--wb-color-gray-600);
  line-height: var(--wb-line-height-base);
}

.wb-project-card__footer {
  padding: var(--wb-spacing-md) var(--wb-spacing-lg);
  border-top: 1px solid var(--wb-color-gray-100);
}

/* Variant: featured */
.wb-project-card--featured .wb-project-card__image-wrapper {
  aspect-ratio: 4 / 3;
}

.wb-project-card--featured .wb-project-card__content {
  padding: var(--wb-spacing-xl);
}

.wb-project-card--featured .wb-project-card__title {
  font-size: var(--wb-font-size-xl);
}

/* Variant: minimal */
.wb-project-card--minimal {
  background-color: transparent;
}

.wb-project-card--minimal .wb-project-card__image-wrapper {
  aspect-ratio: 1;
  border-radius: var(--wb-radius-lg);
}

.wb-project-card--minimal .wb-project-card__content {
  padding: var(--wb-spacing-md);
  text-align: center;
}

/* Hover effect */
.wb-project-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--wb-shadow-lg);
}

.wb-project-card--featured:hover {
  box-shadow: var(--wb-shadow-xl);
}

@media (max-width: 640px) {
  .wb-project-card__content {
    padding: var(--wb-spacing-md);
  }
  
  .wb-project-card__footer {
    padding: var(--wb-spacing-sm) var(--wb-spacing-md);
  }
}
</style>
