import crypto from "crypto";

export const webhookSignatureVerification = (req) => {
  try {
    const secret = process.env.WEBHOOK_SECRET_KEY;
    if (!secret) {
      console.error("Webhook Secret Key is missing in environment variables.");
      return false;
    }

    const payload = JSON.stringify(req.body);
    const signature = req.headers["x-payment-signature"];

    if (!signature) {
      console.error("Missing x-payment-signature header.");
      return false;
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(Buffer.from(payload, "utf8")) // Ensures secure payload processing
      .digest("hex");

    return expectedSignature === signature;
  } catch (error) {
    console.error("Webhook Signature Verification Error:", error);
    return false;
  }
};
