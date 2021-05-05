export type OrderType = {
  order: Order;
  items: Items;
  session: Session;
};

export interface Order {
  createdAt: string;
  id: number;
  isCanceled: boolean;
  isComplete: boolean;
  isFulfilled: boolean;
  isShipped: boolean;
  sessionId: string;
  shipmentId: string;
  trackingNumber: string;
  trackingUrl: any;
  updatedAt: string;
}

export interface Items {
  data: Item[];
  has_more: boolean;
  object: string;
  url: string;
}

export interface Item {
  amount_subtotal: number;
  amount_total: number;
  currency: string;
  description: string;
  id: string;
  object: string;
  price: {
    active: boolean;
    billing_scheme: string;
    created: number;
    currency: string;
    id: string;
    livemode: boolean;
    lookup_key: any;
    metadata: {};
    nickname: any;
    object: string;
    product: string;
    recurring: any;
    tiers_mode: any;
    transform_quantity: any;
    type: string;
    unit_amount: number;
    unit_amount_decimal: string;
  };
  quantity: number;
}

export interface Session {
  allow_promotion_codes: any;
  amount_subtotal: number;
  amount_total: number;
  billing_address_collection: any;
  cancel_url: string;
  client_reference_id: any;
  currency: string;
  customer: string;
  customer_details: {
    email: string;
    tax_exempt: string;
  };
  tax_ids: [];
  customer_email: any;
  id: string;
  livemode: boolean;
  locale: any;
  metadata: {};
  mode: string;
  object: string;
  payment_intent: string;
  payment_method_options: {};
  payment_method_types: string[];
  payment_status: string;
  setup_intent: any;
  shipping: {
    address: {
      city: string;
      country: string;
      line1: string;
      line2: any;
      postal_code: string;
      state: string;
      name: string;
    };
  };
  shipping_address_collection: {
    allowed_countries: string[];
  };
  submit_type: any;
  subscription: any;
  success_url: string;
  total_details: {
    amount_discount: number;
    amount_shipping: number;
    amount_tax: number;
  };
}
