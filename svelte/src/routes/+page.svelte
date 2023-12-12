<script>
    import Button from "$lib/form/Button.svelte";
    import Input from "$lib/form/Input.svelte";
    import Checkbox from "$lib/form/Checkbox.svelte";
    import Radio from "$lib/form/Radio.svelte";
    import Select from "$lib/form/Select.svelte";
    import Switch from "$lib/form/Switch.svelte";
    import Dropzone from "$lib/form/Dropzone.svelte";
    import FileInput from "$lib/form/FileInput.svelte";
    import { showToast, toast } from "$lib/ui/toast";
    import Modal from "$lib/ui/Modal.svelte";
    import Drawer from "$lib/ui/Drawer.svelte";
    import SelectMultiple from "$lib/form/SelectMultiple.svelte";
    import Tooltip from "$lib/ui/Tooltip.svelte";
    import { generateId } from "$lib/utils";
    import { countries, pushNotifications, schema, skills } from "./user.js";
    import SelectNative from "$lib/form/SelectNative.svelte";

    /** @typedef {import("./types").User} User */

    /**
     * @type User
     */
    const user = {
        username: "",
        about: "",
        resume: new File([""], ""),
        coverPhoto: new File([""], ""),
        firstName: "",
        lastName: "",
        email: "",
        country: countries[0],
        streetAddress: "",
        city: "",
        region: "",
        postalCode: "",
        comments: false,
        candidates: true,
        offers: true,
        pushNotifications: pushNotifications[1],
        skills: skills[0] + " | " + skills[1],
        available: true,
        b2b: false,
    };

    /** @type {Partial<Record<keyof User, string[]>>} */
    let fieldErrors = {};

    /** @type {boolean} */
    let openModal = false;

    /** @type {boolean} */
    let openDrawer = false;

    /**
     * @param {SubmitEvent & {currentTarget: HTMLFormElement}} event
     * @returns {void}
     */
    function handleSubmit(event) {
        fieldErrors = {};
        const form = new FormData(event.currentTarget);
        const valid = schema.safeParse({
            username: form.get("username"),
            about: form.get("about"),
            resume: form.get("resume"),
            coverPhoto: form.get("cover-photo"),
            firstName: form.get("first-name"),
            lastName: form.get("last-name"),
            email: form.get("email"),
            country: form.get("country"),
            streetAddress: form.get("street-address"),
            city: form.get("city"),
            region: form.get("region"),
            postalCode: form.get("postal-code"),
            comments: form.get("comments") === "on",
            candidates: form.get("candidates") === "on",
            offers: form.get("offers") === "on",
            pushNotifications: form.get("push-notifications"),
            skills: form.get("skills"),
            available: form.get("available") === "on",
            b2b: form.get("b2b") === "on",
        });
        if (!valid.success) {
            const errors = valid.error.flatten().fieldErrors;
            fieldErrors = errors;
            console.error(errors);
            const firstError = Object.keys(errors)[0];

            showToast({
                id: generateId(),
                title: "Validation failed",
                description: `Found ${Object.keys(errors).length} errors`,
                type: "error",
                duration: 6000,
                action: {
                    label: "Go to first error",
                    onClick: () => {
                        /** @type {HTMLInputElement | null} */
                        const input = document.querySelector(
                            `[name="${firstError}"]`,
                        );
                        input?.focus();
                    },
                },
            });
        } else {
            console.info(valid.data);
            toast.success("Saved", "Your profile has been updated.");
        }
    }
</script>

{#if openModal}
    <Modal
        alert
        bind:open={openModal}
        title="Deactivate your account"
        description="Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone."
    >
        <form method="post" action="?/deactive">
            <Button variant="danger">Deactivate</Button>
        </form>
    </Modal>
{/if}
{#if openDrawer}
    <Drawer title="Info" bind:open={openDrawer}>
        {#each Array(20) as _}
            <p class="mb-10 text-sm text-gray-500">
                {_} Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                cupiditate laboriosam fugiat.
            </p>
        {/each}
        <svelte:fragment slot="submit">
            <Button>Save</Button>
        </svelte:fragment>
    </Drawer>
{/if}

<form on:submit|preventDefault={handleSubmit} class="m-auto max-w-2xl p-10">
    <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
            <div>
                <h2
                    class="flex items-center gap-2 text-base font-semibold leading-7 text-gray-900"
                >
                    Profile
                    <Tooltip
                        text="This information will be displayed publicly so be careful what you share."
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-info h-4"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                    </Tooltip>
                </h2>
                <p class="mt-1 text-sm leading-6 text-gray-600">
                    This information will be displayed publicly so be careful
                    what you share.
                </p>
            </div>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                <div class="sm:col-span-4">
                    <Input
                        name="username"
                        label="Username"
                        autocomplete="username"
                        bind:value={user.username}
                        error={fieldErrors.username?.join(" ") ?? ""}
                    />
                </div>

                <div class="col-span-full">
                    <Input
                        name="about"
                        label="About"
                        bind:value={user.about}
                        rows={3}
                        helper="Write a few sentences about yourself."
                        error={fieldErrors.about?.join(" ") ?? ""}
                    />
                </div>

                <div class="col-span-full">
                    <FileInput
                        label="Resume"
                        name="resume"
                        bind:file={user.resume}
                        helper="PDF up to 5MB"
                        error={fieldErrors.resume?.join(" ") ?? ""}
                    />
                </div>

                <div class="col-span-full mt-6">
                    <Dropzone
                        name="cover-photo"
                        label="Cover photo"
                        bind:file={user.coverPhoto}
                        description="SVG, PNG, JPG, GIF up to 10MB"
                        accept="image/*"
                        error={fieldErrors.coverPhoto?.join(" ") ?? ""}
                    />
                </div>
            </div>
        </div>

        <div class="border-b border-gray-900/10 pb-6">
            <h2
                class="flex items-center gap-2 text-base font-semibold leading-7 text-gray-900"
            >
                Personal Information

                <Tooltip
                    text="Use a permanent address where you can receive mail."
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-info h-4"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                </Tooltip>
            </h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">
                Use a permanent address where you can receive mail.
            </p>

            <div class="mt-10 grid grid-cols-1 gap-x-6 sm:grid-cols-6">
                <div class="sm:col-span-3">
                    <Input
                        name="first-name"
                        label="First name"
                        autocomplete="given-name"
                        bind:value={user.firstName}
                        error={fieldErrors.firstName?.join(" ") ?? ""}
                    />
                </div>

                <div class="sm:col-span-3">
                    <Input
                        name="last-name"
                        label="Last name"
                        autocomplete="family-name"
                        bind:value={user.lastName}
                        error={fieldErrors.lastName?.join(" ") ?? ""}
                    />
                </div>

                <div class="sm:col-span-4">
                    <Input
                        name="email"
                        label="Email address"
                        autocomplete="email"
                        bind:value={user.email}
                        error={fieldErrors.email?.join(" ") ?? ""}
                    />
                </div>

                <div class="sm:col-span-3">
                    <Select
                        name="country"
                        label="Country"
                        bind:value={user.country}
                        values={countries}
                        options={countries}
                    />
                    <SelectNative
                        name="country-native"
                        label="Country"
                        bind:value={user.country}
                    >
                        {#each countries as country}
                            <option value={country}>
                                {country}
                            </option>
                        {/each}
                    </SelectNative>
                </div>

                <div class="col-span-full">
                    <Input
                        name="street-address"
                        label="Street address"
                        bind:value={user.streetAddress}
                        autocomplete="street-address"
                        error={fieldErrors.streetAddress?.join(" ") ?? ""}
                    />
                </div>

                <div class="sm:col-span-2 sm:col-start-1">
                    <Input
                        name="city"
                        label="City"
                        bind:value={user.city}
                        autocomplete="address-level2"
                        error={fieldErrors.city?.join(" ") ?? ""}
                    />
                </div>

                <div class="sm:col-span-2">
                    <Input
                        name="region"
                        label="State / Province"
                        bind:value={user.region}
                        autocomplete="address-level1"
                        error={fieldErrors.region?.join(" ") ?? ""}
                    />
                </div>

                <div class="sm:col-span-2">
                    <Input
                        name="postal-code"
                        label="ZIP / Postal"
                        bind:value={user.postalCode}
                        autocomplete="postal-code"
                        error={fieldErrors.postalCode?.join(" ") ?? ""}
                    />
                </div>
            </div>
        </div>

        <div class="border-b border-gray-900/10 pb-12">
            <h2
                class="flex items-center gap-2 text-base font-semibold leading-7 text-gray-900"
            >
                Notifications
                <Tooltip
                    text="We'll always let you know about important changes, but you pick what else you want to hear about."
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-info h-4"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                </Tooltip>
            </h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">
                We'll always let you know about important changes, but you pick
                what else you want to hear about.
            </p>

            <div class="mt-10 space-y-10">
                <fieldset>
                    <legend
                        class="text-sm font-semibold leading-6 text-gray-900"
                    >
                        By Email
                    </legend>
                    <div class="mt-6 space-y-6">
                        <Checkbox
                            name="comments"
                            label="Comments"
                            bind:checked={user.comments}
                            description="Get notified when someones posts a comment on a posting."
                        />
                        <Checkbox
                            name="candidates"
                            label="Candidates"
                            bind:checked={user.candidates}
                            description="Get notified when a candidate applies for a job."
                        />
                        <Checkbox
                            name="offers"
                            label="Offers"
                            bind:checked={user.offers}
                            description="Get notified when a candidate accepts or rejects an offer."
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <legend
                        class="text-sm font-semibold leading-6 text-gray-900"
                    >
                        Push Notifications
                    </legend>
                    <p class="mt-1 text-sm leading-6 text-gray-600">
                        These are delivered via SMS to your mobile phone.
                    </p>
                    <div class="mt-6 space-y-6">
                        <Radio
                            id="push-{pushNotifications[0]}"
                            name="push-notifications"
                            label="Everything"
                            value={pushNotifications[0]}
                            bind:group={user.pushNotifications}
                        />
                        <Radio
                            id="push-{pushNotifications[1]}"
                            name="push-notifications"
                            label="Same as email"
                            value={pushNotifications[1]}
                            bind:group={user.pushNotifications}
                        />
                        <Radio
                            id="push-{pushNotifications[2]}"
                            name="push-notifications"
                            label="No push notifications"
                            value={pushNotifications[2]}
                            bind:group={user.pushNotifications}
                        />
                    </div>
                </fieldset>
            </div>
        </div>
        <div class="pb-12">
            <h2
                class="flex items-center gap-2 text-base font-semibold leading-7 text-gray-900"
            >
                Profesional Information
                <Tooltip
                    text="Share your profesional details so others can find you."
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-info h-4"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                </Tooltip>
            </h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">
                Share your profesional details so others can find you.
            </p>
            <div class="mt-6">
                <SelectMultiple
                    name="skills"
                    label="Skills"
                    bind:value={user.skills}
                    options={skills}
                    error={fieldErrors.skills?.join(" ") ?? ""}
                />
            </div>
            <fieldset class="mt-6 space-y-6">
                <legend class="text-sm font-semibold leading-6 text-gray-900">
                    Available for hire
                </legend>
                <Switch
                    name="available"
                    label="Available now"
                    bind:checked={user.available}
                />
                <Switch
                    name="b2b"
                    label="Open to B2B"
                    bind:checked={user.b2b}
                />
            </fieldset>
        </div>
    </div>

    <div
        class="sticky bottom-0 flex justify-end border-t border-gray-900/10 bg-white p-4"
    >
        <div class="inline-flex items-center gap-x-4">
            <Button
                type="button"
                variant="link"
                on:click={() => (openModal = true)}
            >
                Deactivate
            </Button>
            <Button
                type="button"
                variant="secondary"
                on:click={() => (openDrawer = true)}
            >
                Info
            </Button>
            <Button>Save</Button>
        </div>
    </div>
</form>
