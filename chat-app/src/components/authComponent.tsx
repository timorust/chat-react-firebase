import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../firebase_connection";

interface IAuthForm {
  email: string;
  password: string;
}

export function AuthComponent() {
  const { handleSubmit, register } = useForm<IAuthForm>();
  const queryAuthMutations = useMutation({
    mutationFn: async (data: IAuthForm) => {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        data.email,
        data.password
      );
      console.log(data, userCredential);
    },
  });
  return (
    <main>
      <h1>Auth Component</h1>
      <form
        onSubmit={handleSubmit((data: IAuthForm) =>
          queryAuthMutations.mutate(data)
        )}
      >
        <input type="text" {...register("email")} placeholder="email..." />
        <input
          type="text"
          {...register("password")}
          placeholder="password..."
        />
        <button type="submit">Create User</button>
      </form>
    </main>
  );
}
