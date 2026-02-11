# Composables

This directory contains reusable Vue 3 composable functions that can be shared across components.

## Composable Structure

Each composable should follow this structure:

```javascript
// useComposableName.js
import { ref, computed, onMounted } from 'vue'

export function useComposableName(options = {}) {
  // State
  const state = ref(null)
  
  // Computed properties
  const computedState = computed(() => {
    return state.value
  })
  
  // Methods
  function doSomething() {
    // Logic here
  }
  
  // Lifecycle
  onMounted(() => {
    // Initialize
  })
  
  return {
    state,
    computedState,
    doSomething
  }
}
```

## Guidelines

1. Use Vue 3 Composition API
2. Keep composables focused on a single concern
3. Provide sensible defaults
4. Handle edge cases
5. Add TypeScript types if using TypeScript
6. Write tests for complex composables

## Available Composables

None yet - start building your composables here!
