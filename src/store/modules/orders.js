import { checkoutApi } from "@/modules/checkout/api/checkoutApi";
import { resolveErrorMessage } from "@/shared/services/apiClient";

const state = {
  items: [],
  loading: false,
  error: null,
  latestOrder: null,
  paymentIntents: {},
  selectedOrder: null
};

const mutations = {
  SET_ITEMS(state, items) {
    state.items = items;
  },
  ADD_ORDER(state, order) {
    state.items.unshift(order);
    state.latestOrder = order;
  },
  UPDATE_ORDER(state, order) {
    state.items = state.items.map((item) => (item.id === order.id ? order : item));
    state.latestOrder = order;
    if (state.selectedOrder?.id === order.id) {
      state.selectedOrder = order;
    }
  },
  SET_PAYMENT_INTENT(state, intent) {
    if (!intent?.orderId) return;
    state.paymentIntents = {
      ...state.paymentIntents,
      [intent.orderId]: intent
    };
  },
  SET_SELECTED_ORDER(state, order) {
    state.selectedOrder = order;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  }
};

const actions = {
  async fetchOrders({ commit }) {
    try {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      const response = await checkoutApi.listOrders();
      commit("SET_ITEMS", response.data || []);
      return response.data || [];
    } catch (error) {
      commit("SET_ERROR", resolveErrorMessage(error));
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchOrderById({ commit }, orderId) {
    try {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      const order = await checkoutApi.getOrderById(orderId);
      commit("SET_SELECTED_ORDER", order);
      commit("UPDATE_ORDER", order);
      return order;
    } catch (error) {
      commit("SET_ERROR", resolveErrorMessage(error));
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async createOrder({ commit }, payload) {
    try {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      const order = await checkoutApi.createOrder(payload);
      commit("ADD_ORDER", order);
      return order;
    } catch (error) {
      commit("SET_ERROR", resolveErrorMessage(error));
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async payOrder({ commit }, { orderId, paymentMethod = "CARD", paymentReference = null }) {
    try {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      const order = await checkoutApi.payOrder(orderId, {
        paymentMethod,
        paymentReference
      });
      commit("UPDATE_ORDER", order);
      return order;
    } catch (error) {
      commit("SET_ERROR", resolveErrorMessage(error));
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async createPaymentIntent({ commit }, orderId) {
    try {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      const intent = await checkoutApi.createPaymentIntent(orderId);
      commit("SET_PAYMENT_INTENT", intent);
      return intent;
    } catch (error) {
      commit("SET_ERROR", resolveErrorMessage(error));
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async ensurePaymentIntent({ state, dispatch }, orderId) {
    const existingIntent = state.paymentIntents?.[orderId];
    if (existingIntent?.paymentReference) {
      return existingIntent;
    }

    return dispatch("createPaymentIntent", orderId);
  },

  async verifyPayment({ commit }, { orderId, paymentReference, outcome = "SUCCESS", paymentMethod = "CARD" }) {
    try {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      const order = await checkoutApi.verifyPayment(orderId, {
        paymentReference,
        outcome,
        paymentMethod
      });
      commit("UPDATE_ORDER", order);
      return order;
    } catch (error) {
      commit("SET_ERROR", resolveErrorMessage(error));
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  }
};

const getters = {
  orders: (state) => state.items,
  latestOrder: (state) => state.latestOrder,
  selectedOrder: (state) => state.selectedOrder,
  paymentIntentByOrderId: (state) => (orderId) => state.paymentIntents?.[orderId] || null
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
