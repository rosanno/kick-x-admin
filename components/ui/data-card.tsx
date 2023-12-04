import { LucideIcon } from "lucide-react";

interface DataCardProps {
  label: string;
  icon: LucideIcon;
  color: string;
  data: number;
}

export const DataCard = ({
  label,
  icon: Icon,
  data,
  color,
}: DataCardProps) => {
  return (
    <div className="relative bg-white rounded-xl p-3 w-full h-full sm:w-[220px]">
      <div className="flex items-center gap-2">
        <div className="bg-gray-400/10 p-2 rounded-full">
          <Icon
            className="h-4 w-4"
            style={{
              color: `${color}`,
            }}
          />
        </div>
        <span className="text-xs text-gray-500/70">
          {label}
        </span>
      </div>
      <div className="py-5">
        <div className="absolute bottom-3">
          <h3 className="text-xl font-semibold">{data}</h3>
        </div>
      </div>
    </div>
  );
};
