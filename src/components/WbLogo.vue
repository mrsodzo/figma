<template>
  <component
    :is="tag"
    :to="isRouterLink ? to : undefined"
    :href="!isRouterLink ? href : undefined"
    class="wb-logo"
    :class="logoClasses"
  >
    <slot name="icon">
      <span v-if="!icon" class="wb-logo__text">{{ text }}</span>
    </slot>
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: 'Wishbone'
  },
  href: {
    type: String,
    default: '/'
  },
  to: {
    type: [String, Object],
    default: ''
  },
  icon: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'dark', 'light'].includes(value)
  }
})

const isRouterLink = computed(() => props.to !== '')

const tag = computed(() => {
  return props.to ? 'router-link' : 'a'
})

const logoClasses = computed(() => ({
  'wb-logo--icon': props.icon,
  [`wb-logo--${props.size}`]: true,
  [`wb-logo--${props.variant}`]: true
}))
</script>

<style scoped>
.wb-logo {
  display: inline-flex;
  align-items: center;
  font-family: var(--wb-font-family-base);
  font-weight: var(--wb-font-weight-bold);
  text-decoration: none;
  cursor: pointer;
  transition: all var(--wb-transition-base);
}

.wb-logo__text {
  letter-spacing: -0.02em;
}

/* Size variations */
.wb-logo--small {
  font-size: var(--wb-font-size-lg);
}

.wb-logo--small.wb-logo--icon {
  width: 24px;
  height: 24px;
}

.wb-logo--medium {
  font-size: var(--wb-font-size-xl);
}

.wb-logo--medium.wb-logo--icon {
  width: 32px;
  height: 32px;
}

.wb-logo--large {
  font-size: var(--wb-font-size-2xl);
}

.wb-logo--large.wb-logo--icon {
  width: 48px;
  height: 48px;
}

/* Variant variations */
.wb-logo--default {
  color: var(--wb-color-gray-900);
}

.wb-logo--dark {
  color: var(--wb-color-gray-900);
}

.wb-logo--light {
  color: var(--wb-color-white);
}
</style>
