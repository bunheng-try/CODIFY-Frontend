import { useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import { FilterIcon } from "lucide-react";
import { SubmissionCard } from "./SubmissionCard";
import type { SubmissionWithStudentName } from "../apis/submission.api";

interface SubmissionsTabProps {
  submissions: SubmissionWithStudentName[];
  isLoading: boolean;
  isError: boolean;
}

export const SubmissionsTab = ({ submissions, isError, isLoading }: SubmissionsTabProps) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"name" | "date">("name");

  const filteredSubmissions = submissions
    .filter((sub) =>
      sub.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (filter === "date") {
        const dateA = new Date(a.submittedAt ?? a.createdAt).getTime();
        const dateB = new Date(b.submittedAt ?? b.createdAt).getTime();
        return dateB - dateA;
      }
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Input
            placeholder="Search student"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <FilterIcon className="w-4 h-4" />
              Filtering: {filter === "name" ? "By Name" : "By Date"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilter("name")}>
              By Name
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("date")}>
              By Submission Date
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-4">
        {filteredSubmissions.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No submissions found</p>
        ) : (
          filteredSubmissions.map((sub) => (
            <SubmissionCard key={sub.id} submission={sub} />
          ))
        )}
      </div>
    </div>
  );
};