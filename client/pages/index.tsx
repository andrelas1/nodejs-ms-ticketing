import type { NextPage } from "next";
import { getServerSideClientData } from "../api/get-server-side-props";

const Home: NextPage<{ currentUser: any }> = ({ currentUser }) => {
  console.log("CURRENT USER", currentUser);
  return currentUser?.email ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

export default Home;

export const getServerSideProps = getServerSideClientData;
