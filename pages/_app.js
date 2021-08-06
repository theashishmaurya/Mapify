import { UserProvider } from "@auth0/nextjs-auth0";
import "tailwindcss/tailwind.css";
import RoadmapData from "./api/roadmap/roadmapContext";
function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <RoadmapData>
        <Component {...pageProps} />
      </RoadmapData>
    </UserProvider>
  );
}

export default MyApp;
