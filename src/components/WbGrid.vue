<template>
  <div class="wb-grid" :class="gridClasses">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  columns: {
    type: [Number, String],
    default: 12
  },
  gap: {
    type: String,
    default: 'medium',
    validator: (value) => ['none', 'small', 'medium', 'large'].includes(value)
  },
  rowGap: {
    type: String,
    default: 'medium',
    validator: (value) => ['none', 'small', 'medium', 'large'].includes(value)
  },
  mobileColumns: {
    type: [Number, String],
    default: 1
  },
  tabletColumns: {
    type: [Number, String],
    default: 2
  }
})

const gapValue = {
  none: '0',
  small: 'var(--wb-spacing-sm)',
  medium: 'var(--wb-spacing-md)',
  large: 'var(--wb-spacing-lg)'
}

const gridClasses = computed(() => ({
  [`wb-grid--gap-${props.gap}`]: true,
  [`wb-grid--row-gap-${props.rowGap}`]: true,
  [`wb-grid--mobile-${props.mobileColumns}`]: true,
  [`wb-grid--tablet-${props.tabletColumns}`]: true
}))

const gridStyle = computed(() => ({
  '--wb-grid-columns': typeof props.columns === 'number' ? props.columns : props.columns,
  '--wb-grid-gap': gapValue[props.gap],
  '--wb-grid-row-gap': gapValue[props.rowGap]
}))
</script>

<style scoped>
.wb-grid {
  display: grid;
  grid-template-columns: repeat(v-bind('typeof columns === "number" ? columns : columns'), 1fr);
  gap: var(--wb-grid-gap, var(--wb-spacing-md));
  row-gap: var(--wb-grid-row-gap, var(--wb-spacing-md));
}

.wb-grid--gap-none {
  gap: 0;
}

.wb-grid--gap-small {
  gap: var(--wb-spacing-sm);
}

.wb-grid--gap-medium {
  gap: var(--wb-spacing-md);
}

.wb-grid--gap-large {
  gap: var(--wb-spacing-lg);
}

.wb-grid--row-gap-none {
  row-gap: 0;
}

.wb-grid--row-gap-small {
  row-gap: var(--wb-spacing-sm);
}

.wb-grid--row-gap-medium {
  row-gap: var(--wb-spacing-md);
}

.wb-grid--row-gap-large {
  row-gap: var(--wb-spacing-lg);
}

@media (max-width: 640px) {
  .wb-grid {
    grid-template-columns: repeat(v-bind('mobileColumns'), 1fr);
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .wb-grid {
    grid-template-columns: repeat(v-bind('tabletColumns'), 1fr);
  }
}
</style>
