import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { firebaseDB } from "../firebase_connection";
import { queryClient } from "../query_client";
interface IAddDisplay {
  firstName: string;
  lastName: string;
  age: number;
}

// export function addData() {}

export function AddDataToDisplay() {
  const { handleSubmit, register } = useForm<IAddDisplay>();
  const queryMutation = useMutation({
    mutationFn: async (data: IAddDisplay) => {
      const collectionTest = collection(firebaseDB, "test");
      addDoc(collectionTest, data);
      console.log(data);
      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["test"] });
    },
  });
  return (
    <form onSubmit={handleSubmit((data) => queryMutation.mutate(data))}>
      <h1>Form</h1>
      <input type="text" {...register("firstName")} />
      <input type="text" {...register("lastName")} />
      <input type="text" {...register("age")} />
      <button type="submit">add data</button>
    </form>
  );
}
