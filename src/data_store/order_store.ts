import { create } from "zustand";
import axios from "axios";
import type { Order, ShippingAddress } from "../interfaces/index";

const API_BASE_URL = "http://localhost:3000/cart";

type OrderStore = {
  orders: Order[];
  currentOrder: Order | null;
  orderHistory: Order[];
  isLoading: boolean;
  error: string | null;
  currentUserId: string | null;

  setCurrentUser: (userId: string) => void;
  createOrder: (orderData: {
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    paymentDetails?: object;
    shippingMethod?: string;
    notes?: string;
  }) => Promise<Order>;

  fetchUserOrders: () => Promise<void>;
  fetchOrderById: (orderId: string) => Promise<void>;
  updateOrderStatus: (
    orderId: string,
    status: string,
    trackingInfo?: {
      trackingNumber?: string;
      carrier?: string;
      notes?: string;
    },
  ) => Promise<void>;

  getOrderById: (orderId: string) => Order | undefined;
  getOrdersByStatus: (status: string) => Order[];
  getTotalOrdersCount: () => number;
  getTotalSpent: () => number;
};

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  currentOrder: null,
  orderHistory: [],
  isLoading: false,
  error: null,
  currentUserId: null,

  setCurrentUser: (userId) => {
    set({ currentUserId: userId });
  },

  createOrder: async (orderData) => {
    const { currentUserId } = get();
    if (!currentUserId) {
      throw new Error("User ID is required");
    }

    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(
        `${API_BASE_URL}/cart/${currentUserId}/orders/create`,
        orderData,
      );

      const newOrder = response.data.data.order;

      set((state) => ({
        orders: [newOrder, ...state.orders],
        currentOrder: newOrder,
        isLoading: false,
      }));

      return newOrder;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create order";
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw new Error(errorMessage);
    }
  },

  fetchUserOrders: async () => {
    const { currentUserId } = get();
    if (!currentUserId) {
      set({ error: "User ID is required" });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(
        `http://localhost:3000/cart/${currentUserId}/orders`,
      );

      set({
        orders: response.data.data || [],
        orderHistory: response.data.data || [],
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch orders",
        isLoading: false,
      });
    }
  },

  fetchOrderById: async (orderId) => {
    const { currentUserId } = get();
    if (!currentUserId) {
      set({ error: "User ID is required" });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(
        `${API_BASE_URL}/${currentUserId}/orders/${orderId}`,
      );

      set({
        currentOrder: response.data.data.order,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch order",
        isLoading: false,
      });
    }
  },

  updateOrderStatus: async (orderId, status, trackingInfo = {}) => {
    const { currentUserId } = get();
    if (!currentUserId) {
      set({ error: "User ID is required" });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await axios.put(
        `${API_BASE_URL}/${currentUserId}/orders/${orderId}/status`,
        { status, ...trackingInfo },
      );

      const updatedOrder = response.data.data;

      set((state) => ({
        orders: state.orders.map((order) =>
          order.orderId === orderId
            ? {
                ...order,
                status: updatedOrder.newStatus,
                trackingNumber: updatedOrder.trackingNumber,
                carrier: updatedOrder.carrier,
                statusHistory: [
                  ...order.statusHistory,
                  {
                    status: updatedOrder.newStatus,
                    timestamp: new Date().toISOString(),
                    note: `Order status updated to ${updatedOrder.newStatus}`,
                  },
                ],
                updatedAt: new Date().toISOString(),
              }
            : order,
        ),
        currentOrder:
          state.currentOrder?.orderId === orderId
            ? {
                ...state.currentOrder,
                status: updatedOrder.newStatus,
                trackingNumber: updatedOrder.trackingNumber,
                carrier: updatedOrder.carrier,
                statusHistory: [
                  ...state.currentOrder.statusHistory,
                  {
                    status: updatedOrder.newStatus,
                    timestamp: new Date().toISOString(),
                    note: `Order status updated to ${updatedOrder.newStatus}`,
                  },
                ],
                updatedAt: new Date().toISOString(),
              }
            : state.currentOrder,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update order status",
        isLoading: false,
      });
    }
  },

  getOrderById: (orderId) => {
    return get().orders.find((order) => order.orderId === orderId);
  },

  getOrdersByStatus: (status) => {
    return get().orders.filter((order) => order.status === status);
  },

  getTotalOrdersCount: () => {
    return get().orders.length;
  },

  getTotalSpent: () => {
    return get().orders.reduce(
      (total, order) => total + order.priceBreakdown.grandTotal,
      0,
    );
  },
}));
