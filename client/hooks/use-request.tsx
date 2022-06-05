import axios from "axios";
import { useState } from "react";

type UseRequestArgs = {
  url: string;
  method: "post" | "post" | "put" | "delete";
  body: any;
  onSuccess: Function;
};

type ResponseError = {
  response: {
    data: {
      errors: any[];
    };
  };
};

export const useRequest = ({
  url,
  method,
  body,
  onSuccess,
}: UseRequestArgs) => {
  const [errors, setErrors] = useState(<></>);

  const doRequest = async () => {
    try {
      setErrors(<></>);
      const response = await axios[method](url, body);

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err: unknown) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Ooops....</h4>
          <ul className="my-0">
            {(err as ResponseError).response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
