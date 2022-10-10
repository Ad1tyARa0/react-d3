import React, { useReducer, useRef } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

// Components.
import { PieChart } from '../../components/charts/pie-chart/PieChart';
import { Layout } from '../../layout/Layout';

// Constants.
import { DEFAULT_DIMENSIONS } from '../../utils/constants/charts';

// Types Reducers & interfaces.
import {
  ExpenseManagerReducer,
  EXPENSE_MANAGER_ON_CHANGE_EXPENSE,
  EXPENSE_MANAGER_REDUCER_INITIAL_STATE,
  EXPENSE_MANAGER_ON_CHANGE_EXPENSE_ITEM,
  EXPENSE_MANAGER_ON_CLICK_REMOVE_EXPENSE,
  EXPENSE_MANAGER_ON_CLICK_SUBMIT_EXPENSES,
} from './ExpenseManagerReducer';

// SCSS.
import './ExpenseManager.scss';
import { RootContext } from '../../context/RootContext';

// Pages -- expense - manager
const css_prefix = 'p--e-m__';

// Component props.
interface ExpenseManagerProps {}

const ExpenseManagerComponent: React.FunctionComponent<
  ExpenseManagerProps
> = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { accentColor } = React.useContext(RootContext);

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

  const onChangeExpenseItemValue = (payload: string) => {
    dispatch({
      type: EXPENSE_MANAGER_ON_CHANGE_EXPENSE_ITEM,
      payload,
    });
  };

  const onClickRemoveExpense = (payload: number) => {
    dispatch({
      type: EXPENSE_MANAGER_ON_CLICK_REMOVE_EXPENSE,
      payload,
    });
  };

  const onClickSubmitExpense = () => {
    dispatch({
      type: EXPENSE_MANAGER_ON_CLICK_SUBMIT_EXPENSES,
    });
  };

  const onKeyPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch({
        type: EXPENSE_MANAGER_ON_CLICK_SUBMIT_EXPENSES,
      });

      inputRef.current?.focus();
    }
  };

  const renderExpenseForm = () => {
    return (
      <div className={`${css_prefix}form-main`}>
        <div className={`${css_prefix}form-input-main`}>
          <input
            placeholder='Enter Expense Item'
            value={state.expenseItem}
            onChange={({ currentTarget }) =>
              onChangeExpenseItemValue(currentTarget.value)
            }
            type='text'
            className={`${css_prefix}form-input`}
            ref={inputRef}
          />

          <input
            placeholder='Enter Expense'
            value={state.expense}
            onChange={({ currentTarget }) =>
              onChangeExpenseValue(currentTarget.value)
            }
            type='number'
            className={`${css_prefix}form-input`}
            onKeyDown={e => onKeyPressEnter(e)}
          />
        </div>

        <div
          className={`${css_prefix}form-button`}
          onClick={onClickSubmitExpense}
        >
          <AiOutlinePlus />
        </div>
      </div>
    );
  };

  const renderExpensesTable = () => {
    const ROWS = [
      {
        id: 1,
        value: 'Expense',
      },

      {
        id: 2,
        value: 'Amount (USD)',
      },
    ];

    return (
      <div className={`${css_prefix}expense-table`}>
        <div className={`${css_prefix}table-main`}>
          <div className={`${css_prefix}table-head`}>
            {ROWS.map(e => {
              return (
                <div key={e.id} className={`${css_prefix}item`}>
                  {e.value}
                </div>
              );
            })}
          </div>

          <div className={`${css_prefix}table-body`}>
            {state.allExpenses.map(e => {
              return (
                <div key={e.value} className={`${css_prefix}item-main`}>
                  <div className={`${css_prefix}item`}>{e.name}</div>

                  <div className={`${css_prefix}item`}>
                    <span>$ {e.title}</span>

                    <div
                      className={`${css_prefix}item-icon`}
                      onClick={() => onClickRemoveExpense(e.value)}
                    >
                      <AiOutlineMinus />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {state.totalEarnings.length !== 0 ? (
          <div className={`${css_prefix}total-expense`}>
            <div className={`${css_prefix}item`}>Total</div>
            <div className={`${css_prefix}item`}>
              <span>$ {state.totalEarnings}</span>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className={`${css_prefix}main`}>
      <div className={`${css_prefix}inner-main`}>
        {renderExpenseForm()}

        {renderExpensesTable()}
      </div>

      <PieChart
        width={800}
        dimensions={DEFAULT_DIMENSIONS}
        data={state.pieChartData}
      />
    </div>
  );
};

export const ExpenseManager = ExpenseManagerComponent;
