'use client';

import { CustomerField, CustomerForm } from "@/app/lib/definitions";
import { updateCustomer } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { EnvelopeIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "../button";
import Image from "next/image";
import toast from "react-hot-toast";

export default function EditCustomerForm({
  customer,
}: {
  customer: CustomerForm;
}) {
  const initialState = { message: null, errors: {} };
  const updateCustomerWithId = updateCustomer.bind(null, customer.id);
  const [state, dispatch] = useFormState(updateCustomerWithId, initialState);

  return (
    <form 
      action={async (formData: FormData) => {
        //reset form
        //validate form
        
        const result: any = await dispatch(formData);
        if (result?.message) {
          toast.error(result.message);
        }else{
          toast.success('Customer updated successfully');
        }
      }}
    >
      <input type="hidden" name="id" value={customer.id} />
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Customer Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={customer.name}
                placeholder="Enter a Name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
                required
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          </div>
        </div>

        {/* Customer Email */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Customer Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={customer.email}
                placeholder="Enter a Email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="email-error"
                required
              />
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          </div>
        </div>

        {/* Customer Image */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Customer Image
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="image_url"
                name="image_url"
                type="text"
                defaultValue={customer.image_url}
                placeholder="Enter a Image URL"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="image-error"
                required
              />
              <Image
                src={customer.image_url}
                className="rounded-full pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-gray-900"
                alt={`${customer.name}'s profile picture`}
                width={18}
                height={18}
              />
            </div>
            <div id="image-error" aria-live="polite" aria-atomic="true">
            {state.errors?.image_url &&
              state.errors.image_url.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link 
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Customer</Button>
      </div>
    </form>
  );
}