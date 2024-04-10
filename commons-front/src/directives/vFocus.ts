import type { Directive } from 'vue'

type FocusValue = 'selectAll' | 'focus'

export const vFocus: Directive<HTMLInputElement, FocusValue | undefined> = {
  mounted: (el, binding) => {
    console.log('binding: ', binding)
    const value = binding.value
    if (value === 'selectAll' && el instanceof HTMLElement) {
      el.select()
      return
    }
    el.focus()
  }
}
