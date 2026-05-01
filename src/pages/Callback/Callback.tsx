import { useEffect, useRef } from "react";
import { useAppDispatch } from "../../hooks/redux";
import useQuery from "../../hooks/useQuery";
import { authFail, authSuccess } from "../../store/auth";
import { exchangeCode } from "../../store/auth/auth.helpers";

function Callback(): JSX.Element {
  const dispatch = useAppDispatch();
  const [{ error, state, code }] = useQuery<
    Record<string, string>,
    Record<string, string>
  >();
  const isCalled = useRef(false);

  useEffect(() => {
    if (!window.opener || isCalled.current) {
      return;
    }

    isCalled.current = true;

    if (error) {
      dispatch(
        authFail(
          typeof error === "string" ? error : "soapify/inconsistent_response",
          state,
        ),
      );
      return;
    }

    if (!code || !state) {
      dispatch(authFail("soapify/inconsistent_response", state ?? ""));
      return;
    }

    exchangeCode(code, state)
      .then(({ access_token, token_type, expires_in }) => {
        dispatch(authSuccess(access_token, token_type, expires_in, state));
      })
      .catch(() => {
        dispatch(authFail("soapify/token_exchange_failed", state));
      });
  }, [dispatch, isCalled, error, state, code]);

  return <div>redirecting...</div>;
}

export default Callback;
