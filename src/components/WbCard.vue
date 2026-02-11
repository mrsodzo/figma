<template>
    <div class="wb-card" :class="computedCardClasses">
    <div v-if="header" class="wb-card__header">
      <div v-if="header.title" class="wb-card__title">
        {{ header.title }}
      </div>
      <div v-if="header.description" class="wb-card__description">
        {{ header.description }}
      </div>
    </div>
    
    <div class="wb-card__content">
      <slot />
    </div>
    
    <div v-if="footer" class="wb-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  header: {
    type: [Boolean, Object],
    default: false
  },
  footer: {
    type: Boolean,
    default: false
  },
  shadow: {
    type: String,
    default: 'medium',
    validator: (value) => ['none', 'small', 'medium', 'large'].includes(value)
  },
  bordered: {
    type: Boolean,
    default: false
  },
  padding: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
})

const computedCardClasses = computed(() => {
  return [
    'wb-card',
    {
      'wb-card--bordered': props.bordered,
      [`wb-card--shadow-${props.shadow}`]: true,
      [`wb-card--padding-${props.padding}`]: true
    }
  ]
})
</script>

<style scoped>
.wb-card {
  background-color: var(--wb-color-white);
  border-radius: var(--wb-radius-lg);
  overflow: hidden;
  transition: all var(--wb-transition-base);
}

/* Shadow variations */
.wb-card--shadow-none {
  box-shadow: none;
}

.wb-card--shadow-small {
  box-shadow: var(--wb-shadow-sm);
}

.wb-card--shadow-medium {
  box-shadow: var(--wb-shadow-md);
}

.wb-card--shadow-large {
  box-shadow: var(--wb-shadow-lg);
}

/* Bordered variation */
.wb-card--bordered {
  border: 1px solid var(--wb-color-gray-200);
}

/* Padding variations */
.wb-card--padding-small {
  padding: var(--wb-spacing-sm);
}

.wb-card--padding-medium {
  padding: var(--wb-spacing-md);
}

.wb-card--padding-large {
  padding: var(--wb-spacing-lg);
}

/* Header */
.wb-card__header {
  margin-bottom: var(--wb-spacing-md);
  padding-bottom: var(--wb-spacing-md);
  border-bottom: 1px solid var(--wb-color-gray-200);
}

.wb-card__title {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-lg);
  font-weight: var(--wb-font-weight-semibold);
  color: var(--wb-color-gray-900);
  line-height: var(--wb-line-height-lg);
  margin-bottom: var(--wb-spacing-xs);
}

.wb-card__description {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-sm);
  font-weight: var(--wb-font-weight-normal);
  color: var(--wb-color-gray-600);
  line-height: var(--wb-line-height-sm);
}

/* Content */
.wb-card__content {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-base);
  font-weight: var(--wb-font-weight-normal);
  color: var(--wb-color-gray-800);
  line-height: var(--wb-line-height-base);
}

/* Footer */
.wb-card__footer {
  margin-top: var(--wb-spacing-md);
  padding-top: var(--wb-spacing-md);
  border-top: 1px solid var(--wb-color-gray-200);
  display: flex;
  justify-content: flex-end;
  gap: var(--wb-spacing-sm);
}

/* Hover effect */
.wb-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--wb-shadow-lg);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .wb-card__header {
    margin-bottom: var(--wb-spacing-sm);
    padding-bottom: var(--wb-spacing-sm);
  }
  
  .wb-card__footer {
    margin-top: var(--wb-spacing-sm);
    padding-top: var(--wb-spacing-sm);
    flex-direction: column;
    align-items: stretch;
  }
}
</style>