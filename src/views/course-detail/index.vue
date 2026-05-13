<template>
  <div class="course-detail min-h-screen">
    <!-- Loading State -->
    <div v-if="loading" class="loading-spinner flex items-center justify-center min-h-[300px]">
      <LoadingSpinner />
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="error-message flex items-center justify-center min-h-[300px]">
      <ErrorMessage :error="error" />
    </div>
    
    <!-- Course Content -->
    <template v-else-if="course">
      <!-- Hero Section -->
      <CourseHero 
        :course="course"
        :action-label="primaryActionLabel"
        @enroll="handleEnroll"
      />
      
      <!-- Main Content -->
      <div class="course-content py-10 md:py-14">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col lg:flex-row gap-8">
            <!-- Left Column - Main Content -->
            <div class="w-full lg:w-8/12">
              <div class="section-shell p-4 sm:p-6">
                <CourseTabs 
                  :course="course"
                  :activeTab="activeTab"
                  @tab-change="changeTab"
                />
              
              <div class="tab-content py-8">
                <!-- Overview Tab -->
                <CourseOverview 
                  v-if="activeTab === 'overview'"
                  :description="course.fullDescription"
                  :features="course.features"
                  :duration="course.duration"
                  :lessons="course.lessons"
                  :level="course.level"
                />
                
                <!-- Curriculum Tab -->
                <CourseCurriculum 
                  v-if="activeTab === 'curriculum'"
                  :lessons="course.lessons"
                  :duration="course.duration"
                  :sections="course.sections"
                />
                
                <!-- Instructor Tab -->
                <CourseInstructor 
                  v-if="activeTab === 'instructor'"
                  :instructor="course.instructor"
                  :otherCourses="instructorCourses"
                  :students="course.students"
                  :coursesCount="instructorCourses.length + 1"
                  :reviews="course.reviewCount || course.reviews?.length || 0"
                  :bio="course.instructorBio"
                />
                
                <!-- Reviews Tab -->
                <CourseReviews 
                  v-if="activeTab === 'reviews'"
                  :rating="course.rating"
                  :reviews="course.reviews"
                />
              </div>
              </div>
            </div>
            
            <!-- Right Column - Sidebar -->
            <div class="w-full lg:w-4/12">
              <div class="sticky top-24 space-y-6">
                <CourseSidebar 
                  :course="course"
                  :action-label="primaryActionLabel"
                  :action-hint="primaryActionHint"
                  @enroll="handleEnroll"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Related Courses -->
      <div class="pb-16">
           <RelatedCourses :current-course-id="currentCourse.slug || currentCourse.id" />
      </div>
    </template>
    
    <div v-else class="flex min-h-[300px] items-center justify-center">
      <p class="text-sm text-[var(--muted)]">Course data not found. Please try again from the course list.</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue'
import ErrorMessage from '@/components/UI/ErrorState.vue'
import CourseHero from '@/components/Coursesinglepage/CourseHero.vue'
import CourseTabs from '@/components/Coursesinglepage/CourseTabs.vue'
import CourseOverview from '@/components/Coursesinglepage/CourseOverview.vue'
import CourseCurriculum from '@/components/Coursesinglepage/CourseCurriculum.vue'
import CourseInstructor from '@/components/Coursesinglepage/CourseInstructor.vue'
import CourseReviews from '@/components/Coursesinglepage/CourseReviews.vue'
import CourseSidebar from '@/components/Coursesinglepage/CourseSidebar.vue'
import RelatedCourses from '@/components/Coursesinglepage/RelatedCourses.vue'

export default {
  name: 'CourseDetail',
  components: {
    LoadingSpinner,
    ErrorMessage,
    CourseHero,
    CourseTabs,
    CourseOverview,
    CourseCurriculum,
    CourseInstructor,
    CourseReviews,
    CourseSidebar,
    RelatedCourses
  },
  data() {
    return {
      activeTab: 'overview',
      purchaseLoading: false,
      isEnrolledInCourse: false
    }
  },
  computed: {
    ...mapState('courseDetail', ['loading', 'error']),
    ...mapState('courseDetail', [
      'currentCourse',
      'relatedCourses'
    ]),
    ...mapState('catalog', ['allCourses']),
    ...mapState('auth', ['user']),

    course() {
       return this.currentCourse 
    },
    isPaidCourse() {
      return Number(this.course?.price || 0) > 0
    },
    isInCart() {
      return this.$store.getters['cart/inCart']?.(this.course?.id)
    },
    primaryActionLabel() {
      if (this.purchaseLoading) {
        return 'Processing...'
      }
      if (this.isEnrolledInCourse) {
        return 'Continue Learning'
      }
      if (this.isPaidCourse) {
        return this.isInCart ? 'Go to Cart' : `Add to Cart - $${Number(this.course?.price || 0).toFixed(2)}`
      }
      return 'Enroll for Free'
    },
    primaryActionHint() {
      if (this.isEnrolledInCourse) {
        return 'This course is already in your library.'
      }
      if (this.isPaidCourse) {
        return this.isInCart ? 'This course is already in your cart.' : 'Secure checkout unlocks the course in your library.'
      }
      return 'Free courses are added to your library instantly.'
    },
    instructorCourses() {
      if (!this.course || !this.allCourses.length) return []
      return this.allCourses.filter(c => 
        c.instructor === this.course.instructor && c.id !== this.course.id
      ).slice(0, 3)
    },
    instructorBio() {
      return this.course.instructorBio || 'This instructor has not provided a bio.'
    }
  },
  methods: {
    ...mapActions('courseDetail', ['fetchCourseById']),
    ...mapActions('catalog', ['fetchCourses']),
    ...mapActions('learning', ['enrollInCourse', 'checkEnrollment']),
    async syncEnrollmentState() {
      if (!this.$store.getters['auth/isAuthenticated'] || !this.course?.id) {
        this.isEnrolledInCourse = false
        return
      }

      try {
        this.isEnrolledInCourse = await this.checkEnrollment({
          courseId: this.course.id
        })
      } catch (_error) {
        this.isEnrolledInCourse = false
      }
    },
    async loadCourse(identifier) {
      if (!identifier) return
      this.activeTab = 'overview'
      try {
        if (!this.allCourses.length) {
          await this.fetchCourses()
        }
        await this.fetchCourseById(identifier)
        await this.syncEnrollmentState()
      } catch (_error) {
        if (this.$route.name === 'CourseDetail') {
          this.$router.replace('/courses')
        }
      }
    },
    changeTab(tab) {
      this.activeTab = tab
    },
    async handleEnroll() {
      const user = this.$store.state.auth.user
      
      if (!user) {
        this.$router.push({ name: 'Login', query: { redirect: this.$route.fullPath } })
        return
      }

      if (this.isEnrolledInCourse) {
        this.$router.push('/dashboard/my-courses')
        return
      }

      if (this.isPaidCourse) {
        if (this.isInCart) {
          this.$router.push('/dashboard/cart')
          return
        }

        this.$store.dispatch('cart/addToCart', this.course)
        this.$store.dispatch('ui/notify', { type: 'success', message: 'Course added to cart. Continue to checkout.' })
        this.$router.push('/dashboard/cart')
        return
      }

      try {
        this.purchaseLoading = true
        await this.enrollInCourse({
          courseId: this.course.id,
          courseData: this.course
        })
        this.isEnrolledInCourse = true
        this.$store.dispatch('ui/notify', { type: 'success', message: 'Enrollment confirmed. Course added to your library.' })
        this.$router.push('/dashboard/my-courses')
      } catch (error) {
        this.$store.dispatch('ui/notify', { type: 'error', message: error.message || 'Enrollment failed.' })
      } finally {
        this.purchaseLoading = false
      }
    }
  },
  created() {
    const identifier = this.$route.params.id
    this.loadCourse(identifier)
  },
  watch: {
    '$route.params.id'(identifier) {
      this.loadCourse(identifier)
    },
    user() {
      this.syncEnrollmentState()
    },
    'course.id'() {
      this.syncEnrollmentState()
    }
  }
}
</script>

<style scoped>
/* You can keep your custom styles here if needed, but most are replaced with Tailwind */
.course-detail {
  /* Additional styles that might not be covered by Tailwind */
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .course-content {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}
</style>
