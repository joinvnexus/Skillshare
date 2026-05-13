<template>
  <section class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Order Details</p>
        <h1 class="text-2xl font-bold text-slate-900">{{ order?.orderNumber || "Order" }}</h1>
      </div>
      <router-link to="/dashboard/orders" class="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
        Back to Orders
      </router-link>
    </div>

    <DashboardState v-if="loading" type="loading" title="Loading order details..." />
    <DashboardState v-else-if="error" type="error" title="Order details failed to load" :description="error" show-retry @retry="reloadOrder" />
    <DashboardState v-else-if="!order" type="empty" title="Order not found." description="This order may not belong to your account or no longer exists." />

    <template v-else>
      <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p class="text-xs uppercase tracking-wide text-slate-500">Status</p>
            <p class="mt-1 text-sm font-semibold text-slate-900">{{ order.status }}</p>
          </div>
          <div>
            <p class="text-xs uppercase tracking-wide text-slate-500">Total</p>
            <p class="mt-1 text-sm font-semibold text-slate-900">${{ Number(order.totalAmount || 0).toFixed(2) }}</p>
          </div>
          <div>
            <p class="text-xs uppercase tracking-wide text-slate-500">Payment Method</p>
            <p class="mt-1 text-sm font-semibold text-slate-900">{{ order.paymentMethod || "N/A" }}</p>
          </div>
          <div>
            <p class="text-xs uppercase tracking-wide text-slate-500">Payment Reference</p>
            <p class="mt-1 break-all text-sm font-semibold text-slate-900">{{ order.paymentReference || "N/A" }}</p>
          </div>
        </div>
      </article>

      <article v-if="order.status !== 'PAID'" class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 class="text-lg font-semibold text-slate-900">Complete Payment</h2>
            <p class="mt-1 text-sm text-slate-500">Prepare checkout, then confirm the payment result to unlock the purchased courses.</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <button
              v-if="!paymentIntent"
              class="rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              :disabled="paymentLoading"
              @click="startPayment"
            >
              {{ paymentLoading ? "Preparing..." : "Prepare Checkout" }}
            </button>
            <template v-else>
              <button
                class="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                :disabled="paymentLoading"
                @click="verifyPayment('SUCCESS')"
              >
                {{ paymentLoading ? "Confirming..." : "Complete Payment" }}
              </button>
              <button
                class="rounded-md border border-rose-300 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50"
                :disabled="paymentLoading"
                @click="verifyPayment('FAILED')"
              >
                {{ paymentLoading ? "Updating..." : "Report Failure" }}
              </button>
            </template>
          </div>
        </div>
      </article>

      <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 class="text-lg font-semibold text-slate-900">Items</h2>
        <ul class="mt-4 space-y-3">
          <li
            v-for="item in order.items || []"
            :key="item.id"
            class="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 p-3"
          >
            <div>
              <p class="text-sm font-semibold text-slate-900">{{ item.course?.title || "Course" }}</p>
              <p class="text-xs text-slate-500">{{ item.course?.shortDescription || "No description available." }}</p>
            </div>
            <span class="text-sm font-semibold text-slate-900">${{ Number(item.totalPrice || 0).toFixed(2) }}</span>
          </li>
        </ul>
      </article>

      <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 class="text-lg font-semibold text-slate-900">Status Timeline</h2>
        <ul class="mt-4 space-y-4">
          <li v-for="step in timeline" :key="step.key" class="relative pl-5">
            <span class="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-sky-600"></span>
            <p class="text-sm font-semibold text-slate-900">{{ step.title }}</p>
            <p class="text-xs text-slate-500">{{ step.at }}</p>
          </li>
        </ul>
      </article>

      <article v-if="order.status === 'PAID'" class="rounded-xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
        <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 class="text-lg font-semibold text-emerald-900">Courses unlocked</h2>
            <p class="mt-1 text-sm text-emerald-800">This order is fully paid. Open your course library to continue learning.</p>
          </div>
          <router-link to="/dashboard/my-courses" class="rounded-md bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800">
            Open My Courses
          </router-link>
        </div>
      </article>
    </template>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import DashboardState from "@/components/dashboard/DashboardState.vue";

const route = useRoute();
const store = useStore();

const loading = computed(() => store.state.checkout.loading);
const error = computed(() => store.state.checkout.error);
const order = computed(() => store.getters["checkout/selectedOrder"]);
const paymentIntent = computed(() => store.getters["checkout/paymentIntentByOrderId"](route.params.orderId));
const paymentLoading = ref(false);

const formatDate = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "N/A" : date.toLocaleString();
};

const timeline = computed(() => {
  if (!order.value) return [];

  const entries = [
    {
      key: "created",
      title: "Order created",
      at: formatDate(order.value.createdAt)
    }
  ];

  if (order.value.paymentReference) {
    entries.push({
      key: "intent",
      title: "Payment initialized",
      at: formatDate(order.value.updatedAt || order.value.createdAt)
    });
  }

  if (order.value.status === "PAID") {
    entries.push({
      key: "paid",
      title: "Payment confirmed",
      at: formatDate(order.value.paidAt || order.value.updatedAt)
    });
  }

  if (order.value.status === "FAILED") {
    entries.push({
      key: "failed",
      title: "Payment failed",
      at: formatDate(order.value.updatedAt)
    });
  }

  return entries;
});

onMounted(() => {
  reloadOrder();
});

const reloadOrder = () => store.dispatch("checkout/fetchOrderById", route.params.orderId);

const startPayment = async () => {
  paymentLoading.value = true;
  try {
    await store.dispatch("checkout/ensurePaymentIntent", route.params.orderId);
    store.dispatch("ui/notify", { type: "success", message: "Payment initialized." });
    await reloadOrder();
  } catch (_error) {
    store.dispatch("ui/notify", { type: "error", message: store.state.checkout.error || "Payment initialization failed." });
  } finally {
    paymentLoading.value = false;
  }
};

const verifyPayment = async (outcome) => {
  paymentLoading.value = true;
  try {
    const resolvedIntent = await store.dispatch("checkout/ensurePaymentIntent", route.params.orderId);
    await store.dispatch("checkout/verifyPayment", {
      orderId: route.params.orderId,
      paymentReference: resolvedIntent?.paymentReference,
      outcome,
      paymentMethod: "CARD"
    });
    await Promise.all([reloadOrder(), store.dispatch("learning/fetchEnrolledCourses")]);
    store.dispatch("ui/notify", {
      type: outcome === "SUCCESS" ? "success" : "warning",
      message: outcome === "SUCCESS" ? "Payment completed and courses unlocked." : "Payment marked as failed."
    });
  } catch (_error) {
    store.dispatch("ui/notify", { type: "error", message: store.state.checkout.error || "Payment verification failed." });
  } finally {
    paymentLoading.value = false;
  }
};
</script>
