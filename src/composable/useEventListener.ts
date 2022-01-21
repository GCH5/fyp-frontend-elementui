import { onMounted, onUnmounted } from 'vue'

export function useEventListener (target: EventTarget, event: string, callback: EventListenerOrEventListenerObject | null): void {
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
