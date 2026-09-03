"use client";

interface Props {
  score: number;
}

export default function ScoreGauge({ score }: Props) {
  const degrees = score * 3.6;

  return (
    <div className="relative h-52 w-52 mx-auto">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(#00C48C ${degrees}deg,#233044 ${degrees}deg)`,
        }}
      />
      <div className="absolute inset-4 rounded-full bg-[#0B1220] flex flex-col items-center justify-center text-white">
        <span className="text-6xl font-bold">{score}</span>
        <span className="text-sm text-gray-300">Investment Score™</span>
      </div>
    </div>
  );
}
