import {
  Injectable,
  BadRequestException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";

@Injectable()
export class SupabaseService {
  private readonly supabase: SupabaseClient;

  constructor(private readonly configService: ConfigService) {
    this.supabase = createClient(
      this.configService.get<string>("SUPABASE_URL")!,
      this.configService.get<string>("SUPABASE_SERVICE_ROLE_KEY")!,
    );
  }

  /**
   * Upload a single image to Supabase Storage
   */
  async uploadImage(
    file: Express.Multer.File,
    folder = "properties",
  ): Promise<string> {
    if (!file) {
      throw new BadRequestException("Image file is required.");
    }

    const extension = file.originalname.split(".").pop();
    const filename = `${folder}/${randomUUID()}.${extension}`;

    const { error } = await this.supabase.storage
      .from("property-images")
      .upload(filename, file.buffer, {
        cacheControl: "3600",
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) {
      throw new BadRequestException(error.message);
    }

    const { data } = this.supabase.storage
      .from("property-images")
      .getPublicUrl(filename);

    return data.publicUrl;
  }

  /**
   * Upload multiple images
   */
  async uploadImages(
    files: Express.Multer.File[],
    folder = "properties",
  ): Promise<string[]> {
    const urls: string[] = [];

    for (const file of files) {
      const url = await this.uploadImage(file, folder);
      urls.push(url);
    }

    return urls;
  }

  /**
   * Delete image from storage
   */
  async deleteImage(imageUrl: string): Promise<void> {
    const index = imageUrl.indexOf("/property-images/");

    if (index === -1) {
      return;
    }

    const path = imageUrl.substring(
      index + "/property-images/".length,
    );

    await this.supabase.storage
      .from("property-images")
      .remove([path]);
  }
}
