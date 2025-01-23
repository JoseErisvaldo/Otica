// Pagination.js
import React from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function Pagination({ currentPage, totalPages, onNextPage, onPrevPage }) {
  return (
    <div className="flex items-center gap-4">
      <IconButton
        size="sm"
        variant="outlined"
        onClick={onPrevPage}
        disabled={currentPage === 0}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography color="gray" className="font-normal">
        Página <strong className="text-gray-900">{currentPage}</strong> {" "}
        <strong className="text-gray-900">{totalPages}</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={onNextPage}
        disabled={currentPage === totalPages}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
}
