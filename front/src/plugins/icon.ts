/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {
  faAngleRight,
  faPlus,
  faRotateRight,
  faTrashCan,
  faCircleNotch
} from '@fortawesome/free-solid-svg-icons'
import type { Plugin } from 'vue'

library.add(faAngleRight, faPlus, faRotateRight, faTrashCan, faCircleNotch)

export const icons: Plugin = (app) => {
  app.component('fa-icon', FontAwesomeIcon)
}
