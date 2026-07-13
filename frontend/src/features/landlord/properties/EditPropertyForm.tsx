"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

import PropertyService, {
  CreatePropertyDto,
} from "@/services/property/property.service";

interface EditPropertyFormProps {
  id: string;
}

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

export default function EditPropertyForm({
  id,
}: EditPropertyFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [property, setProperty] =
    useState<CreatePropertyDto>({
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

  useEffect(() => {
    loadProperty();
  }, [id]);

  async function loadProperty() {
    try {
      setLoading(true);

      const data =
        await PropertyService.getById(id);

      setProperty({
        ...data,
      });
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to load property.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function saveProperty() {
    if (!property.title.trim()) {
      toast.error("Title is required.");
      return;
    }

    if (!property.description.trim()) {
      toast.error(
        "Description is required.",
      );
      return;
    }

    if (!property.county) {
      toast.error("Select a county.");
      return;
    }

    if (!property.town.trim()) {
      toast.error("Town is required.");
      return;
    }

    if (property.rent <= 0) {
      toast.error(
        "Rent must be greater than zero.",
      );
      return;
    }

    setSaving(true);

    try {
      await PropertyService.update(id, {
        ...property,
        title: property.title.trim(),
        description:
          property.description.trim(),
        town: property.town.trim(),
        estate: property.estate.trim(),
        address: property.address.trim(),
      });

      toast.success(
        "Property updated successfully.",
      );

      router.push(
        "/dashboard/properties",
      );
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ??
            "Unable to update property.",
        );
      } else {
        toast.error(
          "Something went wrong.",
        );
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center p-12 text-lg font-medium">
        Loading property...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Edit Property
      </h1>

      <div className="grid gap-6">
        <input
          className="rounded-xl border p-3"
          placeholder="Title"
          value={property.title}
          onChange={(e) =>
            setProperty({
              ...property,
              title: e.target.value,
            })
          }
        />

        <textarea
          rows={5}
          className="rounded-xl border p-3"
          placeholder="Description"
          value={property.description}
          onChange={(e) =>
            setProperty({
              ...property,
              description:
                e.target.value,
            })
          }
        />

        <select
          className="rounded-xl border p-3"
          value={property.county}
          onChange={(e) =>
            setProperty({
              ...property,
              county: e.target.value,
            })
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
          className="rounded-xl border p-3"
          placeholder="Town"
          value={property.town}
          onChange={(e) =>
            setProperty({
              ...property,
              town: e.target.value,
            })
          }
        />

        <input
          className="rounded-xl border p-3"
          placeholder="Estate"
          value={property.estate}
          onChange={(e) =>
            setProperty({
              ...property,
              estate: e.target.value,
            })
          }
        />

        <input
          className="rounded-xl border p-3"
          placeholder="Address"
          value={property.address}
          onChange={(e) =>
            setProperty({
              ...property,
              address: e.target.value,
            })
          }
        />

        <select
          className="rounded-xl border p-3"
          value={property.propertyType}
          onChange={(e) =>
            setProperty({
              ...property,
              propertyType:
                e.target.value,
            })
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

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            min={0}
            className="rounded-xl border p-3"
            value={property.bedrooms}
            onChange={(e) =>
              setProperty({
                ...property,
                bedrooms: Number(
                  e.target.value,
                ),
              })
            }
          />

          <input
            type="number"
            min={1}
            className="rounded-xl border p-3"
            value={property.bathrooms}
            onChange={(e) =>
              setProperty({
                ...property,
                bathrooms: Number(
                  e.target.value,
                ),
              })
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            min={1}
            className="rounded-xl border p-3"
            value={property.rent}
            onChange={(e) =>
              setProperty({
                ...property,
                rent: Number(
                  e.target.value,
                ),
              })
            }
          />

          <input
            type="number"
            min={0}
            className="rounded-xl border p-3"
            value={property.deposit}
            onChange={(e) =>
              setProperty({
                ...property,
                deposit: Number(
                  e.target.value,
                ),
              })
            }
          />
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">
            Amenities
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {AMENITIES.map(
              ([key, label]) => (
                <label
                  key={key}
                  className="flex items-center gap-3 rounded-xl border p-3"
                >
                  <input
                    type="checkbox"
                    checked={Boolean(
                      property[key],
                    )}
                    onChange={(e) =>
                      setProperty({
                        ...property,
                        [key]:
                          e.target.checked,
                      })
                    }
                  />

                  <span>{label}</span>
                </label>
              ),
            )}
          </div>
        </div>

        <button
          onClick={saveProperty}
          disabled={saving}
          className="rounded-xl bg-sky-600 py-4 text-lg font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "Saving Changes..."
            : "Save Changes"}
        </button>
      </div>
    </div>
  );
}