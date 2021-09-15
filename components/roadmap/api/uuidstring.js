import { v4 as uuidv4 } from "uuid";
const uuidstring = () => {
  const uuid = uuidv4();
  console.log(uuid);
  const uidString = `/create/${uuid}`;
  return uidString;
};

export default uuidstring;
