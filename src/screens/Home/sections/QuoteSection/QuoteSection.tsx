import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { useQuotesData } from "../../../../hooks/useJsonData";

export const QuoteSection = (): JSX.Element => {
  const quotesData = useQuotesData();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    if (!quotesData?.quotes.length) return;

    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => 
        (prev + 1) % quotesData.quotes.length
      );
    }, 10000); // Change quote every 10 seconds

    return () => clearInterval(interval);
  }, [quotesData]);

  if (!quotesData?.quotes.length) {
    return <div>Loading...</div>;
  }

  const currentQuote = quotesData.quotes[currentQuoteIndex];

  return (
    <div className="relative w-full max-w-[1024px] mx-auto p-8 bg-transparent">
      <Card className="relative border border-solid border-[#abb2bf] bg-transparent">
        <CardContent className="p-8 relative">
          {/* Quote text */}
          <div className="relative font-['Fira_Code',Helvetica] font-medium text-white text-2xl leading-relaxed max-w-[600px]">
            {currentQuote.text}
          </div>

          {/* Author attribution box */}
          <div className="relative mt-8 ml-auto w-fit p-4 border border-solid border-[#abb2bf]">
            <div className="font-['Fira_Code',Helvetica] font-normal text-white text-xl">
              - {currentQuote.author}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};