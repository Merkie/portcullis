![](https://drive.google.com/uc?export=download&id=1wLSnQj4J8V6luYK1DdGrg2p71aCCTOFN)

# Portcullis

Paywalls for people who give a 💩

This is a monorepo containing the frontend and backend code for Portcullis. It uses NX to manage the workspaces.

## Workspaces

There are two main workspaces:

- `apps/frontend` - The frontend SDK
- `apps/backend` - The Node.js backend application

## Getting Started

To run the frontend and backend apps in development mode:

```
npm install
nx serve frontend
nx serve backend
```

The frontend will be available at http://localhost:4200 and the backend at http://localhost:3333.

**Building**

To build both workspaces:

```
nx build frontend
nx build backend
```

This will create production bundles for each app in `dist/apps/frontend` and `dist/apps/backend`.

**Running tests**

To run all tests:

```
nx test
```

You can also run tests for each workspace individually:

```
nx test frontend
nx test backend
```