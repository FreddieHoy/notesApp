import { createRoot } from "react-dom/client";
import { Providers } from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<Providers />);
