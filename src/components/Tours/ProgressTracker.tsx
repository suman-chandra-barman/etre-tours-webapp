import { Bus, Home, LucideIcon, Clock } from "lucide-react";

interface Step {
  key: string;
  label: string;
  icon: LucideIcon;
}

interface ProgressTrackerProps {
  currentStep?: "pre-departure" | "in-progress" | "completed";
  steps?: Step[];
}

const ProgressTracker = ({
  currentStep = "pre-departure",
  steps = [
    { key: "pre-departure", label: "Pre-departure", icon: Clock },
    { key: "in-progress", label: "In-progress", icon: Bus },
    { key: "completed", label: "Completed", icon: Home },
  ],
}: ProgressTrackerProps) => {
  const getStepIndex = (step: string) => steps.findIndex((s) => s.key === step);
  const currentStepIndex = getStepIndex(currentStep);

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index <= currentStepIndex;
          const isActive = index === currentStepIndex;

          return (
            <div key={step.key} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span
                  className={`mt-2 text-sm ${
                    isActive ? "font-medium text-gray-900" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className="flex-1 h-0.5 mx-2 relative"
                  style={{ top: "-12px" }}
                >
                  <div
                    className={`h-full ${
                      index < currentStepIndex ? "bg-green-500" : "bg-gray-300"
                    }`}
                    style={{
                      borderTop: "2px dashed",
                      borderColor:
                        index < currentStepIndex ? "#10b981" : "#d1d5db",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;
