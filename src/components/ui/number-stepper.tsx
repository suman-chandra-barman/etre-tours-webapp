import { Minus, Plus } from "lucide-react";
import { Button } from "./button";

interface NumberStepperProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  description?: string;
  min?: number;
  max?: number;
}

export const NumberStepper = ({
  label,
  value,
  onChange,
  description,
  min = 0,
  max,
}: NumberStepperProps) => {
  const handleDecrement = () => {
    const newValue = value - 1;
    if (newValue >= min) {
      onChange(newValue);
    }
  };

  const handleIncrement = () => {
    const newValue = value + 1;
    if (max === undefined || newValue <= max) {
      onChange(newValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(e.target.value) || 0;
    let newValue = Math.max(min, inputValue);
    if (max !== undefined) {
      newValue = Math.min(max, newValue);
    }
    onChange(newValue);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2 border border-gray-300 rounded-lg px-3 py-1.5">
        <span className="text-sm">{label}</span>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleDecrement}
            variant="outline"
            size="icon-sm"
            className="w-6 h-6 rounded-full"
          >
            <Minus className="w-3 h-3" />
          </Button>
          <input
            type="number"
            value={value}
            onChange={handleInputChange}
            className="w-12 text-center border-0 focus:outline-none focus:ring-0 text-sm font-medium"
            min={min}
            max={max}
          />
          <Button
            onClick={handleIncrement}
            variant="outline"
            size="icon-sm"
            className="w-6 h-6 rounded-full"
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </div>
      {description && <p className="text-xs text-gray-500">{description}</p>}
    </div>
  );
};
