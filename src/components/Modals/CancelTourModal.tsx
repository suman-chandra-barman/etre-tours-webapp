"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface CancelTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}

const CancelTourModal = ({
  isOpen,
  onClose,
  onSubmit,
}: CancelTourModalProps) => {
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState<"yes" | "no" | null>(null);

  const handleSubmit = () => {
    if (reason.trim()) {
      onSubmit(reason);
      setReason("");
      setFeedback(null);
      onClose();
    }
  };

  const handleClose = () => {
    setReason("");
    setFeedback(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-normal">
            Please tell us the reason why you want to cancel the tour?
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Textarea
            placeholder="Write the reason..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="min-h-[150px] resize-none"
          />

          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={!reason.trim()}
              className="bg-[#2196F3] hover:bg-[#1976D2] text-white px-8"
            >
              Submit
            </Button>
          </div>

          {/* Feedback Section */}
          <div className="bg-[#00BCD4] rounded-lg p-4 mt-4">
            <p className="text-white font-medium mb-3">Was this helpful?</p>
            <div className="flex gap-4">
              <button
                onClick={() => setFeedback("yes")}
                className={`flex flex-col items-center gap-1 transition-opacity ${
                  feedback === "no" ? "opacity-50" : "opacity-100"
                }`}
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <ThumbsUp className="w-6 h-6 text-[#00BCD4]" />
                </div>
                <span className="text-white text-sm">Yes</span>
              </button>
              <button
                onClick={() => setFeedback("no")}
                className={`flex flex-col items-center gap-1 transition-opacity ${
                  feedback === "yes" ? "opacity-50" : "opacity-100"
                }`}
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <ThumbsDown className="w-6 h-6 text-white" />
                </div>
                <span className="text-white text-sm">No</span>
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CancelTourModal;
