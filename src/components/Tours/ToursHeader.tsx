import styles from "@/components/styles/Print.module.css";

interface ToursHeaderProps {
  title: string;
}

export function ToursHeader({ title }: ToursHeaderProps) {
  return (
    <div className={`flex items-center justify-between mb-6 ${styles.noPrint}`}>
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
      </div>
    </div>
  );
}
