# Survey & Normalization System

## Overview

This project is a full-stack React (TypeScript) application that enables researchers and administrators to configure, manage, and use a survey system with normalization scoring. The system allows for flexible survey creation, subscale configuration (sum/average), normalization table management, and user participation with real-time normalized score calculation based on demographic and answer data.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [How It Works](#how-it-works)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [Assumptions](#assumptions)
- [Known Limitations](#known-limitations)
- [Project Structure](#project-structure)

---

## Features

- **Survey Structure Configuration:**  
  Create and edit survey questions, each with arbitrary answer options and associated raw scores.

- **Subscale Configuration:**  
  Define which subset of questions are used for normalization and select the calculation type (sum or average).

- **Normalization Table Management:**  
  Administrators can input normalization data mapping (Age, Sex, Raw Score → Normalized Score).

- **User Profile & Survey Participation:**  
  Users enter their age and sex, answer the survey, and receive a normalized score based on the configured normalization table.

- **Stepper-Based Workflow:**  
  Both admin and user flows are guided by a stepper UI, ensuring logical progression and data integrity.

- **Validation & Error Handling:**  
  The app prevents incomplete configurations and provides clear feedback for missing or invalid data.

---

## Architecture

- **Frontend:**  
  React (TypeScript), functional components, hooks, and context for state management.
- **Mock Backend:**  
  Uses [MSW (Mock Service Worker)](https://mswjs.io/) for API simulation, enabling local development and testing without a real backend.
- **Componentization:**  
  Highly modular, with reusable UI components (inputs, buttons, steppers, cards, etc.).
- **State Management:**  
  Context providers (`ConfigProvider`, `UserProvider`) for admin and user flows, ensuring clean separation and no prop drilling.

---

## How It Works

### 1. **Admin Flow**

- **Survey Configuration:**  
  Admin creates questions and answer options, each with a raw score.

- **Subscale Setup:**  
  Admin selects which questions are included in the subscale and chooses the calculation type (sum or average).

- **Normalization Table:**  
  Admin enters normalization data rows (Age, Sex, Raw Score, Normalized Score).

- **Completion:**  
  Once all steps are complete, the configuration is locked and made available for users.

### 2. **User Flow**

- **Profile Entry:**  
  User provides age and sex.

- **Survey Participation:**  
  User answers the configured questions.

- **Score Calculation:**  
  The system calculates the raw score (sum or average as configured), then looks up the normalized score in the normalization table based on the user's age, sex, and raw score.

- **Result Display:**  
  User sees their normalized score and raw score.

---

## Tech Stack

- Node (v20.10)

- Vite - React (v19)

- TypeScript, React-Router-DOM, Axios

- Tailwind CSS (v4), Lucide-React

- MSW (Mock Service Worker) (v2.10)

## Setup & Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/adanop7721/ChildMind_Normalizer.git
   cd ChildMind_Normalizer
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the development server:**

   ```sh
   npm run dev
   ```

4. **Open your browser:**  
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## Usage

- **Administrator:**  
  Click "Admin Configuration" on the home page to set up the survey, subscale, and normalization table. Complete all steps and finish setup.

- **Survey Participant:**  
  Once setup is complete, the "Take Survey" button is enabled. Enter your profile, answer the survey, and view your normalized score.

---

## Assumptions

- **Normalization Table:**  
  The normalization table must be fully populated for all relevant (Age, Sex, Raw Score) combinations for accurate lookup.
- **Calculation Types:**  
  Only "sum" and "average" are supported for subscale calculation.
- **Single-Selection Questions:**  
  Each question allows only one answer per user.
- **Age:**  
  Must be between 1 and 99.
- **Sex:**  
  Must be "M" or "F".

---

## Known Limitations

- **No Persistent Backend:**  
  All data is stored in memory via MSW mocks; data will reset on reload.
- **No Authentication:**  
  The app assumes trusted admin/user access for demo purposes.
- **No Advanced Validation:**  
  Minimal validation is performed on normalization table completeness.

---

## Project Structure

```
src/
  components/         # Reusable UI components
  containers/         # Feature modules (admin, user, etc.)
  context/            # React context providers for state
  mocks/              # Mock API handlers (MSW)
  pages/              # Top-level route components
  types/              # TypeScript type definitions
  utils/              # Utility functions
  App.tsx             # Main app entry
```
