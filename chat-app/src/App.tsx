import "./App.css";

import { QueryClientProvider } from "@tanstack/react-query";
// import { DisplayFile } from "./components/displayFile";
// import { AddDataToDisplay } from "./components/addDataToDisplay";
import { queryClient } from "./query_client";
import { AuthComponent } from "./components/authComponent";
import { MessagesOpenChat } from "./components/messagesOpenChat";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <AuthComponent />
        {/* <DisplayFile />
        <AddDataToDisplay /> */}
        <MessagesOpenChat />
      </>
    </QueryClientProvider>
  );
}

export default App;
