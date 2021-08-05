import { useRouter } from "next/router";
import Roadmap from "../components/roadmap/roadmap";
const Create = () => {
  const router = useRouter();
  const { pid } = router.query;
  console.log(pid);
  return (
    <div>
      <Roadmap />
    </div>
  );
};

export default Create;
