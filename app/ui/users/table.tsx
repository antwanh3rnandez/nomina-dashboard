import Image from "next/image";
import { lusitana, poppins } from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import { UsersTableType, FormattedUsersTable } from "@/app/lib/definitions";
import { fetchFilteredUsers } from "@/app/lib/data";
import { DeleteUser, UpdateUser } from "./buttons";

export default async function UsersTable({
  query,
  currentPage,
}: {
  users: FormattedUsersTable[];
  query: string;
  currentPage: number;
}) {
  const users = await fetchFilteredUsers(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {users?.map((user) => (
                <div
                  key={user.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <div className="flex items-center gap-3">
                          <Image
                            src={user.img}
                            className="rounded-full"
                            alt={`${user.name}'s profile picture`}
                            width={28}
                            height={28}
                          />
                          <p>{user.name}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div className="flex flex-row items-center justify-start text-sm">
                      <p
                        className={`p-2 ${
                          user.role == 'admin' ? 'bg-green-400' : 'bg-red-400'
                        } flex w-16 flex-col items-center justify-center rounded-2xl`}
                      >
                        {user.role}
                      </p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <UpdateUser id={user.id} />
                      <DeleteUser id={user.id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full rounded-md text-gray-900 md:table">
              <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Image
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Role
                  </th>
                  <th scope="col" className="relative py-4 pl-6 pr-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 text-gray-900">
                {users.map((user) => (
                  <tr key={user.id} className="group">
                    <td className="whitespace-nowrap bg-white py-3 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                      <div className="flex items-center gap-3">
                        <p>{user.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-3 text-sm">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap bg-white py-3 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                      <div className="flex items-center gap-3">
                        {user.img ? (
                          <Image
                            src={user.img}
                            className="rounded-full"
                            alt={`${user.name}'s profile picture`}
                            width={28}
                            height={28}
                          />
                        ) : (
                          <Image
                            src={`/user.png`}
                            className="rounded-full"
                            alt={`${user.name}'s profile picture`}
                            width={28}
                            height={28}
                          />
                        )}
                      </div>
                    </td>
                    <td className="flex flex-row items-center justify-start whitespace-nowrap bg-white py-3 text-sm">
                      <p
                        className={`p-2 ${
                          user.role == 'admin' ? 'bg-green-400' : 'bg-red-400'
                        } flex w-16 flex-col items-center justify-center rounded-2xl`}
                      >
                        {user.role}
                      </p>
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-3 pr-3">
                      <div className="flex justify-end gap-2">
                        <UpdateUser id={user.id} />
                        <DeleteUser id={user.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}