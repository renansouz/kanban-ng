# Ace Kanban Board

<p align="left">
  <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Angular_Material-757575?style=for-the-badge&logo=angular&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>

Angular task management board with drag-and-drop and Firebase real-time sync

![Project Preview](https://i.imgur.com/le2vvyG.png)

## Introduction

Ace Kanban Board is a Kanban task management application built with Angular, Firebase, Angular Material, and Tailwind CSS. It is designed for task tracking, project workflow management, and board-based issue organization. The application supports drag-and-drop task movement, real-time synchronization, and responsive task board interactions for teams and individual users who need a Firebase-backed Kanban board.

## Technical Overview

The application is structured as a single-page Angular project with component-based UI composition and Firebase as the persistence layer. The board state is represented as a set of task columns, where each task moves between statuses using drag-and-drop interactions. Angular Material provides the base interface patterns, while Tailwind CSS handles layout, spacing, and responsive styling.

Firebase is used for authentication, database storage, and real-time data updates. This allows task changes to propagate across connected clients without manual refresh. The project is a good fit for users searching for an Angular Kanban board, a drag-and-drop task manager, or a Firebase real-time project management app.

## User Instructions

### Installation

```bash
git clone https://github.com/renansouz/kanban-ng.git
cd kanban-ng
npm install
```

### Firebase setup

1. Create a Firebase project.
2. Add a web app in the Firebase console.
3. Copy the Firebase configuration values.
4. Add them to `src/app/app.config.ts`:

```ts
export const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};
```

### Run locally

```bash
ng serve
```

Open `http://localhost:4200/` in your browser.

## Developer Instructions

### Local development

```bash
ng serve
```

### Production build

```bash
ng build
```

### Tests

```bash
ng test
```

### Angular CLI help

```bash
ng help
```

### Contributing

- Create a feature branch from `main`.
- Keep each pull request focused on one change.
- Use clear commit messages.
- Include screenshots or screen recordings for UI changes.
- Verify the app builds locally before opening a PR.
- Document Firebase or environment changes in the PR description.

Suggested branch names:

```bash
feature/task-editing
fix/firebase-sync
chore/readme-update
```

## Support

[![Buy Me a Coffee](https://img.shields.io/badge/Buy_Me_a_Coffee-Support_Project-FFDD00?style=for-the-badge&logo=buymeacoffee&logoColor=black)](https://www.buymeacoffee.com/renansouz)
