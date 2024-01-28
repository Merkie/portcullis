import { json } from '@sveltejs/kit';
import { z } from 'zod';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';

const schema = z.object({
	email: z.string().email(),
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
	if (!existingUser) return json({ success: false, error: 'User does not exist' });

	const doPasswordsMatch = await argon2.verify(existingUser.passwordHash, body.password);
	if (!doPasswordsMatch) return json({ success: false, error: 'Incorrect password' });

	const token = jwt.sign({ id: existingUser.id }, JWT_SECRET, { expiresIn: '7d' });

	cookies.set('portcullis-token', token, {
		path: '/',
		maxAge: 60 * 60 * 24 * 7,
		sameSite: 'lax',
		httpOnly: true
	});

	return json({ success: true });
};
