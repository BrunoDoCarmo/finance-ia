import { ReactNode } from "react";

interface PercentageItemProps {
  icon: ReactNode;
  title: string;
  value: number;
}

const PercentageItem = ({ icon, title, value }: PercentageItemProps) => {
  return (
    <div className="flex items-center justify-between">
      {/* ICONE */}
      <div className="flex items-center justify-between gap-2">
        <div className="rounded-lg bg-gray-300 p-2 dark:bg-white/10">
          {icon}
        </div>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      <p className="text-sm font-bold">{value}%</p>
    </div>
  );
};

export default PercentageItem;
