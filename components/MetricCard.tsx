interface Props {
  label: string;
  value: string;
}

export default function MetricCard({ label, value }: Props) {
  return (
    <div className="glass rounded-3xl p-6 hover:scale-[1.03] transition-all">
      <p className="text-gray-500 text-sm">{label}</p>
      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
}