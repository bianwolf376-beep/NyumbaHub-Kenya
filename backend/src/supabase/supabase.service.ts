import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';
import { Express } from 'express';

@Injectable()
export class SupabaseService {
  private supabase: any;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY');

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async uploadImages(
    files: Express.Multer.File[],
    folder: string,
  ): Promise<string[]> {
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const fileName = `${Date.now()}-${file.originalname}`;
      const filePath = `${folder}/${fileName}`;

      const { error } = await this.supabase.storage
        .from('nyumbahub')
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
        });

      if (error) {
        throw new Error(`Failed to upload image: ${error.message}`);
      }

      const { data } = this.supabase.storage
        .from('nyumbahub')
        .getPublicUrl(filePath);

      uploadedUrls.push(data.publicUrl);
    }

    return uploadedUrls;
  }

  async deleteImage(imageUrl: string): Promise<void> {
    try {
      const urlParts = imageUrl.split('/');
      const filePath = urlParts.slice(-2).join('/');

      await this.supabase.storage
        .from('nyumbahub')
        .remove([filePath]);
    } catch (error) {
      console.error('Failed to delete image:', error);
    }
  }
}
