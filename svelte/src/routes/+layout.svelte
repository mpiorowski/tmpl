<script>
    import "../app.css";
    import Toast from "$lib/ui/Toast.svelte";
    import { toastStore } from "$lib/ui/toast";
    import Button from "$lib/form/Button.svelte";
    import MenuIcon from "$lib/icons/MenuIcon.svelte";
    import Drawer from "$lib/ui/Drawer.svelte";
    import Avatar from "$lib/ui/Avatar.svelte";
    import { page } from "$app/stores";

    let open = false;
    const navs = [
        { href: "/", label: "Form" },
        { href: "/table", label: "Table" },
    ];
</script>

<header class="bg-white shadow">
    <div class="mx-auto max-w-5xl px-2 py-4 sm:px-4 lg:px-6">
        <!-- Mobile menu button -->
        <div class="flex items-center gap-2 sm:hidden">
            <div class="inline-flex">
                <Button variant="link" on:click={() => (open = !open)}>
                    <MenuIcon />
                </Button>
            </div>
            <h1>Svelte Start</h1>
            {#if open}
                <Drawer position="left" title="Svelte Start" bind:open>
                    <nav class="flex flex-col space-y-4">
                        {#each navs as nav}
                            <a
                                href={nav.href}
                                class="peer rounded-md px-3 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
                        {$page.url.pathname === nav.href
                                    ? 'bg-indigo-100 text-indigo-700'
                                    : 'text-gray-500 hover:text-gray-700'}"
                                aria-current={$page.url.pathname === nav.href
                                    ? "page"
                                    : undefined}
                            >
                                {nav.label}
                            </a>
                        {/each}
                    </nav>
                </Drawer>
            {/if}
        </div>

        <!-- Desktop menu -->
        <div class="hidden sm:block">
            <nav class="flex gap-x-4" aria-label="Tabs">
                {#each navs as nav}
                    <a
                        href={nav.href}
                        class="peer rounded-md px-3 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
                        {$page.url.pathname === nav.href
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'text-gray-500 hover:text-gray-700'}"
                        aria-current={$page.url.pathname === nav.href
                            ? "page"
                            : undefined}
                    >
                        {nav.label}
                    </a>
                {/each}
                <div class="ml-auto flex items-center justify-center">
                    <Avatar />
                </div>
            </nav>
        </div>
    </div>
</header>
<main>
    <slot />
</main>
<!-- Global notification live region, render this permanently at the end of the document -->
<div
    aria-live="assertive"
    class="pointer-events-none fixed inset-0 z-20 flex items-end px-4 py-6 sm:items-start sm:p-6"
>
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
        {#each $toastStore as toast}
            <Toast {toast} />
        {/each}
    </div>
</div>
