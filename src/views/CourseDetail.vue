<template>
  <div class="course-detail">
    <div v-if="loading" class="loading-spinner">
      <LoadingSpinner />
    </div>
    
    <div v-else-if="error" class="error-message">
      <ErrorMessage :message="error" />
    </div>
    
    <template v-else-if="course">
      <!-- Hero Section -->
      <CourseHero 
        :course="course"
        @enroll="handleEnroll"
      />
      
      <!-- Main Content -->
      <div class="course-content">
        <div class="container">
          <div class="row">
            <!-- Left Column -->
            <div class="col-lg-8">
              <CourseTabs 
                :course="course"
                :activeTab="activeTab"
                @tab-change="changeTab"
              />
              
              <div class="tab-content">
                <!-- Overview Tab -->
                <CourseOverview 
                  v-if="activeTab === 'overview'"
                  :description="course.fullDescription"
                  :features="course.features"
                />
                
                <!-- Curriculum Tab -->
                <CourseCurriculum 
                  v-if="activeTab === 'curriculum'"
                  :lessons="course.lessons"
                  :duration="course.duration"
                />
                
                <!-- Instructor Tab -->
                <CourseInstructor 
                  v-if="activeTab === 'instructor'"
                  :instructor="course.instructor"
                  :otherCourses="instructorCourses"
                />
                
                <!-- Reviews Tab -->
                <CourseReviews 
                  v-if="activeTab === 'reviews'"
                  :rating="course.rating"
                  :reviews="course.reviews"
                />
              </div>
            </div>
            
            <!-- Right Column (Sidebar) -->
            <div class="col-lg-4">
              <CourseSidebar 
                :course="course"
                @enroll="handleEnroll"
              />
            </div>
          </div>
        </div>
      </div>
      
      <!-- Related Courses -->
      <RelatedCourses 
        :courses="relatedCourses"
      />
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import LoadingSpinner from '@/components/Courses/LoadingSpinner.vue'
import ErrorMessage from '@/components/Courses/ErrorState.vue'
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
      activeTab: 'overview'
    }
  },
  computed: {
    ...mapState('courses', [
      'currentCourse',
      'relatedCourses',
      'loading',
      'error',
      'allCourses'
    ]),
    course() {
      return this.currentCourse
    },
    instructorCourses() {
      if (!this.course || !this.allCourses.length) return []
      return this.allCourses.filter(c => 
        c.instructor === this.course.instructor && c.id !== this.course.id
      ).slice(0, 3)
    }
  },
  methods: {
    ...mapActions('courses', ['fetchCourseById', 'fetchRelatedCourses']),
    changeTab(tab) {
      this.activeTab = tab
    },
    handleEnroll() {
      // Handle enrollment logic
      console.log('Enrolling in course:', this.course.id)
    }
  },
  async created() {
    const courseId = parseInt(this.$route.params.id)
    await this.fetchCourseById(courseId)
    if (this.course) {
      await this.fetchRelatedCourses(this.course.tags)
    }
  }
}
</script>

<style scoped>
.course-detail {
  padding-bottom: 60px;
}

.loading-spinner,
.error-message {
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.course-content {
  padding: 40px 0;
}

.tab-content {
  padding: 30px 0;
}
</style>