<template>
  <component
    :is="tag"
    :to="isRouterLink ? to : undefined"
    :href="!isRouterLink ? href : undefined"
    :class="linkClasses"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  href: {
    type: String,
    default: ''
  },
  to: {
    type: [String, Object],
    default: ''
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'muted', 'inverse'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  underline: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const isRouterLink = computed(() => props.to !== '')

const tag = computed(() => {
  if (props.disabled) {
    return 'span'
  }
  return props.to ? 'router-link' : 'a'
})

const linkClasses = computed(() => ({
  'wb-link': true,
  'wb-link--underline': props.underline,
  'wb-link--disabled': props.disabled,
  [`wb-link--${props.variant}`]: true,
  [`wb-link--${props.size}`]: true
}))

const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped>
.wb-link {
  display: inline-flex;
  align-items: center;
  font-family: var(--wb-font-family-base);
  font-weight: var(--wb-font-weight-medium);
  text-decoration: none;
  cursor: pointer;
  transition: all var(--wb-transition-base);
  border: none;
  background: none;
  padding: 0;
}

/* Size variations */
.wb-link--small {
  font-size: var(--wb-font-size-sm);
}

.wb-link--medium {
  font-size: var(--wb-font-size-base);
}

.wb-link--large {
  font-size: var(--wb-font-size-lg);
}

/* Underline variation */
.wb-link--underline {
  text-decoration: underline;
}

/* Disabled state */
.wb-link--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Variant variations */
.wb-link--primary {
  color: var(--wb-color-primary-500);
}

.wb-link--primary:hover:not(.wb-link--disabled) {
  color: var(--wb-color-primary-600);
}

.wb-link--primary:active:not(.wb-link--disabled) {
  color: var(--wb-color-primary-700);
}

.wb-link--secondary {
  color: var(--wb-color-gray-700);
}

.wb-link--secondary:hover:not(.wb-link--disabled) {
  color: var(--wb-color-gray-900);
}

.wb-link--secondary:active:not(.wb-link--disabled) {
  color: var(--wb-color-gray-800);
}

.wb-link--muted {
  color: var(--wb-color-gray-500);
}

.wb-link--muted:hover:not(.wb-link--disabled) {
  color: var(--wb-color-gray-600);
}

.wb-link--inverse {
  color: var(--wb-color-white);
}

.wb-link--inverse:hover:not(.wb-link--disabled) {
  color: var(--wb-color-gray-200);
}

.wb-link--inverse:active:not(.wb-link--disabled) {
  color: var(--wb-color-gray-300);
}
</style>
