import apiClient from "../utils/api-client";


// export function checkoutAPI(cart) {
//   return apiClient.post("/order/checkout", { cart });
// }

export function checkoutAPI() {
  return apiClient.post("/order/checkout");
}