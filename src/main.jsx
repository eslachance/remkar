import React from "react";
import ReactDOM from "react-dom/client";

import { ResultsStoreProvider } from "@/store/results";
import "uno.css";
import "./index.css";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(<ResultsStoreProvider><App /></ResultsStoreProvider>);
