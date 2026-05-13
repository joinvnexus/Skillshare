<template>
  <article class="admin-card p-5">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-sm font-semibold text-slate-900">Bank & Tax Info</h3>
        <p class="text-xs text-slate-500">Configure payout destination.</p>
      </div>
      <span class="admin-pill">{{ bankInfo.bankAccount ? "Connected" : "Action Needed" }}</span>
    </div>

    <div class="mt-4 grid gap-3 md:grid-cols-2">
      <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p class="text-xs font-semibold text-slate-600">Bank Account</p>
        <p class="mt-2 text-sm text-slate-600">{{ bankInfo.bankAccount || "Not connected" }}</p>
      </div>
      <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p class="text-xs font-semibold text-slate-600">Tax Details</p>
        <p class="mt-2 text-sm text-slate-600">{{ bankInfo.taxInfo || "Pending submission" }}</p>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  bankInfo: { type: Object, required: true }
});
</script>
