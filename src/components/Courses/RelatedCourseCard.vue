<template>
  <CourseCard :course="course" variant="compact" />
</template>

<script>
import CourseCard from "@/modules/course/components/CourseCard.vue";

export default {
  name: "RelatedCourseCard",
  components: {
    CourseCard
  },
  props: {
    course: {
      type: Object,
      required: true
    }
  }
};
</script>
