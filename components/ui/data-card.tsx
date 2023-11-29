
import { LucideIcon } from "lucide-react";

interface DataCardProps {
  label: string;
  icon: LucideIcon;
  data: number;
}

export const DataCard = ({
  label,
  icon: Icon,
  data,
}: DataCardProps) => {
  return (
    <div className="bg-white rounded-xl p-3 w-[220px]">
      <div className="flex items-center gap-2">
        <div className="bg-gray-400/10 p-2 rounded-full">
          <Icon className="h-4 w-4" />
        </div>
        <span className="text-xs text-gray-500/70">
          {label}
        </span>
      </div>
      <div className="pt-4">
        <h3 className="text-xl font-semibold">{data}</h3>
      </div>
    </div>
  );
};
