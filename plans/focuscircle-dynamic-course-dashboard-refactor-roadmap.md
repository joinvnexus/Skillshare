# Eduvera Dynamic Course + Enrollment + Dashboard Refactor Roadmap

## Product Name

Recommended platform name: `Eduvera`

- positioning: modern course marketplace
- style: premium but broad enough for student, instructor, and enterprise growth
- fit: works better than a generic tutorial-site name and avoids direct similarity to Udemy/Coursera branding

## 1. Refactor Goal

Convert the current project into a fully dynamic course marketplace and enrollment platform where:

- public pages read from real API-backed data only
- course discovery, course detail, checkout, payment, and enrollment are one connected flow
- student, instructor, and admin dashboards share one consistent shell but have role-specific modules
- frontend state is split by domain instead of page-by-page behavior
- backend routes move toward stable resource boundaries with predictable response shapes

This roadmap is based on the current stack:

- frontend: Vue 3 + Vue Router + Vuex + Vite
- backend: Express + Prisma + PostgreSQL
- current domains already present: auth, courses, enrollments, orders, wishlist, blog, learning paths, instructor, admin

---

## 2. Current Codebase Snapshot

### Existing strengths

- Prisma schema already supports the main LMS entities:
  `Course`, `CourseSection`, `Lesson`, `Enrollment`, `LessonProgress`, `Order`, `OrderItem`, `Review`, `WishlistItem`, `LearningPath`, `Notification`, `AuditLog`
- role routes already exist:
  [public.routes.js](E:\webdevlopment-learn\Skillshare\server\src\routes\public.routes.js)
  [student.routes.js](E:\webdevlopment-learn\Skillshare\server\src\routes\student.routes.js)
  [instructor.routes.js](E:\webdevlopment-learn\Skillshare\server\src\routes\instructor.routes.js)
  [admin.routes.js](E:\webdevlopment-learn\Skillshare\server\src\routes\admin.routes.js)
- frontend already has route separation and dashboard children in
  [src/router/index.js](E:\webdevlopment-learn\Skillshare\src\router\index.js)
- frontend state modules already exist for most business areas in
  [src/store/index.js](E:\webdevlopment-learn\Skillshare\src\store\index.js)

### Current problems

- page layout and data concerns are mixed together across views/components
- some home and course components still assume full-page ownership instead of slot-based rendering
- Vuex modules mix domain state with shared UI loading/error state
- dashboard shell is too thin:
  [src/views/dashboard-shell/index.vue](E:\webdevlopment-learn\Skillshare\src\views\dashboard-shell\index.vue)
- student checkout/enrollment logic exists, but the UX flow is not modeled as one unified purchase funnel
- instructor and admin route files are large and action-heavy instead of being broken into feature modules/services
- API response shapes are usable but not fully standardized across all modules

---

## 3. Target Product Architecture

## 3.1 Frontend application layers

### App Shell

- global app shell
- public marketing shell
- dashboard shell

### Domain modules

- auth
- catalog
- course
- checkout
- enrollment
- student dashboard
- instructor studio
- admin operations
- content/blog/resources
- notifications

### Shared UI system

- tokens
- spacing
- surface system
- table system
- form system
- empty/loading/error states
- role-aware navigation patterns

## 3.2 Backend layers

- route handlers
- input validation
- domain services
- repository/prisma queries
- response serializers
- auth/permission guards
- audit + notification side effects

## 3.3 Data flow target

1. Public catalog fetches dynamic course data from API.
2. Course detail drives add-to-cart or buy-now.
3. Order creation and payment confirmation create enrollments.
4. Enrollment unlocks dashboard learning experience.
5. Lesson progress updates enrollment completion.
6. Instructor sees course, student, revenue, and review data.
7. Admin sees moderation, content, users, orders, and audit visibility.

---

## 4. Layout Refactor Plan

## 4.1 Public layout system

Create three layout primitives:

- `PublicPageLayout`
- `SectionHeader`
- `ContentSurface`

Use them across:

- home
- course list
- course detail
- learning path pages
- blog/resources/support/contact

### Rules

- one page container controls width
- sections should not re-declare their own full-page width
- spacing must come from a shared section rhythm
- cards should be used only for actual data units, not every wrapper

## 4.2 Dashboard layout system

Replace the current basic dashboard shell with a module-driven dashboard frame.

### Target dashboard structure

- `DashboardLayout`
- `DashboardSidebar`
- `DashboardTopbar`
- `DashboardContent`
- `DashboardSection`
- `DashboardStatCard`
- `DashboardTableCard`
- `DashboardFormCard`

### Navigation model

#### Student

- Overview
- My Learning
- Course Player / Continue Learning
- Wishlist
- Cart
- Orders
- Reviews
- Notifications
- Settings

#### Instructor

- Overview
- Course Studio
- Curriculum Builder
- Students
- Reviews
- Revenue
- Payouts
- Announcements
- Profile / Settings

#### Admin

- Overview
- Users
- Instructors
- Courses
- Reviews
- Orders
- Learning Paths
- Blogs
- Testimonials
- Coupons
- Notifications
- Audit Logs

---

## 5. Module Refactor Plan

## 5.1 Frontend module boundaries

Refactor `src` into domain-oriented folders:

```text
src/
  app/
  layouts/
  modules/
    auth/
    catalog/
    course/
    checkout/
    enrollment/
    dashboard-student/
    dashboard-instructor/
    dashboard-admin/
    blog/
    learning-paths/
    notifications/
  shared/
    ui/
    composables/
    services/
    utils/
```

### Move toward per-module structure

Each module should own:

- view containers
- presentational components
- API client calls
- store/composable state
- serializers or mappers if needed

## 5.2 Vuex state refactor

Current store modules are useful, but the next step is clearer domain ownership.

### Keep

- `auth`
- `courses`
- `enrollments`
- `orders`
- `wishlist`
- `blog`

### Refactor into

- `catalog`: filters, pagination, featured/popular, category state
- `courseDetail`: current course, curriculum, faqs, reviews, related courses
- `checkout`: cart, coupon, order draft, payment intent, payment confirmation
- `learning`: active enrollment, lesson progress, continue-learning state
- `dashboard`: shared dashboard counters and navigation state
- `notifications`: list, unread count, mark-read state

### Remove anti-pattern

- root-level generic loading/error coupling for unrelated domains

Each module should have:

- local loading
- local error
- selectors/getters for UI

## 5.3 API client layer

Replace generic direct API usage inside many modules with domain service wrappers:

- `catalogApi`
- `courseApi`
- `checkoutApi`
- `enrollmentApi`
- `studentApi`
- `instructorApi`
- `adminApi`

This sits on top of [src/lib/api.js](E:\webdevlopment-learn\Skillshare\src\lib\api.js).

---

## 6. Dynamic Course + Enrollment Product Plan

## 6.1 Catalog

### Deliverables

- dynamic course list with category, level, price, featured, popular filters
- search + filter + sort + pagination synced with URL query params
- category landing support
- learning-path-based entry into courses

### Backend alignment

- extend `/courses` to support sort, price ranges, featured/popular flags
- return normalized meta consistently

## 6.2 Course detail

### Deliverables

- course overview
- instructor profile block
- curriculum
- faqs
- reviews
- pricing/promo state
- enroll or buy CTA driven by auth + enrollment + cart state

### Needed UI states

- guest state
- already enrolled state
- free course direct enroll state
- paid course checkout state

## 6.3 Checkout and payment

### Deliverables

- cart as first-class module
- single-course buy-now flow
- multi-course checkout flow
- coupon support
- order summary
- payment intent / verification UX

### Backend already partially supports this

Use and refactor:

- `/student/me/orders`
- `/student/me/orders/:orderId/payment-intent`
- `/student/me/orders/:orderId/payment-verify`
- `/payments/mock-webhook`

### Next step

Introduce a dedicated checkout state machine:

- idle
- collecting items
- creating order
- awaiting payment
- verifying payment
- success
- failure

## 6.4 Enrollment and learning

### Deliverables

- enrollment-aware course player
- lesson unlock and progress persistence
- continue learning rail
- completion status
- certificate eligibility state

### Backend already supports

- `/student/me/enrollments`
- `/student/me/lessons/:lessonId/progress`

### Next step

Create a dedicated course player experience instead of keeping learning state buried inside generic enrolled course views.

---

## 7. Dashboard Refactor by Role

## 7.1 Student dashboard roadmap

### Phase A

- Overview
- My Courses
- Wishlist
- Orders
- Settings

### Phase B

- Continue learning widget
- progress charts
- recent activity
- notification center
- review submission history

### Phase C

- dedicated course player route
- learning streak
- certificate/completion shelf

### Suggested frontend route structure

```text
/dashboard
/dashboard/learning
/dashboard/learning/:courseId
/dashboard/wishlist
/dashboard/cart
/dashboard/orders
/dashboard/reviews
/dashboard/notifications
/dashboard/settings
```

## 7.2 Instructor dashboard roadmap

### Phase A

- Overview
- Courses list
- Course create/edit
- Section/lesson builder
- Students per course

### Phase B

- Reviews inbox
- announcements center
- revenue and payout summary
- instructor profile editor

### Phase C

- draft/review publishing workflow UX
- curriculum drag-sort
- course analytics
- lesson completion funnel by course

### Suggested route structure

```text
/dashboard/instructor
/dashboard/instructor/courses
/dashboard/instructor/courses/:courseId
/dashboard/instructor/courses/:courseId/curriculum
/dashboard/instructor/students
/dashboard/instructor/reviews
/dashboard/instructor/revenue
/dashboard/instructor/announcements
/dashboard/instructor/settings
```

## 7.3 Admin dashboard roadmap

### Phase A

- Overview
- Users
- Courses moderation
- Orders
- Testimonials pending

### Phase B

- Learning paths
- Blogs
- Coupons
- Notifications
- Reviews moderation

### Phase C

- audit analytics
- staff workflow actions
- moderation queue grouping
- dashboard saved filters

### Suggested route structure

```text
/dashboard/admin
/dashboard/admin/users
/dashboard/admin/instructors
/dashboard/admin/courses
/dashboard/admin/orders
/dashboard/admin/reviews
/dashboard/admin/testimonials
/dashboard/admin/learning-paths
/dashboard/admin/blogs
/dashboard/admin/coupons
/dashboard/admin/notifications
/dashboard/admin/audit-logs
```

---

## 8. Backend Refactor Roadmap

## 8.1 Split large route files into feature modules

Current route files are too large for long-term change safety.

Refactor toward:

```text
server/src/
  modules/
    auth/
    catalog/
    courses/
    checkout/
    enrollments/
    student/
    instructor/
    admin/
    blog/
    learning-paths/
    notifications/
```

Each module should contain:

- `*.controller.js`
- `*.service.js`
- `*.queries.js`
- `*.schemas.js`
- `*.serializer.js`

## 8.2 Service boundaries

### Catalog service

- public course listing
- public course detail
- related courses
- featured content blocks

### Checkout service

- create order
- payment intent
- payment verification
- order finalization
- grant enrollments

### Enrollment service

- enroll free/paid course rules
- fetch my enrollments
- progress calculation
- completion updates

### Instructor service

- course studio
- curriculum operations
- student reporting
- announcements
- revenue summary

### Admin service

- moderation
- reporting
- content ops
- audit log writes

## 8.3 Validation standardization

Current validation is partly manual.

Target:

- one validation schema per endpoint
- one error shape for validation failures
- shared parser rules for arrays, URLs, enums, numbers, dates

---

## 9. Database and Prisma Roadmap

The schema is already strong. Refactor focus should be on operational improvements, not a full redesign.

### Immediate schema additions worth considering

- `CourseVisibility` or scheduling fields if future staged publishing is needed
- `PaymentTransaction` table if real gateway integration is planned
- `CouponRedemption` table for deeper coupon analytics
- `CourseAnnouncement` model for instructor announcements as first-class content
- `UserCourseActivity` model for richer learning analytics
- `Certificate` model if completion certificates become real downloadable entities

### Index review

Add/verify indexes for:

- course search filters
- order lookup by payment reference
- notification unread queries
- lesson progress by enrollment and updated time

---

## 10. Refactor Phases

## Phase 1: Foundation

- finalize design tokens and layout primitives
- refactor public page shell
- refactor dashboard shell
- create domain API clients
- separate shared UI state from domain state

## Phase 2: Dynamic catalog + course detail

- refactor course list
- refactor course detail
- query-param based filtering
- related courses and recommendations cleanup

## Phase 3: Checkout + enrollment

- cart and buy-now architecture
- order creation state machine
- payment verification flow
- enrollment-driven access states

## Phase 4: Student dashboard

- overview refactor
- learning library
- course player
- orders/reviews/notifications

## Phase 5: Instructor dashboard

- course studio
- curriculum builder
- students, reviews, announcements
- revenue and payouts

## Phase 6: Admin dashboard

- modular admin sections
- moderation flows
- content operations
- audit and reporting UX

## Phase 7: Backend hardening

- route splitting
- service extraction
- validation normalization
- serializer cleanup

## Phase 8: QA and release readiness

- route-level tests
- enrollment and payment regression coverage
- dashboard e2e flows
- seed data review

---

## 11. Testing Roadmap

## Frontend

- route smoke tests
- store action tests for checkout/enrollment
- critical interaction tests with Playwright

## Backend

Keep extending current test coverage in `server/tests` with priority on:

- order creation
- payment verification
- enrollment grants
- lesson progress updates
- instructor curriculum editing
- admin moderation actions

## End-to-end critical flows

1. Browse courses -> open detail -> buy -> pay -> enrolled
2. Free course -> direct enroll -> open learning dashboard
3. Instructor creates course -> adds sections/lessons -> submits for review
4. Admin publishes course -> course appears in catalog
5. Student completes lessons -> progress reaches complete

---

## 12. Recommended Execution Order For This Repo

Best implementation order for this codebase:

1. dashboard shell refactor
2. frontend module folder reorganization
3. course list and course detail refactor
4. checkout and enrollment flow hardening
5. student dashboard learning experience
6. instructor course studio split
7. admin module split
8. backend service extraction

Reason:

- dashboard shell and module boundaries reduce churn before deeper feature work
- catalog and checkout are the core money path
- student learning experience depends on enrollment stability
- instructor/admin complexity should come after the core student commerce flow is stable

---

## 13. Immediate Next Sprint Recommendation

If starting now, use this sprint scope:

### Sprint 1

- refactor dashboard shell into role-aware layout
- create module folder structure on frontend
- create `catalogApi`, `courseApi`, `checkoutApi`, `studentApi`, `instructorApi`, `adminApi`
- split course list and course detail into proper container/presentational structure

### Sprint 2

- build unified cart + checkout state
- connect order creation and payment verify flow cleanly
- refactor student enrolled courses into learning library + player route

### Sprint 3

- split instructor panel into overview, courses, curriculum, students, revenue
- split admin panel into modular pages with dedicated routes

---

## 14. Definition of Done For The Refactor

This refactor is complete when:

- all public catalog and course pages are fully API-driven
- cart, order, payment, and enrollment form one reliable flow
- each role dashboard has a dedicated layout and route tree
- frontend state is organized by domain
- backend routes are split by feature/service
- tests cover enrollment, payment, and dashboard-critical flows
- adding a new course/admin/dashboard feature no longer requires editing oversized shared files
