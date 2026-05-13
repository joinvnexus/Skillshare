<template>
  <article class="admin-card space-y-6 p-5 lg:col-span-2">
    <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 class="text-lg font-semibold text-slate-900">System Workspace</h2>
        <p class="text-xs text-slate-500">Manage your admin account plus core catalog and promotion settings.</p>
      </div>
      <button class="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800" @click="$emit('save-profile', profileForm)">
        Save Profile
      </button>
    </div>

    <section class="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <div class="rounded-2xl border border-slate-200 p-4">
        <h3 class="text-sm font-semibold text-slate-900">Admin Profile</h3>
        <p class="mt-1 text-xs text-slate-500">Keep your operator identity and access contact details current.</p>
        <div class="mt-4 grid gap-3">
          <input v-model="profileForm.displayName" type="text" placeholder="Full name" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <input v-model="profileForm.photoURL" type="text" placeholder="Avatar URL (optional)" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <div class="grid gap-3 md:grid-cols-2">
            <input :value="currentUser?.email || ''" type="text" disabled class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500" />
            <input :value="currentUser?.role || 'ADMIN'" type="text" disabled class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500" />
          </div>
        </div>
      </div>

      <div class="rounded-2xl border border-slate-200 p-4">
        <h3 class="text-sm font-semibold text-slate-900">Email Security</h3>
        <p class="mt-1 text-xs text-slate-500">Request a secure email update using your current password.</p>
        <div class="mt-4 grid gap-3">
          <input v-model="emailForm.email" type="email" placeholder="new-email@example.com" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <input v-model="emailForm.currentPassword" type="password" placeholder="Current password" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <button class="rounded-lg border border-slate-900 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50" @click="$emit('request-email-change', emailForm)">
            Request Email Change
          </button>
        </div>
      </div>
    </section>

    <section class="rounded-2xl border border-slate-200 p-4">
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 class="text-sm font-semibold text-slate-900">Category Management</h3>
          <p class="text-xs text-slate-500">Keep public catalog taxonomy clean and ordered.</p>
        </div>
        <div class="grid gap-2 sm:grid-cols-2">
          <input v-model="categoryFilters.search" type="text" placeholder="Search category" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <button class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50" @click="$emit('apply-category-filters')">
            Filter
          </button>
        </div>
      </div>

      <div class="mt-4 grid gap-3 rounded-2xl bg-slate-50 p-4 md:grid-cols-5">
        <input v-model="createCategoryForm.name" type="text" placeholder="Name" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <input v-model="createCategoryForm.slug" type="text" placeholder="Slug" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <input v-model="createCategoryForm.imageUrl" type="text" placeholder="Image URL" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <input v-model.number="createCategoryForm.displayOrder" type="number" min="0" placeholder="Order" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <button class="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800" @click="$emit('create-category')">
          Add Category
        </button>
        <textarea v-model="createCategoryForm.description" rows="2" placeholder="Short description" class="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-5"></textarea>
      </div>

      <div class="mt-4 space-y-3">
        <div v-if="categories.length === 0" class="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
          No categories found for the current filter.
        </div>
        <div v-for="category in categories" :key="category.id" class="grid gap-3 rounded-xl border border-slate-200 p-4 md:grid-cols-5">
          <input v-model="categoryEdits[category.id].name" type="text" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <input v-model="categoryEdits[category.id].slug" type="text" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <input v-model="categoryEdits[category.id].imageUrl" type="text" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <input v-model.number="categoryEdits[category.id].displayOrder" type="number" min="0" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <button class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50" @click="$emit('save-category', category.id)">
            Save
          </button>
          <textarea v-model="categoryEdits[category.id].description" rows="2" class="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-5"></textarea>
        </div>
      </div>
    </section>

    <section class="rounded-2xl border border-slate-200 p-4">
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 class="text-sm font-semibold text-slate-900">Coupons & Promotions</h3>
          <p class="text-xs text-slate-500">Configure offers without leaving the admin workspace.</p>
        </div>
        <div class="grid gap-2 sm:grid-cols-3">
          <input v-model="couponFilters.search" type="text" placeholder="Search code" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <select v-model="couponFilters.type" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="">All types</option>
            <option value="PERCENTAGE">Percentage</option>
            <option value="FIXED">Fixed</option>
          </select>
          <button class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50" @click="$emit('apply-coupon-filters')">
            Filter
          </button>
        </div>
      </div>

      <div class="mt-4 grid gap-3 rounded-2xl bg-slate-50 p-4 md:grid-cols-6">
        <input v-model="createCouponForm.code" type="text" placeholder="Code" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <select v-model="createCouponForm.type" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
          <option value="PERCENTAGE">Percentage</option>
          <option value="FIXED">Fixed</option>
        </select>
        <input v-model.number="createCouponForm.value" type="number" min="0" step="0.01" placeholder="Value" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <input v-model="createCouponForm.maxRedemptions" type="number" min="0" placeholder="Max redemptions" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <label class="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700">
          <input v-model="createCouponForm.isActive" type="checkbox" />
          Active
        </label>
        <button class="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800" @click="$emit('create-coupon')">
          Add Coupon
        </button>
        <input v-model="createCouponForm.startsAt" type="date" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <input v-model="createCouponForm.expiresAt" type="date" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <input v-model="createCouponForm.description" type="text" placeholder="Description" class="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-4" />
      </div>

      <div class="mt-4 space-y-3">
        <div v-if="coupons.length === 0" class="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
          No coupons found for the current filter.
        </div>
        <div v-for="coupon in coupons" :key="coupon.id" class="grid gap-3 rounded-xl border border-slate-200 p-4 md:grid-cols-6">
          <input v-model="couponEdits[coupon.id].code" type="text" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <select v-model="couponEdits[coupon.id].type" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="PERCENTAGE">Percentage</option>
            <option value="FIXED">Fixed</option>
          </select>
          <input v-model.number="couponEdits[coupon.id].value" type="number" min="0" step="0.01" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <input v-model="couponEdits[coupon.id].maxRedemptions" type="number" min="0" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <input v-model="couponEdits[coupon.id].startsAt" type="date" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <input v-model="couponEdits[coupon.id].expiresAt" type="date" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <input v-model="couponEdits[coupon.id].description" type="text" class="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-4" />
          <label class="flex items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700">
            <input v-model="couponEdits[coupon.id].isActive" type="checkbox" />
            Active
          </label>
          <button class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50" @click="$emit('save-coupon', coupon.id)">
            Save
          </button>
        </div>
      </div>
    </section>
  </article>
</template>

<script setup>
import { reactive, watch } from "vue";

const props = defineProps({
  currentUser: { type: Object, default: null },
  categories: { type: Array, default: () => [] },
  categoryEdits: { type: Object, required: true },
  categoryFilters: { type: Object, required: true },
  createCategoryForm: { type: Object, required: true },
  coupons: { type: Array, default: () => [] },
  couponEdits: { type: Object, required: true },
  couponFilters: { type: Object, required: true },
  createCouponForm: { type: Object, required: true }
});

defineEmits([
  "save-profile",
  "request-email-change",
  "apply-category-filters",
  "create-category",
  "save-category",
  "apply-coupon-filters",
  "create-coupon",
  "save-coupon"
]);

const profileForm = reactive({
  displayName: "",
  photoURL: ""
});

const emailForm = reactive({
  email: "",
  currentPassword: ""
});

watch(
  () => props.currentUser,
  (value) => {
    profileForm.displayName = value?.displayName || value?.name || "";
    profileForm.photoURL = value?.photoURL || value?.avatarUrl || "";
  },
  { immediate: true }
);
</script>
