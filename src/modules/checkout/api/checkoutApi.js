import { extractCollection, extractData, getAuthed, patchAuthed, postAuthed } from "@/shared/services/apiClient";

const listOrders = async () => {
  const response = await getAuthed("/student/me/orders");
  return extractCollection(response, []);
};

const getOrderById = async (orderId) => {
  const response = await getAuthed(`/student/me/orders/${orderId}`);
  return extractData(response, null);
};

const createOrder = async (payload) => {
  const response = await postAuthed("/student/me/orders", payload);
  return extractData(response, null);
};

const payOrder = async (orderId, payload) => {
  const response = await postAuthed(`/student/me/orders/${orderId}/pay`, payload);
  return extractData(response, null);
};

const createPaymentIntent = async (orderId) => {
  const response = await postAuthed(`/student/me/orders/${orderId}/payment-intent`);
  return extractData(response, null);
};

const verifyPayment = async (orderId, payload) => {
  const response = await postAuthed(`/student/me/orders/${orderId}/payment-verify`, payload);
  return extractData(response, null);
};

export const checkoutApi = {
  listOrders,
  getOrderById,
  createOrder,
  payOrder,
  createPaymentIntent,
  verifyPayment
};

export default checkoutApi;
