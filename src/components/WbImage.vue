<template>
  <figure class="wb-image" :class="imageClasses">
    <img
      :src="src"
      :alt="alt"
      :loading="lazy ? 'lazy' : 'eager'"
      @load="handleLoad"
      @error="handleError"
    />
    <div v-if="!loaded && !error" class="wb-image__placeholder">
      <slot name="placeholder">
        <div class="wb-image__placeholder-icon" />
      </slot>
    </div>
    <div v-if="error" class="wb-image__error">
      <slot name="error">
        <span class="wb-image__error-text">Image not available</span>
      </slot>
    </div>
    <figcaption v-if="caption" class="wb-image__caption">
      {{ caption }}
    </figcaption>
  </figure>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  caption: {
    type: String,
    default: ''
  },
  lazy: {
    type: Boolean,
    default: true
  },
  rounded: {
    type: Boolean,
    default: false
  },
  shadow: {
    type: String,
    default: 'none',
    validator: (value) => ['none', 'small', 'medium', 'large'].includes(value)
  },
  objectFit: {
    type: String,
    default: 'cover',
    validator: (value) => ['contain', 'cover', 'fill', 'none'].includes(value)
  },
  aspectRatio: {
    type: String,
    default: null
  }
})

const loaded = ref(false)
const error = ref(false)

const emit = defineEmits(['load', 'error'])

const imageClasses = computed(() => ({
  'wb-image--loaded': loaded.value,
  'wb-image--error': error.value,
  'wb-image--rounded': props.rounded,
  [`wb-image--shadow-${props.shadow}`]: true
}))

const handleLoad = (event) => {
  loaded.value = true
  error.value = false
  emit('load', event)
}

const handleError = (event) => {
  error.value = true
  loaded.value = false
  emit('error', event)
}
</script>

<style scoped>
.wb-image {
  position: relative;
  margin: 0;
  overflow: hidden;
  display: inline-block;
  max-width: 100%;
}

.wb-image img {
  width: 100%;
  height: 100%;
  object-fit: var(--wb-image-object-fit, cover);
  display: block;
  transition: opacity var(--wb-transition-base);
}

.wb-image--rounded {
  border-radius: var(--wb-radius-md);
}

.wb-image--shadow-small {
  box-shadow: var(--wb-shadow-sm);
}

.wb-image--shadow-medium {
  box-shadow: var(--wb-shadow-md);
}

.wb-image--shadow-large {
  box-shadow: var(--wb-shadow-lg);
}

/* Placeholder */
.wb-image__placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--wb-color-gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
}

.wb-image__placeholder-icon {
  width: 40px;
  height: 40px;
  border: 3px solid var(--wb-color-gray-200);
  border-top-color: var(--wb-color-gray-400);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Error state */
.wb-image__error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--wb-color-gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
}

.wb-image__error-text {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-sm);
  color: var(--wb-color-gray-500);
}

/* Caption */
.wb-image__caption {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-sm);
  color: var(--wb-color-gray-600);
  text-align: center;
  margin-top: var(--wb-spacing-sm);
}

/* Loaded state */
.wb-image--loaded .wb-image__placeholder,
.wb-image--loaded .wb-image__error {
  display: none;
}

.wb-image--loaded img {
  opacity: 1;
}

.wb-image:not(.wb-image--loaded) img {
  opacity: 0;
}
</style>
