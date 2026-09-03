import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";

const PAYFAST_IPS = ["197.242.144.0/20", "41.74.179.192/26"];

function ipToNumber(ip: string) {
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) return null;
  return parts.reduce((value, part) => value * 256 + part, 0);
}

function cidrContains(ip: string, cidr: string) {
  const [network, bitsText] = cidr.split("/");
  const ipNumber = ipToNumber(ip);
  const networkNumber = ipToNumber(network);
  const bits = Number(bitsText);
  if (ipNumber === null || networkNumber === null || !Number.isInteger(bits) || bits < 0 || bits > 32) return false;
  const mask = bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0;
  return ((ipNumber >>> 0) & mask) === ((networkNumber >>> 0) & mask);
}

function createSignature(fields: Record<string, string>, passphrase?: string) {
  const encoded = Object.entries(fields)
    .filter(([key, value]) => key !== "signature" && value !== "")
    .map(([key, value]) => `${key}=${encodeURIComponent(value).replace(/%20/g, "+")}`)
    .join("&");
  const value = passphrase
    ? `${encoded}&passphrase=${encodeURIComponent(passphrase).replace(/%20/g, "+")}`
    : encoded;
  return createHash("md5").update(value).digest("hex");
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const params = new URLSearchParams(rawBody);
  const received = Object.fromEntries(params.entries());
  const signature = received.signature || "";
  const passphrase = process.env.PAYFAST_PASSPHRASE?.trim();
  const expected = createSignature(received, passphrase);

  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const sourceIp = forwarded || request.headers.get("x-real-ip") || "";
  const validIp = PAYFAST_IPS.some((cidr) => cidrContains(sourceIp, cidr));
  const validSignature = signature.length === 32 && signature === expected;
  const merchantId = process.env.PAYFAST_MERCHANT_ID?.trim();
  const validMerchant = !merchantId || received.merchant_id === merchantId;
  const validStatus = received.payment_status === "COMPLETE";

  if (!validIp || !validSignature || !validMerchant || !validStatus) {
    return new NextResponse("Invalid ITN", { status: 400 });
  }

  // MVP: payment details are available in the PayFast dashboard/email and the
  // submitted property is carried in custom_str2. Persistence/admin delivery
  // can be added when the lead database is connected.
  return new NextResponse("OK", { status: 200 });
}
