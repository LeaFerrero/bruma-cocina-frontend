import { BiBody } from "react-icons/bi";
import apiFetch from "../../../services/apiClient";

const createPayment = (paymentData) => {
  return apiFetch("/payments", {
    method: "POST",
    body: JSON.stringify(paymentData),
  });
};

export { createPayment };
