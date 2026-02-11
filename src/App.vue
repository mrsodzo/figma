<template>
  <div class="app-container">
    <h1 class="app-title">Wishbone Design System</h1>
    
    <!-- Buttons Section -->
    <section class="demo-section">
      <h2 class="section-title">Button Component</h2>
      
      <div class="demo-grid">
        <div class="demo-card">
          <h3 class="demo-card-title">Primary Buttons</h3>
          <div class="demo-content">
            <WbButton variant="primary">Primary Button</WbButton>
            <WbButton variant="primary" size="small">Small</WbButton>
            <WbButton variant="primary" size="large">Large</WbButton>
            <WbButton variant="primary" disabled>Disabled</WbButton>
          </div>
        </div>

        <div class="demo-card">
          <h3 class="demo-card-title">Secondary Buttons</h3>
          <div class="demo-content">
            <WbButton variant="secondary">Secondary Button</WbButton>
            <WbButton variant="secondary" size="small">Small</WbButton>
            <WbButton variant="secondary" size="large">Large</WbButton>
            <WbButton variant="secondary" disabled>Disabled</WbButton>
          </div>
        </div>

        <div class="demo-card">
          <h3 class="demo-card-title">Outline Buttons</h3>
          <div class="demo-content">
            <WbButton variant="outline">Outline Button</WbButton>
            <WbButton variant="outline" size="small">Small</WbButton>
            <WbButton variant="outline" size="large">Large</WbButton>
            <WbButton variant="outline" disabled>Disabled</WbButton>
          </div>
        </div>

        <div class="demo-card">
          <h3 class="demo-card-title">Ghost Buttons</h3>
          <div class="demo-content">
            <WbButton variant="ghost">Ghost Button</WbButton>
            <WbButton variant="ghost" size="small">Small</WbButton>
            <WbButton variant="ghost" size="large">Large</WbButton>
            <WbButton variant="ghost" disabled>Disabled</WbButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Inputs Section -->
    <section class="demo-section">
      <h2 class="section-title">Input Component</h2>
      
      <div class="demo-grid">
        <div class="demo-card">
          <h3 class="demo-card-title">Basic Inputs</h3>
          <div class="demo-content">
            <WbInput 
              v-model="inputValue" 
              label="Default Input" 
              placeholder="Enter text..."
            />
            <WbInput 
              v-model="inputValue" 
              label="Disabled Input" 
              placeholder="Disabled..."
              disabled
            />
            <WbInput 
              v-model="inputValue" 
              label="Readonly Input" 
              placeholder="Readonly..."
              readonly
            />
          </div>
        </div>

        <div class="demo-card">
          <h3 class="demo-card-title">Validation States</h3>
          <div class="demo-content">
            <WbInput 
              v-model="inputValue" 
              label="Error State" 
              placeholder="Enter valid email..."
              error
              error-message="Please enter a valid email address"
            />
            <WbInput 
              v-model="validInputValue" 
              label="Success State" 
              placeholder="Valid input..."
              success
              success-message="Input is valid"
            />
          </div>
        </div>

        <div class="demo-card">
          <h3 class="demo-card-title">Input Types</h3>
          <div class="demo-content">
            <WbInput 
              v-model="emailValue" 
              label="Email Input" 
              type="email"
              placeholder="email@example.com"
            />
            <WbInput 
              v-model="passwordValue" 
              label="Password Input" 
              type="password"
              placeholder="Enter password..."
            />
          </div>
        </div>

        <div class="demo-card">
          <h3 class="demo-card-title">Required Fields</h3>
          <div class="demo-content">
            <WbInput 
              v-model="requiredValue" 
              label="Required Input" 
              placeholder="Required field..."
              required
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Cards Section -->
    <section class="demo-section">
      <h2 class="section-title">Card Component</h2>
      
      <div class="demo-grid">
        <WbCard 
          :header="{
            title: 'Basic Card',
            description: 'A simple card with header and content'
          }"
          shadow="medium"
          bordered
        >
          <p>This is a basic card component with a header and content section. It supports various shadow levels and border styles.</p>
        </WbCard>

        <WbCard 
          :header="{
            title: 'Card with Footer',
            description: 'Card with header, content, and footer'
          }"
          footer
          shadow="large"
        >
          <p>This card includes a footer section with action buttons. The footer can be customized to include any content.</p>
          <template #footer>
            <WbButton variant="primary">Primary Action</WbButton>
            <WbButton variant="secondary">Secondary Action</WbButton>
          </template>
        </WbCard>

        <WbCard 
          shadow="small"
          padding="large"
        >
          <h3>No Header Card</h3>
          <p>This card demonstrates a minimal design without a header. You can customize the padding and shadow levels.</p>
        </WbCard>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import WbButton from './components/WbButton.vue'
import WbInput from './components/WbInput.vue'
import WbCard from './components/WbCard.vue'

const inputValue = ref('')
const validInputValue = ref('valid@email.com')
const emailValue = ref('')
const passwordValue = ref('')
const requiredValue = ref('')
</script>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.app-title {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-4xl);
  font-weight: var(--wb-font-weight-bold);
  color: var(--wb-color-gray-900);
  margin-bottom: 3rem;
  text-align: center;
  line-height: var(--wb-line-height-xl);
}

.demo-section {
  margin-bottom: 4rem;
}

.section-title {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-2xl);
  font-weight: var(--wb-font-weight-semibold);
  color: var(--wb-color-gray-800);
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--wb-color-gray-200);
  line-height: var(--wb-line-height-lg);
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.demo-card {
  background-color: var(--wb-color-white);
  border: 1px solid var(--wb-color-gray-200);
  border-radius: var(--wb-radius-lg);
  padding: 1.5rem;
  box-shadow: var(--wb-shadow-sm);
  transition: all var(--wb-transition-base);
}

.demo-card:hover {
  box-shadow: var(--wb-shadow-md);
  transform: translateY(-2px);
}

.demo-card-title {
  font-family: var(--wb-font-family-base);
  font-size: var(--wb-font-size-lg);
  font-weight: var(--wb-font-weight-semibold);
  color: var(--wb-color-gray-800);
  margin-bottom: 1.5rem;
  line-height: var(--wb-line-height-lg);
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .app-container {
    padding: 1rem;
  }

  .app-title {
    font-size: var(--wb-font-size-3xl);
  }

  .section-title {
    font-size: var(--wb-font-size-xl);
  }

  .demo-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
