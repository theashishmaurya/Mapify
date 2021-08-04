import { UserProvider } from "@auth0/nextjs-auth0";
import "tailwindcss/tailwind.css";
function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
