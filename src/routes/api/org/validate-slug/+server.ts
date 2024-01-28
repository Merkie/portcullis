import { json } from '@sveltejs/kit';
import { z } from 'zod';

const schema = z.object({
	slug: z.string()
});

export const POST = async ({ request, locals: { prisma } }) => {
	const body = (await request.json()) as z.infer<typeof schema>;

	const isBodyValid = schema.safeParse(body);
	if (!isBodyValid.success) return json({ success: false, error: isBodyValid.error });

	const existingOrg = await prisma.organization.findFirst({
		where: {
			slug: body.slug
		}
	});

	return json({ success: true, isValid: !existingOrg });
};
