import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import SummaryCards from "./_components/summary-cards";
import Navbar from "../_components/navbar";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";

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

  const validMonth = month && isMatch(month, "MM") ? month : currentMonth;
  const validYear = year && isMatch(year, "yyyy") ? year : currentYear;

  if (!month || !year) {
    redirect(`?month=${currentMonth}&year=${currentYear}`);
  }
  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <SummaryCards month={validMonth} year={validYear} />
      </div>
    </>
  );
};

export default Home;
