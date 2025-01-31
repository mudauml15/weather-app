import { Card } from "@/components/ui/card";

interface TimelineCardProps {
  time: string;
  temp: string;
  icon: string;
}

export function TimelineCard({ time, temp, icon }: TimelineCardProps) {
  return (
    <Card className="flex-[0_0_150px] bg-purple-500 p-4 text-center rounded-xl">
      <div className="text-sm mb-2">{time}</div>
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-xl">{temp}</div>
    </Card>
  );
}
