import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js';
import { extname } from 'path';
import { randomUUID } from 'crypto';

@Injectable()
export class SupabaseService {
  private readonly supabase: SupabaseClient;
  private readonly bucket = 'property-images';

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL')!,
      this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY')!,
    );
  }

  async uploadImage(
    file: Express.Multer.File,
    folder = 'properties',
  ): Promise<string> {
    if (!file) {
      throw new BadRequestException(
        'Image file is required.',
      );
    }

    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/jpg',
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Only JPG, PNG and WEBP images are allowed.',
      );
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      throw new BadRequestException(
        'Image must not exceed 5MB.',
      );
    }

    const extension =
      extname(file.originalname).replace('.', '') ||
      'jpg';

    const filename =
      `${folder}/${randomUUID()}.${extension}`;

    const { error } =
      await this.supabase.storage
        .from(this.bucket)
        .upload(filename, file.buffer, {
          cacheControl: '3600',
          contentType: file.mimetype,
          upsert: false,
        });

    if (error) {
      throw new BadRequestException(error.message);
    }

    const { data } =
      this.supabase.storage
        .from(this.bucket)
        .getPublicUrl(filename);

    return data.publicUrl;
  }

  async uploadImages(
    files: Express.Multer.File[],
    folder = 'properties',
  ): Promise<string[]> {
    const urls: string[] = [];

    for (const file of files) {
      urls.push(
        await this.uploadImage(file, folder),
      );
    }

    return urls;
  }

  async deleteImage(
    imageUrl: string,
  ): Promise<void> {
    const index = imageUrl.indexOf(
      `/${this.bucket}/`,
    );

    if (index === -1) {
      return;
    }

    const path = imageUrl.substring(
      index + (`/${this.bucket}/`).length,
    );

    const { error } =
      await this.supabase.storage
        .from(this.bucket)
        .remove([path]);

    if (error) {
      throw new BadRequestException(
        error.message,
      );
    }
  }
}