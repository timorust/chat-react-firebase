import { getDocs, collection, query, where } from "firebase/firestore";
import { firebaseDB } from "../firebase_connection";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
// import { useQuery } from "@tanstack/react-query";

interface IMessagesOpenChat {
  day: string;
  day_format: string;
  messages: {
    [key: string]: {
      sender: string;
      message: string;
    };
  };
}

interface IMessagesForm {
  message: string;
}

async function readMessages() {
  const collectionMessages = collection(firebaseDB, "messages");
  const queryData = query(
    collectionMessages,
    where("day_format", "==", "27/11/2023")
  );
  const querySet = await getDocs(queryData);
  return querySet.docs[0].data() as IMessagesOpenChat;
}

export function MessagesOpenChat() {
  const messagesQuery = useQuery({
    queryKey: ["messagesOpenChat"],
    queryFn: readMessages,
  });

  const {} = useForm<IMessagesForm>();

  if (messagesQuery.isLoading) return <div>Loading...</div>;
  return (
    <div>
      <h1>Open chat</h1>
      <pre>chat messages{JSON.stringify(messagesQuery.data, null, 2)}</pre>
      <form>
        <input type="text" placeholder="message" />
        <button>send</button>
      </form>
    </div>
  );
}
