import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { firebaseAuth } from "../firebase_connection";
import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { isLoggedInAtom, userAtom } from "../userState";

interface IAuthForm {
  email: string;
  password: string;
}

export function AuthComponent() {
  const { handleSubmit, register } = useForm<IAuthForm>();
  const [login, setLogin] = useState(false);
  const setUser = useSetAtom(userAtom);
  const isLoggedIn = useAtomValue(isLoggedInAtom);
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
    onSuccess: () => {
      setUser(firebaseAuth.currentUser);
    },
  });

  if (!isLoggedIn)
    return (
      <main>
        <h1>Auth Component</h1>
        <button
          onClick={async () => {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(firebaseAuth, provider);
            setUser(firebaseAuth.currentUser);
          }}
        >
          Google login
        </button>
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
  return (
    <button
      onClick={async () => {
        await signOut(firebaseAuth);
        setUser(firebaseAuth.currentUser);
      }}
    >
      Sign out
    </button>
  );
}
