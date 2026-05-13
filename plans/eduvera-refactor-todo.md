# Eduvera Refactor TODO

## Product Direction

- [ ] Use `Eduvera` as the product name across planning docs
- [ ] Decide whether repo/package rename is needed now or after feature refactor
- [ ] Define final brand voice: premium, practical, career-growth LMS marketplace
- [ ] Lock target audience: students, instructors, and admin operations

## Phase 0: Foundation

- [ ] Freeze current feature scope and stop ad-hoc UI edits without module plan
- [ ] Create shared layout rules for public pages
- [ ] Create shared layout rules for dashboard pages
- [ ] Define spacing, surface, typography, form, and table tokens
- [ ] Standardize loading, empty, error, and success states
- [ ] Audit all current routes and map them to final route architecture

## Phase 1: Frontend Structure

- [ ] Create `src/layouts`
- [x] Create `src/modules/auth`
- [x] Create `src/modules/catalog`
- [x] Create `src/modules/course`
- [x] Create `src/modules/checkout`
- [x] Create `src/modules/enrollment`
- [x] Create `src/modules/dashboard-student`
- [x] Create `src/modules/dashboard-instructor`
- [x] Create `src/modules/dashboard-admin`
- [x] Create `src/modules/blog`
- [ ] Create `src/modules/learning-paths`
- [ ] Create `src/modules/notifications`
- [ ] Create `src/shared/ui`
- [x] Create `src/shared/services`
- [x] Create `src/shared/utils`
- [ ] Move page-specific components into domain folders
- [ ] Remove full-page layout logic from low-level components

## Phase 2: API Client Layer

- [x] Keep `src/lib/api.js` as the low-level transport only
- [x] Add `catalogApi`
- [x] Add `courseApi`
- [x] Add `checkoutApi`
- [x] Add `enrollmentApi`
- [x] Add `studentApi`
- [x] Add `instructorApi`
- [x] Add `adminApi`
- [x] Standardize API error mapping for frontend consumers
- [x] Standardize pagination/meta parsing on the frontend

## Phase 3: Store Refactor

- [x] Keep `auth` as the main auth module
- [x] Split course listing state into `catalog`
- [x] Split single course page state into `courseDetail`
- [x] Create `checkout` state module
- [x] Create `learning` state module for active enrollments and progress
- [ ] Create `notifications` state module
- [x] Create shared dashboard state module
- [x] Remove unrelated shared loading/error coupling between modules
- [x] Move route/query-driven filter state into one catalog source of truth

## Phase 4: Public Site Refactor

- [ ] Refactor home page into final public marketing shell
- [ ] Refactor course list page to full dynamic catalog page
- [ ] Add query-param synced search, filter, sort, and pagination
- [ ] Refactor course detail page into modular sections
- [ ] Make learning-path pages fully dynamic and API-driven
- [ ] Refactor blog listing and blog detail
- [ ] Refactor instructors listing and instructor detail
- [ ] Refactor resources, support, contact pages into same content system

## Phase 5: Catalog and Course Experience

- [ ] Standardize course card component
- [ ] Standardize course hero/detail CTA logic
- [ ] Show guest / enrolled / paid / free states properly
- [ ] Show instructor, rating, lessons, duration, and category consistently
- [ ] Show curriculum from real section/lesson data
- [ ] Show FAQ and review modules from API
- [ ] Add related courses and recommendation sections
- [ ] Add category landing pages if needed

## Phase 6: Cart, Checkout, and Enrollment

- [ ] Refactor cart into one proper module
- [ ] Support add-to-cart from catalog and course detail
- [ ] Support buy-now for single course
- [ ] Build order summary UI
- [ ] Build coupon apply/remove flow
- [ ] Build payment intent flow
- [ ] Build payment verify flow
- [ ] Handle paid order success state
- [ ] Handle paid order failure state
- [ ] Handle free-course direct enrollment
- [ ] Lock protected course content behind enrollment state

## Phase 7: Student Dashboard

- [ ] Replace current dashboard shell with final student dashboard layout
- [ ] Build student overview page
- [ ] Build learning library page
- [ ] Build dedicated course player route
- [ ] Show continue-learning rail
- [ ] Show lesson progress by course
- [ ] Show completed courses / certificates state
- [ ] Refactor wishlist page into table or card hybrid
- [ ] Refactor cart page into checkout-ready view
- [ ] Refactor orders page
- [ ] Add reviews history page
- [ ] Add notifications center
- [ ] Refactor settings/profile pages into final account area

## Phase 8: Instructor Dashboard

- [ ] Replace current instructor panel with multi-page instructor workspace
- [ ] Build instructor overview page
- [ ] Build course studio list page
- [ ] Build course create/edit page
- [ ] Build curriculum builder page
- [ ] Add section create/edit workflow
- [ ] Add lesson create/edit workflow
- [ ] Add student enrollment visibility per course
- [ ] Add reviews inbox
- [ ] Add announcements page
- [ ] Add revenue summary page
- [ ] Add payout history page
- [ ] Add instructor profile/settings page

## Phase 9: Admin Dashboard

- [ ] Replace current admin panel with modular admin workspace
- [ ] Build admin overview page
- [ ] Build users management page
- [ ] Build instructors management page
- [ ] Build course moderation page
- [ ] Build orders management page
- [ ] Build reviews moderation page
- [ ] Build testimonials moderation page
- [ ] Build learning paths management page
- [ ] Build blogs management page
- [ ] Build coupons management page
- [ ] Build notifications management page
- [ ] Build audit logs page

## Phase 10: Backend Refactor

- [ ] Split oversized route files into module-based backend structure
- [ ] Add controller/service/query boundaries
- [ ] Move business logic out of raw route handlers
- [ ] Standardize validation for all request bodies and query params
- [ ] Standardize success/error response shape
- [ ] Centralize enrollment-grant logic
- [ ] Centralize payment finalization logic
- [ ] Centralize review aggregate sync logic
- [ ] Centralize audit log side effects
- [ ] Centralize notification creation side effects

## Phase 11: Prisma and Database Improvements

- [ ] Review indexes for catalog filtering and order lookup
- [ ] Review indexes for notification unread queries
- [ ] Review indexes for lesson progress analytics
- [ ] Decide if `PaymentTransaction` model is needed
- [ ] Decide if `CourseAnnouncement` model is needed
- [ ] Decide if `Certificate` model is needed
- [ ] Decide if `CouponRedemption` model is needed
- [ ] Decide if richer activity tracking model is needed

## Phase 12: Testing

- [ ] Add frontend route smoke coverage
- [ ] Add store/module tests for checkout and enrollment
- [ ] Add Playwright flow for browse -> course -> buy -> enroll
- [ ] Add Playwright flow for free course direct enrollment
- [ ] Add Playwright flow for course player progress
- [ ] Extend backend tests for order creation
- [ ] Extend backend tests for payment verification
- [ ] Extend backend tests for enrollment grant rules
- [ ] Extend backend tests for lesson progress updates
- [ ] Extend backend tests for instructor course studio flows
- [ ] Extend backend tests for admin moderation flows

## Phase 13: Release Readiness

- [ ] Seed realistic courses, instructors, testimonials, blogs, and learning paths
- [ ] Check all role permissions manually
- [ ] Verify protected route redirects
- [ ] Verify guest vs enrolled states on course detail
- [ ] Verify dashboard navigation by role
- [ ] Verify mobile layout on public pages and dashboards
- [ ] Verify empty states on all major pages
- [ ] Verify loading states on all major pages
- [ ] Verify payment mock flow end-to-end
- [ ] Prepare deployment env checklist

## Suggested Build Order

- [ ] Sprint 1: dashboard shell + module folders + API service layer + course pages split
- [ ] Sprint 2: cart + checkout + enrollment flow + learning library
- [ ] Sprint 3: instructor workspace split
- [ ] Sprint 4: admin workspace split
- [ ] Sprint 5: backend module extraction + validation cleanup
- [ ] Sprint 6: full QA + polish + launch prep

## Definition Of Done

- [ ] Public catalog is fully dynamic
- [ ] Course detail is fully API-driven
- [ ] Checkout and enrollment work reliably
- [ ] Student dashboard supports real learning flow
- [ ] Instructor dashboard supports course operations
- [ ] Admin dashboard supports moderation and operations
- [ ] Frontend state is domain-based
- [ ] Backend is module/service based
- [ ] Critical tests pass
- [ ] Eduvera is ready as a serious LMS marketplace brand
