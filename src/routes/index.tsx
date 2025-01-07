import HomePage from "@/pages/HomePage";
import RoomPage from "@/pages/RoomPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./path";
import MainLayout from "@/layouts/MainLayout";
import RoomDetailPage from "@/pages/RoomDetailPage";
import RoomLayout from "@/layouts/RoomLayout";
import GamePage from "@/pages/GamePage";

const RouteManager = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.ROOM} element={<RoomPage />} />
        </Route>
        <Route element={<RoomLayout />}>
          <Route path={ROUTES.ROOM_DETAIL} element={<RoomDetailPage />} />
          <Route path={ROUTES.GAME} element={<GamePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default RouteManager;
