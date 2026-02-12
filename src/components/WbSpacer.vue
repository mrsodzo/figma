<template>
  <div class="wb-spacer" :style="spacerStyle" />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['none', 'xs', 'sm', 'medium', 'lg', 'xl', '2xl', '3xl'].includes(value)
  },
  axis: {
    type: String,
    default: 'vertical',
    validator: (value) => ['horizontal', 'vertical', 'both'].includes(value)
  }
})

const spacingValues = {
  none: '0',
  xs: 'var(--wb-spacing-xs)',
  sm: 'var(--wb-spacing-sm)',
  medium: 'var(--wb-spacing-md)',
  lg: 'var(--wb-spacing-lg)',
  xl: 'var(--wb-spacing-xl)',
  '2xl': 'var(--wb-spacing-2xl)',
  '3xl': 'var(--wb-spacing-3xl)'
}

const spacerStyle = computed(() => {
  const size = spacingValues[props.size] || spacingValues.medium
  
  if (props.axis === 'horizontal') {
    return { width: size, height: 'auto' }
  } else if (props.axis === 'vertical') {
    return { width: 'auto', height: size }
  } else {
    return { width: size, height: size }
  }
})
</script>

<style scoped>
.wb-spacer {
  display: block;
  flex-shrink: 0;
}
</style>
