export interface ImageCardProps {
  src: string;
  title: string;
  body: string;
  isBtnReq?: boolean;
  btnTxt?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  description: string;
  category: string;
  maxQuantity: number;
}

export interface CartProps {
  items: CartItem[];
}

export interface ShimmerCardProps {
  btnReq: boolean;
}

export interface ProductDisplayCardProps {
  src: string;
  originalPrice: number;
  discountedPrice: number;
  quantity: number;
  author: string;
  description: string;
  tags: string[];
}

export interface cartProdProps {
  src: string;
  originalPrice: number;
  discountedPrice: number;
  author: string;
}

export interface cartProdProps {
  cartItemId: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
  description?: string;
  addedAt: string;
  updatedAt?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

export interface OrderStatusHistory {
  status: string;
  timestamp: string;
  note?: string;
}

export interface PriceBreakdown {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  grandTotal: number;
}

export interface Order {
  orderId: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  priceBreakdown: PriceBreakdown;
  statusHistory: OrderStatusHistory[];
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  carrier?: string;
}

export interface CartApiResponse {
  userId: string;
  cart: Array<{
    quantity: number;
    name: string;
    productId: string;
    image: string;
    cartItemId: string;
    addedAt: string;
    price: number;
  }>;
  totalItems: number;
}

export interface ShippingProgressProps {
  subtotal: number;
}
