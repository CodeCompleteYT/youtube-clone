"use client";

interface AnalyticsSummaryItemProps {
  value?: string | number;
  subtitle?: string | number;
}

const AnalyticsSummaryItem: React.FC<AnalyticsSummaryItemProps> = ({
  value,
  subtitle,
}) => {
  return (
    <div className="h-full flex flex-col justify-between p-5 rounded-lg bg-neutral-900">
      <h1 className="text-2xl lg:text-3xl">{value}</h1>
      <p className="font-medium text-stone-400 text-md lg:text-xl break-words">
        {subtitle}
      </p>
    </div>
  );
};

export default AnalyticsSummaryItem;
