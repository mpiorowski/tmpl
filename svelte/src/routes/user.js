import { z } from "zod";

export const countries = /** @type {const} */ (["United States", "Canada", "Mexico"]);

export const pushNotifications = /** @type {const} */ (["everything", "same", "none"]);
export const skills = /** @type {const} */ ([
    "Frontend Development",
    "Backend Development",
    "UI/UX Design",
    "DevOps",
    "Database Administration",
    "Mobile Development",
]);

export const schema = z.object({
    username: z.string().min(3, "Username is required").max(50),
    about: z.string().min(3, "About is required").max(1000),
    resume: z
        .any()
        .refine((file) => file instanceof File, "File is required")
        .refine((file) => file.size > 0, "File is required")
        .refine(
            (file) => file.size < 5 * 1024 * 1024,
            "File is too big, max 5MB",
        )
        .refine(
            (file) => file.type === "application/pdf",
            "File must be a PDF",
        ),
    coverPhoto: z
        .any()
        .refine((file) => file instanceof File, "File is required")
        .refine((file) => file.size > 0, "File is required")
        .refine(
            (file) => file.size < 10 * 1024 * 1024,
            "File is too big, max 10MB",
        )
        .refine(
            (file) =>
                [
                    "image/svg+xml",
                    "image/png",
                    "image/jpeg",
                    "image/gif",
                ].includes(file.type),
            "File must be an image",
        ),
    firstName: z.string().min(1, "First name is required").max(50),
    lastName: z.string().min(1, "Last name is required").max(50),
    email: z.string().email(),
    country: z.enum(countries),
    streetAddress: z.string().min(1, "Street address is required").max(100),
    city: z.string().min(1, "City is required").max(50),
    region: z.string().min(1, "Region is required").max(50),
    postalCode: z.string().min(1, "Postal code is required").max(20),
    comments: z.boolean(),
    candidates: z.boolean(),
    offers: z.boolean(),
    pushNotifications: z.enum(pushNotifications),
    skills: z.string().min(1, "Skills are required"),
    available: z.boolean(),
    b2b: z.boolean(),
});
