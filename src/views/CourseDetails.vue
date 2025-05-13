<template>
  <div class="course-detail">
    <!-- Hero with course title, instructor, and enrollment CTA -->
    <div class="course-hero bg-gradient-to-r from-blue-500 to-indigo-600">
      <div class="container mx-auto px-4 py-16 text-white">
        <h1 class="text-4xl font-bold">{{ course.title }}</h1>
        <p class="mt-2">By {{ course.instructor }}</p>
        <div class="mt-6 flex flex-wrap gap-4">
          <button class="enroll-cta bg-yellow-400 hover:bg-yellow-500">
            Enroll Now (${{ course.price }})
          </button>
          <button class="preview-btn border border-white">
            Preview Course
          </button>
        </div>
      </div>
    </div>

    <!-- Course Tabs (Overview, Curriculum, Reviews) -->
    <div class="course-tabs sticky top-0 bg-white shadow-sm">
      <nav class="flex overflow-x-auto">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="{ 'border-b-2 border-blue-500': activeTab === tab.id }"
        >
          {{ tab.label }}
        </button>
      </nav>
    </div>

    <!-- Tab Content -->
    <div class="container mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
      <!-- Main Content -->
      <div class="md:col-span-2">
        <CourseOverview v-if="activeTab === 'overview'" />
        <CourseCurriculum v-if="activeTab === 'curriculum'" />
        <CourseReviews v-if="activeTab === 'reviews'" />
      </div>

      <!-- Sidebar (Progress, Instructor, Pricing) -->
      <div class="sidebar">
        <CourseProgress v-if="isEnrolled" />
        <InstructorCard :instructor="course.instructor" />
        <PricingCard :price="course.price" />
      </div>
    </div>
  </div>
</template>
<script>

import { useRoute } from 'vue-router';

export default {
  name: 'CourseDetails',
  
  setup() {
    const route = useRoute();
    const course = ref(null);

    // Fetch course data by ID
    const fetchCourse = async () => {
      const courseId = route.params.id;
      course.value = await getCourseById(courseId);
    };

    return {
      course,
      fetchCourse
    };
  },
}

  </script>


  
 