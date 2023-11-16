import "./App.css";
import { getDocs, collection } from "firebase/firestore";
import { firebaseDB } from "./firebase_connection";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  async function readData() {
    const collectionTest = collection(firebaseDB, "test");
    const querySet = await getDocs(collectionTest);
    for (const doc of querySet.docs) {
      console.log(doc.data());
    }
  }
  readData();
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Timorust</h1>
    </QueryClientProvider>
  );
}

export default App;