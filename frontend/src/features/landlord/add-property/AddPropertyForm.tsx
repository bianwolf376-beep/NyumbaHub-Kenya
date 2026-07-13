"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

import PropertyService, {
  CreatePropertyDto,
} from "@/services/property/property.service";

import ImageUploader from "./ImageUploader";

const COUNTIES = [
  "Baringo",
  "Bomet",
  "Bungoma",
  "Busia",
  "Elgeyo Marakwet",
  "Embu",
  "Garissa",
  "Homa Bay",
  "Isiolo",
  "Kajiado",
  "Kakamega",
  "Kericho",
  "Kiambu",
  "Kilifi",
  "Kirinyaga",
  "Kisii",
  "Kisumu",
  "Kitui",
  "Kwale",
  "Laikipia",
  "Lamu",
  "Machakos",
  "Makueni",
  "Mandera",
  "Marsabit",
  "Meru",
  "Migori",
  "Mombasa",
  "Murang'a",
  "Nairobi",
  "Nakuru",
  "Nandi",
  "Narok",
  "Nyamira",
  "Nyandarua",
  "Nyeri",
  "Samburu",
  "Siaya",
  "Taita Taveta",
  "Tana River",
  "Tharaka Nithi",
  "Trans Nzoia",
  "Turkana",
  "Uasin Gishu",
  "Vihiga",
  "Wajir",
  "West Pokot",
];

const PROPERTY_TYPES = [
  "Apartment",
  "Bedsitter",
  "Studio",
  "Single Room",
  "Maisonette",
  "Bungalow",
  "Villa",
  "Office",
  "Shop",
];

const AMENITIES = [
  ["parking", "Parking"],
  ["furnished", "Furnished"],
  ["wifi", "WiFi"],
  ["cctv", "CCTV"],
  ["balcony", "Balcony"],
  ["security", "24/7 Security"],
  ["borehole", "Borehole"],
  ["swimmingPool", "Swimming Pool"],
  ["lift", "Lift"],
  ["petsAllowed", "Pets Allowed"],
  ["backupGenerator", "Backup Generator"],
] as const;

export default function AddPropertyForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState<File[]>([]);

  const [form, setForm] = useState<CreatePropertyDto>({
    title: "",
    description: "",
    county: "",
    town: "",
    estate: "",
    address: "",
    propertyType: "Apartment",
    bedrooms: 1,
    bathrooms: 1,
    rent: 0,
    deposit: 0,

    parking: false,
    furnished: false,
    wifi: false,
    cctv: false,
    balcony: false,
    security: false,
    borehole: false,
    swimmingPool: false,
    lift: false,
    petsAllowed: false,
    backupGenerator: false,
  });

  function update(
    key: keyof CreatePropertyDto,
    value: string | number | boolean,
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function submit(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    if (loading) return;

    if (!form.title.trim()) {
      toast.error("Property title is required.");
      return;
    }

    if (!form.description.trim()) {
      toast.error("Property description is required.");
      return;
    }

    if (form.description.trim().length < 30) {
      toast.error(
        "Description should be at least 30 characters.",
      );
      return;
    }

    if (!form.county) {
      toast.error("Please select a county.");
      return;
    }

    if (!form.town.trim()) {
      toast.error("Town is required.");
      return;
    }

    if (!form.estate.trim()) {
      toast.error("Estate is required.");
      return;
    }

    if (!form.address.trim()) {
      toast.error("Address is required.");
      return;
    }

    if (form.bedrooms < 0) {
      toast.error("Bedrooms cannot be negative.");
      return;
    }

    if (form.bathrooms < 1) {
      toast.error("Bathrooms must be at least 1.");
      return;
    }

    if (form.rent <= 0) {
      toast.error("Rent must be greater than zero.");
      return;
    }

    if (form.deposit < 0) {
      toast.error("Deposit cannot be negative.");
      return;
    }

    if (images.length === 0) {
      toast.error("Upload at least one property image.");
      return;
    }

    if (images.length > 10) {
      toast.error("Maximum 10 images allowed.");
      return;
    }

    setLoading(true);

    try {
      const property = await PropertyService.create({
        ...form,
        title: form.title.trim(),
        description: form.description.trim(),
        town: form.town.trim(),
        estate: form.estate.trim(),
        address: form.address.trim(),
      });

      await PropertyService.uploadImages(
        property.id,
        images,
      );

      toast.success(
        "Property published successfully.",
      );

      router.push("/dashboard/properties");
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ??
            "Unable to publish property.",
        );
      } else {
        toast.error(
          "An unexpected error occurred.",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Add Property
      </h1>

      <form
        onSubmit={submit}
        className="space-y-8"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <input
            placeholder="Property Title"
            className="rounded-xl border p-3"
            value={form.title}
            onChange={(e) =>
              update("title", e.target.value)
            }
          />

          <select
            className="rounded-xl border p-3"
            value={form.propertyType}
            onChange={(e) =>
              update(
                "propertyType",
                e.target.value,
              )
            }
          >
            {PROPERTY_TYPES.map((type) => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            ))}
          </select>

          <select
            className="rounded-xl border p-3"
            value={form.county}
            onChange={(e) =>
              update("county", e.target.value)
            }
          >
            <option value="">
              Select County
            </option>

            {COUNTIES.map((county) => (
              <option
                key={county}
                value={county}
              >
                {county}
              </option>
            ))}
          </select>

          <input
            placeholder="Town"
            className="rounded-xl border p-3"
            value={form.town}
            onChange={(e) =>
              update("town", e.target.value)
            }
          />

          <input
            placeholder="Estate"
            className="rounded-xl border p-3"
            value={form.estate}
            onChange={(e) =>
              update("estate", e.target.value)
            }
          />

          <input
            placeholder="Address"
            className="rounded-xl border p-3"
            value={form.address}
            onChange={(e) =>
              update("address", e.target.value)
            }
          />

          <input
            type="number"
            min={0}
            placeholder="Bedrooms"
            className="rounded-xl border p-3"
            value={form.bedrooms}
            onChange={(e) =>
              update(
                "bedrooms",
                Number(e.target.value),
              )
            }
          />

          <input
            type="number"
            min={1}
            placeholder="Bathrooms"
            className="rounded-xl border p-3"
            value={form.bathrooms}
            onChange={(e) =>
              update(
                "bathrooms",
                Number(e.target.value),
              )
            }
          />

          <input
            type="number"
            min={1}
            placeholder="Monthly Rent"
            className="rounded-xl border p-3"
            value={form.rent}
            onChange={(e) =>
              update(
                "rent",
                Number(e.target.value),
              )
            }
          />

          <input
            type="number"
            min={0}
            placeholder="Deposit"
            className="rounded-xl border p-3"
            value={form.deposit}
            onChange={(e) =>
              update(
                "deposit",
                Number(e.target.value),
              )
            }
          />
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">
            Amenities
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {AMENITIES.map(([key, label]) => (
              <label
                key={key}
                className="flex items-center gap-3 rounded-xl border p-3"
              >
                <input
                  type="checkbox"
                  checked={Boolean(form[key])}
                  onChange={(e) =>
                    update(
                      key,
                      e.target.checked,
                    )
                  }
                />

                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-3 block font-semibold">
            Description
          </label>

          <textarea
            rows={6}
            className="w-full rounded-xl border p-4"
            placeholder="Describe the property..."
            value={form.description}
            onChange={(e) =>
              update(
                "description",
                e.target.value,
              )
            }
          />
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">
            Property Images
          </h2>

          <ImageUploader
            files={images}
            setFiles={setImages}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-sky-600 py-4 text-lg font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Publishing Property..."
            : "Publish Property"}
        </button>
      </form>
    </div>
  );
}