import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { QueryProvider } from "./providers/QueryProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { AppRouter } from "./routes";
import { ContextMenuProvider } from "@/shared/components/context-menu/ContextMenuProvider";

function App() {
  return (
    <>
    <ThemeProvider defaultTheme="light">
      <QueryProvider>
        <TooltipProvider delayDuration={200}>
          <ContextMenuProvider>
            <AppRouter />
          </ContextMenuProvider>
        </TooltipProvider>
      </QueryProvider>
    </ThemeProvider>
    </>
  );
}

export default App;
