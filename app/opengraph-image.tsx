import { renderOg } from "./lib/og";

export const alt = "Britannia Crown — British Education Consultants";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return renderOg({ kicker: "British Education Consultants", title: "Education,", italic: "considered with care." });
}
