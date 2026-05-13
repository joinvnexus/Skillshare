export const learningPathPages = {
  beginner: {
    path: "/beginner",
    name: "BeginnerPath",
    slug: "beginner",
    levelLabel: "Beginner Path",
    ctaText: "Start Beginner Path",
    title: "Beginner Learning Path"
  },
  intermediate: {
    path: "/intermediate",
    name: "IntermediatePath",
    slug: "intermediate",
    levelLabel: "Intermediate Path",
    ctaText: "Start Intermediate Path",
    title: "Intermediate Learning Path"
  },
  advanced: {
    path: "/advanced",
    name: "AdvancedPath",
    slug: "advanced",
    levelLabel: "Advanced Path",
    ctaText: "Start Advanced Path",
    title: "Advanced Learning Path"
  }
}

export const learningPathPageOrder = ["beginner", "intermediate", "advanced"]

export const getLearningPathPage = (key) => {
  const normalizedKey = String(key || "").toLowerCase()

  return learningPathPages[normalizedKey] || learningPathPages.beginner
}
