<template>
  <div class="wb-process-card" :class="cardClasses">
    <div class="wb-process-card__number">
      {{ formattedNumber }}
    </div>
    <div class="wb-process-card__content">
      <h3 v-if="title" class="wb-process-card__title">
        {{ title }}
      </h3>
      <p v-if="description" class="wb-process-card__description">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  number: {
    type: [Number, String],
    default: 1
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'primary', 'outline'].includes(value)
  }
})

const formattedNumber = computed(() => {
  if (typeof props.number === 'number') {
    return props.number.toString().padStart(2, '0')
  }
  return props.number
})

const cardClasses = computed(() => ({
  [`wb-process-card--${props.variant}`]: true
}))
</script>

<style scoped>
.wb-process-card {
  display: flex;
  gap: var(--wb-spacing-lg);
  padding: var(--wb-spacing-lg);
  background-color: var(--wb-color-white);
  border-radius: var(--wb-radius-lg);
  transition: all var(--wb-transition-base);
}

.wb-process-card__number {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-lg);
  font-weight: var(--wb-font-weight-bold);
  color: var(--wb-color-primary-500);
  background-color: var(--wb-color-primary-50);
  border-radius: var(--wb-radius-full);
}

.wb-process-card__content {
  flex: 1;
}

.wb-process-card__title {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-lg);
  font-weight: var(--wb-font-weight-semibold);
  color: var(--wb-color-gray-900);
  line-height: var(--wb-line-height-lg);
  margin-bottom: var(--wb-spacing-xs);
}

.wb-process-card__description {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-base);
  font-weight: var(--wb-font-weight-normal);
  color: var(--wb-color-gray-600);
  line-height: var(--wb-line-height-base);
}

/* Variant: outline */
.wb-process-card--outline {
  background-color: transparent;
  border: 1px solid var(--wb-color-gray-200);
}

.wb-process-card--outline .wb-process-card__number {
  background-color: var(--wb-color-gray-100);
  color: var(--wb-color-gray-600);
}

/* Variant: primary */
.wb-process-card--primary .wb-process-card__number {
  background-color: var(--wb-color-primary-500);
  color: var(--wb-color-white);
}

/* Hover effect */
.wb-process-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--wb-shadow-lg);
}

.wb-process-card--outline:hover {
  border-color: var(--wb-color-primary-200);
}

@media (max-width: 640px) {
  .wb-process-card {
    gap: var(--wb-spacing-md);
    padding: var(--wb-spacing-md);
  }
  
  .wb-process-card__number {
    width: 40px;
    height: 40px;
    font-size: var(--wb-font-size-base);
  }
}
</style>
