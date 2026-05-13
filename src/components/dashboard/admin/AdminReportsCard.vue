<template>
  <article class="admin-card space-y-6 p-5 lg:col-span-2">
    <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 class="text-lg font-semibold text-slate-900">Moderation & Operations</h2>
        <p class="text-xs text-slate-500">Review platform feedback, broadcast updates, and inspect recent admin activity.</p>
      </div>
      <div class="grid grid-cols-3 gap-2 text-center">
        <div class="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2">
          <p class="text-xs text-amber-700">Pending Reviews</p>
          <p class="text-lg font-semibold text-amber-900">{{ reviewsMeta.total }}</p>
        </div>
        <div class="rounded-xl border border-sky-200 bg-sky-50 px-3 py-2">
          <p class="text-xs text-sky-700">Unread Alerts</p>
          <p class="text-lg font-semibold text-sky-900">{{ notificationsMeta.total }}</p>
        </div>
        <div class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
          <p class="text-xs text-slate-600">Audit Events</p>
          <p class="text-lg font-semibold text-slate-900">{{ auditLogsMeta.total }}</p>
        </div>
      </div>
    </div>

    <section class="rounded-2xl border border-slate-200 p-4">
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 class="text-sm font-semibold text-slate-900">Review Moderation</h3>
          <p class="text-xs text-slate-500">Publish strong reviews and hide low-quality or abusive content.</p>
        </div>
        <div class="grid gap-2 sm:grid-cols-3">
          <input v-model="reviewFilters.search" type="text" placeholder="Search review/course/user" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <select v-model="reviewFilters.rating" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="">All ratings</option>
            <option v-for="rating in [5,4,3,2,1]" :key="rating" :value="rating">{{ rating }} stars</option>
          </select>
          <button class="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800" @click="$emit('apply-review-filters')">
            Apply
          </button>
        </div>
      </div>

      <div class="mt-4 space-y-3">
        <div v-if="reviews.length === 0" class="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
          No reviews matched the current moderation filters.
        </div>
        <div v-for="review in reviews" :key="review.id" class="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div class="min-w-0">
              <p class="text-sm font-semibold text-slate-900">{{ review.course?.title || "Course review" }}</p>
              <p class="mt-1 text-xs text-slate-500">{{ review.user?.name || "Learner" }} · {{ review.rating }}/5 · {{ formatDate(review.createdAt) }}</p>
              <p class="mt-2 text-sm leading-6 text-slate-700">{{ review.comment || "No written comment." }}</p>
            </div>
            <button
              class="rounded-lg px-3 py-2 text-xs font-semibold"
              :class="review.isPublished ? 'border border-rose-200 bg-rose-50 text-rose-700' : 'bg-emerald-600 text-white hover:bg-emerald-700'"
              @click="$emit('toggle-review', review.id, !review.isPublished)"
            >
              {{ review.isPublished ? "Hide Review" : "Publish Review" }}
            </button>
          </div>
        </div>
      </div>
      <div class="mt-4 flex justify-end">
        <button
          v-if="reviewsMeta.totalPages > 1"
          class="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          @click="$emit('change-reviews-page', nextPage(reviewsMeta))"
        >
          Next Page
        </button>
      </div>
    </section>

    <section class="grid gap-6 xl:grid-cols-[1.1fr_1fr]">
      <div class="rounded-2xl border border-slate-200 p-4">
        <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 class="text-sm font-semibold text-slate-900">Broadcast Notifications</h3>
            <p class="text-xs text-slate-500">Push system alerts to all users or a specific account.</p>
          </div>
          <label class="inline-flex items-center gap-2 text-xs font-semibold text-slate-600">
            <input v-model="notificationForm.broadcast" type="checkbox" />
            Broadcast to all users
          </label>
        </div>

        <div class="mt-4 grid gap-3">
          <input v-model="notificationForm.title" type="text" placeholder="Notification title" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <textarea v-model="notificationForm.message" rows="4" placeholder="Write the message users should receive" class="rounded-lg border border-slate-300 px-3 py-2 text-sm"></textarea>
          <div class="grid gap-3 md:grid-cols-2">
            <select v-model="notificationForm.type" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
              <option value="SYSTEM">System</option>
              <option value="PAYMENT">Payment</option>
              <option value="COURSE">Course</option>
              <option value="BLOG">Blog</option>
              <option value="REVIEW">Review</option>
            </select>
            <input v-model="notificationForm.linkUrl" type="text" placeholder="/dashboard/orders" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <input
            v-if="!notificationForm.broadcast"
            v-model="notificationForm.userId"
            type="text"
            placeholder="Target user ID"
            class="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <button class="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800" @click="$emit('create-notification')">
            Send Notification
          </button>
        </div>
      </div>

      <div class="rounded-2xl border border-slate-200 p-4">
        <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 class="text-sm font-semibold text-slate-900">Notification Queue</h3>
            <p class="text-xs text-slate-500">Track unread system events and mark them resolved.</p>
          </div>
          <div class="grid gap-2 sm:grid-cols-3">
            <input v-model="notificationFilters.search" type="text" placeholder="Search title/message" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <select v-model="notificationFilters.type" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
              <option value="">All types</option>
              <option value="SYSTEM">System</option>
              <option value="PAYMENT">Payment</option>
              <option value="COURSE">Course</option>
              <option value="BLOG">Blog</option>
              <option value="REVIEW">Review</option>
            </select>
            <button class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50" @click="$emit('apply-notification-filters')">
              Filter
            </button>
          </div>
        </div>

        <div class="mt-4 space-y-3">
          <div v-if="notifications.length === 0" class="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
            No notifications matched the current queue filters.
          </div>
          <div v-for="item in notifications" :key="item.id" class="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <p class="text-sm font-semibold text-slate-900">{{ item.title }}</p>
                <p class="mt-1 text-xs text-slate-500">{{ item.type }} · {{ item.user?.email || item.userId }} · {{ formatDate(item.createdAt) }}</p>
                <p class="mt-2 text-sm text-slate-700">{{ item.message }}</p>
              </div>
              <button
                class="rounded-lg px-3 py-2 text-xs font-semibold"
                :class="item.isRead ? 'border border-slate-300 text-slate-600 hover:bg-slate-100' : 'bg-sky-600 text-white hover:bg-sky-700'"
                @click="$emit('toggle-notification', item.id, !item.isRead)"
              >
                {{ item.isRead ? "Mark Unread" : "Mark Read" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="rounded-2xl border border-slate-200 p-4">
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 class="text-sm font-semibold text-slate-900">Audit Trail</h3>
          <p class="text-xs text-slate-500">Inspect the most recent admin actions affecting live entities.</p>
        </div>
        <div class="grid gap-2 sm:grid-cols-3">
          <input v-model="auditLogFilters.search" type="text" placeholder="Search action/entity" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <input v-model="auditLogFilters.entityType" type="text" placeholder="Entity type" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <button class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50" @click="$emit('apply-audit-filters')">
            Filter
          </button>
        </div>
      </div>

      <div class="mt-4 overflow-x-auto">
        <table class="min-w-full text-left text-sm">
          <thead class="text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th class="pb-3">Action</th>
              <th class="pb-3">Actor</th>
              <th class="pb-3">Entity</th>
              <th class="pb-3">When</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="auditLogs.length === 0">
              <td colspan="4" class="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                No audit log entries matched the current filters.
              </td>
            </tr>
            <tr v-for="entry in auditLogs" :key="entry.id" class="border-t border-slate-100">
              <td class="py-3 font-semibold text-slate-900">{{ entry.action }}</td>
              <td class="py-3 text-slate-600">{{ entry.actor?.email || "System" }}</td>
              <td class="py-3 text-slate-600">{{ entry.entityType }} · {{ entry.entityId }}</td>
              <td class="py-3 text-slate-500">{{ formatDate(entry.createdAt) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </article>
</template>

<script setup>
defineProps({
  reviews: { type: Array, default: () => [] },
  reviewsMeta: { type: Object, default: () => ({ page: 1, totalPages: 1, total: 0 }) },
  reviewFilters: { type: Object, required: true },
  notifications: { type: Array, default: () => [] },
  notificationsMeta: { type: Object, default: () => ({ page: 1, totalPages: 1, total: 0 }) },
  notificationFilters: { type: Object, required: true },
  notificationForm: { type: Object, required: true },
  auditLogs: { type: Array, default: () => [] },
  auditLogsMeta: { type: Object, default: () => ({ page: 1, totalPages: 1, total: 0 }) },
  auditLogFilters: { type: Object, required: true }
});

defineEmits([
  "apply-review-filters",
  "change-reviews-page",
  "toggle-review",
  "apply-notification-filters",
  "create-notification",
  "toggle-notification",
  "apply-audit-filters"
]);

const formatDate = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "N/A" : date.toLocaleString();
};

const nextPage = (meta) => {
  const totalPages = Number(meta?.totalPages || 1);
  const page = Number(meta?.page || 1);
  return page >= totalPages ? 1 : page + 1;
};
</script>
