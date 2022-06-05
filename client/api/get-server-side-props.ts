import { Axios } from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { buildClient } from "./build-client";

export const getServerSideClientData: GetServerSideProps = async ({
  req,
  res,
}) => {
  const client = await buildClient(req);
  const props = { currentUser: { email: "", id: "" } };
  try {
    const { data } = await client.get("/api/users/currentuser");
    props.currentUser = data.currentUser;
  } catch (e) {
    console.error(e);
  }

  return {
    props,
  };
};
