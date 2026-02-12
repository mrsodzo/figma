<template>
  <nav class="wb-navbar" :class="navbarClasses">
    <WbContainer :fluid="fluid">
      <div class="wb-navbar__container">
        <div class="wb-navbar__brand">
          <slot name="brand">
            <WbLogo :to="logoTo" :text="logoText" :size="logoSize" :variant="logoVariant" />
          </slot>
        </div>
        
        <button
          v-if="collapsible"
          class="wb-navbar__toggle"
          :class="{ 'wb-navbar__toggle--open': isOpen }"
          @click="toggleMenu"
        >
          <span class="wb-navbar__toggle-icon" />
        </button>
        
        <div
          class="wb-navbar__menu"
          :class="{ 'wb-navbar__menu--open': isOpen }"
        >
          <div class="wb-navbar__items">
            <slot name="items" />
          </div>
          
          <div v-if="$slots.actions" class="wb-navbar__actions">
            <slot name="actions" />
          </div>
        </div>
      </div>
    </WbContainer>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import WbContainer from './WbContainer.vue'
import WbLogo from './WbLogo.vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'light',
    validator: (value) => ['light', 'dark', 'transparent'].includes(value)
  },
  position: {
    type: String,
    default: 'static',
    validator: (value) => ['static', 'sticky', 'fixed'].includes(value)
  },
  collapsible: {
    type: Boolean,
    default: true
  },
  logoText: {
    type: String,
    default: 'Wishbone'
  },
  logoTo: {
    type: [String, Object],
    default: '/'
  },
  logoSize: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  logoVariant: {
    type: String,
    default: 'dark',
    validator: (value) => ['default', 'dark', 'light'].includes(value)
  },
  fluid: {
    type: Boolean,
    default: false
  }
})

const isOpen = ref(false)

const emit = defineEmits(['toggle', 'close'])

const navbarClasses = computed(() => ({
  [`wb-navbar--${props.variant}`]: true,
  [`wb-navbar--${props.position}`]: true,
  'wb-navbar--open': isOpen.value
}))

const toggleMenu = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    emit('toggle')
  } else {
    emit('close')
  }
}
</script>

<style scoped>
.wb-navbar {
  position: relative;
  width: 100%;
  background-color: var(--wb-color-white);
  border-bottom: 1px solid var(--wb-color-gray-200);
  transition: all var(--wb-transition-base);
}

.wb-navbar__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
}

.wb-navbar__brand {
  display: flex;
  align-items: center;
}

.wb-navbar__toggle {
  display: none;
  width: 40px;
  height: 40px;
  padding: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
}

.wb-navbar__toggle-icon {
  display: block;
  width: 24px;
  height: 2px;
  background-color: var(--wb-color-gray-700);
  position: relative;
  transition: all var(--wb-transition-base);
}

.wb-navbar__toggle-icon::before,
.wb-navbar__toggle-icon::after {
  content: '';
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--wb-color-gray-700);
  transition: all var(--wb-transition-base);
}

.wb-navbar__toggle-icon::before {
  top: -7px;
}

.wb-navbar__toggle-icon::after {
  bottom: -7px;
}

.wb-navbar__toggle--open .wb-navbar__toggle-icon {
  background-color: transparent;
}

.wb-navbar__toggle--open .wb-navbar__toggle-icon::before {
  top: 0;
  transform: rotate(45deg);
}

.wb-navbar__toggle--open .wb-navbar__toggle-icon::after {
  bottom: 0;
  transform: rotate(-45deg);
}

.wb-navbar__menu {
  display: flex;
  align-items: center;
  gap: var(--wb-spacing-lg);
  flex: 1;
  justify-content: flex-end;
}

.wb-navbar__items {
  display: flex;
  align-items: center;
  gap: var(--wb-spacing-sm);
}

.wb-navbar__actions {
  display: flex;
  align-items: center;
  gap: var(--wb-spacing-sm);
  margin-left: var(--wb-spacing-md);
}

/* Variant variations */
.wb-navbar--light {
  background-color: var(--wb-color-white);
  border-bottom-color: var(--wb-color-gray-200);
}

.wb-navbar--dark {
  background-color: var(--wb-color-gray-800);
  border-bottom-color: var(--wb-color-gray-700);
}

.wb-navbar--dark .wb-navbar__toggle-icon,
.wb-navbar--dark .wb-navbar__toggle-icon::before,
.wb-navbar--dark .wb-navbar__toggle-icon::after {
  background-color: var(--wb-color-white);
}

.wb-navbar--transparent {
  background-color: transparent;
  border-bottom-color: transparent;
}

/* Position variations */
.wb-navbar--sticky {
  position: sticky;
  top: 0;
  z-index: var(--wb-z-sticky);
}

.wb-navbar--fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--wb-z-fixed);
}

/* Mobile styles */
@media (max-width: 1024px) {
  .wb-navbar__toggle {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .wb-navbar__menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    background-color: inherit;
    padding: var(--wb-spacing-md);
    gap: var(--wb-spacing-md);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all var(--wb-transition-base);
    z-index: var(--wb-z-dropdown);
  }
  
  .wb-navbar__menu--open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  .wb-navbar__items {
    flex-direction: column;
    align-items: stretch;
  }
  
  .wb-navbar__actions {
    margin-left: 0;
    justify-content: center;
  }
}
</style>
