import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { apiRequest } from "@/lib/api";

export const useAdminPanel = () => {
  const store = useStore();
  const loading = ref(true);
  const error = ref(null);
  const users = ref([]);
  const testimonials = ref([]);
  const orders = ref([]);
  const courses = ref([]);
  const learningPaths = ref([]);
  const blogs = ref([]);
  const categories = ref([]);
  const coupons = ref([]);
  const reviews = ref([]);
  const notifications = ref([]);
  const auditLogs = ref([]);
  const userEdits = reactive({});
  const orderEdits = reactive({});
  const courseEdits = reactive({});
  const learningPathEdits = reactive({});
  const blogEdits = reactive({});
  const categoryEdits = reactive({});
  const couponEdits = reactive({});
  const usersMeta = ref({ page: 1, totalPages: 1, total: 0 });
  const testimonialsMeta = ref({ page: 1, totalPages: 1, total: 0 });
  const ordersMeta = ref({ page: 1, totalPages: 1, total: 0 });
  const coursesMeta = ref({ page: 1, totalPages: 1, total: 0 });
  const learningPathsMeta = ref({ page: 1, totalPages: 1, total: 0 });
  const blogsMeta = ref({ page: 1, totalPages: 1, total: 0 });
  const categoriesMeta = ref({ page: 1, totalPages: 1, total: 0 });
  const couponsMeta = ref({ page: 1, totalPages: 1, total: 0 });
  const reviewsMeta = ref({ page: 1, totalPages: 1, total: 0 });
  const notificationsMeta = ref({ page: 1, totalPages: 1, total: 0 });
  const auditLogsMeta = ref({ page: 1, totalPages: 1, total: 0 });
  const userFilters = reactive({ page: 1, limit: 12, search: "", role: "", status: "" });
  const testimonialFilters = reactive({ page: 1, limit: 8, approved: "false", search: "" });
  const orderFilters = reactive({ page: 1, limit: 10, status: "", search: "" });
  const courseFilters = reactive({ page: 1, limit: 10, status: "", search: "" });
  const learningPathFilters = reactive({ page: 1, limit: 8, search: "", level: "", published: "" });
  const blogFilters = reactive({ page: 1, limit: 8, search: "", status: "" });
  const categoryFilters = reactive({ page: 1, limit: 8, search: "" });
  const couponFilters = reactive({ page: 1, limit: 8, search: "", type: "", active: "" });
  const reviewFilters = reactive({ page: 1, limit: 8, search: "", rating: "", published: "false" });
  const notificationFilters = reactive({ page: 1, limit: 8, search: "", type: "", isRead: "false" });
  const auditLogFilters = reactive({ page: 1, limit: 8, search: "", entityType: "" });
  const createLearningPathForm = reactive({
    slug: "",
    title: "",
    description: "",
    estimatedDuration: "",
    level: "BEGINNER",
    icon: "",
    imageUrl: "",
    featuresText: "",
    skillsText: "",
    projectsJson: "",
    displayOrder: 0,
    isPublished: false,
    isFeatured: false
  });
  const createBlogForm = reactive({
    title: "",
    slug: "",
    snippet: "",
    content: "",
    status: "DRAFT",
    isFeatured: false
  });
  const createCategoryForm = reactive({
    name: "",
    slug: "",
    description: "",
    imageUrl: "",
    displayOrder: 0
  });
  const createCouponForm = reactive({
    code: "",
    description: "",
    type: "PERCENTAGE",
    value: 10,
    maxRedemptions: "",
    startsAt: "",
    expiresAt: "",
    isActive: true
  });
  const createNotificationForm = reactive({
    title: "",
    message: "",
    type: "SYSTEM",
    linkUrl: "",
    broadcast: true,
    userId: ""
  });

  const notify = (type, message) => store.dispatch("ui/notify", { type, message });

  const parseList = (value) =>
    String(value || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const parseJson = (value) => {
    const raw = String(value || "").trim();
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (err) {
      return null;
    }
  };

  const primeFormState = () => {
    for (const user of users.value) {
      userEdits[user.id] = { role: user.role, status: user.status };
    }
    for (const order of orders.value) {
      orderEdits[order.id] = {
        status: order.status,
        paymentReference: order.paymentReference || ""
      };
    }
    for (const course of courses.value) {
      courseEdits[course.id] = {
        status: course.status
      };
    }
    for (const item of learningPaths.value) {
      learningPathEdits[item.id] = {
        title: item.title,
        level: item.level,
        estimatedDuration: item.estimatedDuration || "",
        icon: item.icon || "",
        imageUrl: item.imageUrl || "",
        featuresText: (item.features || []).join(", "),
        skillsText: (item.skills || []).join(", "),
        projectsJson: item.projects ? JSON.stringify(item.projects) : "",
        isPublished: Boolean(item.isPublished),
        isFeatured: Boolean(item.isFeatured),
        displayOrder: Number(item.displayOrder || 0)
      };
    }
    for (const blog of blogs.value) {
      blogEdits[blog.id] = {
        title: blog.title,
        status: blog.status,
        isFeatured: Boolean(blog.isFeatured)
      };
    }
    for (const category of categories.value) {
      categoryEdits[category.id] = {
        name: category.name,
        slug: category.slug,
        description: category.description || "",
        imageUrl: category.imageUrl || "",
        displayOrder: Number(category.displayOrder || 0)
      };
    }
    for (const coupon of coupons.value) {
      couponEdits[coupon.id] = {
        code: coupon.code,
        description: coupon.description || "",
        type: coupon.type,
        value: Number(coupon.value || 0),
        maxRedemptions: coupon.maxRedemptions ?? "",
        startsAt: coupon.startsAt ? String(coupon.startsAt).slice(0, 10) : "",
        expiresAt: coupon.expiresAt ? String(coupon.expiresAt).slice(0, 10) : "",
        isActive: Boolean(coupon.isActive)
      };
    }
  };

  const buildParams = (filters) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && String(value).trim() !== "") {
        params.set(key, String(value));
      }
    });
    return params.toString();
  };

  const reloadUsers = async () => {
    const usersRes = await apiRequest(`/admin/users?${buildParams(userFilters)}`, { auth: true });
    users.value = usersRes.data || [];
    usersMeta.value = usersRes.meta || { page: 1, totalPages: 1, total: 0 };
  };

  const reloadTestimonials = async () => {
    const testimonialsRes = await apiRequest(`/admin/testimonials?${buildParams(testimonialFilters)}`, { auth: true });
    testimonials.value = testimonialsRes.data || [];
    testimonialsMeta.value = testimonialsRes.meta || { page: 1, totalPages: 1, total: 0 };
  };

  const reloadOrders = async () => {
    const ordersRes = await apiRequest(`/admin/orders?${buildParams(orderFilters)}`, { auth: true });
    orders.value = ordersRes.data || [];
    ordersMeta.value = ordersRes.meta || { page: 1, totalPages: 1, total: 0 };
  };

  const reloadCourses = async () => {
    const response = await apiRequest(`/admin/courses?${buildParams(courseFilters)}`, { auth: true });
    courses.value = response.data || [];
    coursesMeta.value = response.meta || { page: 1, totalPages: 1, total: 0 };
  };

  const reloadLearningPaths = async () => {
    const response = await apiRequest(`/admin/learning-paths?${buildParams(learningPathFilters)}`, { auth: true });
    learningPaths.value = response.data || [];
    learningPathsMeta.value = response.meta || { page: 1, totalPages: 1, total: 0 };
  };

  const reloadBlogs = async () => {
    const response = await apiRequest(`/admin/blogs?${buildParams(blogFilters)}`, { auth: true });
    blogs.value = response.data || [];
    blogsMeta.value = response.meta || { page: 1, totalPages: 1, total: 0 };
  };

  const reloadCategories = async () => {
    const response = await apiRequest(`/admin/categories?${buildParams(categoryFilters)}`, { auth: true });
    categories.value = response.data || [];
    categoriesMeta.value = response.meta || { page: 1, totalPages: 1, total: 0 };
  };

  const reloadCoupons = async () => {
    const response = await apiRequest(`/admin/coupons?${buildParams(couponFilters)}`, { auth: true });
    coupons.value = response.data || [];
    couponsMeta.value = response.meta || { page: 1, totalPages: 1, total: 0 };
  };

  const reloadReviews = async () => {
    const response = await apiRequest(`/admin/reviews?${buildParams(reviewFilters)}`, { auth: true });
    reviews.value = response.data || [];
    reviewsMeta.value = response.meta || { page: 1, totalPages: 1, total: 0 };
  };

  const reloadNotifications = async () => {
    const response = await apiRequest(`/admin/notifications?${buildParams(notificationFilters)}`, { auth: true });
    notifications.value = response.data || [];
    notificationsMeta.value = response.meta || { page: 1, totalPages: 1, total: 0 };
  };

  const reloadAuditLogs = async () => {
    const response = await apiRequest(`/admin/audit-logs?${buildParams(auditLogFilters)}`, { auth: true });
    auditLogs.value = response.data || [];
    auditLogsMeta.value = response.meta || { page: 1, totalPages: 1, total: 0 };
  };

  const reload = async () => {
    loading.value = true;
    error.value = null;
    try {
      await Promise.all([
        reloadUsers(),
        reloadTestimonials(),
        reloadOrders(),
        reloadCourses(),
        reloadLearningPaths(),
        reloadBlogs(),
        reloadCategories(),
        reloadCoupons(),
        reloadReviews(),
        reloadNotifications(),
        reloadAuditLogs()
      ]);
      primeFormState();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const updateUser = async (userId) => {
    try {
      await apiRequest(`/admin/users/${userId}`, {
        method: "PATCH",
        auth: true,
        body: userEdits[userId]
      });
      await reloadUsers();
      notify("success", "User updated.");
    } catch (err) {
      error.value = err.message;
      notify("error", err.message);
    }
  };

  const updateOrder = async (orderId) => {
    try {
      await apiRequest(`/admin/orders/${orderId}`, {
        method: "PATCH",
        auth: true,
        body: orderEdits[orderId]
      });
      await reloadOrders();
      notify("success", "Order updated.");
    } catch (err) {
      error.value = err.message;
      notify("error", err.message);
    }
  };

  const updateCourseStatus = async (courseId, statusOverride = null) => {
    try {
      const status = statusOverride || courseEdits[courseId]?.status;
      if (!status) {
        notify("error", "Select a status first.");
        return;
      }
      await apiRequest(`/admin/courses/${courseId}/status`, {
        method: "PATCH",
        auth: true,
        body: { status }
      });
      await reloadCourses();
      primeFormState();
      notify("success", "Course status updated.");
    } catch (err) {
      error.value = err.message;
      notify("error", err.message);
    }
  };

  const updateCourseDecision = async (courseId, payload) => {
    const status = payload?.status;
    const note = payload?.note;
    if (!status) {
      notify("error", "Select a decision status.");
      return;
    }
    try {
      await apiRequest(`/admin/courses/${courseId}/status`, {
        method: "PATCH",
        auth: true,
        body: { status, note }
      });
      await reloadCourses();
      primeFormState();
      notify("success", "Course decision saved.");
    } catch (err) {
      error.value = err.message;
      notify("error", err.message);
    }
  };

  const updateCourseFields = async (courseId, fields) => {
    try {
      await apiRequest(`/admin/courses/${courseId}`, {
        method: "PATCH",
        auth: true,
        body: {
          title: fields.title,
          price: fields.price === "" ? null : Number(fields.price),
          salePrice: fields.salePrice === "" ? null : Number(fields.salePrice),
          thumbnailUrl: fields.thumbnailUrl || null
        }
      });
      await reloadCourses();
      primeFormState();
      notify("success", "Course updated.");
    } catch (err) {
      error.value = err.message;
      notify("error", err.message);
    }
  };

  const approveTestimonial = async (id) => {
    try {
      await apiRequest(`/admin/testimonials/${id}`, {
        method: "PATCH",
        auth: true,
        body: { isApproved: true }
      });
      await reloadTestimonials();
      notify("success", "Testimonial approved.");
    } catch (err) {
      error.value = err.message;
      notify("error", err.message);
    }
  };

  const toggleFeatured = async (item) => {
    try {
      await apiRequest(`/admin/testimonials/${item.id}`, {
        method: "PATCH",
        auth: true,
        body: { isFeatured: !item.isFeatured }
      });
      await reloadTestimonials();
      notify("success", item.isFeatured ? "Testimonial unfeatured." : "Testimonial featured.");
    } catch (err) {
      error.value = err.message;
      notify("error", err.message);
    }
  };

  const setPageAndReload = async (filters, page, reloadFn, shouldPrime = false) => {
    filters.page = page;
    await reloadFn();
    if (shouldPrime) {
      primeFormState();
    }
  };

  const resetAndReload = async (filters, reloadFn, shouldPrime = false) => {
    filters.page = 1;
    await reloadFn();
    if (shouldPrime) {
      primeFormState();
    }
  };

  const changeUsersPage = (page) => setPageAndReload(userFilters, page, reloadUsers, true);
  const applyUserFilters = () => resetAndReload(userFilters, reloadUsers, true);

  const changeTestimonialsPage = (page) => setPageAndReload(testimonialFilters, page, reloadTestimonials);
  const applyTestimonialFilters = () => resetAndReload(testimonialFilters, reloadTestimonials);

  const changeOrdersPage = (page) => setPageAndReload(orderFilters, page, reloadOrders, true);
  const applyOrderFilters = () => resetAndReload(orderFilters, reloadOrders, true);

  const changeCoursesPage = (page) => setPageAndReload(courseFilters, page, reloadCourses, true);
  const applyCourseFilters = () => resetAndReload(courseFilters, reloadCourses, true);

  const changeLearningPathsPage = (page) => setPageAndReload(learningPathFilters, page, reloadLearningPaths, true);
  const applyLearningPathFilters = () => resetAndReload(learningPathFilters, reloadLearningPaths, true);

  const createLearningPath = async () => {
    try {
      await apiRequest("/admin/learning-paths", {
        method: "POST",
        auth: true,
        body: {
          slug: createLearningPathForm.slug.trim(),
          title: createLearningPathForm.title.trim(),
          description: createLearningPathForm.description.trim(),
          estimatedDuration: createLearningPathForm.estimatedDuration.trim(),
          level: createLearningPathForm.level,
          icon: createLearningPathForm.icon.trim() || null,
          imageUrl: createLearningPathForm.imageUrl.trim() || null,
          features: parseList(createLearningPathForm.featuresText),
          skills: parseList(createLearningPathForm.skillsText),
          projects: parseJson(createLearningPathForm.projectsJson),
          displayOrder: Number(createLearningPathForm.displayOrder || 0),
          isPublished: createLearningPathForm.isPublished,
          isFeatured: createLearningPathForm.isFeatured
        }
      });
      createLearningPathForm.slug = "";
      createLearningPathForm.title = "";
      createLearningPathForm.description = "";
      createLearningPathForm.estimatedDuration = "";
      createLearningPathForm.level = "BEGINNER";
      createLearningPathForm.icon = "";
      createLearningPathForm.imageUrl = "";
      createLearningPathForm.featuresText = "";
      createLearningPathForm.skillsText = "";
      createLearningPathForm.projectsJson = "";
      createLearningPathForm.displayOrder = 0;
      createLearningPathForm.isPublished = false;
      createLearningPathForm.isFeatured = false;
      await reloadLearningPaths();
      primeFormState();
      notify("success", "Learning path created.");
    } catch (err) {
      error.value = err.message;
      notify("error", err.message);
    }
  };

  const updateLearningPath = async (id) => {
    try {
      const payload = {
        ...learningPathEdits[id],
        features: parseList(learningPathEdits[id].featuresText),
        skills: parseList(learningPathEdits[id].skillsText),
        projects: parseJson(learningPathEdits[id].projectsJson)
      };
      delete payload.featuresText;
      delete payload.skillsText;
      delete payload.projectsJson;
      await apiRequest(`/admin/learning-paths/${id}`, {
        method: "PATCH",
        auth: true,
        body: payload
      });
      await reloadLearningPaths();
      primeFormState();
      notify("success", "Learning path updated.");
    } catch (err) {
      error.value = err.message;
      notify("error", err.message);
    }
  };

  const changeBlogsPage = (page) => setPageAndReload(blogFilters, page, reloadBlogs, true);
  const applyBlogFilters = () => resetAndReload(blogFilters, reloadBlogs, true);

  const createBlog = async () => {
    try {
      await apiRequest("/admin/blogs", {
        method: "POST",
        auth: true,
        body: {
          title: createBlogForm.title.trim(),
          slug: createBlogForm.slug.trim(),
          snippet: createBlogForm.snippet.trim(),
          content: createBlogForm.content.trim(),
          status: createBlogForm.status,
          isFeatured: createBlogForm.isFeatured
        }
      });
      createBlogForm.title = "";
      createBlogForm.slug = "";
      createBlogForm.snippet = "";
      createBlogForm.content = "";
      createBlogForm.status = "DRAFT";
      createBlogForm.isFeatured = false;
      await reloadBlogs();
      primeFormState();
      notify("success", "Blog created.");
    } catch (err) {
      error.value = err.message;
      notify("error", err.message);
    }
  };

  const updateBlog = async (id) => {
    try {
      await apiRequest(`/admin/blogs/${id}`, {
        method: "PATCH",
        auth: true,
        body: blogEdits[id]
      });
      await reloadBlogs();
      primeFormState();
      notify("success", "Blog updated.");
    } catch (err) {
      error.value = err.message;
      notify("error", err.message);
    }
  };

  const changeCategoriesPage = (page) => setPageAndReload(categoryFilters, page, reloadCategories, true);
  const applyCategoryFilters = () => resetAndReload(categoryFilters, reloadCategories, true);

  const createCategory = async () => {
    try {
      await apiRequest("/admin/categories", {
        method: "POST",
        auth: true,
        body: {
          name: createCategoryForm.name.trim(),
          slug: createCategoryForm.slug.trim(),
          description: createCategoryForm.description.trim() || null,
          imageUrl: createCategoryForm.imageUrl.trim() || null,
          displayOrder: Number(createCategoryForm.displayOrder || 0)
        }
      });
      createCategoryForm.name = "";
      createCategoryForm.slug = "";
      createCategoryForm.description = "";
      createCategoryForm.imageUrl = "";
      createCategoryForm.displayOrder = 0;
      await reloadCategories();
      primeFormState();
      notify("success", "Category created.");
    } catch (err) {
      error.value = err.message;
      notify("error", err.message);
    }
  };

  const updateCategory = async (id) => {
    try {
      await apiRequest(`/admin/categories/${id}`, {
        method: "PATCH",
        auth: true,
        body: categoryEdits[id]
      });
      await reloadCategories();
      primeFormState();
      notify("success", "Category updated.");
    } catch (err) {
      error.value = err.message;
      notify("error", err.message);
    }
  };

  const changeCouponsPage = (page) => setPageAndReload(couponFilters, page, reloadCoupons, true);
  const applyCouponFilters = () => resetAndReload(couponFilters, reloadCoupons, true);

  const createCoupon = async () => {
    try {
      await apiRequest("/admin/coupons", {
        method: "POST",
        auth: true,
        body: {
          code: createCouponForm.code.trim(),
          description: createCouponForm.description.trim() || null,
          type: createCouponForm.type,
          value: Number(createCouponForm.value || 0),
          maxRedemptions: createCouponForm.maxRedemptions === "" ? null : Number(createCouponForm.maxRedemptions),
          startsAt: createCouponForm.startsAt || null,
          expiresAt: createCouponForm.expiresAt || null,
          isActive: createCouponForm.isActive
        }
      });
      createCouponForm.code = "";
      createCouponForm.description = "";
      createCouponForm.type = "PERCENTAGE";
      createCouponForm.value = 10;
      createCouponForm.maxRedemptions = "";
      createCouponForm.startsAt = "";
      createCouponForm.expiresAt = "";
      createCouponForm.isActive = true;
      await reloadCoupons();
      primeFormState();
      notify("success", "Coupon created.");
    } catch (err) {
      error.value = err.message;
      notify("error", err.message);
    }
  };

  const updateCoupon = async (id) => {
    try {
      await apiRequest(`/admin/coupons/${id}`, {
        method: "PATCH",
        auth: true,
        body: {
          ...couponEdits[id],
          maxRedemptions: couponEdits[id].maxRedemptions === "" ? null : Number(couponEdits[id].maxRedemptions),
          startsAt: couponEdits[id].startsAt || null,
          expiresAt: couponEdits[id].expiresAt || null
        }
      });
      await reloadCoupons();
      primeFormState();
      notify("success", "Coupon updated.");
    } catch (err) {
      error.value = err.message;
      notify("error", err.message);
    }
  };

  const changeReviewsPage = (page) => setPageAndReload(reviewFilters, page, reloadReviews);
  const applyReviewFilters = () => resetAndReload(reviewFilters, reloadReviews);

  const updateReview = async (id, isPublished) => {
    try {
      await apiRequest(`/admin/reviews/${id}`, {
        method: "PATCH",
        auth: true,
        body: { isPublished }
      });
      await reloadReviews();
      notify("success", isPublished ? "Review published." : "Review hidden.");
    } catch (err) {
      error.value = err.message;
      notify("error", err.message);
    }
  };

  const changeNotificationsPage = (page) => setPageAndReload(notificationFilters, page, reloadNotifications);
  const applyNotificationFilters = () => resetAndReload(notificationFilters, reloadNotifications);

  const createNotification = async () => {
    try {
      await apiRequest("/admin/notifications", {
        method: "POST",
        auth: true,
        body: {
          title: createNotificationForm.title.trim(),
          message: createNotificationForm.message.trim(),
          type: createNotificationForm.type,
          linkUrl: createNotificationForm.linkUrl.trim() || null,
          broadcast: createNotificationForm.broadcast,
          userId: createNotificationForm.broadcast ? null : createNotificationForm.userId.trim()
        }
      });
      createNotificationForm.title = "";
      createNotificationForm.message = "";
      createNotificationForm.type = "SYSTEM";
      createNotificationForm.linkUrl = "";
      createNotificationForm.broadcast = true;
      createNotificationForm.userId = "";
      await reloadNotifications();
      notify("success", "Notification sent.");
    } catch (err) {
      error.value = err.message;
      notify("error", err.message);
    }
  };

  const updateNotification = async (id, isRead) => {
    try {
      await apiRequest(`/admin/notifications/${id}`, {
        method: "PATCH",
        auth: true,
        body: { isRead }
      });
      await reloadNotifications();
      notify("success", isRead ? "Notification marked as read." : "Notification marked unread.");
    } catch (err) {
      error.value = err.message;
      notify("error", err.message);
    }
  };

  const changeAuditLogsPage = (page) => setPageAndReload(auditLogFilters, page, reloadAuditLogs);
  const applyAuditLogFilters = () => resetAndReload(auditLogFilters, reloadAuditLogs);

  onMounted(reload);

  return {
    loading,
    error,
    users,
    testimonials,
    orders,
    courses,
    learningPaths,
    blogs,
    categories,
    coupons,
    reviews,
    notifications,
    auditLogs,
    userEdits,
    orderEdits,
    courseEdits,
    learningPathEdits,
    blogEdits,
    categoryEdits,
    couponEdits,
    usersMeta,
    testimonialsMeta,
    ordersMeta,
    coursesMeta,
    learningPathsMeta,
    blogsMeta,
    categoriesMeta,
    couponsMeta,
    reviewsMeta,
    notificationsMeta,
    auditLogsMeta,
    userFilters,
    testimonialFilters,
    orderFilters,
    courseFilters,
    learningPathFilters,
    blogFilters,
    categoryFilters,
    couponFilters,
    reviewFilters,
    notificationFilters,
    auditLogFilters,
    createLearningPathForm,
    createBlogForm,
    createCategoryForm,
    createCouponForm,
    createNotificationForm,
    reload,
    updateUser,
    updateOrder,
    updateCourseStatus,
    updateCourseDecision,
    updateCourseFields,
    approveTestimonial,
    toggleFeatured,
    changeUsersPage,
    applyUserFilters,
    changeTestimonialsPage,
    applyTestimonialFilters,
    changeOrdersPage,
    applyOrderFilters,
    changeCoursesPage,
    applyCourseFilters,
    changeLearningPathsPage,
    applyLearningPathFilters,
    createLearningPath,
    updateLearningPath,
    changeBlogsPage,
    applyBlogFilters,
    createBlog,
    updateBlog,
    changeCategoriesPage,
    applyCategoryFilters,
    createCategory,
    updateCategory,
    changeCouponsPage,
    applyCouponFilters,
    createCoupon,
    updateCoupon,
    changeReviewsPage,
    applyReviewFilters,
    updateReview,
    changeNotificationsPage,
    applyNotificationFilters,
    createNotification,
    updateNotification,
    changeAuditLogsPage,
    applyAuditLogFilters
  };
};
