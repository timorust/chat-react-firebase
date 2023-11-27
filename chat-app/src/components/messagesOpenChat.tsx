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

// export function MessagesOpenChat() {
//   const messagesQuery = useQuery({
//     queryKey: ["messagesOpenChat"],
//     queryFn: readMessages,
//   });

//   const { handleSubmit, register } = useForm<IMessagesForm>();

//   if (messagesQuery.isLoading) return <div>Loading...</div>;
//   return (
//     <div>
//       <h1>Open chat</h1>
//       <pre>chat messages{JSON.stringify(messagesQuery.data, null, 2)}</pre>
//       <form
//         onSubmit={handleSubmit(async (message) => {
//           // const collectionMessages = collection(firebaseDB, "messages");
//           if (messagesQuery.data === undefined) return;
//           const dataToSave = { ...messagesQuery.data };
//           dataToSave.messages["13:47"] = {
//             message: message.message,
//             sender: "tim@gmail.com",
//           };
//           await setDoc(
//             doc(firebaseDB, "messages", "KVSg6XROnZk15FEzMN7k"),
//             dataToSave
//           );
//           messagesQuery.refetch();
//         })}
//       >
//         <input type="text" placeholder="message" {...register("message")} />
//         <button type="submit">send</button>
//       </form>
//     </div>
//   );
// }
// ... (existing imports)

export function MessagesOpenChat() {
  const messagesQuery = useQuery({
    queryKey: ["messagesOpenChat"],
    queryFn: readMessages,
  });

  const { handleSubmit, register } = useForm<IMessagesForm>();

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
          // if (
          //   !dataToSave.messages ||
          //   typeof dataToSave.messages.messages !== "object"
          // )
          //   return;

          // Set the message
          dataToSave.messages["13:46"] = {
            message: message.message,
            sender: "tim@gmail.com",
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
