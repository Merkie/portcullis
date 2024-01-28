import { json } from '@sveltejs/kit';
import slugify from 'slugify';
import { z } from 'zod';

const schema = z.object({
	name: z.string()
});

export const POST = async ({ request, locals: { prisma } }) => {
	const body = (await request.json()) as z.infer<typeof schema>;

	const isBodyValid = schema.safeParse(body);
	if (!isBodyValid.success) return json({ success: false, error: isBodyValid.error });

	const slug = slugify(body.name, { strict: true, lower: true });

	const existingOrg = await prisma.organization.findFirst({
		where: {
			slug
		}
	});
	if (existingOrg) return json({ success: false, error: 'Organization already exists' });

	return json({ success: true });
};
