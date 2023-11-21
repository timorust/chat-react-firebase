import "./App.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { DisplayFile } from "./components/displayFile";
import { AddDataToDisplay } from "./components/addDataToDisplay";
import { queryClient } from "./query_client";
import { AuthComponent } from "./components/authComponent";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Timorust</h1>
      <DisplayFile />
      <AddDataToDisplay />
      <AuthComponent />
    </QueryClientProvider>
  );
}

export default App;
