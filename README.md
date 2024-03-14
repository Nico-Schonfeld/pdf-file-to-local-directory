# Save to local pdf file

## Clone project

clone project with git

```bash
  git clone https://github.com/Nico-Schonfeld/pdf-file-to-local-directory.git
```

## Installation

Install project with npm

```bash
  npm install
```

## Running dev

To run dev

```bash
  npm run dev
```

## Add folder static in root

Create a folder in the root path static/pdf to save the files.

- ./static/pdf

## Routes

- /

- /api/upload

## Delete file

```bash
  async deleteBrochuresByIdService(data: DeleteAdminBrochuresObjectType) {
    try {
      if (!data || !data.pdfSrc || !data.fundNum || !data.categoryId) {
        throw new Error("Couldn't perform task");
      }
      const folderPath = `${process.cwd()}${data.pdfSrc}`;

      const deleted = await removeImgFile(folderPath);

      if (deleted) {
        const deletedBrochures =
          await this.adminBrochuresDAO.deleteBrochuresBySrc(data);
        return deletedBrochures;
      }
      return { error: true, success: false };
    } catch (error) {
      return error;
    }
  }


import * as promises from "fs/promises";
import fs from "fs";

export const removeImgFile = async (fullPath: string) => {
  if (fullPath && fs.existsSync(fullPath)) {
    const result = await promises.unlink(fullPath);

    return !fs.existsSync(fullPath);
  }
  return !fs.existsSync(fullPath);
};

```
