import { createHash, randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

const SANDBOX_URL = "https://sandbox.payfast.co.za/eng/process";
const LIVE_URL = "https://www.payfast.co.za/eng/process";

function getBaseUrl(request: NextRequest) {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") || "https";
  const host = forwardedHost || request.headers.get("host");
  return host ? `${forwardedProto}://${host}` : new URL(request.url).origin;
}

function createSignature(fields: Record<string, string>, passphrase?: string) {
  const encoded = Object.entries(fields)
    .filter(([, value]) => value !== "")
    .map(([key, value]) => `${key}=${encodeURIComponent(value).replace(/%20/g, "+")}`)
    .join("&");
  const payload = passphrase
    ? `${encoded}&passphrase=${encodeURIComponent(passphrase).replace(/%20/g, "+")}`
    : encoded;
  return createHash("md5").update(payload).digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const merchantId = process.env.PAYFAST_MERCHANT_ID?.trim();
    const merchantKey = process.env.PAYFAST_MERCHANT_KEY?.trim();
    const passphrase = process.env.PAYFAST_PASSPHRASE?.trim();
    const environment = (process.env.PAYFAST_ENVIRONMENT || "sandbox").toLowerCase();

    if (!merchantId || !merchantKey) {
      return NextResponse.json({ error: "PayFast is not configured." }, { status: 500 });
    }

    const body = await request.json();
    const email = String(body.email || "").trim();
    const paymentId = String(body.paymentId || "").trim();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please enter the email address used for your Property Score." }, { status: 400 });
    }

    const upgradeId = `EIX-PRO-${Date.now()}-${randomUUID().slice(0, 8)}`;
    const baseUrl = getBaseUrl(request);

    const fields: Record<string, string> = {
      merchant_id: merchantId,
      merchant_key: merchantKey,
      return_url: `${baseUrl}/payment/pro-success?payment_id=${encodeURIComponent(upgradeId)}`,
      cancel_url: `${baseUrl}/payment/pro-cancel`,
      notify_url: `${baseUrl}/api/payfast/notify`,
      email_address: email.slice(0, 100),
      m_payment_id: upgradeId,
      amount: "349.00",
      item_name: "EiX Investor Report Pro",
      item_description: "Enhanced property investment report and WhatsApp walkthrough",
      custom_str1: "INVESTOR_REPORT_PRO",
      custom_str2: paymentId.slice(0, 100),
    };

    fields.signature = createSignature(fields, passphrase);

    return NextResponse.json({
      checkoutUrl: environment === "live" ? LIVE_URL : SANDBOX_URL,
      fields,
    });
  } catch {
    return NextResponse.json({ error: "Unable to start the Pro checkout. Please try again." }, { status: 500 });
  }
}
