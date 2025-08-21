// DataTable.tsx
import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export interface Column<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

export interface PaginationConfig {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (limit: number) => void;
  onSearch?: (searchTerm: string) => void;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  description?: string;
  createButton?: { label: string; to: string };
  filters?: React.ReactNode;
  loading?: boolean;
  emptyMessage?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
  pagination?: PaginationConfig | false;
  pageSize?: number;
  pageSizeOptions?: number[];
}

const DataTable = <T extends { _id?: string | number; id?: string | number }>(props: DataTableProps<T>) => {
  const {
    data,
    columns,
    title,
    description,
    createButton,
    filters,
    loading = false,
    emptyMessage = 'No data found',
    searchable = false,
    searchPlaceholder = 'Search...',
    searchKeys,
    pagination = false,
    pageSize = 10,
    pageSizeOptions = [5, 10, 25, 50]
  } = props;

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentLimit, setCurrentLimit] = useState<number>(pageSize);

  const isServer = !!pagination && typeof pagination === 'object';

  // sync when server-side pagination props change
  useEffect(() => {
    if (isServer && typeof pagination === 'object') {
      setCurrentPage(pagination.page);
      setCurrentLimit(pagination.limit);
    }
  }, [isServer, pagination]);

  // server-side search debounce
  useEffect(() => {
    if (isServer && typeof pagination === 'object' && pagination.onSearch) {
      const t = setTimeout(() => pagination.onSearch!(searchTerm), 400);
      return () => clearTimeout(t);
    }
  }, [searchTerm, isServer, pagination]);

  const filtered = useMemo(() => {
    if (isServer) return data || [];
    if (!searchable || !searchTerm.trim()) return data || [];
    const s = searchTerm.toLowerCase();
    const keys = (searchKeys && searchKeys.length ? searchKeys : (Object.keys((data || [])[0] || {}) as (keyof T)[]));
    return (data || []).filter(item => keys.some(k => {
      const v = (item as any)[k as any];
      if (Array.isArray(v)) return v.join(' ').toLowerCase().includes(s);
      return String(v ?? '').toLowerCase().includes(s);
    }));
  }, [data, searchable, searchTerm, searchKeys, isServer]);

  const paginated = useMemo(() => {
    if (isServer) return data || [];
    const start = (currentPage - 1) * currentLimit;
    return filtered.slice(start, start + currentLimit);
  }, [filtered, currentPage, currentLimit, isServer, data]);

  const goToPage = (p: number) => {
    if (p < 1) return;
    if (isServer && typeof pagination === 'object') pagination.onPageChange(p);
    else setCurrentPage(p);
  };

  const changeLimit = (l: number) => {
    if (isServer && typeof pagination === 'object') pagination.onPageSizeChange(l);
    else {
      setCurrentLimit(l);
      setCurrentPage(1);
    }
  };

  const totalItems = isServer && typeof pagination === 'object' ? pagination.total : filtered.length;
  const totalPages = isServer && typeof pagination === 'object' ? Math.max(1, pagination.totalPages) : Math.max(1, Math.ceil(totalItems / currentLimit));
  const pageToUse = isServer && typeof pagination === 'object' ? pagination.page : currentPage;
  const dataToRender = isServer ? (data || []) : paginated;

  // Prevent "declared but never used" errors in strict configs by referencing these vars
  void (pageSizeOptions);

  return (
    <div className="space-y-6">
      {(title || description || createButton) && (
        <div className="flex items-center justify-between">
          <div>
            {title && <h3 className="text-lg font-medium">{title}</h3>}
            {description && <p className="text-sm text-gray-500">{description}</p>}
          </div>
          {createButton && (
            <Link to={createButton.to} className="bg-blue-600 text-white px-3 py-1 rounded">
              {createButton.label}
            </Link>
          )}
        </div>
      )}

      {(searchable || filters) && (
        <div className="flex gap-4 items-center justify-between">
          {searchable && (
            <div className="relative w-full max-w-md">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-3 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {searchTerm && (
                <button 
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200" 
                  onClick={() => setSearchTerm('')}
                >
                  ×
                </button>
              )}
            </div>
          )}
          <div className="ml-auto">{filters}</div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded shadow overflow-hidden">
        {loading ? (
          <div className="p-6 text-gray-900 dark:text-gray-100">Loading...</div>
        ) : dataToRender.length === 0 ? (
          <div className="p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{searchTerm ? 'No search results' : 'No data found'}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{searchTerm ? `No results for "${searchTerm}"` : emptyMessage}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {columns.map(col => (
                    <th key={String(col.key)} className={`px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${col.width || ''}`}>
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {dataToRender.map((row) => (
                  <tr key={String((row as any)._id || (row as any).id)} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    {columns.map(col => (
                      <td key={String(col.key)} className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                        {col.render ? col.render((row as any)[col.key as string], row) : String((row as any)[col.key as string] ?? '-')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pagination && totalPages > 1 && (
          <div className="px-4 py-3 flex items-center justify-between border-t bg-gray-50 dark:bg-gray-800">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing {Math.min((pageToUse - 1) * currentLimit + 1, totalItems)} to {Math.min(pageToUse * currentLimit, totalItems)} of {totalItems} entries
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700 dark:text-gray-300">Show</label>
              <select 
                value={currentLimit} 
                onChange={(e) => changeLimit(Number(e.target.value))} 
                className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                {pageSizeOptions.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <nav className="inline-flex -space-x-px rounded-md" aria-label="Pagination">
                <button 
                  onClick={() => goToPage(pageToUse - 1)} 
                  disabled={pageToUse === 1} 
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-l bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:opacity-50"
                >
                  Prev
                </button>
                {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
                  let p: number;
                  if (totalPages <= 7) p = i + 1;
                  else if (pageToUse <= 4) p = i + 1;
                  else if (pageToUse >= totalPages - 3) p = totalPages - 6 + i;
                  else p = pageToUse - 3 + i;
                  if (p < 1 || p > totalPages) return null;
                  return (
                    <button 
                      key={p} 
                      onClick={() => goToPage(p)} 
                      className={`px-3 py-1 border border-gray-300 dark:border-gray-600 ${
                        p === pageToUse 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
                <button 
                  onClick={() => goToPage(pageToUse + 1)} 
                  disabled={pageToUse === totalPages} 
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-r bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
