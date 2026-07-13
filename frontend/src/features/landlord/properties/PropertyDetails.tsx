"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import PropertyService from "@/services/property/property.service";

interface Property {
  id: string;

  title: string;
  description: string;

  county: string;
  town: string;
  estate: string;

  propertyType: string;

  rent: number;
  deposit: number;

  bedrooms: number;
  bathrooms: number;

  status: string;

  images: {
    id?: string;
    imageUrl: string;
  }[];

  landlord?: {
    name: string;
    phone: string;
  };
}


interface PropertyDetailsProps {
  id: string;
}


export default function PropertyDetails({
  id,
}: PropertyDetailsProps) {

  const router = useRouter();


  const [property, setProperty] =
    useState<Property | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [deleting, setDeleting] =
    useState(false);



  useEffect(() => {

    async function loadProperty() {

      try {

        setLoading(true);

        const data =
          await PropertyService.getById(id);

        setProperty(data);


      } catch (error) {

        console.error(error);

        setError(
          "Failed to load property details."
        );


      } finally {

        setLoading(false);

      }

    }


    loadProperty();


  }, [id]);




  async function deleteProperty() {

    if (!property) return;


    const confirmed =
      window.confirm(
        "Are you sure you want to delete this property?"
      );


    if (!confirmed) return;



    try {

      setDeleting(true);


      await PropertyService.delete(
        property.id
      );


      alert(
        "Property deleted successfully."
      );


      router.push(
        "/dashboard/properties"
      );


      router.refresh();


    } catch(error){

      console.error(error);


      alert(
        "Failed to delete property."
      );


    } finally {

      setDeleting(false);

    }

  }




  if(loading){

    return(
      <div className="p-10 text-center">
        Loading property...
      </div>
    );

  }



  if(error){

    return(
      <div className="p-10 text-center text-red-600">
        {error}
      </div>
    );

  }




  if(!property){

    return(
      <div className="p-10 text-center">
        Property not found.
      </div>
    );

  }



  return (

    <div className="mx-auto max-w-6xl p-8">


      <Link
        href="/dashboard/properties"
        className="
        mb-6 inline-block
        rounded-lg border
        px-4 py-2
        hover:bg-gray-100
        "
      >
        ← Back
      </Link>



      <div className="
      grid gap-8
      lg:grid-cols-2
      ">



        {/* IMAGES */}

        <div>


          {property.images.length > 0 ? (

            <div className="
            grid grid-cols-2 gap-4
            ">

              {property.images.map(
                (image,index)=>(

                <Image

                  key={
                    image.id ??
                    index
                  }

                  src={
                    image.imageUrl
                  }

                  width={500}

                  height={350}

                  alt={
                    property.title
                  }

                  className="
                  h-64
                  w-full
                  rounded-2xl
                  object-cover
                  "
                />

              ))}

            </div>


          ):(


            <Image

              src="
              https://placehold.co/900x600?text=No+Image
              "

              width={900}

              height={600}

              alt="No image"

              className="
              rounded-2xl
              object-cover
              "

            />


          )}


        </div>





        {/* DETAILS */}


        <div>


          <div className="
          mb-3 flex items-center gap-3
          ">


            <h1 className="
            text-4xl font-bold
            ">

              {property.title}

            </h1>



            <span className="
            rounded-full
            bg-green-100
            px-3 py-1
            text-sm
            text-green-700
            ">

              {property.status}

            </span>


          </div>





          <p className="
          text-gray-500
          ">

            {property.estate},
            {" "}
            {property.town},
            {" "}
            {property.county}

          </p>





          <p className="
          mt-6
          text-4xl
          font-bold
          text-sky-600
          ">

            KSh {property.rent.toLocaleString()}

            <span className="
            text-base
            text-gray-500
            ">

              /month

            </span>

          </p>






          <div className="
          mt-4
          text-gray-700
          ">

            Deposit:

            <strong>
              {" "}
              KSh{" "}
              {property.deposit?.toLocaleString()}
            </strong>


          </div>





          <div className="
          mt-6
          grid
          grid-cols-2
          gap-4
          ">


            <div className="
            rounded-xl
            border
            p-5
            ">

              <p className="
              text-gray-500
              ">
                Bedrooms
              </p>

              <p className="
              text-2xl
              font-bold
              ">
                {property.bedrooms}
              </p>


            </div>




            <div className="
            rounded-xl
            border
            p-5
            ">

              <p className="
              text-gray-500
              ">
                Bathrooms
              </p>


              <p className="
              text-2xl
              font-bold
              ">
                {property.bathrooms}
              </p>


            </div>


          </div>






          <div className="
          mt-6
          ">

            <p className="text-gray-500">
              Property Type
            </p>


            <p className="
            text-xl
            font-semibold
            ">

              {property.propertyType}

            </p>


          </div>








          <div className="mt-8">


            <h2 className="
            mb-3
            text-2xl
            font-semibold
            ">

              Description

            </h2>



            <p className="
            leading-8
            text-gray-600
            ">

              {property.description}

            </p>


          </div>






          {/* LANDLORD CONTACT */}

          {
          property.landlord && (

          <a

            href={
              `https://wa.me/${property.landlord.phone}`
            }

            target="_blank"

            className="
            mt-8
            block
            rounded-xl
            bg-green-600
            px-6
            py-3
            text-center
            text-white
            hover:bg-green-700
            "

          >

            Chat landlord on WhatsApp

          </a>

          )
          }







          <div className="
          mt-10
          flex gap-4
          ">


            <Link

              href={
                `/dashboard/properties/edit/${property.id}`
              }

              className="
              rounded-xl
              bg-sky-600
              px-6
              py-3
              text-white
              hover:bg-sky-700
              "

            >

              Edit Property

            </Link>





            <button

              onClick={
                deleteProperty
              }

              disabled={
                deleting
              }

              className="
              rounded-xl
              bg-red-600
              px-6
              py-3
              text-white
              hover:bg-red-700
              disabled:opacity-50
              "

            >

              {
              deleting
              ?
              "Deleting..."
              :
              "Delete Property"
              }


            </button>


          </div>


        </div>


      </div>


    </div>

  );

}