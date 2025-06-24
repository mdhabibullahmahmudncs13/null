import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const QuoteSection = (): JSX.Element => {
  return (
    <div className="relative w-full max-w-[1024px] mx-auto p-8 bg-transparent">
      <Card className="relative border border-solid border-[#abb2bf] bg-transparent">
        <CardContent className="p-8 relative">
          {/* Opening quote mark */}
          <div className="absolute -top-4 left-4 text-[#abb2bf] text-6xl font-bold leading-none">
            "
          </div>

          {/* Quote text */}
          <div className="relative font-['Fira_Code',Helvetica] font-medium text-white text-2xl leading-relaxed max-w-[600px]">
            Code is like humor. When you have to explain it, it's bad.
          </div>

          {/* Author attribution box */}
          <div className="relative mt-8 ml-auto w-fit p-4 border border-solid border-[#abb2bf]">
            <div className="font-['Fira_Code',Helvetica] font-normal text-white text-xl">
              - Cory House
            </div>
          </div>

          {/* Closing quote mark */}
          <div className="absolute -bottom-4 right-8 text-[#abb2bf] text-6xl font-bold leading-none">
            "
          </div>
        </CardContent>
      </Card>
    </div>
  );
};