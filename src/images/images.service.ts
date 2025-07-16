import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { promises as fs } from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImageService {
  private uploadFolder = process.env.UPLOAD_FOLDER || 'uploads';

  async processAndSaveImage(file: Express.Multer.File): Promise<string> {
    await fs.mkdir(this.uploadFolder, { recursive: true });

    const filename = `${uuidv4()}.webp`;
    const filepath = path.join(this.uploadFolder, filename);

    await sharp(file.buffer)
      .webp({ quality: 80 })
      .toFile(filepath);

    return filename;
  }
}
