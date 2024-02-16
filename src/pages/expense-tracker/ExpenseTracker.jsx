import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

export default function ExpenseTracker() {
  const navigate = useNavigate();

  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const { balance, income, expense } = transactionTotals;

  const onSubmit = async (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
    setDescription("");
    setTransactionAmount("");
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="bg-slate-200 min-h-max">
        <div className=" h-[370px] flex justify-center items-center text-[#023047] text-center mt-1">
          <div className="container bg-gray-200 ">
            <h1 className="m-1 font-mono text-2xl">
              {name} &#39;s Expense Tracker
            </h1>
            <div className="balance">
              <h3 className="font-mono text-base font-semibold text-blue-500">
                Your Balance
              </h3>
              {balance >= 0 ? <h2>${balance}</h2> : <h2>-${balance * -1}</h2>}
            </div>
            <div className="summary">
              <div className="m-1 income">
                <h4 className="font-mono text-base font-semibold text-green-500">
                  Income
                </h4>
                <p>${income} </p>
              </div>
              <div className="expenses">
                <h4 className="font-mono text-base font-semibold text-red-400">
                  Expenses
                </h4>
                <p>${expense} </p>
              </div>
            </div>
            <form
              className="flex-row items-center justify-between gap-5 p-5 text-center add-transcation"
              onSubmit={onSubmit}
            >
              <input
                type="text"
                placeholder="Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-2 m-2 font-mono text-gray-500 rounded-md outline-none bg-gray-50"
              />
              <input
                type="number"
                placeholder="Amount"
                required
                value={transactionAmount}
                onChange={(e) => setTransactionAmount(e.target.value)}
                className="p-2 m-2 font-mono text-gray-500 rounded-md outline-none bg-gray-50"
              />
              <input
                type="radio"
                id="expense"
                value="expense"
                checked={transactionType === "expense"}
                onChange={(e) => setTransactionType(e.target.value)}
                className="p-2 m-2 font-mono text-gray-500 rounded-md bg-gray-50"
              />
              <label htmlFor="expense" className="font-mono">
                Expense
              </label>
              <input
                className="p-2 m-2 font-mono text-gray-500 rounded-md bg-gray-50"
                type="radio"
                id="income"
                value="income"
                checked={transactionType === "income"}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              <label htmlFor="income " className="font-mono">
                Income
              </label>

              <button
                className="w-[150px] mt-[30px] bg-[#044982b4] border-none rounded-xl text-white text-[15px] font-bold no-underline hover:bg-[#182733e7] hover:no-underline  focus:bg-[#182733e5]-900 p-3 hover:cursor-pointer m-5 font-mono"
                type="submit"
              >
                Add transaction
              </button>
            </form>
          </div>
          <div className="m-5">
            {profilePhoto && (
              <div className="mb-20 ml-10">
                <img
                  className="w-[70%] rounded-[45%] ml-3"
                  src={profilePhoto}
                />
                <button
                  className="w-[100px] mt-[15px] bg-[#3498db] border-none rounded-xl text-white text-[15px] font-bold p-4 no-underline bg-bg-color hover:bg-[#3cb0fd] hover:no-underline hover:cursor-pointer font-mono"
                  onClick={signUserOut}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="w-[50%] ml-[20%] mt-[30px] max-h-screen overflow-auto pl-[8px] border-[1px] border-solid border-[#023047] bg-slate-400 items-center justify-center shadow-md">
          <h3 className="mt-2 font-mono text-2xl font-semibold text-center upp ">
            Transactions
          </h3>
          <ul>
            {transactions.map((transaction, index) => {
              const { description, transactionAmount, transactionType } =
                transaction;
              return (
                <li
                  key={index}
                  className="m-2 text-white rounded-[8px]"
                  style={{
                    backgroundColor:
                      transactionType === "expense" ? "#7a1c01" : "#137a05",
                  }}
                >
                  <h4 className="ml-2 font-mono text-xl ">
                    &gt; {description}
                  </h4>
                  <p className="text-[18px] ml-3 m-2">
                    &nbsp; $ {transactionAmount}
                    <label className="m-2 ml-2 text-[15px] font-mono uppercase">
                      {transactionType}
                    </label>
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
