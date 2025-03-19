import crypto from "crypto";

export const webhookSignatureVerification = (req) => {
  const secret = process.env.WEBHOOK_SECRET_KEY;
  const payload = JSON.stringify(req.body);
  const signature = req.headers["x-payment-signature"];

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  return expectedSignature === signature;
};
