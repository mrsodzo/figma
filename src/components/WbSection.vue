<template>
  <section class="wb-section" :class="sectionClasses">
    <div v-if="$slots.default" class="wb-section__container">
      <slot />
    </div>
    <slot v-else />
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'primary', 'secondary', 'dark'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  padding: {
    type: Boolean,
    default: true
  }
})

const sectionClasses = computed(() => ({
  'wb-section--padding': props.padding,
  [`wb-section--${props.variant}`]: true,
  [`wb-section--${props.size}`]: true
}))
</script>

<style scoped>
.wb-section {
  width: 100%;
  position: relative;
}

.wb-section__container {
  max-width: var(--wb-container-max-width, 1200px);
  margin: 0 auto;
  padding: 0 var(--wb-spacing-md);
}

.wb-section--padding .wb-section__container {
  padding: var(--wb-spacing-md);
}

/* Size variations */
.wb-section--small {
  padding-top: var(--wb-spacing-lg);
  padding-bottom: var(--wb-spacing-lg);
}

.wb-section--medium {
  padding-top: var(--wb-spacing-xl);
  padding-bottom: var(--wb-spacing-xl);
}

.wb-section--large {
  padding-top: var(--wb-spacing-2xl);
  padding-bottom: var(--wb-spacing-2xl);
}

/* Variant variations */
.wb-section--default {
  background-color: var(--wb-color-gray-50);
}

.wb-section--primary {
  background-color: var(--wb-color-primary-50);
}

.wb-section--secondary {
  background-color: var(--wb-color-gray-100);
}

.wb-section--dark {
  background-color: var(--wb-color-gray-800);
  color: var(--wb-color-white);
}

.wb-section--dark .wb-section__container {
  color: inherit;
}

@media (max-width: 768px) {
  .wb-section--small {
    padding-top: var(--wb-spacing-md);
    padding-bottom: var(--wb-spacing-md);
  }
  
  .wb-section--medium {
    padding-top: var(--wb-spacing-lg);
    padding-bottom: var(--wb-spacing-lg);
  }
  
  .wb-section--large {
    padding-top: var(--wb-spacing-xl);
    padding-bottom: var(--wb-spacing-xl);
  }
  
  .wb-section__container {
    padding: 0 var(--wb-spacing-sm);
  }
}
</style>
