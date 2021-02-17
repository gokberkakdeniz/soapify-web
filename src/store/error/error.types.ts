export const ERROR_ADD = "error/add";
export const ERROR_CLEAR = "error/clear";

export type ErrorState =
  | {
      error: true;
      message: string;
    }
  | {
      error: false;
    };

export interface ErrorAddAction {
  type: typeof ERROR_ADD;
  payload: { message: string };
}

export interface ErrorClearAction {
  type: typeof ERROR_CLEAR;
}

export type ErrorAction = ErrorAddAction | ErrorClearAction;
