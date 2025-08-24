import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import type { JSX } from "react";
import { ClipLoader } from "react-spinners"; // import a spinner


interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isSignedIn, isLoaded } = useUser();

  // Wait until Clerk loads user info
  if (!isLoaded)  return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={60} color="#3b82f6" /> {/* Blue spinner */}
      </div>
    );

  // Redirect to Clerk hosted Sign In if not signed in
  if (!isSignedIn) return <Navigate to="/signup" replace />;

  return children;
}
