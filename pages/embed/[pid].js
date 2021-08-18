import { useRouter } from "next/router";
import { ReactFlowProvider } from "react-flow-renderer";
import Embed from "../components/roadmap/embed";

const Embedable = () => {
  const router = useRouter();
  const { pid } = router.query;
  return (
    <div>
      <ReactFlowProvider>
        <Embed docid={pid} />
      </ReactFlowProvider>
    </div>
  );
};

export default Embedable;
