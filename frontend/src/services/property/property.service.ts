import api from "@/services/auth/axios";

export interface CreatePropertyDto {
  title: string;
  description: string;

  county: string;
  town: string;
  estate: string;
  address: string;

  propertyType: string;

  bedrooms: number;
  bathrooms: number;

  rent: number;
  deposit: number;

  parking: boolean;
  furnished: boolean;
  wifi: boolean;
  cctv: boolean;
  balcony: boolean;
  security: boolean;
  borehole: boolean;
  swimmingPool: boolean;
  lift: boolean;
  petsAllowed: boolean;
  backupGenerator: boolean;
}

export interface PropertyFilters {
  county?: string;
  town?: string;
  estate?: string;
  propertyType?: string;
  bedrooms?: number;
  bathrooms?: number;
  minRent?: number;
  maxRent?: number;
}

class PropertyService {
  async getAll(filters?: PropertyFilters) {
    const { data } = await api.get("/properties", {
      params: filters,
    });

    return data;
  }

  async getMine() {
    const { data } = await api.get(
      "/properties/my-properties",
    );

    return data;
  }

  async getById(id: string) {
    const { data } = await api.get(
      `/properties/${id}`,
    );

    return data;
  }

  async create(property: CreatePropertyDto) {
    const { data } = await api.post(
      "/properties",
      property,
    );

    return data;
  }

  async uploadImages(
    propertyId: string,
    files: File[],
  ) {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("images", file);
    });

    const { data } = await api.post(
      `/properties/${propertyId}/images`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      },
    );

    return data;
  }

  async update(
    id: string,
    property: Partial<CreatePropertyDto>,
  ) {
    const { data } = await api.patch(
      `/properties/${id}`,
      property,
    );

    return data;
  }

  async delete(id: string) {
    const { data } = await api.delete(
      `/properties/${id}`,
    );

    return data;
  }
}

const propertyService = new PropertyService();

export default propertyService;