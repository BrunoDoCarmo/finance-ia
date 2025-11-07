import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import SummaryCards from "./_components/summary-cards";
import Navbar from "../_components/navbar";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";

interface HomeProps {
  searchParams: {
    month: string;
    year: string;
  };
}

const Home = async ({ searchParams: { month, year } }: HomeProps) => {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  const currentYear = String(new Date().getFullYear());

  const YEAR_OPTIONS = Array.from({ length: 11 }, (_, i) => {
    const year = String(new Date().getFullYear() - i);
    return { value: year, label: year };
  });

  // Verifica se o mês e ano são válidos (mês entre 01 e 12, ano numérico de 4 dígitos)
  const isValidMonth =
    month && /^[0-9]{2}$/.test(month) && +month >= 1 && +month <= 12;
  const isValidYear =
    year &&
    /^[0-9]{4}$/.test(year) &&
    YEAR_OPTIONS.some((option) => option.value === year);

  const validMonth = month && isMatch(month, "MM") ? month : currentMonth;
  const validYear = year && isMatch(year, "yyyy") ? year : currentYear;

  if (!isValidMonth || !isValidYear) {
    redirect(`?month=${currentMonth}&year=${currentYear}`);
  }

  const dashboard = await getDashboard(validMonth, validYear);
  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex h-6 w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <div className="grid gap-3 overflow-hidden lg:grid-cols-[2fr,1fr]">
          <div className="flex flex-col gap-3 overflow-hidden">
            <SummaryCards month={validMonth} year={validYear} {...dashboard} />
            <div className="flex h-full grid-rows-1 flex-col gap-3 overflow-hidden lg:grid lg:grid-cols-3">
              <TransactionPieChart {...dashboard} />
              <ExpensesPerCategory
                expersePerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.lastTransaction} />
        </div>
      </div>
    </>
  );
};

export default Home;
