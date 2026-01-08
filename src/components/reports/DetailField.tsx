interface DetailFieldProps {
  label: string;
  value: string | number | React.ReactNode;
  className?: string;
}

export const DetailField = ({ label, value, className = "" }: DetailFieldProps) => {
  return (
    <div className={`space-y-1 ${className}`}>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium text-foreground">{value}</p>
    </div>
  );
};

export default DetailField;
