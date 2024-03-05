"use server";
import db from "../../db/db";

export async function deleteBrochure(id: number | undefined) {
  const res = await db.brochure.delete({
    where: {
      id,
    },
  });

  return { result: res, message: "Exito!" };
}
