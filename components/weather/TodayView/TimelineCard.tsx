import { Card } from "@/components/ui/card";

interface TimelineCardProps {
  time: string;
  temp: number;
  icon: string;
}

export function TimelineCard({ time, temp, icon }: TimelineCardProps) {
  return (
    <Card className="flex-1 mx-5 flex flex-col bg-gradient-to-r from-[#AD36CB] to-[#333333] border-none  p-4 text-center rounded-3xl mb-10  ">
      <div className="text-sm mb-2">{time}</div>
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-xl">{temp}°</div>
    </Card>
  );
}
