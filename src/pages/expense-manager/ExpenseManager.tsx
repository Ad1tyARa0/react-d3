import React, { useReducer } from 'react';
import { Layout } from '../../layout/Layout';

// SCSS.
import './ExpenseManager.scss';
import {
  ExpenseManagerReducer,
  EXPENSE_MANAGER_ON_CHANGE_EXPENSE,
  EXPENSE_MANAGER_ON_CHANGE_TOTAL_EARNINGS,
  EXPENSE_MANAGER_ON_CLICK_SUBMIT_EXPENSES,
  EXPENSE_MANAGER_REDUCER_INITIAL_STATE,
} from './ExpenseManagerReducer';

// Pages -- expense - manager
const css_prefix = 'p--e-m__';

// Component props.
interface ExpenseManagerProps {}

const ExpenseManagerComponent: React.FunctionComponent<
  ExpenseManagerProps
> = () => {
  const [state, dispatch] = useReducer(
    ExpenseManagerReducer,
    EXPENSE_MANAGER_REDUCER_INITIAL_STATE
  );

  const onChangeExpenseValue = (payload: string) => {
    dispatch({
      type: EXPENSE_MANAGER_ON_CHANGE_EXPENSE,
      payload,
    });
  };

  const onChangeTotalExpenseValue = (payload: string) => {
    dispatch({
      type: EXPENSE_MANAGER_ON_CHANGE_TOTAL_EARNINGS,
      payload,
    });
  };

  const onClickSubmitExpense = () => {
    dispatch({
      type: EXPENSE_MANAGER_ON_CLICK_SUBMIT_EXPENSES,
    });
  };

  const renderExpenseForm = () => {
    return (
      <div className={`${css_prefix}form-main`}>
        <div className={`${css_prefix}form-input-main`}>
          <input
            placeholder='Enter Expense'
            value={state.expense}
            onChange={({ currentTarget }) =>
              onChangeExpenseValue(currentTarget.value)
            }
            type='number'
            className={`${css_prefix}form-input`}
          />
        </div>

        <div className={`${css_prefix}form-button`}>Submit</div>
      </div>
    );
  };

  const renderTotalEarningsForm = () => {
    return (
      <div className={`${css_prefix}form-main`}>
        <div className={`${css_prefix}form-input-main`}>
          <input
            placeholder='Enter Total Earnings'
            value={state.total}
            onChange={({ currentTarget }) =>
              onChangeTotalExpenseValue(currentTarget.value)
            }
            type='number'
            className={`${css_prefix}form-input`}
          />
        </div>

        <div className={`${css_prefix}form-button`}>Submit</div>
      </div>
    );
  };

  return (
    <Layout headerTitle='Expense Manager' accentColor={<div />}>
      <div className={`${css_prefix}main`}>
        {renderExpenseForm()}

        {renderTotalEarningsForm()}
      </div>
    </Layout>
  );
};

export const ExpenseManager = ExpenseManagerComponent;
