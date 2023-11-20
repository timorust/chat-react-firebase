import "./App.css";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { DisplayFile } from "./components/displayFile";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Timorust</h1>
      <DisplayFile />
    </QueryClientProvider>
  );
}

export default App;
