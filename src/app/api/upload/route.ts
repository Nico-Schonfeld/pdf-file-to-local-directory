import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import db from "../../../../db/db";
import { revalidatePath } from "next/cache";
import moment from "moment";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json(
        { success: false },
        { status: 404, statusText: "File not found" }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = `${process.cwd()}/static/pdf/${moment().format(
      "YYYY-MM-DD"
    )}-${file.name}`;
    await writeFile(path, buffer);

    const res = await db.brochure.create({
      data: {
        categoryId: 1,
        fundNum: 1,
        filePdf: path,
      },
    });

    revalidatePath("/");

    return NextResponse.json(
      {
        success: true,
        error: false,
        message: `Open ${path} to see the pdf`,
        result: res,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: true, success: false, err: "Bad request in db" },
      { status: 500 }
    );
  }
}
