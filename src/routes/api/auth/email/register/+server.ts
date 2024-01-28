import { json } from '@sveltejs/kit';
import { z } from 'zod';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
import { PUBLIC_DOMAIN } from '$env/static/public';

const schema = z.object({
	email: z.string().email(),
	displayName: z.string(),
	password: z.string()
});

export const POST = async ({ request, cookies, locals: { prisma } }) => {
	const body = (await request.json()) as z.infer<typeof schema>;

	const isBodyValid = schema.safeParse(body);
	if (!isBodyValid.success) return json({ success: false, error: isBodyValid.error });

	const existingUser = await prisma.user.findUnique({
		where: {
			email: body.email
		}
	});
	if (existingUser) return json({ success: false, error: 'User already exists' });

	const passwordHash = await argon2.hash(body.password);

	const createdUser = await prisma.user.create({
		data: {
			email: body.email,
			displayName: body.displayName,
			passwordHash
		}
	});

	const token = jwt.sign({ id: createdUser.id }, JWT_SECRET, { expiresIn: '7d' });

	cookies.set('portcullis-token', token, {
		path: '/',
		maxAge: 60 * 60 * 24 * 7,
		sameSite: 'lax',
		domain: PUBLIC_DOMAIN,
		httpOnly: true
	});

	return json({ success: true });
};
