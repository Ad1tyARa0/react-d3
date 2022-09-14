import React, { useReducer, useRef } from 'react';
import { MdAdd, MdOutlineClear } from 'react-icons/md';
import { PieChart } from '../../components/charts/pie-chart/PieChart';
import { Layout } from '../../layout/Layout';
import { DEFAULT_DIMENSIONS } from '../../utils/constants/charts';

// SCSS.
import './ExpenseManager.scss';
import {
  ExpenseManagerReducer,
  EXPENSE_MANAGER_ON_CHANGE_EXPENSE,
  EXPENSE_MANAGER_ON_CHANGE_EXPENSE_ITEM,
  EXPENSE_MANAGER_ON_CLICK_SUBMIT_TOTAL,
  EXPENSE_MANAGER_ON_CHANGE_TOTAL_EARNINGS,
  EXPENSE_MANAGER_ON_CLICK_SUBMIT_EXPENSES,
  EXPENSE_MANAGER_REDUCER_INITIAL_STATE,
  EXPENSE_MANAGER_ON_CLICK_REMOVE_EXPENSE,
} from './ExpenseManagerReducer';

// Pages -- expense - manager
const css_prefix = 'p--e-m__';

// Component props.
interface ExpenseManagerProps {}

const ExpenseManagerComponent: React.FunctionComponent<
  ExpenseManagerProps
> = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

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

  const onClickSubmitTotal = () => {
    dispatch({
      type: EXPENSE_MANAGER_ON_CLICK_SUBMIT_TOTAL,
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
    // if (state.step === 'step-2') {
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
          <MdAdd />
        </div>
      </div>
    );
    // } else {
    //   return null;
    // }
  };

  // const renderTotalEarningsForm = () => {
  //   if (state.step === 'step-1') {
  //     return (
  //       <div className={`${css_prefix}form-main`}>
  //         <div className={`${css_prefix}form-input-main`}>
  //           <input
  //             placeholder='Enter Total Earnings'
  //             value={state.total}
  //             onChange={({ currentTarget }) =>
  //               onChangeTotalExpenseValue(currentTarget.value)
  //             }
  //             type='number'
  //             className={`${css_prefix}form-input`}
  //           />
  //         </div>

  //         <div
  //           className={`${css_prefix}form-button`}
  //           onClick={onClickSubmitTotal}
  //         >
  //           <MdAdd />
  //         </div>
  //       </div>
  //     );
  //   } else {
  //     return null;
  //   }
  // };

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
                      <MdOutlineClear />
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

              <div className={`${css_prefix}item-icon`}>
                <MdOutlineClear />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  console.log(state.pieChartData);

  return (
    <Layout headerTitle='Expense Manager' accentColor={<div />}>
      <div className={`${css_prefix}main`}>
        {renderExpenseForm()}

        {/* {renderTotalEarningsForm()} */}

        {renderExpensesTable()}

        <PieChart
          width={800}
          dimensions={DEFAULT_DIMENSIONS}
          data={state.pieChartData}
        />
      </div>
    </Layout>
  );
};

export const ExpenseManager = ExpenseManagerComponent;
