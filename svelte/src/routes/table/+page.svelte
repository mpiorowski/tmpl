<script>
    import Dropdown from "$lib/ui/Dropdown.svelte";
    import Pagination from "$lib/ui/Pagination.svelte";

    /** @type {import("./$types").PageData} */
    export let data;
</script>

<div class="relative mx-auto mt-10 w-full max-w-5xl px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
            <h1 class="text-base font-semibold leading-6 text-gray-900">
                Users
            </h1>
            <p class="mt-2 text-sm text-gray-700">
                A list of all the users in your account including their name,
                title, email and role.
            </p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Dropdown />
        </div>
    </div>
    <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div
                class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
            >
                <table class="min-w-full divide-y divide-gray-300">
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                class="py-3 pl-4 pr-3 text-left text-xs uppercase tracking-wide text-gray-500 sm:pl-0"
                            >
                                Name
                            </th>
                            <th
                                scope="col"
                                class="px-3 py-3 text-left text-xs uppercase tracking-wide text-gray-500"
                            >
                                Title
                            </th>
                            <th
                                scope="col"
                                class="px-3 py-3 text-left text-xs uppercase tracking-wide text-gray-500"
                            >
                                Email
                            </th>
                            <th
                                scope="col"
                                class="px-3 py-3 text-left text-xs uppercase tracking-wide text-gray-500"
                            >
                                Role
                            </th>
                            <th
                                scope="col"
                                class="relative py-3 pl-3 pr-4 sm:pr-0"
                            >
                                <span class="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                        {#each data.pagination.data as { name, title, email, role }}
                            <tr>
                                <td
                                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
                                >
                                    {name}
                                </td>
                                <td
                                    class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                                >
                                    {title}
                                </td>
                                <td
                                    class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                                >
                                    {email}
                                </td>
                                <td
                                    class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                                >
                                    {role}
                                </td>
                                <td
                                    class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
                                >
                                    <a
                                        href="/table/edit"
                                        class="text-indigo-600 hover:text-indigo-900"
                                    >
                                        Edit
                                        <span class="sr-only">
                                            , Lindsay Walton
                                        </span>
                                    </a>
                                </td>
                            </tr>
                        {/each}

                        <!-- More people... -->
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Pagination -->
        <Pagination pagination={data.pagination} />
    </div>
</div>
