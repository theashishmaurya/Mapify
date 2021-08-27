import { withPageAuthRequired } from "@auth0/nextjs-auth0";
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
export async function section(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
export default Embedable;
export const getServerSideProps = section;
