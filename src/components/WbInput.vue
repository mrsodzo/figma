<template>
  <div class="wb-input-wrapper" :class="wrapperClasses">
    <label v-if="label" class="wb-input-label" :for="inputId">
      {{ label }}
      <span v-if="required" class="wb-input-required">*</span>
    </label>
    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :class="inputClasses"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <div v-if="hasError" class="wb-input-error-message">
      {{ errorMessage }}
    </div>
    <div v-if="hasSuccess" class="wb-input-success-message">
      {{ successMessage }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'email', 'password', 'number', 'tel', 'url'].includes(value)
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  error: {
    type: Boolean,
    default: false
  },
  success: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: ''
  },
  successMessage: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const inputId = computed(() => props.id || `wb-input-${Math.random().toString(36).substr(2, 9)}`)
const isFocused = ref(false)

const wrapperClasses = computed(() => ({
  'wb-input-wrapper--error': props.error,
  'wb-input-wrapper--success': props.success && !props.error,
  'wb-input-wrapper--disabled': props.disabled,
  'wb-input-wrapper--readonly': props.readonly && !props.disabled
}))

const inputClasses = computed(() => ({
  'wb-input': true,
  'wb-input--focused': isFocused.value,
  'wb-input--error': props.error,
  'wb-input--success': props.success && !props.error,
  'wb-input--disabled': props.disabled,
  'wb-input--readonly': props.readonly && !props.disabled
}))

const hasError = computed(() => props.error && props.errorMessage)
const hasSuccess = computed(() => props.success && props.successMessage)

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const handleFocus = (event) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event) => {
  isFocused.value = false
  emit('blur', event)
}
</script>

<style scoped>
.wb-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--wb-spacing-xs);
  width: 100%;
}

.wb-input-label {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-sm);
  font-weight: var(--wb-font-weight-medium);
  color: var(--wb-color-gray-700);
  line-height: var(--wb-line-height-sm);
}

.wb-input-required {
  color: var(--wb-color-danger-500);
  margin-left: 2px;
}

.wb-input {
  width: 100%;
  padding: var(--wb-spacing-sm) var(--wb-spacing-md);
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-base);
  font-weight: var(--wb-font-weight-normal);
  line-height: var(--wb-line-height-base);
  color: var(--wb-color-gray-900);
  background-color: var(--wb-color-white);
  border: 1px solid var(--wb-color-gray-300);
  border-radius: var(--wb-radius-md);
  transition: all var(--wb-transition-base);
  outline: none;
}

.wb-input::placeholder {
  color: var(--wb-color-gray-400);
}

/* Focus state */
.wb-input--focused {
  border-color: var(--wb-color-primary-500);
  box-shadow: 0 0 0 3px var(--wb-color-primary-200);
}

/* Error state */
.wb-input-wrapper--error .wb-input {
  border-color: var(--wb-color-danger-500);
  background-color: var(--wb-color-danger-50);
}

.wb-input-wrapper--error .wb-input--focused {
  box-shadow: 0 0 0 3px var(--wb-color-danger-200);
}

/* Success state */
.wb-input-wrapper--success .wb-input {
  border-color: var(--wb-color-success-500);
  background-color: var(--wb-color-success-50);
}

.wb-input-wrapper--success .wb-input--focused {
  box-shadow: 0 0 0 3px var(--wb-color-success-200);
}

/* Disabled state */
.wb-input-wrapper--disabled .wb-input {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: var(--wb-color-gray-50);
}

.wb-input-wrapper--disabled .wb-input-label {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Readonly state */
.wb-input-wrapper--readonly .wb-input {
  background-color: var(--wb-color-gray-50);
  cursor: default;
}

/* Error message */
.wb-input-error-message {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-xs);
  font-weight: var(--wb-font-weight-normal);
  color: var(--wb-color-danger-500);
  line-height: var(--wb-line-height-xs);
}

/* Success message */
.wb-input-success-message {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-xs);
  font-weight: var(--wb-font-weight-normal);
  color: var(--wb-color-success-500);
  line-height: var(--wb-line-height-xs);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .wb-input {
    padding: var(--wb-spacing-xs) var(--wb-spacing-sm);
    font-size: var(--wb-font-size-sm);
  }
}
</style>