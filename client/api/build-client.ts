import axios, { Axios } from "axios";
import { IncomingMessage } from "http";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

type BuildClient = (
  req: IncomingMessage & {
    cookies: NextApiRequestCookies;
  }
) => Axios;

export const buildClient: BuildClient = (req) => {
  if (typeof window === "undefined") {
    // We are on the server
    console.log("HEADERS", req.headers);

    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      // TODO: fix this
      headers: req.headers as any,
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseURL: "/",
    });
  }
};
