// components/DataTable.tsx
import { useState } from "react";

interface Column<T> {
    header: string;
    accessor: keyof T;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    pageSize?: number; // default rows per page
}

export function DataTable<T extends object>({
    data,
    columns,
    pageSize = 5,
}: DataTableProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / pageSize);

    const startIndex = (currentPage - 1) * pageSize;
    const paginatedData = data.slice(startIndex, startIndex + pageSize);

    return (
        <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            {/* Table */}
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={String(col.accessor)}
                                className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                    {paginatedData.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                            {columns.map((col) => (
                                <td
                                    key={String(col.accessor)}
                                    className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300"
                                >
                                    {String(row[col.accessor])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    Page {currentPage} of {totalPages}
                </p>
                <div className="flex space-x-2">
                    <button
                        className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-sm font-medium disabled:opacity-50"
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <button
                        className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-sm font-medium disabled:opacity-50"
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
