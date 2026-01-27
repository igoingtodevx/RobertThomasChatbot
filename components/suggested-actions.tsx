"use client";

import type { UseChatHelpers } from "@ai-sdk/react";
import { motion } from "framer-motion";
import { memo } from "react";
import type { ChatMessage } from "@/lib/types";
import { Suggestion } from "./elements/suggestion";
import type { VisibilityType } from "./visibility-selector";

type SuggestedActionsProps = {
  chatId: string;
  sendMessage: UseChatHelpers<ChatMessage>["sendMessage"];
  selectedVisibilityType: VisibilityType;
};

function PureSuggestedActions({ chatId, sendMessage }: SuggestedActionsProps) {
  const suggestedActions = [
    {
      heading: "Für Zuhause",
      subheading: "Tierhaare & Parkett",
      message: "Welcher Staubsauger ist am besten für Tierhaare und Parkett geeignet?",
    },
    {
      heading: "Für Industrie",
      subheading: "Energiekosten senken",
      message: "Wie können wir die Energiekosten bei der Ziegeltrocknung senken?",
    },
    {
      heading: "Service & Support",
      subheading: "Ersatzteile finden",
      message: "Wo finde ich Ersatzteile für meinen AQUA+ Staubsauger?",
    },
    {
      heading: "Über uns",
      subheading: "Firmengeschichte",
      message: "Erzähl mir mehr über die Geschichte von Robert Thomas.",
    },
  ];

  return (
    <div
      className="grid w-full gap-3 sm:grid-cols-2"
      data-testid="suggested-actions"
    >
      {suggestedActions.map((action, index) => (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          initial={{ opacity: 0, y: 20 }}
          key={action.message}
          transition={{ delay: 0.05 * index }}
        >
          <Suggestion
            className="glass-card h-auto w-full whitespace-normal rounded-xl p-4 text-left flex flex-col gap-1"
            onClick={(suggestion) => {
              window.history.pushState({}, "", `/chat/${chatId}`);
              sendMessage({
                role: "user",
                parts: [{ type: "text", text: suggestion }],
              });
            }}
            suggestion={action.message}
          >
            <span className="font-semibold text-sm text-foreground">{action.heading}</span>
            <span className="text-xs text-muted-foreground">{action.subheading}</span>
          </Suggestion>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(
  PureSuggestedActions,
  (prevProps, nextProps) => {
    if (prevProps.chatId !== nextProps.chatId) {
      return false;
    }
    if (prevProps.selectedVisibilityType !== nextProps.selectedVisibilityType) {
      return false;
    }

    return true;
  }
);
