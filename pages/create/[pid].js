import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { ReactFlowProvider } from "react-flow-renderer";
import Roadmap from "../components/roadmap/roadmap";
const Create = () => {
  const router = useRouter();
  const { pid } = router.query;
  return (
    <div>
      <ReactFlowProvider>
        <Roadmap docid={pid} />
      </ReactFlowProvider>
    </div>
  );
};

export default Create;
export const getServerSideProps = withPageAuthRequired();
