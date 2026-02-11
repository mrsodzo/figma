<template>
  <button
    v-bind="$attrs"
    :class="buttonClasses"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'ghost'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const isDisabled = computed(() => props.disabled)

const buttonClasses = computed(() => ({
  'wb-button': true,
  'wb-button--primary': props.variant === 'primary',
  'wb-button--secondary': props.variant === 'secondary',
  'wb-button--outline': props.variant === 'outline',
  'wb-button--ghost': props.variant === 'ghost',
  'wb-button--small': props.size === 'small',
  'wb-button--medium': props.size === 'medium',
  'wb-button--large': props.size === 'large',
  'wb-button--disabled': isDisabled.value
}))

const handleClick = (event) => {
  if (!isDisabled.value) {
    emit('click', event)
  }
}
</script>

<style scoped>
.wb-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--wb-spacing-sm) var(--wb-spacing-md);
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-base);
  font-weight: var(--wb-font-weight-medium);
  line-height: var(--wb-line-height-base);
  border: none;
  border-radius: var(--wb-radius-md);
  cursor: pointer;
  transition: all var(--wb-transition-base);
  outline: none;
  white-space: nowrap;
}

/* Variant styles */
.wb-button--primary {
  background-color: var(--wb-color-primary-500);
  color: var(--wb-color-white);
}

.wb-button--primary:hover:not(.wb-button--disabled) {
  background-color: var(--wb-color-primary-600);
  box-shadow: var(--wb-shadow-sm);
}

.wb-button--primary:active:not(.wb-button--disabled) {
  background-color: var(--wb-color-primary-700);
  box-shadow: var(--wb-shadow-md);
}

.wb-button--primary:focus-visible {
  box-shadow: 0 0 0 3px var(--wb-color-primary-200);
}

.wb-button--secondary {
  background-color: var(--wb-color-gray-100);
  color: var(--wb-color-gray-900);
}

.wb-button--secondary:hover:not(.wb-button--disabled) {
  background-color: var(--wb-color-gray-200);
}

.wb-button--secondary:active:not(.wb-button--disabled) {
  background-color: var(--wb-color-gray-300);
}

.wb-button--secondary:focus-visible {
  box-shadow: 0 0 0 3px var(--wb-color-gray-200);
}

.wb-button--outline {
  background-color: transparent;
  color: var(--wb-color-primary-500);
  border: 1px solid var(--wb-color-primary-500);
}

.wb-button--outline:hover:not(.wb-button--disabled) {
  background-color: var(--wb-color-primary-50);
}

.wb-button--outline:active:not(.wb-button--disabled) {
  background-color: var(--wb-color-primary-100);
}

.wb-button--outline:focus-visible {
  box-shadow: 0 0 0 3px var(--wb-color-primary-200);
}

.wb-button--ghost {
  background-color: transparent;
  color: var(--wb-color-gray-700);
}

.wb-button--ghost:hover:not(.wb-button--disabled) {
  background-color: var(--wb-color-gray-100);
}

.wb-button--ghost:active:not(.wb-button--disabled) {
  background-color: var(--wb-color-gray-200);
}

.wb-button--ghost:focus-visible {
  box-shadow: 0 0 0 3px var(--wb-color-gray-200);
}

/* Size styles */
.wb-button--small {
  padding: var(--wb-spacing-xs) var(--wb-spacing-sm);
  font-size: var(--wb-font-size-sm);
}

.wb-button--medium {
  padding: var(--wb-spacing-sm) var(--wb-spacing-md);
  font-size: var(--wb-font-size-base);
}

.wb-button--large {
  padding: var(--wb-spacing-md) var(--wb-spacing-lg);
  font-size: var(--wb-font-size-lg);
}

/* Disabled state */
.wb-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Loading state (optional) */
.wb-button--loading {
  opacity: 0.7;
  cursor: not-allowed;
}

.wb-button--loading::after {
  content: '';
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  margin-left: 8px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>