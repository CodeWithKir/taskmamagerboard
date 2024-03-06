import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { AppRoute } from "./router";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
	<ChakraProvider>
		<AppRoute />
	</ChakraProvider>
);
