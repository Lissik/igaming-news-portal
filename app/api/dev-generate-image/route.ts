import { gateway, generateImage } from "ai"
import { writeFile } from "node:fs/promises"
import path from "node:path"

// Temporary dev-only endpoint used to batch-generate article featured images.
// Not part of the shipped application; removed after use.
export async function POST(req: Request) {
  const { slug, prompt, size } = await req.json()

  if (!slug || !prompt) {
    return Response.json({ error: "slug and prompt are required" }, { status: 400 })
  }

  try {
    const result = await generateImage({
      model: gateway.imageModel("openai/gpt-image-1"),
      prompt,
      size: size || "1536x1024",
    })

    const filePath = path.join(process.cwd(), "public", "images", "articles", `${slug}.png`)
    await writeFile(filePath, Buffer.from(result.image.base64, "base64"))

    return Response.json({ success: true, slug, bytes: result.image.base64.length })
  } catch (error: any) {
    return Response.json({ error: error?.message || String(error) }, { status: 500 })
  }
}
