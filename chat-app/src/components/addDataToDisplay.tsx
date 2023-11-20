import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

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
      console.log(data);
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
