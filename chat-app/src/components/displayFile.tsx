import { getDocs, collection } from "firebase/firestore";
import { firebaseDB } from "../firebase_connection";
import { useQuery } from "@tanstack/react-query";

async function readData() {
  const collectionTest = collection(firebaseDB, "test");
  const querySet = await getDocs(collectionTest);
  const obj: { [key: string]: unknown } = {};
  for (const item of querySet.docs) {
    const id = item.id;
    obj[id] = item.data();
    console.log(item.data());
  }
  return obj;
}
export function DisplayFile() {
  const query = useQuery({
    queryKey: ["test"],
    queryFn: readData,
  });
  if (query.isLoading) return <div>Loading...</div>;
  return (
    <main>
      Display data{" "}
      <pre>
        {Object.values(query.data ?? {}).map((item, index) => (
          <pre key={index}>
            {JSON.stringify(item, null, 2)}
            <hr />
          </pre>
        ))}
      </pre>
    </main>
  );
}
