import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { educationGuardian, fundraisingProgress } from "@/data/educationGuardian";
import { fetchCampaignTotalDollars } from "@/data/fundraisingTotal";

const dollars = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const FundraisingProgress = () => {
  const [raised, setRaised] = useState(educationGuardian.raisedAmount);

  useEffect(() => {
    let active = true;
    fetchCampaignTotalDollars().then((total) => {
      if (active && total !== null) setRaised(total);
    });
    return () => {
      active = false;
    };
  }, []);

  const percent = fundraisingProgress(raised, educationGuardian.fundraisingGoal);

  return (
    <div className="text-left" aria-label="Campaign fundraising totals">
      <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-brand-grey">
        <strong className="text-4xl font-extrabold text-brand-magenta">{dollars.format(raised)}</strong>
        <span className="text-base md:text-lg">raised of <strong className="font-extrabold">{dollars.format(educationGuardian.fundraisingGoal)}</strong> goal</span>
      </p>
      <Progress className="mt-4 h-3 bg-brand-blue/40" value={percent} aria-label="Fundraising progress" aria-valuetext={`${dollars.format(raised)} raised of ${dollars.format(educationGuardian.fundraisingGoal)} goal`} />
      <p className="mt-2 text-sm font-bold text-brand-grey">{Math.round(percent)}% of goal reached</p>
    </div>
  );
};

export default FundraisingProgress;
