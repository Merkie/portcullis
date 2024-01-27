import { json } from '@sveltejs/kit';
import { z } from 'zod';

const schema = z.object({
	email: z.string().email(),
	password: z.string()
});

export const POST = async ({ request }) => {
	const body = (await request.json()) as z.infer<typeof schema>;

	const isBodyValid = schema.safeParse(body);
	if (!isBodyValid.success) return json({ success: false, error: isBodyValid.error });

	return json({ success: true });
};
