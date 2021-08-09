import { useRouter } from "next/router";
import { ReactFlowProvider } from "react-flow-renderer";
import View from "../components/roadmap/view";
const Create = () => {
  const router = useRouter();
  const { pid } = router.query;
  return (
    <div>
      <ReactFlowProvider>
        <View docid={pid} />
      </ReactFlowProvider>
    </div>
  );
};

export default Create;
