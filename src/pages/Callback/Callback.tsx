import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useQuery from "../../hooks/useQuery";
import {
  authFail,
  AuthFailResponse,
  authSuccess,
  AuthSuccessResponse,
} from "../../store/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StringValuedObject<T extends Record<string, any>> = {
  [_ in keyof T]: string;
};

function Callback(): JSX.Element {
  const dispatch = useDispatch();
  const [searchParams, hashParams] = useQuery<
    StringValuedObject<AuthFailResponse>,
    StringValuedObject<AuthSuccessResponse>
  >();

  useEffect(() => {
    if (!window.opener) return;

    if (searchParams.error) {
      const { state, error } = searchParams;

      if (typeof error !== "string") {
        dispatch(authFail("soapify/inconsistent_response", state));
      } else {
        dispatch(authFail(error, state));
      }
    } else {
      const { access_token, expires_in, state, token_type } = hashParams;
      const parsedExpiresIn = Number(expires_in);

      if (
        typeof access_token !== "string" ||
        typeof token_type !== "string" ||
        Number.isNaN(parsedExpiresIn)
      ) {
        dispatch(authFail("soapify/inconsistent_response", state));
      } else {
        dispatch(authSuccess(access_token, token_type, parsedExpiresIn, state));
      }
    }
  }, [dispatch, searchParams, hashParams]);

  return <div>redirecting...</div>;
}

export default Callback;
