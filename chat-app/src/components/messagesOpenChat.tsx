import {
  getDocs,
  collection,
  query,
  where,
  // addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { firebaseDB } from "../firebase_connection";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useAtomValue } from "jotai";
import { isLoggedInAtom, userAtom } from "../userState";
import { formatTime } from "../utils/getCurrentTime";
// import { useQuery } from "@tanstack/react-query";

interface IMessagesOpenChat {
  id: string;
  data: {
    day: string;
    day_format: string;
    messages: {
      [key: string]: {
        sender: string;
        message: string;
      };
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
  querySet.docs[0].id;
  return {
    id: querySet.docs[0].id,
    data: querySet.docs[0].data(),
  } as IMessagesOpenChat;
}

export function MessagesOpenChat() {
  const messagesQuery = useQuery({
    queryKey: ["messagesOpenChat"],
    queryFn: readMessages,
  });
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const user = useAtomValue(userAtom);
  const { handleSubmit, register } = useForm<IMessagesForm>();
  if (!isLoggedIn) return <div>you are not isLoggedIn</div>;
  if (messagesQuery.isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Open chat</h1>
      <pre>
        chat messages{JSON.stringify(messagesQuery.data?.data, null, 2)}
      </pre>
      <form
        onSubmit={handleSubmit(async (message) => {
          // debugger;
          if (messagesQuery.data?.data === undefined) return;

          // Ensure that messages property is defined
          const dataToSave = {
            ...(messagesQuery.data.data || {}),
          };
          dataToSave.messages[formatTime()] = {
            message: message.message,
            sender: user?.email ?? "",
          };

          await setDoc(
            doc(firebaseDB, "messages", messagesQuery.data.id),
            dataToSave
          );
          messagesQuery.refetch();
        })}
      >
        <input type="text" placeholder="message" {...register("message")} />
        <button type="submit">send</button>
      </form>
    </div>
  );
}
