import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseAuth } from "../firebase_connection";
import { useState } from "react";

interface IAuthForm {
  email: string;
  password: string;
}

export function AuthComponent() {
  const { handleSubmit, register } = useForm<IAuthForm>();
  const [login, setLogin] = useState(false);
  const queryAuthMutations = useMutation({
    mutationFn: async (data: IAuthForm) => {
      console.log(login);
      if (login) {
        const userCredential = await signInWithEmailAndPassword(
          firebaseAuth,
          data.email,
          data.password
        );
        console.log(userCredential);
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          firebaseAuth,
          data.email,
          data.password
        );
        console.log({ data, userCredential });
      }
    },
  });
  console.log(firebaseAuth.currentUser);
  return (
    <main>
      <h1>Auth Component</h1>
      <pre>Current User{JSON.stringify(firebaseAuth.currentUser, null, 2)}</pre>
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
        <button type="submit" onClick={() => setLogin(false)}>
          Sign-in
        </button>
        <button type="submit" onClick={() => setLogin(true)}>
          Login
        </button>
      </form>
    </main>
  );
}
