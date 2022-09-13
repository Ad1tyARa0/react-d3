import { ExpenseType } from '../../utils/types/expenses';
import { PieTypeGeneric } from './../../utils/types/charts';
// Types.
export const EXPENSE_MANAGER_ON_CHANGE_TOTAL_EARNINGS =
  'EXPENSE_MANAGER_ON_CHANGE_TOTAL_EARNINGS';
export const EXPENSE_MANAGER_ON_CHANGE_EXPENSE =
  'EXPENSE_MANAGER_ON_CHANGE_EXPENSE';
export const EXPENSE_MANAGER_ON_CHANGE_EXPENSE_ITEM =
  'EXPENSE_MANAGER_ON_CHANGE_EXPENSE_ITEM';
export const EXPENSE_MANAGER_ON_CLICK_SUBMIT_EXPENSES =
  'EXPENSE_MANAGER_ON_CLICK_SUBMIT_EXPENSES';
export const EXPENSE_MANAGER_ON_CLICK_SUBMIT_TOTAL =
  'EXPENSE_MANAGER_ON_CLICK_SUBMIT_TOTAL';
export const EXPENSE_MANAGER_ON_CLICK_REMOVE_EXPENSE =
  'EXPENSE_MANAGER_ON_CLICK_REMOVE_EXPENSE';

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
      type: typeof EXPENSE_MANAGER_ON_CHANGE_EXPENSE_ITEM;
      payload: string;
    }
  | {
      type: typeof EXPENSE_MANAGER_ON_CLICK_SUBMIT_EXPENSES;
    }
  | {
      type: typeof EXPENSE_MANAGER_ON_CLICK_SUBMIT_TOTAL;
    }
  | {
      type: typeof EXPENSE_MANAGER_ON_CLICK_REMOVE_EXPENSE;
      payload: number;
    };

// Interface.
export interface ExpenseManagerReducerStateInterface {
  total: string;
  expense: string;
  expenseItem: string;
  step: string;
  totalEarnings: string;
  allExpenses: ExpenseType[];
}

// Initial state
export const EXPENSE_MANAGER_REDUCER_INITIAL_STATE: ExpenseManagerReducerStateInterface =
  {
    total: '',
    expense: '',
    expenseItem: '',
    step: 'step-1',
    totalEarnings: '',
    allExpenses: [],
  };

export const ExpenseManagerReducer = (
  state: ExpenseManagerReducerStateInterface,
  action: ExpenseManagerReducerActionType
): ExpenseManagerReducerStateInterface => {
  let expenseObj = {} as ExpenseType;
  switch (action.type) {
    case EXPENSE_MANAGER_ON_CHANGE_EXPENSE:
      return {
        ...state,
        expense: action.payload,
      };

    case EXPENSE_MANAGER_ON_CHANGE_EXPENSE_ITEM:
      return {
        ...state,
        expenseItem: action.payload,
      };

    case EXPENSE_MANAGER_ON_CHANGE_TOTAL_EARNINGS:
      return {
        ...state,
        total: action.payload,
      };

    case EXPENSE_MANAGER_ON_CLICK_SUBMIT_EXPENSES:
      expenseObj = {
        name: state.expenseItem,
        value: Number(state.expense),
        title: Number(state.expense).toLocaleString(),
      };

      return {
        ...state,
        allExpenses:
          state.expenseItem.length !== 0
            ? [...state.allExpenses, expenseObj]
            : [...state.allExpenses],
        expense: '',
        expenseItem: '',
      };

    case EXPENSE_MANAGER_ON_CLICK_SUBMIT_TOTAL:
      return {
        ...state,
        totalEarnings:
          state.total.length !== 0 ? Number(state.total).toLocaleString() : '',
        total: '',
        step: 'step-2',
      };

    case EXPENSE_MANAGER_ON_CLICK_REMOVE_EXPENSE:
      return {
        ...state,
        allExpenses: state.allExpenses.filter(e => e.value !== action.payload),
      };

    default:
      return { ...state };
  }
};
