<template>
  <footer class="wb-footer" :class="footerClasses">
    <WbContainer :size="containerSize">
      <div class="wb-footer__top">
        <div class="wb-footer__brand">
          <WbLogo
            :text="logoText"
            :href="logoHref"
            :size="logoSize"
            :variant="logoVariant"
          />
          <p v-if="tagline" class="wb-footer__tagline">
            {{ tagline }}
          </p>
          <div v-if="socialLinks && socialLinks.length" class="wb-footer__social">
            <WbSocialIcon
              v-for="link in socialLinks"
              :key="link.network"
              :network="link.network"
              :href="link.href"
              :label="link.label"
              :size="socialSize"
              :variant="socialVariant"
            />
          </div>
        </div>
        
        <div v-if="navigation && navigation.length" class="wb-footer__nav">
          <div v-for="(column, index) in navigation" :key="index" class="wb-footer__nav-column">
            <h3 v-if="column.title" class="wb-footer__nav-title">
              {{ column.title }}
            </h3>
            <ul v-if="column.links && column.links.length" class="wb-footer__nav-list">
              <li v-for="(link, linkIndex) in column.links" :key="linkIndex" class="wb-footer__nav-item">
                <component
                  :is="link.to ? 'router-link' : 'a'"
                  :to="link.to"
                  :href="!link.to ? link.href : undefined"
                  class="wb-footer__nav-link"
                >
                  {{ link.text }}
                </component>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div v-if="$slots.bottom || copyright" class="wb-footer__bottom">
        <slot name="bottom">
          <div class="wb-footer__bottom-content">
            <p v-if="copyright" class="wb-footer__copyright">
              {{ copyright }}
            </p>
            <div v-if="legalLinks && legalLinks.length" class="wb-footer__legal">
              <component
                v-for="(link, index) in legalLinks"
                :key="index"
                :is="link.to ? 'router-link' : 'a'"
                :to="link.to"
                :href="!link.to ? link.href : undefined"
                class="wb-footer__legal-link"
              >
                {{ link.text }}
              </component>
            </div>
          </div>
        </slot>
      </div>
    </WbContainer>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import WbContainer from './WbContainer.vue'
import WbLogo from './WbLogo.vue'
import WbSocialIcon from './WbSocialIcon.vue'

const props = defineProps({
  logoText: {
    type: String,
    default: 'Wishbone'
  },
  logoHref: {
    type: String,
    default: '/'
  },
  logoSize: {
    type: String,
    default: 'medium'
  },
  logoVariant: {
    type: String,
    default: 'default'
  },
  tagline: {
    type: String,
    default: ''
  },
  socialLinks: {
    type: Array,
    default: () => []
  },
  socialSize: {
    type: String,
    default: 'medium'
  },
  socialVariant: {
    type: String,
    default: 'minimal'
  },
  navigation: {
    type: Array,
    default: () => []
  },
  copyright: {
    type: String,
    default: ''
  },
  legalLinks: {
    type: Array,
    default: () => []
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'dark', 'light'].includes(value)
  },
  containerSize: {
    type: String,
    default: 'large'
  }
})

const footerClasses = computed(() => ({
  [`wb-footer--${props.variant}`]: true
}))
</script>

<style scoped>
.wb-footer {
  padding: var(--wb-spacing-2xl) 0 var(--wb-spacing-lg);
  background-color: var(--wb-color-gray-50);
  border-top: 1px solid var(--wb-color-gray-200);
}

.wb-footer__top {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--wb-spacing-xl);
  padding-bottom: var(--wb-spacing-xl);
  border-bottom: 1px solid var(--wb-color-gray-200);
}

.wb-footer__brand {
  max-width: 300px;
}

.wb-footer__tagline {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-sm);
  font-weight: var(--wb-font-weight-normal);
  color: var(--wb-color-gray-600);
  line-height: var(--wb-line-height-base);
  margin-top: var(--wb-spacing-md);
  margin-bottom: var(--wb-spacing-lg);
}

.wb-footer__social {
  display: flex;
  gap: var(--wb-spacing-sm);
}

.wb-footer__nav {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--wb-spacing-lg);
}

.wb-footer__nav-column {
  min-width: 120px;
}

.wb-footer__nav-title {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-sm);
  font-weight: var(--wb-font-weight-semibold);
  color: var(--wb-color-gray-900);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--wb-spacing-md);
}

.wb-footer__nav-list {
  list-style: none;
}

.wb-footer__nav-item {
  margin-bottom: var(--wb-spacing-sm);
}

.wb-footer__nav-link {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-sm);
  font-weight: var(--wb-font-weight-normal);
  color: var(--wb-color-gray-600);
  text-decoration: none;
  transition: color var(--wb-transition-base);
}

.wb-footer__nav-link:hover {
  color: var(--wb-color-primary-500);
}

.wb-footer__bottom {
  padding-top: var(--wb-spacing-lg);
}

.wb-footer__bottom-content {
  display: flex;
  flex-direction: column;
  gap: var(--wb-spacing-md);
  align-items: center;
  text-align: center;
}

.wb-footer__copyright {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-sm);
  font-weight: var(--wb-font-weight-normal);
  color: var(--wb-color-gray-500);
}

.wb-footer__legal {
  display: flex;
  gap: var(--wb-spacing-md);
  flex-wrap: wrap;
  justify-content: center;
}

.wb-footer__legal-link {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-xs);
  font-weight: var(--wb-font-weight-normal);
  color: var(--wb-color-gray-500);
  text-decoration: none;
  transition: color var(--wb-transition-base);
}

.wb-footer__legal-link:hover {
  color: var(--wb-color-gray-700);
}

/* Variant: dark */
.wb-footer--dark {
  background-color: var(--wb-color-gray-800);
  border-color: var(--wb-color-gray-700);
}

.wb-footer--dark .wb-footer__tagline {
  color: var(--wb-color-gray-400);
}

.wb-footer--dark .wb-footer__nav-title {
  color: var(--wb-color-white);
}

.wb-footer--dark .wb-footer__nav-link {
  color: var(--wb-color-gray-400);
}

.wb-footer--dark .wb-footer__nav-link:hover {
  color: var(--wb-color-white);
}

.wb-footer--dark .wb-footer__copyright {
  color: var(--wb-color-gray-500);
}

.wb-footer--dark .wb-footer__legal-link {
  color: var(--wb-color-gray-500);
}

.wb-footer--dark .wb-footer__legal-link:hover {
  color: var(--wb-color-gray-300);
}

.wb-footer--dark .wb-footer__top {
  border-color: var(--wb-color-gray-700);
}

/* Variant: light */
.wb-footer--light {
  background-color: var(--wb-color-white);
}

@media (min-width: 768px) {
  .wb-footer__top {
    grid-template-columns: 1fr 2fr;
  }
  
  .wb-footer__nav {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .wb-footer__bottom-content {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}

@media (max-width: 640px) {
  .wb-footer {
    padding: var(--wb-spacing-xl) 0 var(--wb-spacing-md);
  }
  
  .wb-footer__nav {
    grid-template-columns: 1fr;
  }
  
  .wb-footer__legal {
    flex-direction: column;
    align-items: center;
  }
}
</style>
