import type { ReactNode } from "react";
export type Classroom = {
  id: string
  name: string
  color?: string
}

export type Assignment = {
  id: string;
  classroomId: string;
  sectionId: string;
  title: string;
  isPublished:boolean,
  dueAt?: string;
  points?: number;
  description?: string;
  totalSubmitted: number;
}

export type AssignmentDto={
  classroomId: number;
  title: string;
  dueAt: string;
  description: string;
  position?:number
}

export interface Challenge {
  id: string;
  title: string;
  description?: string; 
  author: string;
  date: Date;
  score: ReactNode;
  language: ReactNode;
  topic: ReactNode;
  level: "Easy" | "Medium" | "Hard" | "High"; 
}

export type Submission = {
  id: string
  studentName: string
  submittedAt: string
  isPublished: 'pending' | 'graded' | 'late'
  score?: number | null
}

export const classrooms: Classroom[] = [
  { id: "c1", name: "Gen 11 - Software Engineering" },
  { id: "c2", name: "Gen 12 - Computer Science" },
  { id: "c3", name: "ICT Foundation" },
  { id: "c4", name: "Web Development" },
  { id: "c5", name: "Mobile App Development" },
  { id: "c6", name: "Data Structures" },
]


export const assignments: Assignment[] = [
  {
    id: "a1",
    classroomId: "c1",
    title: "JavaScript Fundamentals",
    isPublished: true,
    dueAt: "2026-01-20T23:59:00Z",
    description: "Master variables, functions, loops, and DOM basics.",
    totalSubmitted: 18,
  },
  {
    id: "a2",
    classroomId: "c1",
    title: "To-Do List App",
    isPublished: true,
    dueAt: "2026-01-25T23:59:00Z",
    totalSubmitted: 15,
  },
  {
    id: "a3",
    classroomId: "c1",
    title: "Midterm Mini Project",
    isPublished: false,
    dueAt: "2026-02-10T23:59:00Z",
    points: 300,
    description: "Create a small full-stack project (frontend + backend).",
    totalSubmitted: 0,
  },

  {
    id: "a4",
    classroomId: "c2",
    title: "Algorithm Practice",
    isPublished: false,
    dueAt: "2026-01-22T23:59:00Z",
    totalSubmitted: 25,
  },
  {
    id: "a5",
    classroomId: "c2",
    title: "Sorting & Searching",
    isPublished: false,
    dueAt: "2026-01-2823:59:00Z",
    totalSubmitted: 21,
  },

  {
    id: "a6",
    classroomId: "c3",
    title: "ICT Basics Quiz",
    isPublished: false,
    totalSubmitted: 30,
  },

  {
    id: "a7",
    classroomId: "c4",
    title: "HTML & CSS Layout",
    isPublished: false,
    dueAt: "2026-02-05T23:59:00Z",
    totalSubmitted: 12,
  },
  {
    id: "a8",
    classroomId: "c4",
    title: "Responsive Website",
    isPublished: false,
    totalSubmitted: 0,
  },

  {
    id: "a9",
    classroomId: "c5",
    title: "Flutter UI Practice",
    isPublished: false,
    dueAt: "2026-02-05T23:59:00Z",
    totalSubmitted: 9,
  },
]


export const challenges: Challenge[] = [
  // a1 — JavaScript Fundamentals
  {
    id: "ch1",
    assignmentId: "a1",
    title: "Variables and Data Types",
    description: "Declare variables and identify data types.",
    author: "Mr. Sokha",
    date: new Date("2026-01-10"),
  },
  {
    id: "ch2",
    assignmentId: "a1",
    title: "Conditional Statements",
    description: "Practice if-else conditions.",
    author: "Mr. Sokha",
    date: new Date("2026-01-11"),
  },
  {
    id: "ch3",
    assignmentId: "a1",
    title: "Loops Practice",
    description: "Solve problems using for and while loops.",
    author: "Mr. Sokha",
    date: new Date("2026-01-12"),
  },

  // a2 — To-do List App
  {
    id: "ch4",
    assignmentId: "a2",
    title: "Create Task Model",
    description: "Design task structure and states.",
    author: "Ms. Lina",
    date: new Date("2026-01-20T23:59:00Z"),
  },
  {
    id: "ch5",
    assignmentId: "a2",
    title: "Add & Delete Tasks",
    description: "Implement add and delete functionality.",
    author: "Ms. Lina",
    date: new Date("2026-01-16"),
  },
  {
    id: "ch6",
    assignmentId: "a2",
    title: "Persist Data",
    description: "Save tasks using local storage.",
    author: "Ms. Lina",
    date: new Date("2026-01-17"),
  },

  // a3 - draft 
  { id: "ch13", assignmentId: "a3", title: "Project Planning", description: "Define project scope and wireframes.", author: "You", date: new Date("2026-01-25") },
  { id: "ch14", assignmentId: "a3", title: "Frontend Setup", description: "Initialize React + Tailwind project.", author: "You", date: new Date("2026-01-26") },

  // a4 — Algorithm Practice
  {
    id: "ch7",
    assignmentId: "a4",
    title: "Linear Search",
    description: "Implement linear search algorithm.",
    author: "Dr. Dara",
    date: new Date("2026-01-18"),
  },
  {
    id: "ch8",
    assignmentId: "a4",
    title: "Binary Search",
    description: "Implement binary search algorithm.",
    author: "Dr. Dara",
    date: new Date("2026-01-19"),
  },

  // a7 — HTML & CSS
  {
    id: "ch9",
    assignmentId: "a7",
    title: "Flexbox Layout",
    description: "Create layout using flexbox.",
    author: "Ms. Nary",
    date: new Date("2026-01-20"),
  },
  {
    id: "ch10",
    assignmentId: "a7",
    title: "Grid System",
    description: "Build page using CSS grid.",
    author: "Ms. Nary",
    date: new Date("2026-01-21"),
  },

  // a9 — Flutter
  {
    id: "ch11",
    assignmentId: "a9",
    title: "Basic Widgets",
    description: "Use Column, Row, and Container widgets.",
    author: "Mr. Chan",
    date: new Date("2026-01-23"),
  },
  {
    id: "ch12",
    assignmentId: "a9",
    title: "Navigation",
    description: "Implement page navigation.",
    author: "Mr. Chan",
    date: new Date("2026-01-24"),
  },
]


export const mockSubmissions: Submission[] = [
  {
    id: "s1",
    studentName: "Sotheara Saraoun",
    submittedAt: "2026-01-19T09:35:00Z",
    isPublished: "graded",
    score: 95,
  },
  {
    id: "s2",
    studentName: "Deny Sokun",
    submittedAt: "2026-01-19T11:00:00Z",
    isPublished: "graded",
    score: 88,
  },
  {
    id: "s3",
    studentName: "Sotheara Saraoun",
    submittedAt: "2026-01-20T14:15:00Z",
    isPublished: "pending",
  },
  {
    id: "s4",
    studentName: "Deny Sokun",
    submittedAt: "2026-01-20T16:45:00Z",
    isPublished: "pending",
  },
]