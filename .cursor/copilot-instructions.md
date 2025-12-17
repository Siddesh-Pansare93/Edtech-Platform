# Copilot Project Instructions – React + TypeScript Architecture

> **Purpose:**
> This file defines the **mandatory architecture and coding rules** for this React + TypeScript project.
> GitHub Copilot **must follow these instructions strictly** when generating or modifying code.

---

## 🧠 General Rules (Read First)

* Follow **strict separation of concerns**
* Place code **only in its correct layer**
* Never mix UI, business logic, and API logic
* Prefer **hooks over inline logic**
* Use **TypeScript types everywhere**

❌ Do NOT break the data flow rules
✅ Always respect the folder responsibilities

---

## 📁 Root Folder Structure

```
src/
 ├── services/
 ├── features/
 ├── pages/
 ├── hooks/
 ├── store/
 └── App.tsx
```

Each folder has a **single responsibility** explained below.

---

## 🔹 1. services/ → API & Backend Communication ONLY

### Purpose

* Contains **only API calls and HTTP logic**
* No React imports
* No hooks
* No UI logic

### Rules

* Services must be **pure TypeScript modules**
* Services must return **typed data**
* Error handling stays at service or feature-hook level

### Structure

```
services/
 ├── apiClient.ts
 ├── tasksService.ts
 └── types/
      └── task.ts
```

### Example

```ts
// services/tasksService.ts
import { apiClient } from "./apiClient";
import { Task } from "./types/task";

export const tasksService = {
  getTasks: (params) => apiClient.get<Task[]>("/tasks", { params }),
  createTask: (data: Partial<Task>) => apiClient.post<Task>("/tasks", data),
};
```

👉 If code communicates with a backend → **it belongs in services/**

---

## 🔹 2. features/ → Feature-Level Business Logic

Each **domain feature** has its own folder.

Example:

```
features/
 └── tasks/
      ├── hooks/
      ├── components/
      └── utils/
```

---

### 🔸 2.1 Feature Hooks (features/*/hooks)

### Purpose

* Handle **business logic**
* Call services
* Manage feature-level state
* Reusable across pages

### Rules

* Can use React hooks
* Can call services
* Must NOT contain UI code

### Example

```ts
// features/tasks/hooks/useTasks.ts
import { useEffect, useState } from "react";
import { tasksService } from "../../../services/tasksService";

export function useTasks(search: string, status: string) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    tasksService.getTasks({ search, status }).then((res) => {
      setTasks(res.data);
      setLoading(false);
    });
  }, [search, status]);

  return { tasks, loading };
}
```

👉 If logic belongs to a **feature and is reusable** → feature hook

---

### 🔸 2.2 Feature Components (features/*/components)

### Purpose

* **Pure UI components**
* Display data only

### Rules

* No API calls
* No business logic
* Receive all data via props

### Example

```tsx
// features/tasks/components/TaskCard.tsx
import { Task } from "../../../services/types/task";

export function TaskCard({ task }: { task: Task }) {
  return <div>{task.title}</div>;
}
```

👉 If it renders UI for a feature → feature component

---

## 🔹 3. pages/ → Page-Level Orchestration

Each route/page has its own folder.

```
pages/
 └── tasks/
      ├── hooks/
      ├── TasksPage.tsx
      └── index.ts
```

---

### 🔸 3.1 Page Hooks (pages/*/hooks)

### Purpose

* Combine multiple feature hooks
* Handle pagination, filters, debounce, routing
* Page-specific logic only

### Rules

* Can use feature hooks
* Must NOT call services directly

### Example

```ts
// pages/tasks/hooks/useTasksPage.ts
import { useState } from "react";
import { useTasks } from "../../../features/tasks/hooks/useTasks";

export function useTasksPage() {
  const [search, setSearch] = useState("");
  const { tasks, loading } = useTasks(search, "");

  return { tasks, loading, search, setSearch };
}
```

👉 If logic is **page-specific** → page hook

---

### 🔸 3.2 Page UI (pages/*/*.tsx)

### Purpose

* Compose page layout
* Use page hooks
* Assemble feature components

### Rules

* No API calls
* No business logic

### Example

```tsx
// pages/tasks/TasksPage.tsx
import { TaskCard } from "../../features/tasks/components/TaskCard";
import { useTasksPage } from "./hooks/useTasksPage";

export function TasksPage() {
  const { tasks } = useTasksPage();

  return (
    <div>
      {tasks.map((t) => (
        <TaskCard key={t.id} task={t} />
      ))}
    </div>
  );
}
```

👉 If it represents a route → page UI

---

## 🔹 4. hooks/ → Global Reusable Hooks

### Purpose

* App-wide reusable hooks
* No feature-specific logic

### Example

```ts
// hooks/useDebounce.ts
export function useDebounce<T>(value: T, delay = 300): T {}
```

---

## 🔹 5. store/ → Global State (Optional)

### Purpose

* Global shared state (auth, user, theme)
* Zustand or Redux

### Rules

* No UI code
* No direct API calls

---

## 🚨 STRICT DATA FLOW RULE (MANDATORY)

```
Service → Feature Hook → Page Hook → Page UI → Feature UI
```

### Forbidden Patterns

* ❌ Pages calling services
* ❌ Components fetching data
* ❌ Services importing React

---

## 🔁 WHEN ADDING NEW CODE

Before writing code, determine:

1. API / backend? → services/
2. Reusable business logic? → features/*/hooks
3. Page-only logic? → pages/*/hooks
4. UI only? → components

---

## 🎯 Final Expectation From Copilot

* Always follow this architecture
* Place files in correct folders
* Keep logic clean and isolated
* Prefer composition over duplication
* Never violate separation of concerns

**These rules are mandatory and must be followed at all times.**
