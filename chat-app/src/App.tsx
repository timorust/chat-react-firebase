import "./App.css";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { DisplayFile } from "./components/displayFile";
import { AddDataToDisplay } from "./components/addDataToDisplay";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Timorust</h1>
      <DisplayFile />
      <AddDataToDisplay />
    </QueryClientProvider>
  );
}

export default App;
