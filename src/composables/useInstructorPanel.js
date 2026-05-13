import { computed, onMounted, ref } from "vue";
import { instructorApi } from "@/modules/dashboard-instructor/api/instructorApi";
import { resolveErrorMessage } from "@/shared/services/apiClient";

export const useInstructorPanel = () => {
  const loading = ref(true);
  const error = ref(null);
  const overview = ref({
    totalCourses: 0,
    publishedCourses: 0,
    totalStudents: 0,
    totalReviews: 0
  });
  const revenue = ref({
    totalRevenue: 0,
    pendingBalance: 0,
    lastPayout: null
  });
  const payouts = ref([]);
  const bankInfo = ref({ bankAccount: null, taxInfo: null });
  const reviews = ref([]);
  const courses = ref([]);
  const profile = ref({
    title: "",
    bio: "",
    photoUrl: "",
    expertise: "",
    websiteUrl: "",
    linkedinUrl: "",
    twitterUrl: "",
    githubUrl: "",
    youtubeUrl: ""
  });
  const courseFilters = ref({ search: "", status: "" });
  const courseEdits = ref({});
  const enrollments = ref([]);
  const enrollmentsLoading = ref(false);
  const selectedCourseId = ref("");

  const reloadOverview = async () => {
    overview.value = await instructorApi.getDashboardOverview();
  };

  const reloadRevenue = async () => {
    revenue.value = await instructorApi.getRevenueOverview();
  };

  const reloadPayouts = async () => {
    const response = await instructorApi.listPayouts();
    payouts.value = response.data || [];
  };

  const reloadBankInfo = async () => {
    bankInfo.value = await instructorApi.getBankInfo();
  };

  const reloadReviews = async () => {
    const response = await instructorApi.listReviews();
    reviews.value = response.data || [];
  };

  const reloadProfile = async () => {
    const data = await instructorApi.getProfile();
    profile.value = {
      title: data.title || "",
      bio: data.bio || "",
      photoUrl: data.photoUrl || "",
      expertise: Array.isArray(data.expertise) ? data.expertise.join(", ") : "",
      websiteUrl: data.websiteUrl || "",
      linkedinUrl: data.linkedinUrl || "",
      twitterUrl: data.twitterUrl || "",
      githubUrl: data.githubUrl || "",
      youtubeUrl: data.youtubeUrl || ""
    };
  };

  const reloadCourses = async () => {
    const response = await instructorApi.listCourses();
    courses.value = response.data || [];
    courseEdits.value = courses.value.reduce((acc, course) => {
      acc[course.id] = { status: course.status };
      return acc;
    }, {});
  };

  const loadEnrollments = async (courseId) => {
    if (!courseId) return;
    enrollmentsLoading.value = true;
    selectedCourseId.value = courseId;
    try {
      const response = await instructorApi.listCourseEnrollments(courseId);
      enrollments.value = response.data || [];
    } catch (err) {
      error.value = resolveErrorMessage(err);
    } finally {
      enrollmentsLoading.value = false;
    }
  };

  const reload = async () => {
    loading.value = true;
    error.value = null;
    try {
      await Promise.all([
        reloadOverview(),
        reloadCourses(),
        reloadProfile(),
        reloadRevenue(),
        reloadPayouts(),
        reloadBankInfo(),
        reloadReviews()
      ]);
    } catch (err) {
      error.value = resolveErrorMessage(err);
    } finally {
      loading.value = false;
    }
  };

  const updateCourseStatus = async (courseId) => {
    const status = courseEdits.value[courseId]?.status;
    if (!status) return;
    try {
      await instructorApi.updateCourseStatus(courseId, { status });
      await reloadCourses();
    } catch (err) {
      error.value = resolveErrorMessage(err);
    }
  };

  const updateCourseFields = async (courseId, fields) => {
    try {
      await instructorApi.updateCourse(courseId, {
        title: fields.title,
        shortDescription: fields.shortDescription,
        level: fields.level,
        price: fields.price === "" ? null : Number(fields.price),
        thumbnailUrl: fields.thumbnailUrl || null
      });
      await reloadCourses();
    } catch (err) {
      error.value = resolveErrorMessage(err);
    }
  };

  const createCourse = async (payload) => {
    await instructorApi.createCourse(payload);
    await reloadCourses();
  };


  const updateProfile = async (payload) => {
    try {
      await instructorApi.updateProfile({
        title: payload.title,
        bio: payload.bio,
        photoUrl: payload.photoUrl || null,
        expertise: payload.expertise
          ? payload.expertise.split(",").map((item) => item.trim()).filter(Boolean)
          : [],
        websiteUrl: payload.websiteUrl || null,
        linkedinUrl: payload.linkedinUrl || null,
        twitterUrl: payload.twitterUrl || null,
        githubUrl: payload.githubUrl || null,
        youtubeUrl: payload.youtubeUrl || null
      });
      await reloadProfile();
    } catch (err) {
      error.value = resolveErrorMessage(err);
    }
  };

  const sendAnnouncement = async (payload) => {
    await instructorApi.sendAnnouncement(payload);
  };

  const replyToReview = async (reviewId, message) => {
    await instructorApi.replyToReview(reviewId, message);
  };

  const recentCourses = computed(() => courses.value.slice(0, 5));
  const healthCourses = computed(() => courses.value.slice(0, 3));
  const filteredCourses = computed(() => {
    const search = courseFilters.value.search.trim().toLowerCase();
    const status = courseFilters.value.status;
    return courses.value.filter((course) => {
      const matchesSearch =
        !search ||
        course.title?.toLowerCase().includes(search) ||
        course.slug?.toLowerCase().includes(search);
      const matchesStatus = !status || course.status === status;
      return matchesSearch && matchesStatus;
    });
  });

  onMounted(reload);

  return {
    loading,
    error,
    overview,
    courses,
    revenue,
    payouts,
    bankInfo,
    reviews,
    profile,
    courseFilters,
    courseEdits,
    filteredCourses,
    enrollments,
    enrollmentsLoading,
    selectedCourseId,
    recentCourses,
    healthCourses,
    reload,
    updateCourseStatus,
    loadEnrollments,
    updateCourseFields,
    updateProfile,
    createCourse,
    sendAnnouncement,
    replyToReview
  };
};
