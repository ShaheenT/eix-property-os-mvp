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

  const withPassphrase = passphrase
    ? `${encoded}&passphrase=${encodeURIComponent(passphrase).replace(/%20/g, "+")}`
    : encoded;

  return createHash("md5").update(withPassphrase).digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const merchantId = process.env.PAYFAST_MERCHANT_ID?.trim();
    const merchantKey = process.env.PAYFAST_MERCHANT_KEY?.trim();
    const passphrase = process.env.PAYFAST_PASSPHRASE?.trim();
    const environment = (process.env.PAYFAST_ENVIRONMENT || "sandbox").toLowerCase();

    if (!merchantId || !merchantKey) {
      return NextResponse.json(
        { error: "PayFast is not configured. Add the PayFast environment variables in Vercel." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const fullName = String(body.fullName || "").trim();
    const email = String(body.email || "").trim();
    const whatsapp = String(body.whatsapp || "").trim();
    const listingUrl = String(body.listingUrl || "").trim();
    const price = Number(body.price);
    const rent = Number(body.rent);

    if (!fullName || !email || !whatsapp || !listingUrl || !Number.isFinite(price) || !Number.isFinite(rent)) {
      return NextResponse.json({ error: "Please complete all required property details." }, { status: 400 });
    }

    try {
      new URL(listingUrl);
    } catch {
      return NextResponse.json({ error: "Please enter a valid property listing URL." }, { status: 400 });
    }

    const [firstName, ...lastParts] = fullName.split(/\s+/);
    const lastName = lastParts.join(" ");
    const paymentId = `EIX-${Date.now()}-${randomUUID().slice(0, 8)}`;
    const baseUrl = getBaseUrl(request);

    // PayFast custom fields let the ITN identify the submitted property without
    // exposing credentials. Keep the values short enough for PayFast field limits.
    const fields: Record<string, string> = {
      merchant_id: merchantId,
      merchant_key: merchantKey,
      return_url: `${baseUrl}/payment/success?payment_id=${encodeURIComponent(paymentId)}`,
      cancel_url: `${baseUrl}/payment/cancel`,
      notify_url: `${baseUrl}/api/payfast/notify`,
      name_first: firstName.slice(0, 100),
      name_last: lastName.slice(0, 100),
      email_address: email.slice(0, 100),
      m_payment_id: paymentId,
      amount: "149.00",
      item_name: "EiX Property Score Beta Report",
      item_description: "One property investment analysis report",
      custom_str1: whatsapp.slice(0, 100),
      custom_str2: listingUrl.slice(0, 255),
      custom_str3: String(Math.round(price)),
      custom_str4: String(Math.round(rent)),
    };

    fields.signature = createSignature(fields, passphrase);

    return NextResponse.json({
      checkoutUrl: environment === "live" ? LIVE_URL : SANDBOX_URL,
      fields,
    });
  } catch {
    return NextResponse.json({ error: "Unable to start PayFast checkout. Please try again." }, { status: 500 });
  }
}
