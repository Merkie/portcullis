import type { User, PrismaClient, OrganizationMembership } from '@prisma/client';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			prisma: PrismaClient;
			user: User;
			orgMembership: OrganizationMembership & { organization: Organization };
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
