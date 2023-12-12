import { z } from "zod";
import { fail } from "@sveltejs/kit";
import { pagination } from "$lib/ui/pagination";
import data from "./data.json";

// const data = Array(122)
//     .fill(0)
//     .map(() => ({
//         name: faker.person.fullName(),
//         title: faker.person.jobTitle(),
//         email: faker.internet.email(),
//         role: ["Member", "Admin"][Math.floor(Math.random() * 2)],
//     }));
//fs.writeFileSync('data.json', JSON.stringify(data, null, '\t'));

/** @type {import('./$types').PageServerLoad} */
export function load({ url }) {
    const p = Number(url.searchParams.get("p")) || 1;
    return {
        pagination: pagination(data, p),
    };
}

/** @type {import('./$types').Actions}*/
export const actions = {
    default: async ({ request }) => {
        const form = await request.formData();
        const id = form.get("id");

        const schema = z
            .object({
                id: z.string().uuid(),
            })
            .safeParse({ id });

        if (!schema.success) {
            return fail(400, { form: schema.error.flatten().fieldErrors });
        }

        return { id };
    },
};
