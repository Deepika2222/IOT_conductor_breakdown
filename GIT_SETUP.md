# Git Branching Setup

This document describes how to initialize the repository and set up the Git branching strategy for the IoT Fault Detection project.

---

## 1. Initialize the Repository

```bash
git init
git add .
git commit -m "initial structure"
```

---

## 2. Create the Integration Branch

```bash
git branch dev
git checkout dev
```

---

## 3. Create Feature Branches

```bash
# Backend feature branch
git checkout -b backend
git checkout dev

# Frontend feature branch
git checkout -b frontend
```

---

## 4. Branch Strategy

| Branch     | Purpose                                      |
|------------|----------------------------------------------|
| `main`     | Stable production branch                     |
| `dev`      | Integration branch — all features merge here |
| `backend`  | Backend development work                     |
| `frontend` | Frontend development work                    |

### Workflow

1. Developers work on the `frontend` or `backend` feature branches.
2. Completed features are merged into `dev` for integration testing.
3. Once `dev` is stable, it is merged into `main` for production release.

```
frontend ──┐
            ├──► dev ──► main
backend  ──┘
```
