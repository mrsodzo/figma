<template>
  <div class="wb-container" :class="containerClasses">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large', 'full'].includes(value)
  },
  fluid: {
    type: Boolean,
    default: false
  }
})

const containerClasses = computed(() => ({
  'wb-container--fluid': props.fluid,
  [`wb-container--${props.size}`]: props.size !== 'medium'
}))
</script>

<style scoped>
.wb-container {
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--wb-spacing-md);
}

.wb-container--fluid {
  max-width: 100%;
}

.wb-container--small {
  max-width: 640px;
}

.wb-container--medium {
  max-width: 1200px;
}

.wb-container--large {
  max-width: 1400px;
}

.wb-container--full {
  max-width: 100%;
}

@media (max-width: 768px) {
  .wb-container {
    padding: 0 var(--wb-spacing-sm);
  }
}
</style>
