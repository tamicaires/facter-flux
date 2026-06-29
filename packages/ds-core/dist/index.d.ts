import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React$1 from 'react';
import { ReactNode, ComponentType } from 'react';
import { VariantProps } from 'class-variance-authority';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as _tanstack_react_table from '@tanstack/react-table';
import { ColumnDef, Column, SortingState, ColumnFiltersState, VisibilityState, RowSelectionState, PaginationState, Table as Table$1 } from '@tanstack/react-table';
export { ColumnDef, flexRender } from '@tanstack/react-table';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Toaster as Toaster$1, toast as toast$1 } from 'sonner';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { FieldValues, FieldPath, UseFormReturn, SubmitHandler, SubmitErrorHandler, Path } from 'react-hook-form';
export { FormProvider, useFormContext } from 'react-hook-form';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { ClassValue } from 'clsx';
export { FACTER_THEMES, FacterTheme, THEME_INFO } from './themes/index.js';

declare const buttonVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    isLoading?: boolean;
    loadingText?: string;
}
declare const Button: React$1.ForwardRefExoticComponent<ButtonProps & React$1.RefAttributes<HTMLButtonElement>>;

interface CardProps extends React$1.HTMLAttributes<HTMLDivElement> {
}
declare function Card({ className, ...props }: CardProps): react_jsx_runtime.JSX.Element;
declare namespace Card {
    var displayName: string;
}
interface CardHeaderProps extends React$1.HTMLAttributes<HTMLDivElement> {
}
declare function CardHeader({ className, ...props }: CardHeaderProps): react_jsx_runtime.JSX.Element;
declare namespace CardHeader {
    var displayName: string;
}
interface CardTitleProps extends React$1.HTMLAttributes<HTMLHeadingElement> {
}
declare function CardTitle({ className, ...props }: CardTitleProps): react_jsx_runtime.JSX.Element;
declare namespace CardTitle {
    var displayName: string;
}
interface CardDescriptionProps extends React$1.HTMLAttributes<HTMLParagraphElement> {
}
declare function CardDescription({ className, ...props }: CardDescriptionProps): react_jsx_runtime.JSX.Element;
declare namespace CardDescription {
    var displayName: string;
}
interface CardContentProps extends React$1.HTMLAttributes<HTMLDivElement> {
}
declare function CardContent({ className, ...props }: CardContentProps): react_jsx_runtime.JSX.Element;
declare namespace CardContent {
    var displayName: string;
}
interface CardFooterProps extends React$1.HTMLAttributes<HTMLDivElement> {
}
declare function CardFooter({ className, ...props }: CardFooterProps): react_jsx_runtime.JSX.Element;
declare namespace CardFooter {
    var displayName: string;
}

declare const inputVariants: (props?: ({
    variant?: "default" | "error" | null | undefined;
    inputSize?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface InputProps extends Omit<React$1.InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof inputVariants> {
    label?: string;
    error?: boolean;
    icon?: React$1.ComponentType<any>;
    /** Extra ReactNode rendered after label text (used by Form.Input for tooltip icon) */
    labelSuffix?: React$1.ReactNode;
    containerClassName?: string;
    labelClassName?: string;
}
declare const Input: React$1.ForwardRefExoticComponent<InputProps & React$1.RefAttributes<HTMLInputElement>>;

declare const badgeVariants: (props?: ({
    variant?: "default" | "outline" | "secondary" | "error" | "success" | "warning" | "info" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface BadgeProps extends React$1.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
}
declare function Badge({ className, variant, size, ...props }: BadgeProps): react_jsx_runtime.JSX.Element;
declare namespace Badge {
    var displayName: string;
}

type SparklineColor = 'chart-1' | 'chart-2' | 'chart-3' | 'chart-4' | 'chart-5';
type BigNumberCardSize = 'default' | 'sm' | 'lg';
interface BigNumberCardRootProps {
    children: React$1.ReactNode;
    className?: string;
    size?: BigNumberCardSize;
}
interface BigNumberCardHeaderProps {
    children: React$1.ReactNode;
    className?: string;
}
interface BigNumberCardTitleProps {
    children: React$1.ReactNode;
    className?: string;
}
interface BigNumberCardLinkProps {
    children: React$1.ReactNode;
    href?: string;
    onClick?: () => void;
    className?: string;
}
interface BigNumberCardContentProps {
    children: React$1.ReactNode;
    className?: string;
}
interface BigNumberCardValueProps {
    children: React$1.ReactNode;
    prefix?: string;
    suffix?: string;
    className?: string;
}
interface BigNumberCardTrendProps {
    value: number;
    direction: 'up' | 'down';
    children?: React$1.ReactNode;
    className?: string;
    show?: boolean;
}
interface BigNumberCardSparklineProps {
    data: number[];
    color?: SparklineColor;
    animate?: boolean;
    className?: string;
    show?: boolean;
}

declare function Sparkline({ data, color, animate, className, show, }: BigNumberCardSparklineProps): react_jsx_runtime.JSX.Element | null;
declare namespace Sparkline {
    var displayName: string;
}

declare function BigNumberCardRoot({ children, className, size }: BigNumberCardRootProps): react_jsx_runtime.JSX.Element;
declare namespace BigNumberCardRoot {
    var displayName: string;
}
declare function BigNumberCardHeader({ children, className }: BigNumberCardHeaderProps): react_jsx_runtime.JSX.Element;
declare namespace BigNumberCardHeader {
    var displayName: string;
}
declare function BigNumberCardTitle({ children, className }: BigNumberCardTitleProps): react_jsx_runtime.JSX.Element;
declare namespace BigNumberCardTitle {
    var displayName: string;
}
declare function BigNumberCardLink({ children, href, onClick, className }: BigNumberCardLinkProps): react_jsx_runtime.JSX.Element;
declare namespace BigNumberCardLink {
    var displayName: string;
}
declare function BigNumberCardContent({ children, className }: BigNumberCardContentProps): react_jsx_runtime.JSX.Element;
declare namespace BigNumberCardContent {
    var displayName: string;
}
declare function BigNumberCardValue({ children, prefix, suffix, className }: BigNumberCardValueProps): react_jsx_runtime.JSX.Element;
declare namespace BigNumberCardValue {
    var displayName: string;
}
declare function BigNumberCardTrend({ value, direction, children, className, show }: BigNumberCardTrendProps): react_jsx_runtime.JSX.Element | null;
declare namespace BigNumberCardTrend {
    var displayName: string;
}
interface BigNumberCardDescriptionProps {
    children: React$1.ReactNode;
    className?: string;
    show?: boolean;
}
declare function BigNumberCardDescription({ children, className, show }: BigNumberCardDescriptionProps): react_jsx_runtime.JSX.Element | null;
declare namespace BigNumberCardDescription {
    var displayName: string;
}
declare function BigNumberCardSparklineWrapper(props: React$1.ComponentProps<typeof Sparkline>): react_jsx_runtime.JSX.Element | null;
declare namespace BigNumberCardSparklineWrapper {
    var displayName: string;
}
declare const BigNumberCard: {
    Root: typeof BigNumberCardRoot;
    Header: typeof BigNumberCardHeader;
    Title: typeof BigNumberCardTitle;
    Link: typeof BigNumberCardLink;
    Content: typeof BigNumberCardContent;
    Value: typeof BigNumberCardValue;
    Trend: typeof BigNumberCardTrend;
    Description: typeof BigNumberCardDescription;
    Sparkline: typeof BigNumberCardSparklineWrapper;
};

interface SkeletonProps extends React$1.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'circular' | 'text';
    animation?: 'pulse' | 'wave' | 'none';
}
declare function Skeleton({ className, variant, animation, ...props }: SkeletonProps): react_jsx_runtime.JSX.Element;
declare namespace Skeleton {
    var displayName: string;
}

declare const selectVariants: (props?: ({
    variant?: "default" | "error" | null | undefined;
    selectSize?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface SelectProps extends Omit<React$1.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>, 'size'>, VariantProps<typeof selectVariants> {
    label?: string;
    error?: boolean;
    icon?: React$1.ComponentType<any>;
    className?: string;
    containerClassName?: string;
    labelClassName?: string;
    placeholder?: string;
    required?: boolean;
    children: React$1.ReactNode;
}
declare const Select: React$1.ForwardRefExoticComponent<SelectProps & React$1.RefAttributes<HTMLButtonElement>>;
interface SelectItemProps extends React$1.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
    children: React$1.ReactNode;
}
declare const SelectItem: React$1.ForwardRefExoticComponent<SelectItemProps & React$1.RefAttributes<HTMLDivElement>>;
declare const SelectGroup: React$1.ForwardRefExoticComponent<SelectPrimitive.SelectGroupProps & React$1.RefAttributes<HTMLDivElement>>;
declare const SelectLabel: React$1.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectLabelProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SelectSeparator: React$1.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectSeparatorProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

declare const Tabs: React$1.ForwardRefExoticComponent<TabsPrimitive.TabsProps & React$1.RefAttributes<HTMLDivElement>>;
declare const TabsList: React$1.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsListProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const TabsTrigger: React$1.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsTriggerProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;
declare const TabsContent: React$1.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

declare const loaderVariants: (props?: ({
    variant?: "default" | "pulse" | "spinner" | "dots" | "bars" | null | undefined;
    scope?: "local" | "global" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface LoaderProps extends VariantProps<typeof loaderVariants> {
    message?: string;
    isTransparentBg?: boolean;
    show?: boolean;
}
declare const Loader: React$1.ForwardRefExoticComponent<LoaderProps & React$1.RefAttributes<HTMLDivElement>>;

interface LoaderContextValue {
    show: (options?: LoaderOptions) => void;
    hide: () => void;
    isLoading: boolean;
}
interface LoaderOptions {
    message?: string;
    variant?: LoaderProps['variant'];
    scope?: LoaderProps['scope'];
    isTransparentBg?: boolean;
}
declare function LoaderProvider({ children }: {
    children: React$1.ReactNode;
}): react_jsx_runtime.JSX.Element;
declare function useLoader(): LoaderContextValue;
declare const loader: {
    show: (options?: LoaderOptions) => void;
    hide: () => void;
};
declare function GlobalLoaderController(): null;

declare const emptyStateVariants: (props?: ({
    layout?: "horizontal" | "vertical" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface EmptyStateProps extends VariantProps<typeof emptyStateVariants> {
    message?: string;
    description?: string;
    icon?: React$1.ComponentType<any>;
    actionLabel?: string;
    onAction?: () => void;
    hideDescription?: boolean;
    size?: 'default' | 'sm';
    className?: string;
    animated?: boolean;
}
declare const EmptyState: React$1.NamedExoticComponent<EmptyStateProps>;

/**
 * Props do componente root DataTable.
 *
 * TData deve ser um objeto para garantir type-safety com o TanStack Table.
 * Usando `extends object` para aceitar interfaces TypeScript normalmente.
 */
interface DataTableProps<TData extends object> {
    /** Data array - deve ser memoizado pelo consumer */
    data: TData[];
    /** Column definitions - deve ser memoizado pelo consumer */
    columns: ColumnDef<TData, unknown>[];
    /** Children usando Compound Component pattern */
    children: React$1.ReactNode;
    /** Função para obter ID único da row */
    getRowId?: (row: TData) => string;
    /**
     * Habilita server-side pagination.
     * Quando true, a tabela não faz paginação local e depende do servidor.
     */
    manualPagination?: boolean;
    /** Número inicial de items por página (default: 10) */
    initialPageSize?: number;
    /**
     * Total de páginas (obrigatório se manualPagination=true).
     * Usado para calcular navegação quando dados vêm do servidor.
     */
    pageCount?: number;
    /**
     * Callback disparado quando page ou pageSize mudam (server-side pagination).
     * Inclui mudanças do autoPageSize e do seletor manual.
     */
    onPaginationChange?: (pagination: {
        pageIndex: number;
        pageSize: number;
    }) => void;
    /** Custom className */
    className?: string;
}
interface DataTableState {
    sorting: SortingState;
    columnFilters: ColumnFiltersState;
    columnVisibility: VisibilityState;
    rowSelection: RowSelectionState;
    pagination: PaginationState;
    globalFilter: string;
    density: DataTableDensity;
}
type DataTableDensity = 'compact' | 'default' | 'comfortable';
interface DataTableMeta {
    isLoading: boolean;
    isEmpty: boolean;
    selectedRowCount: number;
    totalRows: number;
    density: DataTableDensity;
}
interface DataTableLoadingProps {
    /** Controla visibilidade do loading */
    visible: boolean;
    /** Custom skeleton component */
    skeleton?: React$1.ReactNode;
    /** Número de rows no skeleton */
    skeletonRows?: number;
    /** Custom className */
    className?: string;
}
interface DataTableToolbarProps {
    /** Children components */
    children?: React$1.ReactNode;
    /** Custom className */
    className?: string;
}
interface DataTableSearchProps {
    /** Placeholder text */
    placeholder?: string;
    /** Coluna específica para buscar (se não passar, busca global) */
    column?: string;
    /** Debounce delay em ms */
    debounce?: number;
    /** Callback para server-side search (recebe valor com debounce aplicado) */
    onSearch?: (value: string) => void;
    /** Custom className */
    className?: string;
}
interface DataTableFiltersProps {
    /** Children: Individual filters */
    children?: React$1.ReactNode;
    /** Callback when any column filter changes (server-side filtering) */
    onChange?: (filters: _tanstack_react_table.ColumnFiltersState) => void;
    /** Custom className */
    className?: string;
}
interface DataTableFilterOption {
    label: string;
    value: string;
    icon?: React$1.ReactNode;
}
interface DataTableFilterProps {
    /** Coluna para filtrar (opcional para server-side only) */
    column?: string;
    /** Label do filtro */
    title: string;
    /** Opções de filtro */
    options: DataTableFilterOption[];
    /** Permitir seleção múltipla */
    multiSelect?: boolean;
    /** Callback para server-side filtering (recebe valor selecionado ou undefined para "todos") */
    onValueChange?: (value: string | undefined) => void;
    /** Custom className */
    className?: string;
}
interface DataTableContentProps {
    /** Header fixo no scroll */
    stickyHeader?: boolean;
    /** Linhas alternadas (zebra) */
    stripedRows?: boolean;
    /** Highlight no hover */
    highlightOnHover?: boolean;
    /** Callback quando uma row é clicada */
    onRowClick?: (row: unknown) => void;
    /**
     * Habilita scroll vertical com altura calculada automaticamente.
     * O header das colunas fica sticky e apenas as rows fazem scroll.
     */
    scrollable?: boolean;
    /** Margem inferior em px para o cálculo de altura automática (default: 68) */
    scrollBottomOffset?: number;
    /**
     * Calcula automaticamente o número de rows por página baseado na altura disponível.
     * Mede do início do tbody até o final do viewport, descontando pagination e margem.
     */
    autoPageSize?: boolean;
    /** Custom className */
    className?: string;
}
type DataTablePaginationMode = 'client' | 'server';
interface DataTablePaginationProps {
    /** Modo de paginação */
    mode?: DataTablePaginationMode;
    /** Total de páginas (obrigatório se mode="server") */
    pageCount?: number;
    /** Opções de items por página */
    pageSizes?: number[];
    /** Mostrar seletor de page size */
    showPageSize?: boolean;
    /** Mostrar informação de página atual */
    showPageInfo?: boolean;
    /** Mostrar botões primeira/última página */
    showFirstLast?: boolean;
    /** Custom className */
    className?: string;
}
interface DataTableEmptyStateProps {
    /** Título */
    title?: string;
    /** Descrição */
    description?: string;
    /** Ícone customizado */
    icon?: React$1.ReactNode;
    /** Ação (botão, link, etc) */
    action?: React$1.ReactNode;
    /** Custom className */
    className?: string;
}
interface DataTableBulkActionsProps<TData = unknown> {
    /** Render prop que recebe as rows selecionadas */
    children: (selectedRows: TData[]) => React$1.ReactNode;
    /** Custom className */
    className?: string;
}
interface DataTableColumnVisibilityProps {
    /** Custom className */
    className?: string;
}
interface DataTableDensityToggleProps {
    /** Custom className */
    className?: string;
}
interface DataTableTab {
    /** Identificador único da tab */
    value: string;
    /** Label exibido na tab */
    label: string;
    /** Contador opcional (ex: "Todas 85") */
    count?: number;
}
interface DataTableTabsProps {
    /** Lista de tabs disponíveis */
    tabs: DataTableTab[];
    /** Tab ativa (controlled) */
    value?: string;
    /** Tab ativa inicial (uncontrolled) */
    defaultValue?: string;
    /** Callback quando tab muda */
    onValueChange?: (value: string) => void;
    /** Custom className */
    className?: string;
}
type DataTableExportFormat = 'csv' | 'xlsx' | 'pdf';
interface DataTableExportProps {
    /** Formatos disponíveis para export */
    formats?: DataTableExportFormat[];
    /** Nome do arquivo (sem extensão) */
    filename?: string;
    /** Custom className */
    className?: string;
}
interface DataTableColumnHeaderProps<TData = unknown, TValue = unknown> {
    /** Column instance do TanStack Table */
    column: Column<TData, TValue>;
    /** Título do header */
    title: string;
    /** Custom className */
    className?: string;
}
interface DataTableRowActionsProps {
    /** Children (DropdownMenuItems) */
    children: React$1.ReactNode;
    /** Custom className */
    className?: string;
}
interface DataTableContextValue<TData = unknown> {
    table: Table$1<TData>;
    state: DataTableMeta;
    density: DataTableDensity;
    setDensity: (density: DataTableDensity) => void;
}
interface UseDataTableConfig<TData extends object> {
    data: TData[];
    columns: ColumnDef<TData, unknown>[];
    getRowId?: (row: TData) => string;
    initialPageSize?: number;
    initialPageIndex?: number;
}
interface PaginationMeta {
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
interface PaginatedResponse<T> {
    data: T[];
    meta: PaginationMeta;
}
interface PaginationParams {
    page?: number;
    perPage?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
declare const DENSITY_CONFIG: {
    readonly compact: {
        readonly rowHeight: 32;
        readonly fontSize: "text-xs";
        readonly padding: "py-1 px-2";
    };
    readonly default: {
        readonly rowHeight: 40;
        readonly fontSize: "text-sm";
        readonly padding: "py-2 px-4";
    };
    readonly comfortable: {
        readonly rowHeight: 52;
        readonly fontSize: "text-sm";
        readonly padding: "py-3 px-4";
    };
};

declare function DataTableRoot<TData extends object>({ children, data, columns, getRowId, manualPagination, pageCount, initialPageSize, onPaginationChange, className, }: DataTableProps<TData>): react_jsx_runtime.JSX.Element;
declare namespace DataTableRoot {
    var displayName: string;
}

declare function DataTableLoading({ visible, skeletonRows, }: DataTableLoadingProps): null;
declare namespace DataTableLoading {
    var displayName: string;
}

declare function DataTableColumnHeader({ column, title, className, }: DataTableColumnHeaderProps): react_jsx_runtime.JSX.Element;

declare function DataTableColumnVisibility({ className, }: DataTableColumnVisibilityProps): react_jsx_runtime.JSX.Element;
declare namespace DataTableColumnVisibility {
    var displayName: string;
}

declare function DataTableDensityToggle({ className, }: DataTableDensityToggleProps): react_jsx_runtime.JSX.Element;
declare namespace DataTableDensityToggle {
    var displayName: string;
}

declare function DataTableBulkActions<TData extends Record<string, unknown>>({ children, className, }: DataTableBulkActionsProps<TData>): react_jsx_runtime.JSX.Element | null;
declare namespace DataTableBulkActions {
    var displayName: string;
}

declare function DataTableExport({ formats, filename, className, }: DataTableExportProps): react_jsx_runtime.JSX.Element;
declare namespace DataTableExport {
    var displayName: string;
}

declare function DataTableTabs({ tabs, value, defaultValue, onValueChange, className, }: DataTableTabsProps): react_jsx_runtime.JSX.Element;
declare namespace DataTableTabs {
    var displayName: string;
}

declare const Table: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableElement> & React$1.RefAttributes<HTMLTableElement>>;
declare const TableHeader: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableSectionElement> & React$1.RefAttributes<HTMLTableSectionElement>>;
declare const TableBody: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableSectionElement> & React$1.RefAttributes<HTMLTableSectionElement>>;
declare const TableFooter: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableSectionElement> & React$1.RefAttributes<HTMLTableSectionElement>>;
declare const TableRow: React$1.NamedExoticComponent<React$1.HTMLAttributes<HTMLTableRowElement> & React$1.RefAttributes<HTMLTableRowElement>>;
declare const TableHead: React$1.ForwardRefExoticComponent<React$1.ThHTMLAttributes<HTMLTableCellElement> & React$1.RefAttributes<HTMLTableCellElement>>;
declare const TableCell: React$1.NamedExoticComponent<React$1.TdHTMLAttributes<HTMLTableCellElement> & React$1.RefAttributes<HTMLTableCellElement>>;
declare const TableCaption: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableCaptionElement> & React$1.RefAttributes<HTMLTableCaptionElement>>;

/**
 * Context 3: Density
 * - Muda apenas quando usuário altera densidade
 * - Separado para não re-renderizar toda tabela
 */
interface DensityContextValue {
    density: DataTableDensity;
    setDensity: (density: DataTableDensity) => void;
}
/**
 * Hook para acessar a instância da tabela
 * Não causa re-renders pois a instância é estável
 */
declare function useDataTable<TData = unknown>(): Table$1<TData>;
/**
 * Hook para acessar o estado meta da tabela
 * Re-renderiza quando loading, empty, ou selection muda
 */
declare function useDataTableMeta(): DataTableMeta;
/**
 * Hook para acessar apenas o loading state
 * Otimizado para componentes que só precisam saber se está carregando
 */
declare function useDataTableLoading(): boolean;
/**
 * Hook para acessar apenas o empty state
 * Otimizado para componentes que só precisam saber se está vazio
 */
declare function useDataTableEmpty(): boolean;
/**
 * Hook para acessar rows selecionadas
 * Re-renderiza quando seleção muda
 */
declare function useDataTableSelection<TData = unknown>(): TData[];
/**
 * Hook para acessar densidade
 * Separado para não re-renderizar componentes que não usam
 */
declare function useDataTableDensity(): DensityContextValue;
/**
 * Hook para paginação
 * Retorna informações de paginação memoizadas
 * Re-renderiza quando pageIndex ou pageSize muda (via contexto)
 */
declare function useDataTablePagination(): {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    canPreviousPage: boolean;
    canNextPage: boolean;
    setPageIndex: (index: number) => void;
    setPageSize: (size: number) => void;
    previousPage: () => void;
    nextPage: () => void;
    firstPage: () => void;
    lastPage: () => void;
};
/**
 * Hook para sorting
 * Retorna informações de sorting memoizadas
 */
declare function useDataTableSorting(): {
    sorting: _tanstack_react_table.SortingState;
    setSorting: (updater: _tanstack_react_table.Updater<_tanstack_react_table.SortingState>) => void;
    clearSorting: () => void;
    toggleSort: (columnId: string) => void;
};
/**
 * Hook para column visibility
 * Retorna informações de visibilidade memoizadas
 */
declare function useDataTableColumnVisibility(): {
    columnVisibility: _tanstack_react_table.VisibilityState;
    setColumnVisibility: (updater: _tanstack_react_table.Updater<_tanstack_react_table.VisibilityState>) => void;
    toggleColumn: (columnId: string) => void;
    getAllColumns: () => _tanstack_react_table.Column<unknown, unknown>[];
};
declare const useDataTableInstance: typeof useDataTable;
declare const useDataTableState: typeof useDataTableMeta;

declare function useDebounce<T>(value: T, delay?: number): T;
declare function useDebouncedCallback<T extends (...args: any[]) => any>(callback: T, delay?: number): T;

declare const DataTable: typeof DataTableRoot & {
    Loading: typeof DataTableLoading;
    EmptyState: React$1.NamedExoticComponent<DataTableEmptyStateProps>;
    Tabs: typeof DataTableTabs;
    Toolbar: React$1.NamedExoticComponent<DataTableToolbarProps>;
    Content: React$1.NamedExoticComponent<DataTableContentProps>;
    Search: React$1.NamedExoticComponent<DataTableSearchProps>;
    Filters: React$1.NamedExoticComponent<DataTableFiltersProps>;
    Filter: React$1.NamedExoticComponent<DataTableFilterProps>;
    Pagination: React$1.NamedExoticComponent<DataTablePaginationProps>;
    BulkActions: typeof DataTableBulkActions;
    ColumnVisibility: typeof DataTableColumnVisibility;
    DensityToggle: typeof DataTableDensityToggle;
    Export: typeof DataTableExport;
    ColumnHeader: typeof DataTableColumnHeader;
};

declare const Dialog: React$1.FC<DialogPrimitive.DialogProps>;
declare const DialogTrigger: React$1.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const DialogPortal: React$1.FC<DialogPrimitive.DialogPortalProps>;
declare const DialogClose: React$1.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const DialogOverlay: React$1.NamedExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const dialogContentVariants: (props?: ({
    size?: "sm" | "lg" | "md" | "xl" | "2xl" | "3xl" | "4xl" | "full" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface DialogContentProps extends React$1.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>, VariantProps<typeof dialogContentVariants> {
    showCloseButton?: boolean;
    /** Disable the mesh gradient + grid pattern effect (default: false) */
    disableMeshEffect?: boolean;
}
declare const DialogContent: React$1.NamedExoticComponent<DialogContentProps & React$1.RefAttributes<HTMLDivElement>>;
declare const DialogHeader: React$1.NamedExoticComponent<React$1.HTMLAttributes<HTMLDivElement>>;
declare const DialogFooter: React$1.NamedExoticComponent<React$1.HTMLAttributes<HTMLDivElement>>;
declare const DialogTitle: React$1.NamedExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React$1.RefAttributes<HTMLHeadingElement>, "ref"> & React$1.RefAttributes<HTMLHeadingElement>>;
declare const DialogDescription: React$1.NamedExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React$1.RefAttributes<HTMLParagraphElement>, "ref"> & React$1.RefAttributes<HTMLParagraphElement>>;
declare const DialogBody: React$1.NamedExoticComponent<React$1.HTMLAttributes<HTMLDivElement>>;

interface RippleEffectProps {
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    color?: 'primary' | 'secondary' | 'accent' | 'muted';
    intensity?: 'light' | 'medium' | 'strong';
    rings?: number;
    position?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
    className?: string;
}
declare const RippleEffect: React$1.NamedExoticComponent<RippleEffectProps>;
interface RippleWrapperProps {
    children: React$1.ReactNode;
    rippleProps?: RippleEffectProps;
    className?: string;
}
declare const RippleWrapper: React$1.NamedExoticComponent<RippleWrapperProps>;
interface RippleBackgroundProps extends RippleEffectProps {
    containerClassName?: string;
}
declare const RippleBackground: React$1.NamedExoticComponent<RippleBackgroundProps>;

declare const iconWrapperVariants: (props?: ({
    variant?: "default" | "destructive" | "secondary" | "success" | "muted" | "accent" | null | undefined;
    size?: "sm" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface DialogWrapperProps extends React$1.HTMLAttributes<HTMLDivElement>, VariantProps<typeof iconWrapperVariants> {
    children?: React$1.ReactNode;
    icon?: React$1.ElementType<{
        className?: string;
    }>;
    status?: 'active' | 'inactive' | 'warning' | 'error' | null;
    showRipple?: boolean;
    rippleProps?: Partial<RippleEffectProps>;
    iconSize?: 'sm' | 'md' | 'lg';
}
declare const DialogWrapper: React$1.NamedExoticComponent<DialogWrapperProps>;

type ToasterProps = React$1.ComponentProps<typeof Toaster$1>;
declare const toastVariants: {
    default: {
        bg: string;
        border: string;
        barColor: string;
        icon: react_jsx_runtime.JSX.Element;
        textColor: string;
    };
    success: {
        bg: string;
        border: string;
        barColor: string;
        icon: react_jsx_runtime.JSX.Element;
        textColor: string;
    };
    error: {
        bg: string;
        border: string;
        barColor: string;
        icon: react_jsx_runtime.JSX.Element;
        textColor: string;
    };
    warning: {
        bg: string;
        border: string;
        barColor: string;
        icon: react_jsx_runtime.JSX.Element;
        textColor: string;
    };
    info: {
        bg: string;
        border: string;
        barColor: string;
        icon: react_jsx_runtime.JSX.Element;
        textColor: string;
    };
};
declare const Toaster: ({ ...props }: ToasterProps) => react_jsx_runtime.JSX.Element;
interface ToastProps {
    title: string;
    description?: string;
    variant?: keyof typeof toastVariants;
    action?: {
        label: string;
        onClick: () => void;
    };
    onClose?: () => void;
}
declare const toast: ((message: string) => string | number) & {
    success: (message: string | ToastProps) => string | number;
    error: (message: string | ToastProps) => string | number;
    warning: (message: string | ToastProps) => string | number;
    info: (message: string | ToastProps) => string | number;
    custom: (component: Parameters<typeof toast$1.custom>[0], options?: Parameters<typeof toast$1.custom>[1]) => string | number;
    dismiss: (id?: string | number) => string | number;
    promise: <T>(promise: Promise<T> | (() => Promise<T>), options: {
        loading: string;
        success: string | ((data: T) => string);
        error: string | ((error: any) => string);
    }) => (string & {
        unwrap: () => Promise<T>;
    }) | (number & {
        unwrap: () => Promise<T>;
    }) | {
        unwrap: () => Promise<T>;
    };
};

interface NumberStepperProps {
    value?: number;
    onChange?: (value: number) => void;
    onBlur?: () => void;
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: number;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    error?: boolean;
    labelSuffix?: React$1.ReactNode;
    className?: string;
    name?: string;
}
declare const NumberStepper: React$1.ForwardRefExoticComponent<NumberStepperProps & React$1.RefAttributes<HTMLInputElement>>;

declare const checkboxVariants: (props?: ({
    variant?: "default" | "outline" | "secondary" | "muted" | null | undefined;
    size?: "sm" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface CheckboxProps extends React$1.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, VariantProps<typeof checkboxVariants> {
}
declare const Checkbox: React$1.NamedExoticComponent<CheckboxProps & React$1.RefAttributes<HTMLButtonElement>>;

declare const switchVariants: (props?: ({
    variant?: "default" | "secondary" | "success" | null | undefined;
    size?: "sm" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface SwitchProps extends React$1.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>, VariantProps<typeof switchVariants> {
}
declare const Switch: React$1.NamedExoticComponent<SwitchProps & React$1.RefAttributes<HTMLButtonElement>>;

declare const textareaVariants: (props?: ({
    variant?: "default" | "error" | null | undefined;
    textareaSize?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface TextareaProps extends Omit<React$1.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>, VariantProps<typeof textareaVariants> {
    label?: string;
    error?: boolean;
    icon?: React$1.ComponentType<any>;
    containerClassName?: string;
    labelClassName?: string;
    autoResize?: boolean;
}
declare const Textarea: React$1.NamedExoticComponent<TextareaProps & React$1.RefAttributes<HTMLTextAreaElement>>;

interface FormContextValue<T extends FieldValues = FieldValues> {
    form: UseFormReturn<T, any, any>;
}
interface FormFieldContextValue {
    name: string;
    id: string;
    error?: string;
    isRequired?: boolean;
}
interface FieldTooltipConfig {
    title: string;
    description: string;
}
type FieldTooltip = string | FieldTooltipConfig;
interface BaseFieldProps<T extends FieldValues = FieldValues> {
    name: FieldPath<T>;
    label?: string;
    description?: string;
    /** Tooltip shown via info icon next to the label. String or { title, description } */
    tooltip?: FieldTooltip;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}
type MaskType = 'phone' | 'cpf' | 'cnpj' | 'cep' | 'money' | 'percent' | 'plate' | 'date' | 'time' | 'datetime';
interface FormInputProps<T extends FieldValues = FieldValues> extends BaseFieldProps<T>, Omit<React$1.InputHTMLAttributes<HTMLInputElement>, 'name' | 'size'> {
    mask?: MaskType;
    icon?: React$1.ComponentType<{
        className?: string;
    }>;
    showPasswordToggle?: boolean;
    inputSize?: 'sm' | 'default' | 'lg';
    hideError?: boolean;
}
interface SelectOption {
    value: string;
    label: string;
    description?: string;
    icon?: React$1.ComponentType<{
        className?: string;
    }>;
    disabled?: boolean;
}
interface FormSelectProps<T extends FieldValues = FieldValues> extends BaseFieldProps<T> {
    options: SelectOption[];
    placeholder?: string;
    loading?: boolean;
    emptyText?: string;
    hideError?: boolean;
    /** Enable search input in dropdown */
    searchable?: boolean;
    /** Server-side search callback. If not provided, filters locally */
    onSearch?: (query: string) => void;
    /** Infinite scroll: callback to load more items */
    onLoadMore?: () => void;
    /** Infinite scroll: whether there are more items to load */
    hasMore?: boolean;
    /** Placeholder for the search input */
    searchPlaceholder?: string;
    /** Dropdown position: 'bottom' (default), 'top', or 'auto' */
    dropdownPosition?: 'bottom' | 'top' | 'auto';
}
interface FormMultiSelectProps<T extends FieldValues = FieldValues> extends BaseFieldProps<T> {
    options: SelectOption[];
    placeholder?: string;
    loading?: boolean;
    emptyText?: string;
    hideError?: boolean;
    /** Enable search input in dropdown */
    searchable?: boolean;
    /** Placeholder for the search input */
    searchPlaceholder?: string;
    /** Allow clearing all selected values */
    clearable?: boolean;
    /** Max visible chips before showing "+N" badge (default: 3) */
    maxVisibleChips?: number;
    /** Dropdown position: 'bottom' (default), 'top', or 'auto' */
    dropdownPosition?: 'bottom' | 'top' | 'auto';
}
interface FormTextareaProps<T extends FieldValues = FieldValues> extends BaseFieldProps<T>, Omit<React$1.TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'> {
    hideError?: boolean;
    showCount?: boolean;
    maxLength?: number;
}
interface FormCheckboxProps<T extends FieldValues = FieldValues> extends BaseFieldProps<T> {
    hideError?: boolean;
}
interface FormSwitchProps<T extends FieldValues = FieldValues> extends BaseFieldProps<T> {
    hideError?: boolean;
}
type RadioOptionColor = 'default' | 'destructive' | 'warning' | 'success' | 'info';
interface RadioOption {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
    color?: RadioOptionColor;
}
interface FormRadioGroupProps<T extends FieldValues = FieldValues> extends BaseFieldProps<T> {
    options: RadioOption[];
    orientation?: 'horizontal' | 'vertical';
    hideError?: boolean;
}

interface FormLabelProps extends React$1.LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean;
}
declare const FormLabel: React$1.ForwardRefExoticComponent<FormLabelProps & React$1.RefAttributes<HTMLLabelElement>>;
interface FormDescriptionProps extends React$1.HTMLAttributes<HTMLParagraphElement> {
}
declare const FormDescription: React$1.ForwardRefExoticComponent<FormDescriptionProps & React$1.RefAttributes<HTMLParagraphElement>>;
interface FormErrorProps extends React$1.HTMLAttributes<HTMLParagraphElement> {
    message?: string;
}
declare const FormError: React$1.ForwardRefExoticComponent<FormErrorProps & React$1.RefAttributes<HTMLParagraphElement>>;
interface FormFieldWrapperProps extends React$1.HTMLAttributes<HTMLDivElement> {
    label?: string;
    description?: string;
    required?: boolean;
    error?: string;
}
declare const FormFieldWrapper: React$1.ForwardRefExoticComponent<FormFieldWrapperProps & React$1.RefAttributes<HTMLDivElement>>;

declare function FormInput<T extends FieldValues = FieldValues>({ name, label, description, tooltip, required, disabled, className, mask, icon, showPasswordToggle, inputSize, hideError, type, maxLength, ...inputProps }: FormInputProps<T>): react_jsx_runtime.JSX.Element;
declare namespace FormInput {
    var displayName: string;
}

declare function FormSelect<T extends FieldValues = FieldValues>({ name, label, description, tooltip, required, disabled, className, options, placeholder, hideError, emptyText, loading, searchable, onSearch, onLoadMore, hasMore, searchPlaceholder, dropdownPosition, }: FormSelectProps<T>): react_jsx_runtime.JSX.Element;
declare namespace FormSelect {
    var displayName: string;
}

declare function FormMultiSelect<T extends FieldValues = FieldValues>({ name, label, description, tooltip, required, disabled, className, options, placeholder, hideError, emptyText, loading, searchable, searchPlaceholder, clearable, maxVisibleChips, dropdownPosition, }: FormMultiSelectProps<T>): react_jsx_runtime.JSX.Element;
declare namespace FormMultiSelect {
    var displayName: string;
}

declare function FormTextarea<T extends FieldValues = FieldValues>({ name, label, description, required, disabled, className, hideError, showCount, maxLength, ...textareaProps }: FormTextareaProps<T>): react_jsx_runtime.JSX.Element;
declare namespace FormTextarea {
    var displayName: string;
}

declare function FormCheckbox<T extends FieldValues = FieldValues>({ name, label, description, required, disabled, className, hideError, }: FormCheckboxProps<T>): react_jsx_runtime.JSX.Element;
declare namespace FormCheckbox {
    var displayName: string;
}

declare function FormSwitch<T extends FieldValues = FieldValues>({ name, label, description, required, disabled, className, hideError, }: FormSwitchProps<T>): react_jsx_runtime.JSX.Element;
declare namespace FormSwitch {
    var displayName: string;
}

declare function FormRadioGroup<T extends FieldValues = FieldValues>({ name, label, description, required, disabled, className, options, orientation, hideError, }: FormRadioGroupProps<T>): react_jsx_runtime.JSX.Element;
declare namespace FormRadioGroup {
    var displayName: string;
}

interface FormNumberStepperProps<T extends FieldValues = FieldValues> extends BaseFieldProps<T> {
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: number;
    hideError?: boolean;
    tooltip?: FieldTooltip;
}
declare function FormNumberStepper<T extends FieldValues = FieldValues>({ name, label, description, tooltip, required, disabled, className, min, max, step, defaultValue, hideError, }: FormNumberStepperProps<T>): react_jsx_runtime.JSX.Element;
declare namespace FormNumberStepper {
    var displayName: string;
}

declare function useFormFieldContext(): FormFieldContextValue;
interface FormFieldProviderProps {
    name: string;
    children: React$1.ReactNode;
}
declare function FormFieldProvider({ name, children }: FormFieldProviderProps): react_jsx_runtime.JSX.Element;

interface FormRootProps<T extends FieldValues = FieldValues> extends Omit<React$1.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onError'> {
    form: UseFormReturn<T, any, any>;
    onSubmit: SubmitHandler<T>;
    onError?: SubmitErrorHandler<T>;
}
declare function FormRoot<T extends FieldValues = FieldValues>({ form, onSubmit, onError, children, className, ...props }: FormRootProps<T>): react_jsx_runtime.JSX.Element;
declare namespace FormRoot {
    var displayName: string;
}

declare const Form: typeof FormRoot & {
    Input: typeof FormInput;
    Select: typeof FormSelect;
    MultiSelect: typeof FormMultiSelect;
    Textarea: typeof FormTextarea;
    Checkbox: typeof FormCheckbox;
    Switch: typeof FormSwitch;
    RadioGroup: typeof FormRadioGroup;
    NumberStepper: typeof FormNumberStepper;
    Label: React$1.ForwardRefExoticComponent<FormLabelProps & React$1.RefAttributes<HTMLLabelElement>>;
    Description: React$1.ForwardRefExoticComponent<FormDescriptionProps & React$1.RefAttributes<HTMLParagraphElement>>;
    Error: React$1.ForwardRefExoticComponent<FormErrorProps & React$1.RefAttributes<HTMLParagraphElement>>;
    FieldWrapper: React$1.ForwardRefExoticComponent<FormFieldWrapperProps & React$1.RefAttributes<HTMLDivElement>>;
    Field: typeof FormFieldProvider;
};

interface AvatarProps extends React$1.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
    className?: string;
}
interface AvatarImageProps extends React$1.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {
    className?: string;
}
interface AvatarFallbackProps extends React$1.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {
    className?: string;
}
declare const Avatar: React$1.ForwardRefExoticComponent<AvatarProps & React$1.RefAttributes<HTMLSpanElement>>;
declare const AvatarImage: React$1.ForwardRefExoticComponent<AvatarImageProps & React$1.RefAttributes<HTMLImageElement>>;
declare const AvatarFallback: React$1.ForwardRefExoticComponent<AvatarFallbackProps & React$1.RefAttributes<HTMLSpanElement>>;

declare const DropdownMenu: React$1.FC<DropdownMenuPrimitive.DropdownMenuProps>;
declare const DropdownMenuTrigger: React$1.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const DropdownMenuGroup: React$1.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuGroupProps & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuPortal: React$1.FC<DropdownMenuPrimitive.DropdownMenuPortalProps>;
declare const DropdownMenuSub: React$1.FC<DropdownMenuPrimitive.DropdownMenuSubProps>;
declare const DropdownMenuRadioGroup: React$1.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuRadioGroupProps & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSubTrigger: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSubTriggerProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSubContent: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSubContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuContent: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuItem: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuCheckboxItem: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuCheckboxItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuRadioItem: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuRadioItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuLabel: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuLabelProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSeparator: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSeparatorProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuShortcut: {
    ({ className, ...props }: React$1.HTMLAttributes<HTMLSpanElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};

declare const Popover: React$1.FC<PopoverPrimitive.PopoverProps>;
declare const PopoverTrigger: React$1.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const PopoverContent: React$1.ForwardRefExoticComponent<Omit<PopoverPrimitive.PopoverContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

declare const TooltipProvider: React$1.FC<TooltipPrimitive.TooltipProviderProps>;
declare const TooltipRoot: React$1.FC<TooltipPrimitive.TooltipProps>;
declare const TooltipTrigger: React$1.ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const TooltipPortal: React$1.FC<TooltipPrimitive.TooltipPortalProps>;
declare const TooltipArrow: React$1.ForwardRefExoticComponent<Omit<TooltipPrimitive.TooltipArrowProps & React$1.RefAttributes<SVGSVGElement>, "ref"> & {
    variant?: "light" | "dark";
} & React$1.RefAttributes<SVGSVGElement>>;
declare const tooltipContentVariants: (props?: ({
    variant?: "light" | "dark" | null | undefined;
    size?: "sm" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface TooltipContentProps extends React$1.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>, VariantProps<typeof tooltipContentVariants> {
    showArrow?: boolean;
    onDismiss?: () => void;
}
declare const TooltipContent: React$1.ForwardRefExoticComponent<TooltipContentProps & React$1.RefAttributes<HTMLDivElement>>;
interface TooltipHeaderProps extends React$1.HTMLAttributes<HTMLDivElement> {
}
declare const TooltipHeader: React$1.ForwardRefExoticComponent<TooltipHeaderProps & React$1.RefAttributes<HTMLDivElement>>;
interface TooltipTitleProps extends React$1.HTMLAttributes<HTMLHeadingElement> {
}
declare const TooltipTitle: React$1.ForwardRefExoticComponent<TooltipTitleProps & React$1.RefAttributes<HTMLHeadingElement>>;
interface TooltipDescriptionProps extends React$1.HTMLAttributes<HTMLParagraphElement> {
}
declare const TooltipDescription: React$1.ForwardRefExoticComponent<TooltipDescriptionProps & React$1.RefAttributes<HTMLParagraphElement>>;
interface TooltipActionsProps extends React$1.HTMLAttributes<HTMLDivElement> {
}
declare const TooltipActions: React$1.ForwardRefExoticComponent<TooltipActionsProps & React$1.RefAttributes<HTMLDivElement>>;
declare const tooltipActionVariants: (props?: ({
    variant?: "outline" | "secondary" | "primary" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface TooltipActionProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof tooltipActionVariants> {
}
declare const TooltipAction: React$1.ForwardRefExoticComponent<TooltipActionProps & React$1.RefAttributes<HTMLButtonElement>>;
interface TooltipIconProps extends React$1.HTMLAttributes<HTMLDivElement> {
}
declare const TooltipIcon: React$1.ForwardRefExoticComponent<TooltipIconProps & React$1.RefAttributes<HTMLDivElement>>;
interface SimpleTooltipProps {
    children: React$1.ReactNode;
    content: React$1.ReactNode;
    variant?: 'light' | 'dark';
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
    delayDuration?: number;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
}
declare const SimpleTooltip: {
    ({ children, content, variant, side, align, delayDuration, open, defaultOpen, onOpenChange, }: SimpleTooltipProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const Tooltip: React$1.FC<TooltipPrimitive.TooltipProps> & {
    Provider: React$1.FC<TooltipPrimitive.TooltipProviderProps>;
    Trigger: React$1.ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
    Portal: React$1.FC<TooltipPrimitive.TooltipPortalProps>;
    Content: React$1.ForwardRefExoticComponent<TooltipContentProps & React$1.RefAttributes<HTMLDivElement>>;
    Arrow: React$1.ForwardRefExoticComponent<Omit<TooltipPrimitive.TooltipArrowProps & React$1.RefAttributes<SVGSVGElement>, "ref"> & {
        variant?: "light" | "dark";
    } & React$1.RefAttributes<SVGSVGElement>>;
    Header: React$1.ForwardRefExoticComponent<TooltipHeaderProps & React$1.RefAttributes<HTMLDivElement>>;
    Title: React$1.ForwardRefExoticComponent<TooltipTitleProps & React$1.RefAttributes<HTMLHeadingElement>>;
    Description: React$1.ForwardRefExoticComponent<TooltipDescriptionProps & React$1.RefAttributes<HTMLParagraphElement>>;
    Actions: React$1.ForwardRefExoticComponent<TooltipActionsProps & React$1.RefAttributes<HTMLDivElement>>;
    Action: React$1.ForwardRefExoticComponent<TooltipActionProps & React$1.RefAttributes<HTMLButtonElement>>;
    Icon: React$1.ForwardRefExoticComponent<TooltipIconProps & React$1.RefAttributes<HTMLDivElement>>;
    Simple: {
        ({ children, content, variant, side, align, delayDuration, open, defaultOpen, onOpenChange, }: SimpleTooltipProps): react_jsx_runtime.JSX.Element;
        displayName: string;
    };
};

interface AuthLayoutProps {
    children: React$1.ReactNode;
    className?: string;
}
interface AuthLayoutImageProps {
    /** Image source URL (optional if using showPattern) */
    src?: string;
    /** Image alt text */
    alt?: string;
    /** Position of the image panel */
    position?: 'left' | 'right';
    /** Additional CSS classes */
    className?: string;
    /** Whether to load image with priority */
    priority?: boolean;
    /** Show geometric pattern overlay (useful as placeholder) */
    showPattern?: boolean;
}
interface AuthLayoutContentProps {
    children: React$1.ReactNode;
    className?: string;
    maxWidth?: 'sm' | 'md' | 'lg';
}
interface AuthLayoutHeaderProps {
    children?: React$1.ReactNode;
    className?: string;
    logo?: React$1.ReactNode;
    title?: string;
    description?: string;
    centered?: boolean;
    /** Position of the header: 'default' (inline) or 'top-left' (absolute corner) */
    position?: 'default' | 'top-left' | 'top-right';
}
interface AuthLayoutBodyProps {
    children: React$1.ReactNode;
    className?: string;
}
interface AuthLayoutFooterProps {
    children: React$1.ReactNode;
    className?: string;
}
interface AuthLayoutLinkProps extends React$1.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: React$1.ReactNode;
}
interface AuthLayoutDividerProps {
    text?: string;
    className?: string;
}

declare function AuthLayoutRoot({ children, className }: AuthLayoutProps): react_jsx_runtime.JSX.Element;
declare namespace AuthLayoutRoot {
    var displayName: string;
}
declare function AuthLayoutImage({ src, alt, position: _position, className, priority, showPattern, }: AuthLayoutImageProps): react_jsx_runtime.JSX.Element;
declare namespace AuthLayoutImage {
    var displayName: string;
}
declare function AuthLayoutContent({ children, className, maxWidth, }: AuthLayoutContentProps): react_jsx_runtime.JSX.Element;
declare namespace AuthLayoutContent {
    var displayName: string;
}
declare function AuthLayoutHeader({ children, className, logo, title, description, centered, position, }: AuthLayoutHeaderProps): react_jsx_runtime.JSX.Element;
declare namespace AuthLayoutHeader {
    var displayName: string;
}
declare function AuthLayoutBody({ children, className }: AuthLayoutBodyProps): react_jsx_runtime.JSX.Element;
declare namespace AuthLayoutBody {
    var displayName: string;
}
declare function AuthLayoutFooter({ children, className }: AuthLayoutFooterProps): react_jsx_runtime.JSX.Element;
declare namespace AuthLayoutFooter {
    var displayName: string;
}
declare function AuthLayoutLink({ children, className, ...props }: AuthLayoutLinkProps): react_jsx_runtime.JSX.Element;
declare namespace AuthLayoutLink {
    var displayName: string;
}
declare function AuthLayoutDivider({ text, className }: AuthLayoutDividerProps): react_jsx_runtime.JSX.Element;
declare namespace AuthLayoutDivider {
    var displayName: string;
}
declare const AuthLayout: typeof AuthLayoutRoot & {
    Image: typeof AuthLayoutImage;
    Content: typeof AuthLayoutContent;
    Header: typeof AuthLayoutHeader;
    Body: typeof AuthLayoutBody;
    Footer: typeof AuthLayoutFooter;
    Link: typeof AuthLayoutLink;
    Divider: typeof AuthLayoutDivider;
};

type IconComponent$2 = React$1.ComponentType<{
    className?: string;
}>;
interface SelectionLayoutProps {
    children: React$1.ReactNode;
    className?: string;
}
interface SelectionLayoutSidebarProps {
    children: React$1.ReactNode;
    className?: string;
}
interface SelectionLayoutLogoProps {
    children: React$1.ReactNode;
    className?: string;
}
interface SelectionLayoutHeadlineProps {
    title: string;
    bullets?: string[];
    className?: string;
}
interface SelectionLayoutStatsProps {
    label: string;
    value: string | number;
    className?: string;
}
interface SelectionLayoutMainProps {
    children: React$1.ReactNode;
    className?: string;
}
interface SelectionLayoutHeaderProps {
    title: string;
    subtitle?: string;
    action?: React$1.ReactNode;
    className?: string;
}
interface SelectionLayoutSearchProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}
interface SelectionLayoutTabsProps {
    children: React$1.ReactNode;
    value: string;
    onValueChange: (value: string) => void;
    className?: string;
}
interface SelectionLayoutTabProps {
    value: string;
    label: string;
    icon?: IconComponent$2;
    badge?: string | number;
    className?: string;
}
interface SelectionLayoutListProps {
    children: React$1.ReactNode;
    className?: string;
}
interface SelectionLayoutCardProps {
    children?: React$1.ReactNode;
    className?: string;
    onClick?: () => void;
    icon?: IconComponent$2 | React$1.ReactNode;
    title: string;
    description?: string;
    badge?: React$1.ReactNode;
    favorite?: boolean;
    onFavoriteClick?: () => void;
}
interface SelectionLayoutEmptyProps {
    icon?: IconComponent$2;
    title: string;
    description?: string;
    action?: React$1.ReactNode;
    className?: string;
}

declare function SelectionLayoutRoot({ children, className }: SelectionLayoutProps): react_jsx_runtime.JSX.Element;
declare namespace SelectionLayoutRoot {
    var displayName: string;
}
declare function SelectionLayoutSidebar({ children, className }: SelectionLayoutSidebarProps): react_jsx_runtime.JSX.Element;
declare namespace SelectionLayoutSidebar {
    var displayName: string;
}
declare function SelectionLayoutLogo({ children, className }: SelectionLayoutLogoProps): react_jsx_runtime.JSX.Element;
declare namespace SelectionLayoutLogo {
    var displayName: string;
}
declare function SelectionLayoutHeadline({ title, bullets, className, }: SelectionLayoutHeadlineProps): react_jsx_runtime.JSX.Element;
declare namespace SelectionLayoutHeadline {
    var displayName: string;
}
declare function SelectionLayoutStats({ label, value, className }: SelectionLayoutStatsProps): react_jsx_runtime.JSX.Element;
declare namespace SelectionLayoutStats {
    var displayName: string;
}
declare function SelectionLayoutMain({ children, className }: SelectionLayoutMainProps): react_jsx_runtime.JSX.Element;
declare namespace SelectionLayoutMain {
    var displayName: string;
}
declare function SelectionLayoutHeader({ title, subtitle, action, className, }: SelectionLayoutHeaderProps): react_jsx_runtime.JSX.Element;
declare namespace SelectionLayoutHeader {
    var displayName: string;
}
declare function SelectionLayoutSearch({ value, onChange, placeholder, className, }: SelectionLayoutSearchProps): react_jsx_runtime.JSX.Element;
declare namespace SelectionLayoutSearch {
    var displayName: string;
}
declare function SelectionLayoutTabs({ children, value, onValueChange, className, }: SelectionLayoutTabsProps): react_jsx_runtime.JSX.Element;
declare namespace SelectionLayoutTabs {
    var displayName: string;
}
declare function SelectionLayoutTab({ value, label, icon: Icon, badge, className, }: SelectionLayoutTabProps): react_jsx_runtime.JSX.Element;
declare namespace SelectionLayoutTab {
    var displayName: string;
}
declare function SelectionLayoutList({ children, className }: SelectionLayoutListProps): react_jsx_runtime.JSX.Element;
declare namespace SelectionLayoutList {
    var displayName: string;
}
declare function SelectionLayoutCard({ children, className, onClick, icon, title, description, badge, favorite, onFavoriteClick, }: SelectionLayoutCardProps): react_jsx_runtime.JSX.Element;
declare namespace SelectionLayoutCard {
    var displayName: string;
}
declare function SelectionLayoutEmpty({ icon: Icon, title, description, action, className, }: SelectionLayoutEmptyProps): react_jsx_runtime.JSX.Element;
declare namespace SelectionLayoutEmpty {
    var displayName: string;
}
declare const SelectionLayout: typeof SelectionLayoutRoot & {
    Sidebar: typeof SelectionLayoutSidebar;
    Logo: typeof SelectionLayoutLogo;
    Headline: typeof SelectionLayoutHeadline;
    Stats: typeof SelectionLayoutStats;
    Main: typeof SelectionLayoutMain;
    Header: typeof SelectionLayoutHeader;
    Search: typeof SelectionLayoutSearch;
    Tabs: typeof SelectionLayoutTabs;
    Tab: typeof SelectionLayoutTab;
    List: typeof SelectionLayoutList;
    Card: typeof SelectionLayoutCard;
    Empty: typeof SelectionLayoutEmpty;
};

type IconComponent$1 = React.ComponentType<{
    className?: string;
}>;
interface DashboardLayoutContextValue {
    sidebarExpanded: boolean;
    setSidebarExpanded: (expanded: boolean) => void;
    sidebarPinned: boolean;
    setSidebarPinned: (pinned: boolean) => void;
    isMobile: boolean;
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
}
interface DashboardLayoutProps {
    children: React.ReactNode;
    className?: string;
    defaultExpanded?: boolean;
    defaultPinned?: boolean;
}
interface DashboardLayoutSidebarProps {
    children: React.ReactNode;
    className?: string;
    collapsedWidth?: number;
    expandedWidth?: number;
}
interface DashboardLayoutSidebarHeaderProps {
    children?: React.ReactNode;
    className?: string;
    logo?: React.ReactNode;
    collapsedLogo?: React.ReactNode;
    title?: string;
}
interface DashboardLayoutSidebarNavProps {
    children: React.ReactNode;
    className?: string;
}
interface DashboardLayoutSidebarNavItemProps {
    icon?: IconComponent$1 | React.ReactNode;
    label: string;
    href?: string;
    onClick?: () => void;
    isActive?: boolean;
    badge?: string | number;
    badgeVariant?: 'default' | 'primary' | 'destructive';
    className?: string;
    disabled?: boolean;
}
interface DashboardLayoutSidebarNavGroupProps {
    icon?: IconComponent$1 | React.ReactNode;
    label: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
    isActive?: boolean;
    badge?: string | number;
    badgeVariant?: 'default' | 'primary' | 'destructive';
    className?: string;
}
interface DashboardLayoutSidebarSectionProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
}
interface DashboardLayoutSidebarFooterProps {
    children: React.ReactNode;
    className?: string;
}
interface DashboardLayoutHeaderProps {
    children?: React.ReactNode;
    className?: string;
}
interface DashboardLayoutHeaderTitleProps {
    children?: React.ReactNode;
    className?: string;
    title?: string;
    subtitle?: string;
}
interface DashboardLayoutHeaderActionsProps {
    children: React.ReactNode;
    className?: string;
}
interface DashboardLayoutHeaderUserProps {
    name: string;
    email?: string;
    avatar?: string;
    className?: string;
    children?: React.ReactNode;
    onLogout?: () => void;
}
interface DashboardLayoutContentProps {
    children: React.ReactNode;
    className?: string;
}
interface DashboardLayoutBreadcrumbsProps {
    items: Array<{
        label: string;
        href?: string;
        icon?: IconComponent$1;
    }>;
    className?: string;
    separator?: React.ReactNode;
}
interface DashboardLayoutMobileNavProps {
    children: React.ReactNode;
    className?: string;
}
interface DashboardLayoutMobileNavItemProps {
    icon: IconComponent$1;
    label: string;
    href?: string;
    onClick?: () => void;
    isActive?: boolean;
    badge?: string | number;
}

declare function useDashboardLayout(): DashboardLayoutContextValue;
declare function DashboardLayoutRoot({ children, className, defaultExpanded, defaultPinned, }: DashboardLayoutProps): react_jsx_runtime.JSX.Element;
declare namespace DashboardLayoutRoot {
    var displayName: string;
}
declare function DashboardLayoutSidebar({ children, className, collapsedWidth, expandedWidth, }: DashboardLayoutSidebarProps): react_jsx_runtime.JSX.Element;
declare namespace DashboardLayoutSidebar {
    var displayName: string;
}
declare function DashboardLayoutSidebarHeader({ children, className, logo, collapsedLogo, title, }: DashboardLayoutSidebarHeaderProps): react_jsx_runtime.JSX.Element;
declare namespace DashboardLayoutSidebarHeader {
    var displayName: string;
}
declare function DashboardLayoutSidebarNav({ children, className }: DashboardLayoutSidebarNavProps): react_jsx_runtime.JSX.Element;
declare namespace DashboardLayoutSidebarNav {
    var displayName: string;
}
declare function DashboardLayoutSidebarNavItem({ icon, label, href, onClick, isActive, badge, badgeVariant, className, disabled, }: DashboardLayoutSidebarNavItemProps): react_jsx_runtime.JSX.Element;
declare namespace DashboardLayoutSidebarNavItem {
    var displayName: string;
}
declare function DashboardLayoutSidebarNavGroup({ icon, label, children, defaultOpen, isActive, badge, badgeVariant, className, }: DashboardLayoutSidebarNavGroupProps): react_jsx_runtime.JSX.Element;
declare namespace DashboardLayoutSidebarNavGroup {
    var displayName: string;
}
declare function DashboardLayoutSidebarSection({ title, children, className, }: DashboardLayoutSidebarSectionProps): react_jsx_runtime.JSX.Element;
declare namespace DashboardLayoutSidebarSection {
    var displayName: string;
}
declare function DashboardLayoutSidebarFooter({ children, className }: DashboardLayoutSidebarFooterProps): react_jsx_runtime.JSX.Element;
declare namespace DashboardLayoutSidebarFooter {
    var displayName: string;
}
declare function DashboardLayoutHeader({ children, className }: DashboardLayoutHeaderProps): react_jsx_runtime.JSX.Element;
declare namespace DashboardLayoutHeader {
    var displayName: string;
}
declare function DashboardLayoutHeaderTitle({ children, className, title, subtitle, }: DashboardLayoutHeaderTitleProps): react_jsx_runtime.JSX.Element;
declare namespace DashboardLayoutHeaderTitle {
    var displayName: string;
}
declare function DashboardLayoutHeaderActions({ children, className }: DashboardLayoutHeaderActionsProps): react_jsx_runtime.JSX.Element;
declare namespace DashboardLayoutHeaderActions {
    var displayName: string;
}
declare function DashboardLayoutHeaderUser({ name, email, avatar, className, children, onLogout, }: DashboardLayoutHeaderUserProps): react_jsx_runtime.JSX.Element;
declare namespace DashboardLayoutHeaderUser {
    var displayName: string;
}
declare function DashboardLayoutContent({ children, className }: DashboardLayoutContentProps): react_jsx_runtime.JSX.Element;
declare namespace DashboardLayoutContent {
    var displayName: string;
}
declare function DashboardLayoutBreadcrumbs({ items, className, separator, }: DashboardLayoutBreadcrumbsProps): react_jsx_runtime.JSX.Element;
declare namespace DashboardLayoutBreadcrumbs {
    var displayName: string;
}
declare function DashboardLayoutMobileNav({ children, className }: DashboardLayoutMobileNavProps): react_jsx_runtime.JSX.Element;
declare namespace DashboardLayoutMobileNav {
    var displayName: string;
}
declare function DashboardLayoutMobileNavItem({ icon: Icon, label, href, onClick, isActive, badge, }: DashboardLayoutMobileNavItemProps): react_jsx_runtime.JSX.Element;
declare namespace DashboardLayoutMobileNavItem {
    var displayName: string;
}
declare const DashboardLayout: typeof DashboardLayoutRoot & {
    Sidebar: typeof DashboardLayoutSidebar;
    SidebarHeader: typeof DashboardLayoutSidebarHeader;
    SidebarNav: typeof DashboardLayoutSidebarNav;
    SidebarNavItem: typeof DashboardLayoutSidebarNavItem;
    SidebarNavGroup: typeof DashboardLayoutSidebarNavGroup;
    SidebarSection: typeof DashboardLayoutSidebarSection;
    SidebarFooter: typeof DashboardLayoutSidebarFooter;
    Header: typeof DashboardLayoutHeader;
    HeaderTitle: typeof DashboardLayoutHeaderTitle;
    HeaderActions: typeof DashboardLayoutHeaderActions;
    HeaderUser: typeof DashboardLayoutHeaderUser;
    Content: typeof DashboardLayoutContent;
    Breadcrumbs: typeof DashboardLayoutBreadcrumbs;
    MobileNav: typeof DashboardLayoutMobileNav;
    MobileNavItem: typeof DashboardLayoutMobileNavItem;
};

type IconComponent = React.ComponentType<{
    className?: string;
}>;
interface SidebarContextValue {
    expanded: boolean;
    setExpanded: (expanded: boolean) => void;
    pinned: boolean;
    setPinned: (pinned: boolean) => void;
    activeSection: string | null;
    setActiveSection: (id: string | null) => void;
    isMobile: boolean;
    collapsedWidth: number;
    expandedWidth: number;
}
interface SidebarProps {
    children: React.ReactNode;
    defaultExpanded?: boolean;
    defaultPinned?: boolean;
    collapsedWidth?: number;
    expandedWidth?: number;
    className?: string;
}
interface SidebarHeaderProps {
    logo?: React.ReactNode;
    collapsedLogo?: React.ReactNode;
    title?: string;
    showPinButton?: boolean;
    className?: string;
}
interface SidebarNavProps {
    children: React.ReactNode;
    className?: string;
}
interface SidebarSectionProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
}
type BadgeVariant = 'default' | 'notification' | 'success' | 'warning';
interface SidebarNavItemProps {
    icon?: IconComponent | React.ReactNode;
    label: string;
    href?: string;
    onClick?: () => void;
    isActive?: boolean;
    badge?: string | number;
    badgeVariant?: BadgeVariant;
    disabled?: boolean;
    className?: string;
}
interface SidebarNavGroupProps {
    icon?: IconComponent | React.ReactNode;
    label: string;
    children: React.ReactNode;
    id?: string;
    defaultOpen?: boolean;
    isActive?: boolean;
    badge?: string | number;
    badgeVariant?: BadgeVariant;
    className?: string;
}
interface SidebarFooterUser {
    name: string;
    email?: string;
    avatar?: string;
}
interface SidebarFooterMenuItem {
    icon?: IconComponent;
    label: string;
    onClick: () => void;
    variant?: 'default' | 'destructive';
}
interface SidebarFooterProps {
    user?: SidebarFooterUser;
    menuItems?: SidebarFooterMenuItem[];
    children?: React.ReactNode;
    className?: string;
}

interface SidebarRootProps {
    children: React$1.ReactNode;
    defaultExpanded?: boolean;
    defaultPinned?: boolean;
    collapsedWidth?: number;
    expandedWidth?: number;
}
declare function SidebarRoot({ children, defaultExpanded, defaultPinned, collapsedWidth, expandedWidth, }: SidebarRootProps): react_jsx_runtime.JSX.Element;
declare namespace SidebarRoot {
    var displayName: string;
}
interface SidebarAsideProps {
    children: React$1.ReactNode;
    className?: string;
}
declare function SidebarAside({ children, className }: SidebarAsideProps): react_jsx_runtime.JSX.Element | null;
declare namespace SidebarAside {
    var displayName: string;
}
interface SidebarContentProps {
    children: React$1.ReactNode;
    className?: string;
}
declare function SidebarContent({ children, className }: SidebarContentProps): react_jsx_runtime.JSX.Element;
declare namespace SidebarContent {
    var displayName: string;
}
declare function LegacySidebar({ children, defaultExpanded, defaultPinned, collapsedWidth, expandedWidth, className, }: SidebarProps): react_jsx_runtime.JSX.Element;
declare namespace LegacySidebar {
    var displayName: string;
}
declare const Sidebar: typeof LegacySidebar & {
    Root: typeof SidebarRoot;
    Aside: typeof SidebarAside;
    Content: typeof SidebarContent;
    Header: React$1.NamedExoticComponent<SidebarHeaderProps>;
    Nav: React$1.NamedExoticComponent<SidebarNavProps>;
    Section: React$1.NamedExoticComponent<SidebarSectionProps>;
    NavItem: React$1.NamedExoticComponent<SidebarNavItemProps>;
    NavGroup: React$1.NamedExoticComponent<SidebarNavGroupProps>;
    Footer: React$1.NamedExoticComponent<SidebarFooterProps>;
};

declare function useSidebar(): SidebarContextValue;
declare function useSidebarOptional(): SidebarContextValue | null;
declare function useMediaQuery(query: string): boolean;

interface MobileNavItemConfig {
    icon: React.ComponentType<{
        className?: string;
    }> | React.ReactNode;
    label: string;
    href?: string;
    onClick?: () => void;
    isActive?: boolean;
}
interface MobileNavFabAction {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
}
interface MobileNavProps {
    items: MobileNavItemConfig[];
    fabAction?: MobileNavFabAction;
    className?: string;
}
interface MobileNavItemProps {
    icon: React.ComponentType<{
        className?: string;
    }> | React.ReactNode;
    label: string;
    isActive?: boolean;
    onClick?: () => void;
}

declare const MobileNav: React$1.NamedExoticComponent<MobileNavProps>;

declare const MobileNavItem: React$1.NamedExoticComponent<MobileNavItemProps>;

interface NavbarProps {
    children: React$1.ReactNode;
    className?: string;
    style?: React$1.CSSProperties;
}
declare const Navbar: React$1.NamedExoticComponent<NavbarProps>;

interface ThemeToggleProps {
    className?: string;
}
declare function ThemeToggle({ className }: ThemeToggleProps): react_jsx_runtime.JSX.Element;
declare namespace ThemeToggle {
    var displayName: string;
}

interface NotificationItem {
    id: string;
    icon?: React$1.ReactNode;
    title: string;
    description: string;
    time: string;
    isHighlighted?: boolean;
}
interface NavbarNotificationProps {
    notifications?: NotificationItem[];
    onMarkAllAsRead?: () => void;
    onViewAll?: () => void;
}
declare function NavbarNotification({ notifications, onMarkAllAsRead, onViewAll, }: NavbarNotificationProps): react_jsx_runtime.JSX.Element;
declare namespace NavbarNotification {
    var displayName: string;
}

interface Company {
    id: string;
    name: string;
    cnpj?: string;
}
interface NavbarCompanyProfileProps {
    /** Lista de empresas vinculadas */
    companies: Company[];
    /** ID da empresa ativa */
    activeCompanyId?: string;
    /** Callback quando uma empresa é selecionada */
    onCompanySelect?: (companyId: string) => void;
    /** Se está carregando as empresas */
    isLoading?: boolean;
    /** Função para formatar CNPJ (opcional) */
    formatCnpj?: (cnpj: string) => string;
}
declare function NavbarCompanyProfile({ companies, activeCompanyId, onCompanySelect, isLoading, formatCnpj, }: NavbarCompanyProfileProps): react_jsx_runtime.JSX.Element | null;
declare namespace NavbarCompanyProfile {
    var displayName: string;
}

interface UserMenuItemConfig {
    icon?: React$1.ReactNode;
    label: string;
    onClick?: () => void;
    href?: string;
    variant?: 'default' | 'destructive';
}
interface NavbarUserMenuProps {
    /** Nome do usuário */
    name: string;
    /** Email do usuário */
    email?: string;
    /** URL do avatar */
    avatarUrl?: string;
    /** Se está no modo colapsado (só mostra avatar) */
    isCollapsed?: boolean;
    /** Itens do menu */
    menuItems?: UserMenuItemConfig[];
    /** Children customizado para o menu */
    children?: React$1.ReactNode;
}
declare function NavbarUserMenu({ name, email, avatarUrl, isCollapsed, menuItems, children, }: NavbarUserMenuProps): react_jsx_runtime.JSX.Element;
declare namespace NavbarUserMenu {
    var displayName: string;
}

declare const Breadcrumb: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
    separator?: React$1.ReactNode;
} & React$1.RefAttributes<HTMLElement>>;
declare const BreadcrumbList: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>, "ref"> & React$1.RefAttributes<HTMLOListElement>>;
declare const BreadcrumbItem: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & React$1.RefAttributes<HTMLLIElement>>;
declare const BreadcrumbLink: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "ref"> & {
    asChild?: boolean;
} & React$1.RefAttributes<HTMLAnchorElement>>;
declare const BreadcrumbPage: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref"> & React$1.RefAttributes<HTMLSpanElement>>;
declare const BreadcrumbSeparator: {
    ({ children, className, ...props }: React$1.ComponentProps<"li">): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const BreadcrumbEllipsis: {
    ({ className, ...props }: React$1.ComponentProps<"span">): react_jsx_runtime.JSX.Element;
    displayName: string;
};

declare const ScrollArea: React$1.ForwardRefExoticComponent<Omit<ScrollAreaPrimitive.ScrollAreaProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const ScrollBar: React$1.ForwardRefExoticComponent<Omit<ScrollAreaPrimitive.ScrollAreaScrollbarProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

declare const Separator: React$1.ForwardRefExoticComponent<Omit<SeparatorPrimitive.SeparatorProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

interface SectionHeaderRootProps extends React$1.HTMLAttributes<HTMLDivElement> {
    /**
     * Adds a gradient from primary color on the left side
     * @default true
     */
    gradient?: boolean;
    /**
     * Adds bottom border
     * @default true
     */
    bordered?: boolean;
}
declare function SectionHeaderRoot({ children, className, gradient, bordered, ...props }: SectionHeaderRootProps): react_jsx_runtime.JSX.Element;
declare namespace SectionHeaderRoot {
    var displayName: string;
}
interface SectionHeaderIconProps {
    icon: React$1.ComponentType<{
        className?: string;
    }>;
    className?: string;
}
declare function SectionHeaderIcon({ icon: Icon, className }: SectionHeaderIconProps): react_jsx_runtime.JSX.Element;
declare namespace SectionHeaderIcon {
    var displayName: string;
}
interface SectionHeaderContentProps extends React$1.HTMLAttributes<HTMLDivElement> {
}
declare function SectionHeaderContent({ children, className, ...props }: SectionHeaderContentProps): react_jsx_runtime.JSX.Element;
declare namespace SectionHeaderContent {
    var displayName: string;
}
interface SectionHeaderTitleProps extends React$1.HTMLAttributes<HTMLHeadingElement> {
}
declare function SectionHeaderTitle({ children, className, ...props }: SectionHeaderTitleProps): react_jsx_runtime.JSX.Element;
declare namespace SectionHeaderTitle {
    var displayName: string;
}
interface SectionHeaderSubtitleProps extends React$1.HTMLAttributes<HTMLParagraphElement> {
}
declare function SectionHeaderSubtitle({ children, className, ...props }: SectionHeaderSubtitleProps): react_jsx_runtime.JSX.Element;
declare namespace SectionHeaderSubtitle {
    var displayName: string;
}
interface SectionHeaderActionsProps extends React$1.HTMLAttributes<HTMLDivElement> {
}
declare function SectionHeaderActions({ children, className, ...props }: SectionHeaderActionsProps): react_jsx_runtime.JSX.Element;
declare namespace SectionHeaderActions {
    var displayName: string;
}
interface SectionHeaderBadgeProps extends React$1.HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'muted';
}
declare function SectionHeaderBadge({ children, className, variant, ...props }: SectionHeaderBadgeProps): react_jsx_runtime.JSX.Element;
declare namespace SectionHeaderBadge {
    var displayName: string;
}
declare const SectionHeader: typeof SectionHeaderRoot & {
    Icon: typeof SectionHeaderIcon;
    Content: typeof SectionHeaderContent;
    Title: typeof SectionHeaderTitle;
    Subtitle: typeof SectionHeaderSubtitle;
    Actions: typeof SectionHeaderActions;
    Badge: typeof SectionHeaderBadge;
};

interface PageHeaderProps {
    /** Título da página */
    title: string;
    /** Descrição/subtítulo */
    description: string;
    /** Ações (botões) no lado direito */
    children?: React$1.ReactNode;
    /** Custom className */
    className?: string;
}
declare const PageHeader: React$1.NamedExoticComponent<PageHeaderProps>;

interface KanbanItem {
    id: string;
    [key: string]: unknown;
}
interface KanbanColumnConfig {
    id: string;
    title: string;
    color?: string;
    headerClassName?: string;
    dropZoneClassName?: string;
}
interface KanbanBoardProps {
    children: ReactNode;
    onDragEnd?: (result: KanbanDragResult) => void;
    onDragStart?: (itemId: string, sourceColumnId: string) => void;
    className?: string;
}
interface KanbanColumnProps {
    id: string;
    title: string;
    count?: number;
    children?: ReactNode;
    className?: string;
    headerClassName?: string;
    emptyMessage?: string;
    /** Optional footer element (e.g., "Add Task" button) */
    footer?: ReactNode;
    /** Callback to check if a drop is allowed in this column */
    canDrop?: (itemId: string, sourceColumnId: string) => boolean;
}
interface KanbanCardProps {
    id: string;
    columnId: string;
    children: ReactNode;
    className?: string;
    disabled?: boolean;
}
interface KanbanDragResult {
    itemId: string;
    sourceColumnId: string;
    destinationColumnId: string;
}
interface KanbanContextValue {
    isDragging: boolean;
    draggedItemId: string | null;
    sourceColumnId: string | null;
    hoveredColumnId: string | null;
    setHoveredColumnId: (columnId: string | null) => void;
    canDropInColumn: (columnId: string) => boolean;
    registerDropValidator: (columnId: string, validator: (itemId: string, sourceColumnId: string) => boolean) => void;
    unregisterDropValidator: (columnId: string) => void;
}
interface KanbanEmptyProps {
    message?: string;
    className?: string;
}

declare function KanbanBoard({ children, onDragEnd, onDragStart, className, }: KanbanBoardProps): react_jsx_runtime.JSX.Element;
declare namespace KanbanBoard {
    var displayName: string;
}

declare function KanbanColumn({ id, title, count, children, className, headerClassName, emptyMessage, footer, canDrop, }: KanbanColumnProps): react_jsx_runtime.JSX.Element;
declare namespace KanbanColumn {
    var displayName: string;
}

declare function KanbanCard({ id, columnId, children, className, disabled, }: KanbanCardProps): react_jsx_runtime.JSX.Element;
declare namespace KanbanCard {
    var displayName: string;
}

/**
 * Kanban - A compound component for building Kanban boards
 *
 * @example
 * ```tsx
 * <Kanban.Board onDragEnd={handleDragEnd}>
 *   <Kanban.Column id="pending" title="Pendente" count={3}>
 *     <Kanban.Card id="1" columnId="pending">
 *       <div>Card content</div>
 *     </Kanban.Card>
 *   </Kanban.Column>
 *   <Kanban.Column
 *     id="done"
 *     title="Concluido"
 *     canDrop={(itemId, sourceColumnId) => sourceColumnId === 'in-progress'}
 *   >
 *     <Kanban.Card id="2" columnId="done">
 *       <div>Card content</div>
 *     </Kanban.Card>
 *   </Kanban.Column>
 * </Kanban.Board>
 * ```
 */
declare const Kanban: {
    Board: typeof KanbanBoard;
    Column: typeof KanbanColumn;
    Card: typeof KanbanCard;
};

declare function useKanban(): KanbanContextValue;
declare function useKanbanOptional(): KanbanContextValue | null;

interface ItemCardActionsProps extends React$1.HTMLAttributes<HTMLDivElement> {
    /** Whether to show border on top */
    bordered?: boolean;
}
declare const ItemCardActions: React$1.ForwardRefExoticComponent<ItemCardActionsProps & React$1.RefAttributes<HTMLDivElement>>;
interface ItemCardActionButtonProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Whether to show chevron arrow */
    showArrow?: boolean;
    /** Loading state */
    loading?: boolean;
    /** Variant style */
    variant?: 'default' | 'primary' | 'secondary' | 'destructive';
}
declare const ItemCardActionButton: React$1.ForwardRefExoticComponent<ItemCardActionButtonProps & React$1.RefAttributes<HTMLButtonElement>>;
interface ItemCardActionsRowProps extends React$1.HTMLAttributes<HTMLDivElement> {
}
declare const ItemCardActionsRow: React$1.ForwardRefExoticComponent<ItemCardActionsRowProps & React$1.RefAttributes<HTMLDivElement>>;

interface ItemCardFooterProps extends React$1.HTMLAttributes<HTMLDivElement> {
}
declare const ItemCardFooter: React$1.ForwardRefExoticComponent<ItemCardFooterProps & React$1.RefAttributes<HTMLDivElement>>;
interface ItemCardFooterItemProps extends React$1.HTMLAttributes<HTMLDivElement> {
    /** Small label text */
    label: string;
    /** Main value */
    value: React$1.ReactNode;
    /** Alignment */
    align?: 'left' | 'right';
}
declare const ItemCardFooterItem: React$1.ForwardRefExoticComponent<ItemCardFooterItemProps & React$1.RefAttributes<HTMLDivElement>>;
interface ItemCardFooterDividerProps extends React$1.HTMLAttributes<HTMLDivElement> {
}
declare const ItemCardFooterDivider: React$1.ForwardRefExoticComponent<ItemCardFooterDividerProps & React$1.RefAttributes<HTMLDivElement>>;

interface ItemCardContentProps extends React$1.HTMLAttributes<HTMLDivElement> {
    /** Whether to use muted background */
    muted?: boolean;
}
declare const ItemCardContent: React$1.ForwardRefExoticComponent<ItemCardContentProps & React$1.RefAttributes<HTMLDivElement>>;
interface ItemCardContentItemProps extends React$1.HTMLAttributes<HTMLDivElement> {
    /** Label on the left */
    label?: React$1.ReactNode;
    /** Value on the right */
    value?: React$1.ReactNode;
    /** Secondary value (e.g., price) */
    secondary?: React$1.ReactNode;
}
declare const ItemCardContentItem: React$1.ForwardRefExoticComponent<ItemCardContentItemProps & React$1.RefAttributes<HTMLDivElement>>;
interface ItemCardEmptyProps extends React$1.HTMLAttributes<HTMLDivElement> {
    /** Icon to display */
    icon?: React$1.ReactNode;
    /** Message to display */
    message?: string;
}
declare const ItemCardEmpty: React$1.ForwardRefExoticComponent<ItemCardEmptyProps & React$1.RefAttributes<HTMLDivElement>>;

interface ItemCardHeaderProps extends React$1.HTMLAttributes<HTMLDivElement> {
    /** Alignment of content */
    align?: 'left' | 'right' | 'between';
}
declare const ItemCardHeader: React$1.ForwardRefExoticComponent<ItemCardHeaderProps & React$1.RefAttributes<HTMLDivElement>>;
declare const itemCardIconVariants: (props?: ({
    size?: "sm" | "lg" | "md" | null | undefined;
    variant?: "destructive" | "outline" | "secondary" | "success" | "warning" | "info" | "muted" | "primary" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ItemCardIconProps extends React$1.HTMLAttributes<HTMLDivElement>, VariantProps<typeof itemCardIconVariants> {
    /** Whether to show ripple effect */
    ripple?: boolean;
}
declare const ItemCardIcon: React$1.ForwardRefExoticComponent<ItemCardIconProps & React$1.RefAttributes<HTMLDivElement>>;
interface ItemCardTitleGroupProps extends React$1.HTMLAttributes<HTMLDivElement> {
    /** Alignment of text */
    align?: 'left' | 'right' | 'center';
}
declare const ItemCardTitleGroup: React$1.ForwardRefExoticComponent<ItemCardTitleGroupProps & React$1.RefAttributes<HTMLDivElement>>;
interface ItemCardTitleProps extends React$1.HTMLAttributes<HTMLHeadingElement> {
}
declare const ItemCardTitle: React$1.ForwardRefExoticComponent<ItemCardTitleProps & React$1.RefAttributes<HTMLHeadingElement>>;
interface ItemCardSubtitleProps extends React$1.HTMLAttributes<HTMLParagraphElement> {
}
declare const ItemCardSubtitle: React$1.ForwardRefExoticComponent<ItemCardSubtitleProps & React$1.RefAttributes<HTMLParagraphElement>>;

declare const itemCardBadgeVariants: (props?: ({
    variant?: "default" | "destructive" | "success" | "warning" | "info" | "muted" | "primary" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ItemCardBadgeProps extends React$1.HTMLAttributes<HTMLDivElement>, VariantProps<typeof itemCardBadgeVariants> {
}
declare const ItemCardBadge: React$1.ForwardRefExoticComponent<ItemCardBadgeProps & React$1.RefAttributes<HTMLDivElement>>;

declare const itemCardVariants: (props?: ({
    variant?: "default" | "selected" | "muted" | null | undefined;
    hover?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ItemCardContextValue {
    isSelected?: boolean;
}
declare function useItemCard(): ItemCardContextValue;
interface ItemCardRootProps extends React$1.HTMLAttributes<HTMLDivElement>, VariantProps<typeof itemCardVariants> {
    /** Whether the card is selected */
    selected?: boolean;
    /** Whether the card is clickable */
    asButton?: boolean;
}
declare const ItemCardRoot: React$1.ForwardRefExoticComponent<ItemCardRootProps & React$1.RefAttributes<HTMLDivElement>>;

/**
 * ItemCard - A compound component for building item/resource cards
 *
 * Inspired by the Kit de Peças card pattern. Use for displaying items like:
 * - Part Kits (Kits de Peças)
 * - Maintenance Plans (Planejamento de Manutenção)
 * - Resources, Products, or any item with icon, details, and actions
 *
 * @example Basic Usage
 * ```tsx
 * <ItemCard.Root>
 *   <ItemCard.Badge variant="primary">Publicado</ItemCard.Badge>
 *
 *   <ItemCard.Header>
 *     <ItemCard.Icon variant="primary">
 *       <BoxIcon className="w-5 h-5" />
 *     </ItemCard.Icon>
 *     <ItemCard.TitleGroup>
 *       <ItemCard.Title>Kit Cubo</ItemCard.Title>
 *       <ItemCard.Subtitle>2 Peças</ItemCard.Subtitle>
 *     </ItemCard.TitleGroup>
 *   </ItemCard.Header>
 *
 *   <ItemCard.Content>
 *     <ItemCard.ContentItem label="Araldite 10min" value="2x" secondary="R$ 28,00" />
 *     <ItemCard.ContentItem label="Aditivo Radiador 1L" value="1x" secondary="R$ 55,00" />
 *   </ItemCard.Content>
 *
 *   <ItemCard.Footer>
 *     <ItemCard.FooterItem label="Tipo Ativo" value="Implemento" />
 *     <ItemCard.FooterItem label="Custo Total" value="R$ 111,00" align="right" />
 *   </ItemCard.Footer>
 *
 *   <ItemCard.Actions>
 *     <ItemCard.ActionButton>Ações</ItemCard.ActionButton>
 *   </ItemCard.Actions>
 * </ItemCard.Root>
 * ```
 *
 * @example With Selection
 * ```tsx
 * <ItemCard.Root selected={isSelected} onClick={() => setSelected(!isSelected)}>
 *   ...
 * </ItemCard.Root>
 * ```
 *
 * @example Maintenance Planning Card
 * ```tsx
 * <ItemCard.Root>
 *   <ItemCard.Badge variant="warning">Crítico</ItemCard.Badge>
 *
 *   <ItemCard.Header>
 *     <ItemCard.Icon variant="warning" ripple>
 *       <TruckIcon className="w-5 h-5" />
 *     </ItemCard.Icon>
 *     <ItemCard.TitleGroup>
 *       <ItemCard.Title>ABC-1234</ItemCard.Title>
 *       <ItemCard.Subtitle>Scania R450</ItemCard.Subtitle>
 *     </ItemCard.TitleGroup>
 *   </ItemCard.Header>
 *
 *   <ItemCard.Content>
 *     <ItemCard.ContentItem label="Troca de Óleo" value="500 km" />
 *     <ItemCard.ContentItem label="Revisão Freios" value="1.200 km" />
 *   </ItemCard.Content>
 *
 *   <ItemCard.Footer>
 *     <ItemCard.FooterItem label="Status" value="Urgente" />
 *     <ItemCard.FooterItem label="Próxima" value="15/02/2024" align="right" />
 *   </ItemCard.Footer>
 *
 *   <ItemCard.Actions>
 *     <ItemCard.ActionButton variant="primary">Ver Detalhes</ItemCard.ActionButton>
 *   </ItemCard.Actions>
 * </ItemCard.Root>
 * ```
 */
declare const ItemCard: React$1.ForwardRefExoticComponent<ItemCardRootProps & React$1.RefAttributes<HTMLDivElement>> & {
    Badge: React$1.ForwardRefExoticComponent<ItemCardBadgeProps & React$1.RefAttributes<HTMLDivElement>>;
    Header: React$1.ForwardRefExoticComponent<ItemCardHeaderProps & React$1.RefAttributes<HTMLDivElement>>;
    Icon: React$1.ForwardRefExoticComponent<ItemCardIconProps & React$1.RefAttributes<HTMLDivElement>>;
    TitleGroup: React$1.ForwardRefExoticComponent<ItemCardTitleGroupProps & React$1.RefAttributes<HTMLDivElement>>;
    Title: React$1.ForwardRefExoticComponent<ItemCardTitleProps & React$1.RefAttributes<HTMLHeadingElement>>;
    Subtitle: React$1.ForwardRefExoticComponent<ItemCardSubtitleProps & React$1.RefAttributes<HTMLParagraphElement>>;
    Content: React$1.ForwardRefExoticComponent<ItemCardContentProps & React$1.RefAttributes<HTMLDivElement>>;
    ContentItem: React$1.ForwardRefExoticComponent<ItemCardContentItemProps & React$1.RefAttributes<HTMLDivElement>>;
    Empty: React$1.ForwardRefExoticComponent<ItemCardEmptyProps & React$1.RefAttributes<HTMLDivElement>>;
    Footer: React$1.ForwardRefExoticComponent<ItemCardFooterProps & React$1.RefAttributes<HTMLDivElement>>;
    FooterItem: React$1.ForwardRefExoticComponent<ItemCardFooterItemProps & React$1.RefAttributes<HTMLDivElement>>;
    FooterDivider: React$1.ForwardRefExoticComponent<ItemCardFooterDividerProps & React$1.RefAttributes<HTMLDivElement>>;
    Actions: React$1.ForwardRefExoticComponent<ItemCardActionsProps & React$1.RefAttributes<HTMLDivElement>>;
    ActionButton: React$1.ForwardRefExoticComponent<ItemCardActionButtonProps & React$1.RefAttributes<HTMLButtonElement>>;
    ActionsRow: React$1.ForwardRefExoticComponent<ItemCardActionsRowProps & React$1.RefAttributes<HTMLDivElement>>;
};

/**
 * Generic validation schema interface
 * Compatible with Zod and other validation libraries
 */
interface ValidationSchema {
    safeParseAsync: (data: unknown) => Promise<{
        success: boolean;
        error?: {
            issues: Array<{
                path: (string | number)[];
                message: string;
            }>;
        };
    }>;
}
/**
 * Configuration for a single wizard step
 */
interface WizardStepConfig<T extends FieldValues = FieldValues> {
    /** Unique identifier for the step */
    id: string;
    /** Step name used for lookups and matching with Panel */
    name: string;
    /** Display label for the step indicator */
    label?: string;
    /** Optional description shown below the label */
    description?: string;
    /** Icon component to display in step indicator */
    icon?: ComponentType<{
        className?: string;
    }>;
    /** Fields that belong to this step (for validation) */
    fields?: Path<T>[];
    /** Validation schema for per-step validation (Zod compatible) */
    validationSchema?: ValidationSchema;
    /** Whether this step can be skipped */
    isOptional?: boolean;
    /** Whether step is disabled (static or dynamic) */
    isDisabled?: boolean | ((data: T) => boolean);
    /** Whether step is hidden (static or dynamic) */
    isHidden?: boolean | ((data: T) => boolean);
}
/**
 * Props for the root Wizard component
 */
interface WizardProps<T extends FieldValues = FieldValues> {
    /** Child components (Wizard.Steps, Wizard.Content, etc.) */
    children: ReactNode;
    /** React Hook Form instance */
    form: UseFormReturn<T, any, any>;
    /** Array of step configurations */
    steps: WizardStepConfig<T>[];
    /** Initial step index (0-based) */
    initialStep?: number;
    /** Callback when step changes */
    onStepChange?: (step: number, direction: 'next' | 'prev' | 'jump') => void;
    /** Callback when wizard completes (form submit on last step) */
    onComplete?: (data: T) => void | Promise<void>;
    /** Whether to validate before advancing to next step (default: true) */
    validateOnNext?: boolean;
    /** Whether to allow jumping to any completed step (default: false) */
    allowJumpToStep?: boolean;
    /** Additional class name for the wizard container */
    className?: string;
}
/**
 * Context value provided by the Wizard
 */
interface WizardContextValue<T extends FieldValues = FieldValues> {
    /** Current step index (0-based) */
    currentStep: number;
    /** Total number of visible steps */
    totalSteps: number;
    /** Filtered list of visible steps */
    activeSteps: WizardStepConfig<T>[];
    /** All step configurations (including hidden) */
    allSteps: WizardStepConfig<T>[];
    /** Whether current step is the first step */
    isFirstStep: boolean;
    /** Whether current step is the last step */
    isLastStep: boolean;
    /** Progress percentage (0-100) */
    progress: number;
    /** Navigate to next step (validates current step first) */
    goToNextStep: () => Promise<boolean>;
    /** Navigate to previous step (no validation) */
    goToPrevStep: () => void;
    /** Navigate to specific step by index */
    goToStep: (index: number) => Promise<boolean>;
    /** Reset wizard to initial state */
    reset: () => void;
    /** Validate current step fields */
    validateCurrentStep: () => Promise<boolean>;
    /** Check if a step has been completed */
    isStepCompleted: (index: number) => boolean;
    /** Check if a step has errors */
    hasStepErrors: (index: number) => boolean;
    /** React Hook Form instance */
    form: UseFormReturn<T, any, any>;
    /** Current step configuration */
    currentStepConfig: WizardStepConfig<T>;
    /** Get step config by index */
    getStepConfig: (index: number) => WizardStepConfig<T> | undefined;
    /** Get step config by name */
    getStepByName: (name: string) => WizardStepConfig<T> | undefined;
    /** Get step index by name */
    getStepIndexByName: (name: string) => number;
    /** Whether jumping to steps is allowed */
    allowJumpToStep: boolean;
}
/**
 * Props for Wizard.Steps component
 */
interface WizardStepsProps {
    /** Layout variant */
    variant?: 'horizontal' | 'vertical';
    /** Whether to show step descriptions */
    showDescription?: boolean;
    /** Whether to show step numbers instead of icons */
    showNumbers?: boolean;
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
    /** Additional class name */
    className?: string;
}
/**
 * Props for individual Wizard.Step indicator
 */
interface WizardStepIndicatorProps {
    /** Step configuration */
    step: WizardStepConfig;
    /** Step index (0-based) */
    index: number;
    /** Step state */
    state: 'completed' | 'current' | 'pending' | 'error' | 'disabled';
    /** Whether to show step number */
    showNumber?: boolean;
    /** Whether to show description */
    showDescription?: boolean;
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
    /** Whether step is clickable */
    isClickable?: boolean;
    /** Click handler */
    onClick?: () => void;
}
/**
 * Props for step connector line
 */
interface WizardStepConnectorProps {
    /** Whether the step before this connector is completed */
    isCompleted?: boolean;
    /** Layout variant */
    variant?: 'horizontal' | 'vertical';
    /** Additional class name */
    className?: string;
}
/**
 * Props for Wizard.Content component
 */
interface WizardContentProps {
    /** Panel children */
    children: ReactNode;
    /** Additional class name */
    className?: string;
}
/**
 * Props for Wizard.Panel component
 */
interface WizardPanelProps {
    /** Name matching a step's name */
    name: string;
    /** Panel content */
    children: ReactNode;
    /** Additional class name */
    className?: string;
}
/**
 * Props for Wizard.Navigation component
 */
interface WizardNavigationProps {
    /** Label for cancel button (default: "Cancelar") */
    cancelLabel?: string;
    /** Label for previous button (default: "Voltar") */
    prevLabel?: string;
    /** Label for next button (default: "Continuar") */
    nextLabel?: string;
    /** Label for submit button (default: "Finalizar") */
    submitLabel?: string;
    /** Label shown when loading (default: "Processando...") */
    loadingLabel?: string;
    /** Handler for cancel button */
    onCancel?: () => void;
    /** Whether to show cancel button (default: true on first step) */
    showCancel?: boolean;
    /** Whether submit button is disabled */
    submitDisabled?: boolean;
    /** Additional class name */
    className?: string;
}
/**
 * Props for Wizard.Progress component
 */
interface WizardProgressProps {
    /** Whether to show percentage text */
    showPercentage?: boolean;
    /** Whether to show step count (e.g., "2 de 4") */
    showStepCount?: boolean;
    /** Additional class name */
    className?: string;
}
/**
 * Step state type
 */
type StepState = 'completed' | 'current' | 'pending' | 'error' | 'disabled';

/**
 * Visual step indicators component
 *
 * Displays the wizard steps with their current states:
 * - Completed (checkmark, green)
 * - Current (highlighted, primary)
 * - Pending (muted)
 * - Error (red indicator)
 * - Disabled (grayed out)
 *
 * @example
 * ```tsx
 * <Wizard.Steps variant="horizontal" showDescription />
 * ```
 */
declare function WizardSteps({ variant, showDescription, showNumbers, size, className, }: WizardStepsProps): react_jsx_runtime.JSX.Element;

/**
 * Container for wizard step panels
 *
 * Automatically renders only the panel matching the current step
 *
 * @example
 * ```tsx
 * <Wizard.Content>
 *   <Wizard.Panel name="step1">Step 1 content</Wizard.Panel>
 *   <Wizard.Panel name="step2">Step 2 content</Wizard.Panel>
 * </Wizard.Content>
 * ```
 */
declare function WizardContent({ children, className }: WizardContentProps): react_jsx_runtime.JSX.Element;

/**
 * Individual panel for wizard step content
 *
 * The `name` prop must match a step's `name` or `id` in the wizard configuration
 *
 * @example
 * ```tsx
 * <Wizard.Panel name="personal">
 *   <Form.Input name="name" label="Nome" required />
 *   <Form.Input name="email" label="Email" required />
 * </Wizard.Panel>
 * ```
 */
declare function WizardPanel({ name, children, className }: WizardPanelProps): react_jsx_runtime.JSX.Element;

/**
 * Navigation buttons for the wizard
 *
 * Provides:
 * - Cancel button (first step only by default)
 * - Previous button
 * - Next button (type="button" - does NOT submit)
 * - Submit button (last step only, type="submit")
 *
 * @example
 * ```tsx
 * <Wizard.Navigation
 *   cancelLabel="Cancelar"
 *   prevLabel="Voltar"
 *   nextLabel="Continuar"
 *   submitLabel="Finalizar"
 *   onCancel={() => dialog.close()}
 * />
 * ```
 */
declare function WizardNavigation({ cancelLabel, prevLabel, nextLabel, submitLabel, loadingLabel, onCancel, showCancel, submitDisabled, className, }: WizardNavigationProps): react_jsx_runtime.JSX.Element;

/**
 * Progress bar component for the wizard
 *
 * Displays a visual progress indicator with optional percentage and step count
 *
 * @example
 * ```tsx
 * <Wizard.Progress showPercentage showStepCount />
 * ```
 */
declare function WizardProgress({ showPercentage, showStepCount, className, }: WizardProgressProps): react_jsx_runtime.JSX.Element;

/**
 * Root Wizard component
 *
 * Provides multi-step form functionality with:
 * - Per-step validation with Zod schemas
 * - Visual step indicators
 * - Navigation controls
 * - Progress tracking
 *
 * @example
 * ```tsx
 * const form = useForm<FormData>({
 *   resolver: zodResolver(schema),
 *   mode: 'onTouched',
 * });
 *
 * <Wizard form={form} steps={steps} onComplete={handleSubmit}>
 *   <Wizard.Steps />
 *   <Wizard.Content>
 *     <Wizard.Panel name="step1">...</Wizard.Panel>
 *     <Wizard.Panel name="step2">...</Wizard.Panel>
 *   </Wizard.Content>
 *   <Wizard.Navigation onCancel={handleClose} />
 * </Wizard>
 * ```
 */
declare function WizardRoot<T extends FieldValues>({ children, form, steps, initialStep, onStepChange, onComplete, validateOnNext, allowJumpToStep, className, }: WizardProps<T>): react_jsx_runtime.JSX.Element;
declare const Wizard: typeof WizardRoot & {
    /** Visual step indicators */
    Steps: typeof WizardSteps;
    /** Container for step panels */
    Content: typeof WizardContent;
    /** Individual step content panel */
    Panel: typeof WizardPanel;
    /** Navigation buttons (prev, next, submit) */
    Navigation: typeof WizardNavigation;
    /** Progress bar indicator */
    Progress: typeof WizardProgress;
};

/**
 * Hook to access wizard context
 * @throws Error if used outside of Wizard component
 */
declare function useWizardContext<T extends FieldValues = FieldValues>(): WizardContextValue<T>;
/**
 * Optional hook that returns undefined if outside wizard context
 */
declare function useWizardContextOptional<T extends FieldValues = FieldValues>(): WizardContextValue<T> | undefined;
interface WizardProviderProps<T extends FieldValues> extends WizardProps<T> {
    children: ReactNode;
}
/**
 * Wizard context provider component
 */
declare function WizardProvider<T extends FieldValues>({ children, form, steps, initialStep, onStepChange, validateOnNext, allowJumpToStep, }: WizardProviderProps<T>): react_jsx_runtime.JSX.Element;

/**
 * Individual step indicator component
 *
 * Displays a step with:
 * - Circle with number/icon/checkmark
 * - Optional label
 * - Optional description
 */
declare function WizardStepIndicator({ step, index, state, showNumber, showDescription, size, isClickable, onClick, }: WizardStepIndicatorProps): react_jsx_runtime.JSX.Element;

/**
 * Connector line between wizard steps
 *
 * Changes color based on completion state:
 * - Completed: primary/green color
 * - Pending: muted gray
 */
declare function WizardStepConnector({ isCompleted, variant, className, }: WizardStepConnectorProps): react_jsx_runtime.JSX.Element;

interface FloatingBarProps extends React$1.HTMLAttributes<HTMLDivElement> {
    /** Controls visibility with animation */
    visible?: boolean;
    /** Position on screen */
    position?: 'bottom-center' | 'bottom-left' | 'bottom-right';
    /** Additional classes for the outer positioning wrapper */
    wrapperClassName?: string;
}
declare const actionVariants: (props?: ({
    variant?: "default" | "destructive" | "ghost" | "success" | null | undefined;
    size?: "default" | "sm" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface FloatingBarActionProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof actionVariants> {
    icon?: React$1.ElementType;
}
declare const FloatingBarAction: React$1.ForwardRefExoticComponent<FloatingBarActionProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const iconActionVariants: (props?: ({
    variant?: "default" | "success" | "warning" | "danger" | null | undefined;
    size?: "default" | "sm" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface FloatingBarIconActionProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof iconActionVariants> {
    icon: React$1.ElementType;
    /** Tooltip label (aria-label) */
    label: string;
}
declare const FloatingBarIconAction: React$1.ForwardRefExoticComponent<FloatingBarIconActionProps & React$1.RefAttributes<HTMLButtonElement>>;
interface FloatingBarDividerProps extends React$1.HTMLAttributes<HTMLDivElement> {
}
declare const FloatingBarDivider: React$1.ForwardRefExoticComponent<FloatingBarDividerProps & React$1.RefAttributes<HTMLDivElement>>;
interface FloatingBarCounterProps extends React$1.HTMLAttributes<HTMLSpanElement> {
    count: number;
    /** Singular label */
    label?: string;
    /** Plural label */
    pluralLabel?: string;
}
declare const FloatingBarCounter: React$1.ForwardRefExoticComponent<FloatingBarCounterProps & React$1.RefAttributes<HTMLSpanElement>>;
declare const FloatingBarCompound: React$1.ForwardRefExoticComponent<FloatingBarProps & React$1.RefAttributes<HTMLDivElement>> & {
    Action: React$1.ForwardRefExoticComponent<FloatingBarActionProps & React$1.RefAttributes<HTMLButtonElement>>;
    IconAction: React$1.ForwardRefExoticComponent<FloatingBarIconActionProps & React$1.RefAttributes<HTMLButtonElement>>;
    Divider: React$1.ForwardRefExoticComponent<FloatingBarDividerProps & React$1.RefAttributes<HTMLDivElement>>;
    Counter: React$1.ForwardRefExoticComponent<FloatingBarCounterProps & React$1.RefAttributes<HTMLSpanElement>>;
};

interface LogoProps {
    /** Width of the logo (number for px, string for custom units) */
    width?: number | string;
    /** Color of the logo (defaults to currentColor for theme compatibility) */
    color?: string;
    /** Additional CSS classes */
    className?: string;
}
/**
 * Facter brand logo - SVG component
 *
 * The logo uses currentColor by default, so it inherits the text color
 * from its parent. Use the `color` prop to override, or apply text color
 * classes via `className`.
 *
 * @example
 * // Basic usage (inherits color from parent)
 * <Logo width={32} />
 *
 * // With explicit color class
 * <Logo width={32} className="text-primary" />
 *
 * // With custom color
 * <Logo width={32} color="#ffffff" />
 */
declare function Logo({ width, color, className, }: LogoProps): react_jsx_runtime.JSX.Element;

type ColorScheme = 'green' | 'red' | 'yellow' | 'blue' | 'primary';
type Variant = 'default' | 'compact' | 'mini';
interface StatsCardRootProps extends React$1.HTMLAttributes<HTMLDivElement> {
    colorScheme?: ColorScheme;
    variant?: Variant;
}
declare function StatsCardRoot({ colorScheme, variant, className, children, ...props }: StatsCardRootProps): react_jsx_runtime.JSX.Element;
interface StatsCardHeaderProps extends React$1.HTMLAttributes<HTMLDivElement> {
}
declare function StatsCardHeader({ className, children, ...props }: StatsCardHeaderProps): react_jsx_runtime.JSX.Element;
interface StatsCardIconProps extends React$1.HTMLAttributes<HTMLDivElement> {
    icon: React$1.ComponentType<{
        className?: string;
    }>;
}
declare function StatsCardIcon({ icon: Icon, className, ...props }: StatsCardIconProps): react_jsx_runtime.JSX.Element;
interface StatsCardTitleProps extends React$1.HTMLAttributes<HTMLHeadingElement> {
}
declare function StatsCardTitle({ className, children, ...props }: StatsCardTitleProps): react_jsx_runtime.JSX.Element;
interface StatsCardSubtitleProps extends React$1.HTMLAttributes<HTMLParagraphElement> {
}
declare function StatsCardSubtitle({ className, children, ...props }: StatsCardSubtitleProps): react_jsx_runtime.JSX.Element;
interface StatsCardValueProps extends React$1.HTMLAttributes<HTMLParagraphElement> {
}
declare function StatsCardValue({ className, children, ...props }: StatsCardValueProps): react_jsx_runtime.JSX.Element;
interface StatsCardChangeProps extends React$1.HTMLAttributes<HTMLDivElement> {
    type?: 'positive' | 'negative';
}
declare function StatsCardChange({ type, className, children, ...props }: StatsCardChangeProps): react_jsx_runtime.JSX.Element;
interface ChartDataPoint {
    value: number;
    date: string;
}
interface StatsCardChartProps extends React$1.HTMLAttributes<HTMLDivElement> {
    data: ChartDataPoint[];
    height?: number;
}
declare function StatsCardChart({ data, height, className, ...props }: StatsCardChartProps): react_jsx_runtime.JSX.Element | null;
interface StatsCardContentProps extends React$1.HTMLAttributes<HTMLDivElement> {
}
declare function StatsCardContent({ className, children, ...props }: StatsCardContentProps): react_jsx_runtime.JSX.Element;
interface StatsCardTodayProps extends React$1.HTMLAttributes<HTMLParagraphElement> {
    label?: string;
    type?: 'positive' | 'negative';
}
declare function StatsCardToday({ label, type, className, children, ...props }: StatsCardTodayProps): react_jsx_runtime.JSX.Element;
declare const StatsCard: typeof StatsCardRoot & {
    Header: typeof StatsCardHeader;
    Icon: typeof StatsCardIcon;
    Title: typeof StatsCardTitle;
    Subtitle: typeof StatsCardSubtitle;
    Value: typeof StatsCardValue;
    Change: typeof StatsCardChange;
    Chart: typeof StatsCardChart;
    Content: typeof StatsCardContent;
    Today: typeof StatsCardToday;
};

interface UseAvailableHeightOptions {
    /** Bottom margin in pixels (default: 16) */
    bottomOffset?: number;
    /** Minimum height in pixels (default: 200) */
    minHeight?: number;
    /** Whether the calculation is enabled (default: true) */
    enabled?: boolean;
}
/**
 * Hook that calculates the available height from an element's top position
 * to the bottom of the viewport. Useful for making containers fill remaining space.
 *
 * Recalculates on window resize automatically.
 *
 * @example
 * ```tsx
 * function MyTable() {
 *   const { ref, height } = useAvailableHeight({ bottomOffset: 32 })
 *   return (
 *     <div ref={ref} style={{ maxHeight: height }}>
 *       {content}
 *     </div>
 *   )
 * }
 * ```
 */
declare function useAvailableHeight<T extends HTMLElement = HTMLDivElement>(options?: UseAvailableHeightOptions): {
    ref: React$1.RefObject<T | null>;
    height: number | undefined;
    style: {
        maxHeight: string;
    } | undefined;
};

interface UseAutoPageSizeOptions {
    /** Height of each row in pixels (default: 49) */
    rowHeight?: number;
    /** Extra offset below the table in pixels — pagination, margins, etc (default: 64) */
    bottomOffset?: number;
    /** Minimum rows per page (default: 3) */
    minRows?: number;
    /** Maximum rows per page (default: 50) */
    maxRows?: number;
    /** Whether auto calculation is enabled (default: true) */
    enabled?: boolean;
}
/**
 * Hook that calculates the optimal number of rows per page
 * based on the available viewport height.
 *
 * The ref should point to the element where rows START (e.g. tbody container).
 * The hook measures from ref.top to viewport bottom, subtracts bottomOffset,
 * and divides by rowHeight.
 *
 * If the user manually changes page size, their choice is respected.
 */
declare function useAutoPageSize<T extends HTMLElement = HTMLDivElement>(options?: UseAutoPageSizeOptions): {
    ref: React$1.RefObject<T | null>;
    perPage: number;
    setPerPage: (size: number) => void;
    autoPerPage: number;
    isAutoSized: boolean;
};

type Theme = 'dark' | 'light' | 'system';
interface ThemeProviderProps {
    children: React$1.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
}
interface ThemeProviderState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}
declare function ThemeProvider({ children, defaultTheme, storageKey, ...props }: ThemeProviderProps): react_jsx_runtime.JSX.Element;
declare const useTheme: () => ThemeProviderState;

/**
 * Merge Tailwind CSS classes
 * Combines clsx (conditional classes) with tailwind-merge (deduplicates classes)
 *
 * @example
 * cn('px-4 py-2', isActive && 'bg-primary', className)
 */
declare function cn(...inputs: ClassValue[]): string;

export { AuthLayout, type AuthLayoutBodyProps, type AuthLayoutContentProps, type AuthLayoutDividerProps, type AuthLayoutFooterProps, type AuthLayoutHeaderProps, type AuthLayoutImageProps, type AuthLayoutLinkProps, type AuthLayoutProps, Avatar, AvatarFallback, type AvatarFallbackProps, AvatarImage, type AvatarImageProps, type AvatarProps, Badge, type BadgeProps, type BadgeVariant, type BaseFieldProps, BigNumberCard, type BigNumberCardContentProps, type BigNumberCardHeaderProps, type BigNumberCardLinkProps, type BigNumberCardRootProps, type BigNumberCardSize, type BigNumberCardSparklineProps, type BigNumberCardTitleProps, type BigNumberCardTrendProps, type BigNumberCardValueProps, Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, type ButtonProps, Card, CardContent, type CardContentProps, CardDescription, type CardDescriptionProps, CardFooter, type CardFooterProps, CardHeader, type CardHeaderProps, type CardProps, CardTitle, type CardTitleProps, type ChartDataPoint, Checkbox, type CheckboxProps, type Company, DENSITY_CONFIG, DashboardLayout, type DashboardLayoutBreadcrumbsProps, type DashboardLayoutContentProps, type DashboardLayoutContextValue, type DashboardLayoutHeaderActionsProps, type DashboardLayoutHeaderProps, type DashboardLayoutHeaderTitleProps, type DashboardLayoutHeaderUserProps, type DashboardLayoutMobileNavItemProps, type DashboardLayoutMobileNavProps, type DashboardLayoutProps, type DashboardLayoutSidebarFooterProps, type DashboardLayoutSidebarHeaderProps, type DashboardLayoutSidebarNavGroupProps, type DashboardLayoutSidebarNavItemProps, type DashboardLayoutSidebarNavProps, type DashboardLayoutSidebarProps, type DashboardLayoutSidebarSectionProps, DataTable, type DataTableBulkActionsProps, type DataTableColumnHeaderProps, type DataTableColumnVisibilityProps, type DataTableContentProps, type DataTableContextValue, type DataTableDensity, type DataTableDensityToggleProps, type DataTableEmptyStateProps, type DataTableExportFormat, type DataTableExportProps, type DataTableFilterOption, type DataTableFilterProps, type DataTableFiltersProps, type DataTableLoadingProps, type DataTableMeta, type DataTablePaginationMode, type DataTablePaginationProps, type DataTableProps, type DataTableRowActionsProps, type DataTableSearchProps, type DataTableState, type DataTableTab, type DataTableTabsProps, type DataTableToolbarProps, Dialog, DialogBody, DialogClose, DialogContent, type DialogContentProps, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, DialogWrapper, type DialogWrapperProps, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, EmptyState, type EmptyStateProps, type FieldTooltip, type FieldTooltipConfig, FloatingBarCompound as FloatingBar, FloatingBarAction, type FloatingBarActionProps, FloatingBarCounter, type FloatingBarCounterProps, FloatingBarDivider, type FloatingBarDividerProps, FloatingBarIconAction, type FloatingBarIconActionProps, type FloatingBarProps, Form, FormCheckbox, type FormCheckboxProps, type FormContextValue, FormDescription, type FormDescriptionProps, FormError, type FormErrorProps, type FormFieldContextValue, FormFieldProvider, FormFieldWrapper, type FormFieldWrapperProps, FormInput, type FormInputProps, FormLabel, type FormLabelProps, FormMultiSelect, type FormMultiSelectProps, FormNumberStepper, type FormNumberStepperProps, FormRadioGroup, type FormRadioGroupProps, type FormRootProps, FormSelect, type FormSelectProps, FormSwitch, type FormSwitchProps, FormTextarea, type FormTextareaProps, GlobalLoaderController, Input, type InputProps, ItemCard, ItemCardActionButton, type ItemCardActionButtonProps, ItemCardActions, type ItemCardActionsProps, ItemCardActionsRow, type ItemCardActionsRowProps, ItemCardBadge, type ItemCardBadgeProps, ItemCardContent, ItemCardContentItem, type ItemCardContentItemProps, type ItemCardContentProps, ItemCardEmpty, type ItemCardEmptyProps, ItemCardFooter, ItemCardFooterDivider, type ItemCardFooterDividerProps, ItemCardFooterItem, type ItemCardFooterItemProps, type ItemCardFooterProps, ItemCardHeader, type ItemCardHeaderProps, ItemCardIcon, type ItemCardIconProps, ItemCardRoot, type ItemCardRootProps, ItemCardSubtitle, type ItemCardSubtitleProps, ItemCardTitle, ItemCardTitleGroup, type ItemCardTitleGroupProps, type ItemCardTitleProps, Kanban, type KanbanBoardProps, type KanbanCardProps, type KanbanColumnConfig, type KanbanColumnProps, type KanbanContextValue, type KanbanDragResult, type KanbanEmptyProps, type KanbanItem, Loader, type LoaderProps, LoaderProvider, Logo, type LogoProps, type MaskType, MobileNav, type MobileNavFabAction, MobileNavItem, type MobileNavItemConfig, type MobileNavItemProps, type MobileNavProps, Navbar, NavbarCompanyProfile, type NavbarCompanyProfileProps, NavbarNotification, type NavbarNotificationProps, type NavbarProps, NavbarUserMenu, type NavbarUserMenuProps, type NotificationItem, NumberStepper, type NumberStepperProps, PageHeader, type PageHeaderProps, type PaginatedResponse, type PaginationMeta, type PaginationParams, Popover, PopoverContent, PopoverTrigger, type RadioOption, type RadioOptionColor, RippleBackground, type RippleBackgroundProps, RippleEffect, type RippleEffectProps, RippleWrapper, type RippleWrapperProps, ScrollArea, ScrollBar, SectionHeader, SectionHeaderActions, type SectionHeaderActionsProps, SectionHeaderBadge, type SectionHeaderBadgeProps, SectionHeaderContent, type SectionHeaderContentProps, SectionHeaderIcon, type SectionHeaderIconProps, SectionHeaderRoot, type SectionHeaderRootProps, SectionHeaderSubtitle, type SectionHeaderSubtitleProps, SectionHeaderTitle, type SectionHeaderTitleProps, Select, SelectGroup, SelectItem, type SelectItemProps, SelectLabel, type SelectOption, type SelectProps, SelectSeparator, SelectionLayout, type SelectionLayoutCardProps, type SelectionLayoutEmptyProps, type SelectionLayoutHeaderProps, type SelectionLayoutHeadlineProps, type SelectionLayoutListProps, type SelectionLayoutLogoProps, type SelectionLayoutMainProps, type SelectionLayoutProps, type SelectionLayoutSearchProps, type SelectionLayoutSidebarProps, type SelectionLayoutStatsProps, type SelectionLayoutTabProps, type SelectionLayoutTabsProps, Separator, Sidebar, type SidebarContextValue, type SidebarFooterMenuItem, type SidebarFooterProps, type SidebarFooterUser, type SidebarHeaderProps, type SidebarNavGroupProps, type SidebarNavItemProps, type SidebarNavProps, type SidebarProps, type SidebarSectionProps, SimpleTooltip, type SimpleTooltipProps, Skeleton, type SkeletonProps, Sparkline, type SparklineColor, StatsCard, type StatsCardChangeProps, type StatsCardChartProps, type ColorScheme as StatsCardColorScheme, type StatsCardContentProps, type StatsCardHeaderProps, type StatsCardIconProps, type StatsCardRootProps, type StatsCardSubtitleProps, type StatsCardTitleProps, type StatsCardTodayProps, type StatsCardValueProps, type Variant as StatsCardVariant, type StepState, Switch, type SwitchProps, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger, Textarea, type TextareaProps, ThemeProvider, ThemeToggle, type ThemeToggleProps, Toaster, type ToasterProps, Tooltip, TooltipAction, type TooltipActionProps, TooltipActions, type TooltipActionsProps, TooltipArrow, TooltipContent, type TooltipContentProps, TooltipDescription, type TooltipDescriptionProps, TooltipHeader, type TooltipHeaderProps, TooltipIcon, type TooltipIconProps, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTitle, type TooltipTitleProps, TooltipTrigger, type UseDataTableConfig, type UserMenuItemConfig, type ValidationSchema, Wizard, WizardContent, type WizardContentProps, type WizardContextValue, WizardNavigation, type WizardNavigationProps, WizardPanel, type WizardPanelProps, WizardProgress, type WizardProgressProps, type WizardProps, WizardProvider, type WizardStepConfig, WizardStepConnector, type WizardStepConnectorProps, WizardStepIndicator, type WizardStepIndicatorProps, WizardSteps, type WizardStepsProps, cn, itemCardBadgeVariants, itemCardIconVariants, itemCardVariants, loader, toast, useAutoPageSize, useAvailableHeight, useDashboardLayout, useDataTable, useDataTableColumnVisibility, useDataTableDensity, useDataTableEmpty, useDataTableInstance, useDataTableLoading, useDataTableMeta, useDataTablePagination, useDataTableSelection, useDataTableSorting, useDataTableState, useDebounce, useDebouncedCallback, useFormFieldContext, useItemCard, useKanban, useKanbanOptional, useLoader, useMediaQuery, useSidebar, useSidebarOptional, useTheme, useWizardContext, useWizardContextOptional };
