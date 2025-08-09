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
    <div className="relative w-full max-w-[1024px] mx-auto p-4 sm:p-6 lg:p-8 bg-transparent">
      <Card className="relative border-2 border-solid border-app-primary/50 bg-app-background/50 backdrop-blur-sm cyber-glow hover:border-app-primary transition-all duration-300">
        <CardContent className="p-4 sm:p-6 lg:p-8 relative">
          {/* Quote text */}
          <div className="relative font-['Fira_Code',Helvetica] font-medium text-white text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-full lg:max-w-[600px]">
            "{currentQuote.text}"
          </div>

          {/* Author attribution box */}
          <div className="relative mt-4 sm:mt-6 lg:mt-8 ml-auto w-fit p-2 sm:p-3 lg:p-4 border-2 border-solid border-app-secondary/50 bg-app-background/30 backdrop-blur-sm">
            <div className="font-['Fira_Code',Helvetica] font-normal text-app-secondary text-base sm:text-lg lg:text-xl">
              - {currentQuote.author}
            </div>
          </div>

          {/* Quote indicators */}
          <div className="flex justify-center gap-2 mt-4 sm:mt-6">
            {quotesData.quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuoteIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentQuoteIndex 
                    ? 'bg-app-primary cyber-pulse' 
                    : 'bg-gray hover:bg-app-secondary'
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};