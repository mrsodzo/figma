<template>
  <div class="wb-section-header" :class="headerClasses">
    <component :is="headingTag" class="wb-section-header__title">
      {{ title }}
    </component>
    <p v-if="subtitle" class="wb-section-header__subtitle">
      {{ subtitle }}
    </p>
    <div v-if="$slots.actions" class="wb-section-header__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  level: {
    type: String,
    default: 'h2',
    validator: (value) => ['h1', 'h2', 'h3', 'h4'].includes(value)
  },
  align: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'center', 'right'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
})

const headingTag = computed(() => props.level)

const headerClasses = computed(() => ({
  [`wb-section-header--align-${props.align}`]: true,
  [`wb-section-header--${props.size}`]: true
}))
</script>

<style scoped>
.wb-section-header {
  margin-bottom: var(--wb-spacing-lg);
}

.wb-section-header__title {
  font-family: var(--wb-font-family-base);
  font-weight: var(--wb-font-weight-bold);
  color: var(--wb-color-gray-900);
  line-height: var(--wb-line-height-lg);
  margin: 0;
}

.wb-section-header__subtitle {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-lg);
  font-weight: var(--wb-font-weight-normal);
  color: var(--wb-color-gray-600);
  line-height: var(--wb-line-height-base);
  margin: var(--wb-spacing-sm) 0 0 0;
}

.wb-section-header__actions {
  margin-top: var(--wb-spacing-md);
}

/* Align variations */
.wb-section-header--align-left {
  text-align: left;
}

.wb-section-header--align-center {
  text-align: center;
}

.wb-section-header--align-right {
  text-align: right;
}

.wb-section-header--align-center .wb-section-header__actions {
  justify-content: center;
}

.wb-section-header--align-right .wb-section-header__actions {
  justify-content: flex-end;
}

/* Size variations */
.wb-section-header--small .wb-section-header__title {
  font-size: var(--wb-font-size-xl);
}

.wb-section-header--medium .wb-section-header__title {
  font-size: var(--wb-font-size-2xl);
}

.wb-section-header--large .wb-section-header__title {
  font-size: var(--wb-font-size-3xl);
}

.wb-section-header__actions {
  display: flex;
  gap: var(--wb-spacing-sm);
}

@media (max-width: 768px) {
  .wb-section-header {
    margin-bottom: var(--wb-spacing-md);
  }
  
  .wb-section-header--small .wb-section-header__title {
    font-size: var(--wb-font-size-lg);
  }
  
  .wb-section-header--medium .wb-section-header__title {
    font-size: var(--wb-font-size-xl);
  }
  
  .wb-section-header--large .wb-section-header__title {
    font-size: var(--wb-font-size-2xl);
  }
}
</style>
