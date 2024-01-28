import type { User, PrismaClient } from '@prisma/client';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			prisma: PrismaClient;
			user: User;
			subdomain: string;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
