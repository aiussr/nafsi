import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  filters: { label: string; options: FilterOption[]; value: string; onChange: (v: string) => void }[];
  searchValue?: string;
  onSearchChange?: (v: string) => void;
  showSearch?: boolean;
}

export function FilterBar({ filters, searchValue, onSearchChange, showSearch = true }: FilterBarProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-dark-800 rounded-xl border border-dark-600">
      {showSearch && (
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder={t('common.search')}
            value={searchValue || ''}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-accent/50"
          />
        </div>
      )}

      {filters.map((filter) => (
        <div key={filter.label} className="flex items-center gap-2">
          <label className="text-xs text-gray-500 whitespace-nowrap">{filter.label}</label>
          <select
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            className="px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-sm text-gray-200 focus:outline-none focus:border-accent/50"
          >
            <option value="">{t('common.all')}</option>
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
