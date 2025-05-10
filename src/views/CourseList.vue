<template>
    <main class="container">
        <HeroSection/>
        <CourseCards/>
        <FeaturedCourses/>
        <InfiniteScroll/>
        <AdditionaLnformation/>
        <TestimonialsSection/>
        <CTASction/>
    </main>

</template>

<script setup>
import CourseCards from '@/components/Courses/CourseCards.vue';
import HeroSection from '../components/Courses/HeroSection.vue';
import FeaturedCourses from '@/components/Courses/FeaturedCourses.vue';
import InfiniteScroll from '@/components/Courses/InfiniteScroll.vue';
import AdditionaLnformation from '@/components/Courses/AdditionaLnformation.vue';
import TestimonialsSection from '@/components/Courses/TestimonialsSection.vue';
import CTASction from '@/components/Courses/CTASction.vue';


</script>
<style scoped>
.container {
    width: 100%;
    background-color: #fff5f5;
    margin: 0 auto;
    padding: 0;
}

</style>
