import { Router } from "express"
import { DraftOrder, Order } from "../../../.."
import middlewares from "../../../middlewares"
import { DeleteResponse, PaginatedResponse } from "../../../../types/common"

const route = Router()

export default (app) => {
  app.use("/draft-orders", route)

  route.get("/", middlewares.wrap(require("./list-draft-orders").default))

  route.get("/:id", middlewares.wrap(require("./get-draft-order").default))

  route.post("/", middlewares.wrap(require("./create-draft-order").default))

  route.post("/:id", middlewares.wrap(require("./update-draft-order").default))

  route.delete(
    "/:id",
    middlewares.wrap(require("./delete-draft-order").default)
  )

  route.delete(
    "/:id/line-items/:line_id",
    middlewares.wrap(require("./delete-line-item").default)
  )

  route.post(
    "/:id/line-items",
    middlewares.wrap(require("./create-line-item").default)
  )

  route.post(
    "/:id/line-items/:line_id",
    middlewares.wrap(require("./update-line-item").default)
  )

  route.post("/", middlewares.wrap(require("./create-draft-order").default))

  route.post(
    "/:id/pay",
    middlewares.wrap(require("./register-payment").default)
  )

  return app
}

export const defaultAdminDraftOrdersRelations = ["order", "cart"]

export const defaultAdminDraftOrdersCartRelations = [
  "region",
  "items",
  "payment",
  "shipping_address",
  "billing_address",
  "region.payment_providers",
  "shipping_methods",
  "payment_sessions",
  "shipping_methods.shipping_option",
  "discounts",
  "discounts.rule",
]

export const defaultAdminDraftOrdersCartFields = [
  "subtotal",
  "tax_total",
  "shipping_total",
  "discount_total",
  "gift_card_total",
  "total",
]

export const defaultAdminDraftOrdersFields = [
  "id",
  "status",
  "display_id",
  "cart_id",
  "order_id",
  "canceled_at",
  "created_at",
  "updated_at",
  "metadata",
  "no_notification_order",
]

export const allowedAdminDraftOrdersFields = [
  "id",
  "status",
  "display_id",
  "cart_id",
  "canceled_at",
  "created_at",
  "updated_at",
  "metadata",
  "no_notification_order",
]

export const allowedAdminDraftOrdersRelations = ["cart"]

export type AdminPostDraftOrdersDraftOrderRegisterPaymentRes = {
  order: Order
}

export type AdminDraftOrdersRes = {
  draft_order: DraftOrder
}

export type AdminDraftOrdersDeleteRes = DeleteResponse

export type AdminDraftOrdersListRes = PaginatedResponse & {
  draft_orders: DraftOrder[]
}

export * from "./create-draft-order"
export * from "./create-line-item"
export * from "./delete-draft-order"
export * from "./delete-line-item"
export * from "./get-draft-order"
export * from "./list-draft-orders"
export * from "./register-payment"
export * from "./update-draft-order"
export * from "./update-line-item"
