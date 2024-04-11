import type { Directive } from 'vue'

export type FocusArgument = 'focus' | 'selectAll'

export const vFocus: Directive<HTMLInputElement, FocusArgument | undefined> = {
  mounted: (el, binding) => {
    console.log('el: ', el)
    if (binding.value === 'selectAll') {
      el.select()
      return
    }
    el.focus()
  }
}
