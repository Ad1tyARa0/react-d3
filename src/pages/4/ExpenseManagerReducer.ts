// Types.
export const EXPENSE_MANAGER_ON_CHANGE_TOTAL_EARNINGS =
  'EXPENSE_MANAGER_ON_CHANGE_TOTAL_EARNINGS';
export const EXPENSE_MANAGER_ON_CHANGE_EXPENSE =
  'EXPENSE_MANAGER_ON_CHANGE_EXPENSE';
export const EXPENSE_MANAGER_ON_CLICK_SUBMIT_EXPENSES =
  'EXPENSE_MANAGER_ON_CLICK_SUBMIT_EXPENSES';

// Actions
export type ExpenseManagerReducerActionType =
  | {
      type: typeof EXPENSE_MANAGER_ON_CHANGE_EXPENSE;
      payload: string;
    }
  | {
      type: typeof EXPENSE_MANAGER_ON_CHANGE_TOTAL_EARNINGS;
      payload: string;
    }
  | {
      type: typeof EXPENSE_MANAGER_ON_CLICK_SUBMIT_EXPENSES;
    };

// Interface.
export interface ExpenseManagerReducerStateInterface {
  total: string;
  expense: string;
}

// Initial state
export const EXPENSE_MANAGER_REDUCER_INITIAL_STATE: ExpenseManagerReducerStateInterface =
  {
    total: '0',
    expense: '0',
  };

export const ExpenseManagerReducer = (
  state: ExpenseManagerReducerStateInterface,
  action: ExpenseManagerReducerActionType
): ExpenseManagerReducerStateInterface => {
  switch (action.type) {
    default:
      return { ...state };
  }
};
