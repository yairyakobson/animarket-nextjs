import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ seed: string }> }
){
  const { seed } = await context.params || "?";

  const [initials] = seed.split("-")[0][0];

  const image = new ImageResponse(
    (
      <section
      style={{
        width: "100%",
        height: "100%",
        background: "#808080",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 128,
        fontWeight: 700,
        color: "white",
        fontFamily: "Arial, sans-serif"
      }}>
        {initials}
      </section>
    ),
    {
      width: 256,
      height: 256
    }
  );

  image.headers.set(
    "Cache-Control",
    "public, max-age=31536000, immutable"
  );

  return image;
}