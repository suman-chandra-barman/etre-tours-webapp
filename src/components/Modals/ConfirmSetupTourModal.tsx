"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import TourSetupFormFields from "@/components/Forms/TourSetupFormFields";

interface ConfirmSetupTourModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConfirmSetupTourModal = ({
  open,
  onOpenChange,
}: ConfirmSetupTourModalProps) => {
  const [activeTab, setActiveTab] = useState<
    "direct-sales" | "cruise-operations" | "partner"
  >("direct-sales");

  // Direct Sales form state
  const [directSalesForm, setDirectSalesForm] = useState({
    tourSpotName: "",
    departureFrom: "",
    adultPerHead: "",
    childrenPerHead: "",
    subContractorCompany: "",
    extraGuide: "",
    paymentMethod: "cards" as "cards" | "cash" | "both",
    acceptBoth: false,
  });

  // Cruise Operations form state
  const [cruiseOperationsForm, setCruiseOperationsForm] = useState({
    tourSpotName: "",
    departureFrom: "",
    adultPerHead: "",
    childrenPerHead: "",
    subContractorCompany: "",
    extraGuide: "",
    paymentMethod: "cards" as "cards" | "cash" | "both",
    acceptBoth: false,
  });

  // Partner form state
  const [partnerForm, setPartnerForm] = useState({
    tourSpotName: "",
    departureFrom: "",
    adultPerHead: "",
    childrenPerHead: "",
    subContractorCompany: "",
    extraGuide: "",
    paymentMethod: "cards" as "cards" | "cash" | "both",
    acceptBoth: false,
  });

  const handleDirectSalesPaymentMethodClick = (method: "cards" | "cash") => {
    if (directSalesForm.acceptBoth) return;
    setDirectSalesForm({ ...directSalesForm, paymentMethod: method });
  };

  const handleDirectSalesAcceptBothChange = (checked: boolean) => {
    setDirectSalesForm({
      ...directSalesForm,
      acceptBoth: checked,
      paymentMethod: checked ? "both" : "cards",
    });
  };

  const handleCruiseOperationsPaymentMethodClick = (
    method: "cards" | "cash",
  ) => {
    if (cruiseOperationsForm.acceptBoth) return;
    setCruiseOperationsForm({ ...cruiseOperationsForm, paymentMethod: method });
  };

  const handleCruiseOperationsAcceptBothChange = (checked: boolean) => {
    setCruiseOperationsForm({
      ...cruiseOperationsForm,
      acceptBoth: checked,
      paymentMethod: checked ? "both" : "cards",
    });
  };

  const handlePartnerPaymentMethodClick = (method: "cards" | "cash") => {
    if (partnerForm.acceptBoth) return;
    setPartnerForm({ ...partnerForm, paymentMethod: method });
  };

  const handlePartnerAcceptBothChange = (checked: boolean) => {
    setPartnerForm({
      ...partnerForm,
      acceptBoth: checked,
      paymentMethod: checked ? "both" : "cards",
    });
  };

  const handleConfirmSetup = () => {
    // Handle form submission based on active tab
    console.log("Confirming setup for:", activeTab);
    if (activeTab === "direct-sales") {
      console.log("Direct Sales Form:", directSalesForm);
    } else if (activeTab === "cruise-operations") {
      console.log("Cruise Operations Form:", cruiseOperationsForm);
    } else {
      console.log("Partner Form:", partnerForm);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:min-w-[600px] md:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Confirm setup a new tour
          </DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue="direct-sales"
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(
              value as "direct-sales" | "cruise-operations" | "partner",
            )
          }
          className="w-full"
        >
          <TabsList className="flex items-center gap-4 mb-6 h-12 w-full">
            <TabsTrigger value="direct-sales" className="px-4 h-10 flex-1">
              Direct Sales
            </TabsTrigger>
            <TabsTrigger value="cruise-operations" className="px-4 h-10 flex-1">
              Cruise Operations
            </TabsTrigger>
            <TabsTrigger value="partner" className="px-4 h-10 flex-1">
              Partner Sales
            </TabsTrigger>
          </TabsList>

          {/* Direct Sales Tab */}
          <TabsContent value="direct-sales" className="space-y-6">
            <TourSetupFormFields
              tourSpotName={directSalesForm.tourSpotName}
              departureFrom={directSalesForm.departureFrom}
              adultPerHead={directSalesForm.adultPerHead}
              childrenPerHead={directSalesForm.childrenPerHead}
              subContractorCompany={directSalesForm.subContractorCompany}
              extraGuide={directSalesForm.extraGuide}
              paymentMethod={directSalesForm.paymentMethod}
              acceptBoth={directSalesForm.acceptBoth}
              onTourSpotNameChange={(value) =>
                setDirectSalesForm({ ...directSalesForm, tourSpotName: value })
              }
              onDepartureFromChange={(value) =>
                setDirectSalesForm({ ...directSalesForm, departureFrom: value })
              }
              onAdultPerHeadChange={(value) =>
                setDirectSalesForm({ ...directSalesForm, adultPerHead: value })
              }
              onChildrenPerHeadChange={(value) =>
                setDirectSalesForm({
                  ...directSalesForm,
                  childrenPerHead: value,
                })
              }
              onSubContractorCompanyChange={(value) =>
                setDirectSalesForm({
                  ...directSalesForm,
                  subContractorCompany: value,
                })
              }
              onExtraGuideChange={(value) =>
                setDirectSalesForm({ ...directSalesForm, extraGuide: value })
              }
              onPaymentMethodClick={handleDirectSalesPaymentMethodClick}
              onAcceptBothChange={handleDirectSalesAcceptBothChange}
            />
          </TabsContent>

          {/* Cruise Operations Tab */}
          <TabsContent value="cruise-operations" className="space-y-6">
            <TourSetupFormFields
              tourSpotName={cruiseOperationsForm.tourSpotName}
              departureFrom={cruiseOperationsForm.departureFrom}
              adultPerHead={cruiseOperationsForm.adultPerHead}
              childrenPerHead={cruiseOperationsForm.childrenPerHead}
              subContractorCompany={cruiseOperationsForm.subContractorCompany}
              extraGuide={cruiseOperationsForm.extraGuide}
              paymentMethod={cruiseOperationsForm.paymentMethod}
              acceptBoth={cruiseOperationsForm.acceptBoth}
              onTourSpotNameChange={(value) =>
                setCruiseOperationsForm({
                  ...cruiseOperationsForm,
                  tourSpotName: value,
                })
              }
              onDepartureFromChange={(value) =>
                setCruiseOperationsForm({
                  ...cruiseOperationsForm,
                  departureFrom: value,
                })
              }
              onAdultPerHeadChange={(value) =>
                setCruiseOperationsForm({
                  ...cruiseOperationsForm,
                  adultPerHead: value,
                })
              }
              onChildrenPerHeadChange={(value) =>
                setCruiseOperationsForm({
                  ...cruiseOperationsForm,
                  childrenPerHead: value,
                })
              }
              onSubContractorCompanyChange={(value) =>
                setCruiseOperationsForm({
                  ...cruiseOperationsForm,
                  subContractorCompany: value,
                })
              }
              onExtraGuideChange={(value) =>
                setCruiseOperationsForm({
                  ...cruiseOperationsForm,
                  extraGuide: value,
                })
              }
              onPaymentMethodClick={handleCruiseOperationsPaymentMethodClick}
              onAcceptBothChange={handleCruiseOperationsAcceptBothChange}
            />
          </TabsContent>

          {/* Partner Tab */}
          <TabsContent value="partner" className="space-y-6">
            <TourSetupFormFields
              tourSpotName={partnerForm.tourSpotName}
              departureFrom={partnerForm.departureFrom}
              adultPerHead={partnerForm.adultPerHead}
              childrenPerHead={partnerForm.childrenPerHead}
              subContractorCompany={partnerForm.subContractorCompany}
              extraGuide={partnerForm.extraGuide}
              paymentMethod={partnerForm.paymentMethod}
              acceptBoth={partnerForm.acceptBoth}
              onTourSpotNameChange={(value) =>
                setPartnerForm({ ...partnerForm, tourSpotName: value })
              }
              onDepartureFromChange={(value) =>
                setPartnerForm({ ...partnerForm, departureFrom: value })
              }
              onAdultPerHeadChange={(value) =>
                setPartnerForm({ ...partnerForm, adultPerHead: value })
              }
              onChildrenPerHeadChange={(value) =>
                setPartnerForm({ ...partnerForm, childrenPerHead: value })
              }
              onSubContractorCompanyChange={(value) =>
                setPartnerForm({ ...partnerForm, subContractorCompany: value })
              }
              onExtraGuideChange={(value) =>
                setPartnerForm({ ...partnerForm, extraGuide: value })
              }
              onPaymentMethodClick={handlePartnerPaymentMethodClick}
              onAcceptBothChange={handlePartnerAcceptBothChange}
            />
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-gray-600"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmSetup}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Confirm setup ✓
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmSetupTourModal;
