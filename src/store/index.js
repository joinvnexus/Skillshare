import { createStore } from 'vuex'
import features from './modules/features'
import learningPaths from './modules/learningPaths'
import instructors from './modules/instructors'
import testimonials from './modules/testimonials'
import courses from './modules/courses'




const store = createStore({
  modules: {
    features,
    learningPaths,
    instructors,
    testimonials,
    courses,
    
  }
})

export default store