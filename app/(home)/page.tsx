import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import SummaryCards from "./_components/summary-cards";
import Navbar from "../_components/navbar";
import TimeSelect from "./_components/time-select";
import TransactionPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";

interface HomeProps {
  searchParams: {
    month?: string;
    year?: string;
  };
}

// Criado fora do componente para não ser recalculado
const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 11 }, (_, i) => {
  const y = String(CURRENT_YEAR - i);
  return { value: y, label: y };
});

// Funções mais leves de validação
const isValidMonth = (m?: string) =>
  !!m && /^[0-9]{2}$/.test(m) && Number(m) >= 1 && Number(m) <= 12;

const isValidYear = (y?: string) =>
  !!y && YEAR_OPTIONS.some((opt) => opt.value === y);

const Home = async ({ searchParams: { month, year } }: HomeProps) => {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const fallbackMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  const fallbackYear = String(CURRENT_YEAR);

  // Se inválidos → redireciona para valores padrão
  if (!isValidMonth(month) || !isValidYear(year)) {
    return redirect(`?month=${fallbackMonth}&year=${fallbackYear}`);
  }

  // Sempre válidos aqui
  const validMonth = month!;
  const validYear = year!;

  const dashboard = await getDashboard(validMonth, validYear);

  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 p-6 lg:overflow-hidden">
        <div className="flex h-6 w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <div className="grid grid-rows-[1fr] gap-3 lg:h-screen lg:grid-cols-[2fr,1fr] lg:overflow-hidden">
          <div className="flex flex-col gap-3 overflow-hidden">
            <SummaryCards month={validMonth} year={validYear} {...dashboard} />
            <div className="flex h-full grid-rows-1 flex-col gap-3 overflow-hidden lg:grid lg:grid-cols-3">
              <TransactionPieChart {...dashboard} />
              <ExpensesPerCategory
                expersePerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions
            lastTransactions={dashboard.serializedLastTransaction}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
