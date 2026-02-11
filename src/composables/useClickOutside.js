import { onMounted, onUnmounted } from 'vue'

export function useClickOutside(elementRef, callback) {
  const handleClick = (event) => {
    if (elementRef.value && !elementRef.value.contains(event.target)) {
      callback(event)
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClick)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClick)
  })

  return handleClick
}