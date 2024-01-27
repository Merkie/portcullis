import { json } from '@sveltejs/kit';

export const POST = async ({ cookies }) => {
	cookies.delete('portcullis-token', { path: '/' });
	return json({ success: true });
};
