<template>
  <span class="wb-badge" :class="badgeClasses">
    <slot />
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'danger', 'warning', 'info'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  rounded: {
    type: Boolean,
    default: false
  },
  outline: {
    type: Boolean,
    default: false
  }
})

const badgeClasses = computed(() => ({
  'wb-badge--rounded': props.rounded,
  'wb-badge--outline': props.outline,
  [`wb-badge--${props.variant}`]: true,
  [`wb-badge--${props.size}`]: true
}))
</script>

<style scoped>
.wb-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--wb-font-family-base);
  font-weight: var(--wb-font-weight-medium);
  line-height: 1;
  border-radius: var(--wb-radius-sm);
  white-space: nowrap;
}

/* Size variations */
.wb-badge--small {
  padding: 2px 6px;
  font-size: var(--wb-font-size-xs);
}

.wb-badge--medium {
  padding: 4px 8px;
  font-size: var(--wb-font-size-sm);
}

.wb-badge--large {
  padding: 6px 12px;
  font-size: var(--wb-font-size-base);
}

/* Rounded variation */
.wb-badge--rounded {
  border-radius: var(--wb-radius-full);
}

/* Primary variant */
.wb-badge--primary {
  background-color: var(--wb-color-primary-100);
  color: var(--wb-color-primary-700);
}

.wb-badge--primary.wb-badge--outline {
  background-color: transparent;
  border: 1px solid var(--wb-color-primary-500);
  color: var(--wb-color-primary-500);
}

/* Secondary variant */
.wb-badge--secondary {
  background-color: var(--wb-color-gray-100);
  color: var(--wb-color-gray-700);
}

.wb-badge--secondary.wb-badge--outline {
  background-color: transparent;
  border: 1px solid var(--wb-color-gray-500);
  color: var(--wb-color-gray-500);
}

/* Success variant */
.wb-badge--success {
  background-color: var(--wb-color-success-100);
  color: var(--wb-color-success-700);
}

.wb-badge--success.wb-badge--outline {
  background-color: transparent;
  border: 1px solid var(--wb-color-success-500);
  color: var(--wb-color-success-500);
}

/* Danger variant */
.wb-badge--danger {
  background-color: var(--wb-color-danger-100);
  color: var(--wb-color-danger-700);
}

.wb-badge--danger.wb-badge--outline {
  background-color: transparent;
  border: 1px solid var(--wb-color-danger-500);
  color: var(--wb-color-danger-500);
}

/* Warning variant */
.wb-badge--warning {
  background-color: var(--wb-color-warning-100);
  color: var(--wb-color-warning-700);
}

.wb-badge--warning.wb-badge--outline {
  background-color: transparent;
  border: 1px solid var(--wb-color-warning-500);
  color: var(--wb-color-warning-500);
}

/* Info variant */
.wb-badge--info {
  background-color: var(--wb-color-info-100);
  color: var(--wb-color-info-700);
}

.wb-badge--info.wb-badge--outline {
  background-color: transparent;
  border: 1px solid var(--wb-color-info-500);
  color: var(--wb-color-info-500);
}
</style>
