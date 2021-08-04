import { useUser } from "@auth0/nextjs-auth0";
import React from "react";
import Link from "next/link";
export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <Link href='/api/auth/logout'>
          <button>Logout</button>
        </Link>
      </div>
    )
  );
}
