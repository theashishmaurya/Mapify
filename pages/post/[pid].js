import { useRouter } from "next/router";
import { ReactFlowProvider } from "react-flow-renderer";
import PostPage from "../components/postModal/postPage";

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
