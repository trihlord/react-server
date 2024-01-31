// @deno-types="@types/react-dom/client"
import { hydrateRoot } from "react-dom/client";

import { Document } from "./Document.tsx";

hydrateRoot(document, <Document />);
