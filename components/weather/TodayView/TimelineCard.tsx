import { Card } from "@/components/ui/card";

interface TimelineCardProps {
  time: string;
  temp: number;
  icon: string;
}

export function TimelineCard({ time, temp, icon }: TimelineCardProps) {
  return (
    <Card className=" flex-1 flex flex-col  bg-gradient-to-r from-[#AD36CB] to-[#333333] border-4 border-none  p-4 text-center rounded-xl ">
      <div className="text-sm mb-2">{time}</div>
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-xl">{temp}°</div>
    </Card>
  );
}
