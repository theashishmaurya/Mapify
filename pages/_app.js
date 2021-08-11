import { UserProvider } from "@auth0/nextjs-auth0";
import "tailwindcss/tailwind.css";
import PostContextProvider from "./api/post/postContextProvider";
import RoadmapData from "./api/roadmap/roadmapContext";
function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <RoadmapData>
        <PostContextProvider>
          <Component {...pageProps} />
        </PostContextProvider>
      </RoadmapData>
    </UserProvider>
  );
}

export default MyApp;
