import { useUser } from "@auth0/nextjs-auth0";
import React from "react";
import Navbar from "./components/home/Navbar";

export default function Dashboard() {
  const { user, error, isLoading } = useUser();
  return (
    <div>
      <Navbar user={user} error={error} isLoading={isLoading} />
    </div>
  );
}
