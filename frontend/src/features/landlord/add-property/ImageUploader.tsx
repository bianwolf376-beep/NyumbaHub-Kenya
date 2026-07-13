"use client";

import Image from "next/image";
import { toast } from "sonner";

interface ImageUploaderProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const MAX_IMAGES = 10;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function ImageUploader({
  files,
  setFiles,
}: ImageUploaderProps) {
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const selectedFiles = Array.from(
      e.target.files ?? [],
    );

    if (!selectedFiles.length) return;

    const validFiles: File[] = [];

    for (const file of selectedFiles) {
      if (!file.type.startsWith("image/")) {
        toast.error(
          `${file.name} is not a valid image.`,
        );
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error(
          `${file.name} exceeds the 5MB limit.`,
        );
        continue;
      }

      const duplicate = files.some(
        (existing) =>
          existing.name === file.name &&
          existing.size === file.size,
      );

      if (duplicate) {
        toast.error(
          `${file.name} has already been selected.`,
        );
        continue;
      }

      validFiles.push(file);
    }

    const combined = [...files, ...validFiles];

    if (combined.length > MAX_IMAGES) {
      toast.error(
        `You can upload a maximum of ${MAX_IMAGES} images.`,
      );

      return;
    }

    setFiles(combined);

    // Allow selecting the same file again later.
    e.target.value = "";
  }

  function removeImage(index: number) {
    setFiles((prev) =>
      prev.filter((_, i) => i !== index),
    );
  }

  return (
    <div className="space-y-6">
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        className="block w-full rounded-xl border border-gray-300 p-3 file:mr-4 file:rounded-lg file:border-0 file:bg-sky-600 file:px-4 file:py-2 file:text-white hover:file:bg-sky-700"
      />

      <p className="text-sm text-gray-500">
        Upload up to {MAX_IMAGES} images.
        Maximum size: 5MB per image.
      </p>

      {files.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {files.map((file, index) => {
            const preview =
              URL.createObjectURL(file);

            return (
              <div
                key={`${file.name}-${index}`}
                className="overflow-hidden rounded-xl border bg-white shadow-sm"
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={preview}
                    alt={file.name}
                    fill
                    unoptimized
                    className="object-cover"
                    onLoad={() =>
                      URL.revokeObjectURL(preview)
                    }
                  />
                </div>

                <div className="space-y-2 p-2">
                  <p
                    className="truncate text-xs font-medium"
                    title={file.name}
                  >
                    {file.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(
                      2,
                    )}{" "}
                    MB
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      removeImage(index)
                    }
                    className="w-full rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
);
}