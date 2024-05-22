'use client'

import { UserForm } from "@/app/lib/definitions";
import { updateUser } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { CheckIcon, ClockIcon, EnvelopeIcon, LockClosedIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "../button";
import Image from "next/image";
import toast from "react-hot-toast";

export default function EditUserForm({
  user,
}: {
  user: UserForm;
}) {
  const initialState = { message: null, errors: {} };
  const updateUserWithId = updateUser.bind(null, user.id);
  const [state, dispatch] = useFormState(updateUserWithId, initialState);

  return (
    <form 
      action={
        async (formData: FormData) => {
          //reset form
          //validate form
          
          const result: any = await dispatch(formData);
          if (result?.message) {
            toast.error(result.message);
          }else{
            toast.success('User updated successfully');
          }
        }
      }
    >
      <input type="hidden" name="id" value={user.id} />
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* User Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            User Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={user.name}
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

        {/* User Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            User Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={user.email}
                placeholder="Enter an Email"
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

        {/* User Image */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            User Image
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="img"
                name="img"
                type="text"
                defaultValue={user.img}
                placeholder="Enter an Image URL"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="img-error"
                required
              />
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="img-error" aria-live="polite" aria-atomic="true">
              {state.errors?.img &&
                state.errors.img.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* User Password (Optional) */}
        <div className="mb-4">
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            User Password (Optional)
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="password"
                name="password"
                type="text"
                placeholder="Enter a Password"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="password-error"
              />
              <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="password-error" aria-live="polite" aria-atomic="true">
              {state.errors?.password &&
                state.errors.password.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* User Role */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the user role
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="user"
                  name="role"
                  type="radio"
                  value="user"
                  defaultChecked={user.role === 'user'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="role-error"
                  required
                />
                <label
                  htmlFor="user"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  User <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="admin"
                  name="role"
                  type="radio"
                  value="admin"
                  defaultChecked={user.role === 'admin'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="admin"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Admin <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="role-error" aria-live="polite" aria-atomic="true">
            {state.errors?.role &&
              state.errors.role.map((error: string) => (
                <>
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                  <p className="mt-2 text-sm text-red-500" key={error}>
                  {state.message}
                  </p>
                </>
              ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-4 flex justify-end gap-4">
        <Link
            href="/dashboard/users"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
          Cancel
        </Link>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
