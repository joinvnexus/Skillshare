const CATALOG_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80";

const HERO_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});

const compactNumberFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1
});

const toNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const firstText = (...values) => {
  return values.find((value) => String(value || "").trim()) || "";
};

export const getCourseIdentifier = (course) => course?.slug || course?.id || "";

export const resolveCourseImage = (course, variant = "catalog") => {
  const image = course?.image || course?.thumbnailUrl || "";

  if (image) {
    return image;
  }

  return variant === "hero" ? HERO_FALLBACK_IMAGE : CATALOG_FALLBACK_IMAGE;
};

export const resolveCourseDescription = (course, variant = "summary") => {
  if (variant === "hero") {
    return (
      firstText(course?.descriptionExtended, course?.description, course?.fullDescription) ||
      "Build practical skills with a project-based curriculum and guided lessons."
    );
  }

  if (variant === "long") {
    return (
      firstText(course?.fullDescription, course?.descriptionExtended, course?.description) ||
      "This course combines guided lessons, projects, and clear explanations."
    );
  }

  return (
    firstText(course?.description, course?.descriptionExtended, course?.fullDescription) ||
    "Practical curriculum designed to move from theory into shipping work."
  );
};

export const formatCoursePrice = (courseOrPrice) => {
  const price =
    typeof courseOrPrice === "object" ? toNumber(courseOrPrice?.price) : toNumber(courseOrPrice);

  return price === 0 ? "Free" : priceFormatter.format(price);
};

export const formatCourseRating = (rating) => toNumber(rating).toFixed(1);

export const formatCompactNumber = (value) => compactNumberFormatter.format(toNumber(value));

export const formatStudentCount = (value) => Number(toNumber(value)).toLocaleString("en-US");

export const isCourseNew = (createdAt) => {
  if (!createdAt) {
    return false;
  }

  const createdDate = new Date(createdAt);

  if (Number.isNaN(createdDate.getTime())) {
    return false;
  }

  const diffDays = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays <= 30;
};

export const getCourseLevelClass = (level) => {
  const key = String(level || "").toLowerCase();

  if (key === "beginner") {
    return "bg-[var(--bg-alt)] text-[var(--brand-strong)]";
  }

  if (key === "intermediate") {
    return "bg-yellow-100 text-yellow-800";
  }

  if (key === "advanced") {
    return "bg-red-100 text-red-700";
  }

  return "bg-[var(--surface-soft)] text-[var(--muted)]";
};

export const buildCourseDetailMeta = (course = {}) => [
  { icon: "fas fa-clock", label: "Duration", value: course.duration || "Self paced" },
  { icon: "fas fa-book", label: "Lessons", value: course.lessons || "N/A" },
  { icon: "fas fa-signal", label: "Level", value: course.level || "All Levels" },
  { icon: "fas fa-language", label: "Language", value: course.language || "English" },
  { icon: "fas fa-certificate", label: "Certificate", value: course.certificate ? "Included" : "Not included" }
];

export const buildCourseIncludes = (course = {}) => [
  { icon: "fas fa-video", text: `${course.duration || "Self paced"} on-demand video` },
  { icon: "fas fa-file-alt", text: `${course.lessons || 0} guided lessons and notes` },
  { icon: "fas fa-mobile-alt", text: "Access on desktop, tablet, and mobile" },
  { icon: "fas fa-infinity", text: "Full lifetime access after enrollment" },
  { icon: "fas fa-trophy", text: "Certificate of completion when enabled" }
];

export const buildPrimaryCourseActionState = ({
  course,
  purchaseLoading = false,
  isEnrolled = false,
  isInCart = false
}) => {
  const isPaidCourse = toNumber(course?.price) > 0;

  if (purchaseLoading) {
    return {
      label: "Processing...",
      hint: "We are preparing your next step."
    };
  }

  if (isEnrolled) {
    return {
      label: "Continue Learning",
      hint: "This course is already in your library."
    };
  }

  if (isPaidCourse) {
    return {
      label: isInCart ? "Go to Cart" : `Add to Cart - ${formatCoursePrice(course)}`,
      hint: isInCart
        ? "This course is already in your cart."
        : "Secure checkout unlocks the course in your library."
    };
  }

  return {
    label: "Enroll for Free",
    hint: "Free courses are added to your library instantly."
  };
};
