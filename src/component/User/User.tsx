import { Route, Routes } from "react-router-dom";
import UserHeader from "./UserHeader";
import Feed from "../Feed/Feed";

const User: React.FC = () => {
  return (
    <section className=" ">
      <UserHeader />
      <Routes>
        <Route index element={<Feed />} />
      </Routes>
    </section>
  );
};

export default User;
