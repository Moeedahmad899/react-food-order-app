export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const orderData = req.body?.order;

  if (!orderData || !orderData.items || orderData.items.length === 0) {
    return res.status(400).json({ message: "Missing data." });
  }

  const customer = orderData.customer || {};

  if (
    !customer.email?.includes("@") ||
    !customer.name?.trim() ||
    !customer.street?.trim() ||
    !customer["postal-code"]?.trim() ||
    !customer.city?.trim()
  ) {
    return res.status(400).json({
      message: "Missing data: Email, name, street, postal code or city is missing.",
    });
  }

  return res.status(201).json({ message: "Order created!" });
}