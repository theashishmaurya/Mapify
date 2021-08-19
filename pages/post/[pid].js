import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { ReactFlowProvider } from "react-flow-renderer";
import PostPage from "../components/post/postPage";

const Post = () => {
  const router = useRouter();
  const { pid } = router.query;
  return (
    <div>
      <ReactFlowProvider>
        <PostPage pid={pid} />
      </ReactFlowProvider>
    </div>
  );
};

export default Post;
export const getServerSideProps = withPageAuthRequired();
