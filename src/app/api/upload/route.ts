import { NextRequest, NextResponse } from "next/server"
// 非同步 fs
import fs from "fs/promises"

export const POST = async (req: NextRequest) => {
  const formData = await req.formData()
  const file = formData.get("file")
  const rootPath = "./src/data"
  if (file) {
    const filePath = `${rootPath}/${(file as File).name.replace(/[^a-zA-Z0-9.]/g, "").replace(/\.+/g, ".")}`
    const fileContent = new Uint8Array(await (file as Blob).arrayBuffer())
    await fs.writeFile(filePath, fileContent)
    return NextResponse.json({ message: "Upload success" })
  }
}
