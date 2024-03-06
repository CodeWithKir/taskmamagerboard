import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../component";
import { HOME } from "../constant";
export const AppRoute = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={HOME} element={<Home />} />
				<Route index element={<Navigate to={HOME} replace={true} />} />
				<Route path="*" element={<Navigate to={HOME} replace={true} />} />
			</Routes>
		</BrowserRouter>
	);
};
