import { createStore } from 'vuex'
import features from './modules/features'
import learningPaths from './modules/learningPaths'
import instructors from './modules/instructors'
import testimonials from './modules/testimonials'
import courses from './modules/courses'
 import filters from './modules/filters'
 import ui from './modules/ui'

import blog from './modules/blog'



const store = createStore({
  modules: {
    features,
    learningPaths,
    instructors,
    testimonials,
    courses,
    blog,
     filters,
     ui
  }
})

export default store