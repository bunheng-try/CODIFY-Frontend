import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ShowroomLayout } from "@/showroom/ShowroomLayout";
import { ButtonsShowroom } from "@/showroom/routes/design/buttons.page";
import EditorShowroom from "@/showroom/routes/features/codeEditor/Editor.page";
import { AppShell } from "../layout/AppShell";
import { ClassroomLayout } from "../layout/ClassroomLayout";
import { ClassroomHome } from "@/features/classes/components/ClassroomHome";
import { ProtectedRoute } from "./protectedRoute";
import SignInPage from "@/features/auth/pages/SignInPage";
import { NoClassSelected } from "@/features/classes/components/NoClassSelected";
import StudentManagement from "@/features/class/components/StudentManagement";
import { ChallengeLibraryPage } from "@/features/challenge/pages/ChallengeLibraryPage";
import ChallengeEditorPanel from "@/features/challenge/pages/ChallengeEditorPanel";
import ChallengeWorkspace from "@/features/chllenge_workspce/pages/ChallengeWorkspacePage";
import SignUpPage from "@/features/auth/pages/SignUpPage";
import { AssignmentPage } from "@/features/assignment/pages/AssignmentPage";

const router = createBrowserRouter([
  { path: "/signin", element: <SignInPage /> },
  { path: "/signup", element: <SignUpPage /> },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "classrooms",
        element: <ClassroomLayout />,
        children: [
          {
            index: true,
            element: <NoClassSelected />,
          },
          {
            path: ":classId",
            element: <ClassroomHome />,
          },
          {
            path: ":classId/assignments/:assignmentId",
            element: <AssignmentPage />,
          },
          {
            path: ":classId/students",
            element: <StudentManagement />,
          },
        ],
      },
      {
        path: "challenge-library",
        element: <ChallengeLibraryPage />,
        children: [
          {
            index: true,
            element: <NoClassSelected />,
          },
          {
            path: "challenges/:challengeId",
            element: <ChallengeEditorPanel />,
          },
        ],
      },
    ],
  },
  {
    path: "classrooms/:classroomId/assignments/:assignmentId/workspace",
    element: <ChallengeWorkspace />
  },
  {
    path: "/showroom",
    element: <ShowroomLayout />,
    children: [
      { path: "design/buttons", element: <ButtonsShowroom /> },
      { path: "features/code-editor", element: <EditorShowroom /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}