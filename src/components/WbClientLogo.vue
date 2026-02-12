<template>
  <div class="wb-client-logo" :class="logoClasses">
    <component
      :is="tag"
      :to="isRouterLink ? to : undefined"
      :href="!isRouterLink ? href : undefined"
      class="wb-client-logo__link"
      :aria-label="name"
    >
      <slot name="icon">
        <img
          v-if="src"
          :src="src"
          :alt="name"
          class="wb-client-logo__image"
          loading="lazy"
        />
        <span v-else class="wb-client-logo__fallback">
          {{ fallbackText }}
        </span>
      </slot>
    </component>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: 'Client'
  },
  href: {
    type: String,
    default: '#'
  },
  to: {
    type: [String, Object],
    default: ''
  },
  variant: {
    type: String,
    default: 'grayscale',
    validator: (value) => ['grayscale', 'color', 'dark', 'light'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
})

const isRouterLink = computed(() => props.to !== '')

const tag = computed(() => {
  return props.to ? 'router-link' : 'a'
})

const fallbackText = computed(() => {
  return props.name.charAt(0).toUpperCase()
})

const logoClasses = computed(() => ({
  [`wb-client-logo--${props.variant}`]: true,
  [`wb-client-logo--${props.size}`]: true
}))
</script>

<style scoped>
.wb-client-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--wb-spacing-sm);
}

.wb-client-logo__link {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all var(--wb-transition-base);
}

.wb-client-logo__image {
  max-width: 100%;
  height: auto;
  object-fit: contain;
  transition: all var(--wb-transition-base);
}

.wb-client-logo__fallback {
  font-family: var(--wb-font-family-base);
  font-weight: var(--wb-font-weight-bold);
  color: var(--wb-color-gray-500);
}

/* Size variations */
.wb-client-logo--small .wb-client-logo__image {
  height: 32px;
}

.wb-client-logo--small .wb-client-logo__fallback {
  font-size: var(--wb-font-size-lg);
}

.wb-client-logo--medium .wb-client-logo__image {
  height: 48px;
}

.wb-client-logo--medium .wb-client-logo__fallback {
  font-size: var(--wb-font-size-xl);
}

.wb-client-logo--large .wb-client-logo__image {
  height: 64px;
}

.wb-client-logo--large .wb-client-logo__fallback {
  font-size: var(--wb-font-size-2xl);
}

/* Variant: grayscale */
.wb-client-logo--grayscale .wb-client-logo__image {
  filter: grayscale(100%);
  opacity: 0.6;
}

.wb-client-logo--grayscale:hover .wb-client-logo__image {
  filter: grayscale(0%);
  opacity: 1;
}

/* Variant: color */
.wb-client-logo--color .wb-client-logo__image {
  opacity: 0.8;
}

.wb-client-logo--color:hover .wb-client-logo__image {
  opacity: 1;
}

/* Variant: dark */
.wb-client-logo--dark .wb-client-logo__image {
  filter: brightness(0);
  opacity: 0.7;
}

.wb-client-logo--dark:hover .wb-client-logo__image {
  opacity: 1;
}

/* Variant: light */
.wb-client-logo--light .wb-client-logo__image {
  filter: brightness(0) invert(1);
  opacity: 0.7;
}

.wb-client-logo--light:hover .wb-client-logo__image {
  opacity: 1;
}

/* Focus styles */
.wb-client-logo__link:focus-visible {
  outline: 2px solid var(--wb-color-primary-500);
  outline-offset: 4px;
  border-radius: var(--wb-radius-sm);
}
</style>
