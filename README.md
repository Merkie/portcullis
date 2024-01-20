![](https://drive.google.com/uc?export=download&id=1wLSnQj4J8V6luYK1DdGrg2p71aCCTOFN)

# Portcullis - Client portals for people who give a 💩

This is a monorepo containing the portal, admin, backend, and documentation code for Portcullis. It uses NX to manage the workspaces.

## Workspaces

There are three main workspaces:

- `apps/portal` - The frontend React portal
- `apps/admin` - The frontend React admin interface
- `apps/backend` - The Fastify backend

## Getting Started

Install dependencies:

```
npm install
```

Run the various services:

```
nx serve portal 
nx serve admin
nx serve backend
```

The portal will be at http://localhost:4200, admin at http://localhost:4201, and backend at http://localhost:3333

**Building**

Build all workspaces:

```
nx build-many --all
```

Or target specific ones:

```
nx build portal
nx build admin
nx build backend
```

**Testing**

Run all tests:

```
nx test-many --all
```

Or target specific workspaces:

```
nx test portal
nx test backend
```

**Generating Code**

NX can generate new code like components, services, interfaces, etc:

```
nx generate @nrwl/react:component my-component --project=portal
nx generate @nrwl/fastify:service my-service --project=backend
```

See the NX docs for more generation capabilities.