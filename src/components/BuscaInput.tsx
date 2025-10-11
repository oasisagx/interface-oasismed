import React, { useState, useCallback } from "react";
import { ArrowUp, Search } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

interface BuscaInputProps {
  onSearch?: (query: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const BuscaInput: React.FC<BuscaInputProps> = ({
  onSearch,
  disabled = false,
  placeholder = "O que deseja buscar na plataforma?",
}) => {
  const [query, setQuery] = useState("");

  const handleSearch = useCallback(() => {
    if (disabled || !query.trim()) return;
    onSearch?.(query);
  }, [query, disabled, onSearch]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.nativeEvent.isComposing) {
        e.preventDefault();
        handleSearch();
      }
    },
    [handleSearch]
  );

  const hasContent = query.trim().length > 0;
  const canSearch = hasContent && !disabled;

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm min-h-[64px] flex items-center pr-2">
        <Search className="h-5 w-5 text-slate-400 ml-5 mr-3 flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 h-[64px] resize-none border-0 bg-transparent text-slate-900 placeholder:text-slate-500 text-base focus:outline-none focus:ring-0"
        />
        <Button
          size="icon"
          className={cn(
            "h-12 w-12 p-0 rounded-lg transition-colors ml-2 flex-shrink-0",
            canSearch
              ? "bg-slate-900 hover:bg-slate-800 text-white"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          )}
          onClick={handleSearch}
          disabled={!canSearch}
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default BuscaInput;
