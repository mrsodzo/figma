<template>
  <section class="wb-cta" :class="sectionClasses">
    <WbContainer :size="containerSize">
      <div class="wb-cta__wrapper">
        <div v-if="icon" class="wb-cta__icon">
          <slot name="icon">
            <span class="wb-cta__icon-fallback">{{ icon }}</span>
          </slot>
        </div>
        
        <div class="wb-cta__content">
          <h2 v-if="title" class="wb-cta__title">
            {{ title }}
          </h2>
          <p v-if="description" class="wb-cta__description">
            {{ description }}
          </p>
        </div>
        
        <div v-if="$slots.actions || primaryAction || secondaryAction" class="wb-cta__actions">
          <slot name="actions">
            <WbButton
              v-if="primaryAction"
              :variant="primaryAction.variant || 'primary'"
              :size="primaryAction.size || 'large'"
              @click="handlePrimaryAction"
            >
              {{ primaryAction.text }}
            </WbButton>
            <WbButton
              v-if="secondaryAction"
              :variant="secondaryAction.variant || 'outline'"
              :size="secondaryAction.size || 'large'"
              @click="handleSecondaryAction"
            >
              {{ secondaryAction.text }}
            </WbButton>
          </slot>
        </div>
      </div>
    </WbContainer>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import WbContainer from './WbContainer.vue'
import WbButton from './WbButton.vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  primaryAction: {
    type: Object,
    default: null
  },
  secondaryAction: {
    type: Object,
    default: null
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'primary', 'dark', 'light', 'gradient'].includes(value)
  },
  containerSize: {
    type: String,
    default: 'large'
  }
})

const emit = defineEmits(['primary-action', 'secondary-action'])

const sectionClasses = computed(() => ({
  [`wb-cta--${props.variant}`]: true
}))

const handlePrimaryAction = () => {
  emit('primary-action')
}

const handleSecondaryAction = () => {
  emit('secondary-action')
}
</script>

<style scoped>
.wb-cta {
  padding: var(--wb-spacing-xl) 0;
  background-color: var(--wb-color-gray-50);
  border-radius: var(--wb-radius-lg);
}

.wb-cta__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--wb-spacing-lg);
}

.wb-cta__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background-color: var(--wb-color-primary-100);
  border-radius: var(--wb-radius-full);
  color: var(--wb-color-primary-500);
}

.wb-cta__icon-fallback {
  font-size: var(--wb-font-size-2xl);
}

.wb-cta__content {
  max-width: 600px;
}

.wb-cta__title {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-2xl);
  font-weight: var(--wb-font-weight-bold);
  color: var(--wb-color-gray-900);
  line-height: var(--wb-line-height-sm);
  margin-bottom: var(--wb-spacing-sm);
}

.wb-cta__description {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-lg);
  font-weight: var(--wb-font-weight-normal);
  color: var(--wb-color-gray-600);
  line-height: var(--wb-line-height-base);
}

.wb-cta__actions {
  display: flex;
  gap: var(--wb-spacing-md);
  flex-wrap: wrap;
  justify-content: center;
}

/* Variant: primary */
.wb-cta--primary {
  background-color: var(--wb-color-primary-500);
}

.wb-cta--primary .wb-cta__icon {
  background-color: rgba(255, 255, 255, 0.2);
  color: var(--wb-color-white);
}

.wb-cta--primary .wb-cta__title {
  color: var(--wb-color-white);
}

.wb-cta--primary .wb-cta__description {
  color: rgba(255, 255, 255, 0.8);
}

/* Variant: dark */
.wb-cta--dark {
  background-color: var(--wb-color-gray-800);
}

.wb-cta--dark .wb-cta__icon {
  background-color: var(--wb-color-gray-700);
  color: var(--wb-color-white);
}

.wb-cta--dark .wb-cta__title {
  color: var(--wb-color-white);
}

.wb-cta--dark .wb-cta__description {
  color: var(--wb-color-gray-300);
}

/* Variant: light */
.wb-cta--light {
  background-color: var(--wb-color-white);
  border: 1px solid var(--wb-color-gray-200);
}

.wb-cta--light .wb-cta__icon {
  background-color: var(--wb-color-gray-100);
  color: var(--wb-color-gray-600);
}

/* Variant: gradient */
.wb-cta--gradient {
  background: linear-gradient(135deg, var(--wb-color-primary-500), var(--wb-color-primary-700));
}

.wb-cta--gradient .wb-cta__icon {
  background-color: rgba(255, 255, 255, 0.2);
  color: var(--wb-color-white);
}

.wb-cta--gradient .wb-cta__title {
  color: var(--wb-color-white);
}

.wb-cta--gradient .wb-cta__description {
  color: rgba(255, 255, 255, 0.9);
}

/* Primary/Dark/Gradient variant button overrides */
.wb-cta--primary .wb-cta__actions :deep(.wb-button--primary) {
  background-color: var(--wb-color-white);
  color: var(--wb-color-primary-500);
}

.wb-cta--primary .wb-cta__actions :deep(.wb-button--primary:hover:not(:disabled)) {
  background-color: var(--wb-color-gray-100);
}

.wb-cta--dark .wb-cta__actions :deep(.wb-button--outline) {
  border-color: var(--wb-color-gray-600);
  color: var(--wb-color-white);
}

.wb-cta--dark .wb-cta__actions :deep(.wb-button--outline:hover:not(:disabled)) {
  background-color: var(--wb-color-gray-700);
  border-color: var(--wb-color-gray-500);
}

.wb-cta--gradient .wb-cta__actions :deep(.wb-button--primary) {
  background-color: var(--wb-color-white);
  color: var(--wb-color-primary-600);
}

.wb-cta--gradient .wb-cta__actions :deep(.wb-button--primary:hover:not(:disabled)) {
  background-color: var(--wb-color-gray-100);
}

@media (min-width: 768px) {
  .wb-cta__wrapper {
    flex-direction: row;
    text-align: left;
    justify-content: space-between;
  }
  
  .wb-cta__actions {
    flex-shrink: 0;
  }
  
  .wb-cta__title {
    font-size: var(--wb-font-size-3xl);
  }
}

@media (max-width: 640px) {
  .wb-cta__actions {
    width: 100%;
    flex-direction: column;
  }
  
  .wb-cta__actions :deep(.wb-button) {
    width: 100%;
  }
}
</style>
