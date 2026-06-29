"use client";
import * as React10 from 'react';
import { createContext, useRef, useState, useCallback, useEffect, Children, isValidElement, useMemo, useContext } from 'react';
import { Loader2, ChevronDown, Check, Inbox, Search, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, X, Circle, PinOff, Pin, ArrowDown, ArrowUp, ChevronsUpDown, FileText, FileSpreadsheet, Download, Rows4, Rows3, LayoutList, SlidersHorizontal, Info, AlertTriangle, XCircle, CheckCircle2, Building2, Star, ArrowRight, User, LogOut, Menu, AlertCircle, TrendingUp, TrendingDown, Sun, Moon, Bell, MoreHorizontal, Settings } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { AnimatePresence, motion } from 'framer-motion';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { flexRender, useReactTable, getSortedRowModel, getPaginationRowModel, getFilteredRowModel, getCoreRowModel } from '@tanstack/react-table';
export { flexRender } from '@tanstack/react-table';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { toast as toast$1, Toaster as Toaster$1 } from 'sonner';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { FormProvider, useFormContext, Controller } from 'react-hook-form';
export { FormProvider, useFormContext } from 'react-hook-form';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { Slot } from '@radix-ui/react-slot';
import { ResponsiveContainer, AreaChart, Tooltip as Tooltip$1, Area } from 'recharts';

// src/components/Button/Button.tsx
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
var buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-primary/15 text-primary hover:bg-primary/25",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = React10.forwardRef(
  ({ className, variant, size, isLoading = false, loadingText, children, disabled, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "button",
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        disabled: disabled || isLoading,
        ...props,
        children: isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin shrink-0" }),
          loadingText ?? children
        ] }) : children
      }
    );
  }
);
Button.displayName = "Button";
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      ),
      ...props
    }
  );
}
Card.displayName = "Card";
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("flex flex-col space-y-1.5 p-6", className),
      ...props
    }
  );
}
CardHeader.displayName = "CardHeader";
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "h3",
    {
      className: cn(
        "text-2xl font-semibold leading-none tracking-tight font-heading",
        className
      ),
      ...props
    }
  );
}
CardTitle.displayName = "CardTitle";
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "p",
    {
      className: cn("text-sm text-muted-foreground", className),
      ...props
    }
  );
}
CardDescription.displayName = "CardDescription";
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("p-6 pt-0", className), ...props });
}
CardContent.displayName = "CardContent";
function CardFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("flex items-center p-6 pt-0", className),
      ...props
    }
  );
}
CardFooter.displayName = "CardFooter";
var inputVariants = cva(
  "w-full h-12 px-3 pt-4 pb-2 text-sm bg-background rounded-md border-2 transition-colors focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-border focus:border-primary",
        error: "border-red-500 focus:border-red-600"
      },
      inputSize: {
        default: "h-12",
        sm: "h-10 pt-3 pb-1",
        lg: "h-14 pt-5 pb-2"
      }
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default"
    }
  }
);
var Input = React10.forwardRef(
  ({
    className,
    variant,
    inputSize,
    error,
    type = "text",
    label,
    icon: Icon2,
    required,
    labelSuffix,
    containerClassName,
    labelClassName,
    ...props
  }, ref) => {
    const inputRef = React10.useRef(null);
    const [showPassword, setShowPassword] = React10.useState(false);
    React10.useImperativeHandle(ref, () => inputRef.current, []);
    const focusInput = React10.useCallback(() => {
      inputRef.current?.focus();
    }, []);
    const togglePasswordVisibility = React10.useCallback(() => {
      setShowPassword((prev) => !prev);
    }, []);
    const inputType = type === "password" ? showPassword ? "text" : "password" : type;
    return /* @__PURE__ */ jsxs("div", { className: cn("relative", containerClassName), children: [
      Icon2 && /* @__PURE__ */ jsx(
        Icon2,
        {
          className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 cursor-pointer z-10",
          onClick: focusInput
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: inputType,
          className: cn(
            inputVariants({
              variant: error ? "error" : variant,
              inputSize
            }),
            !label && "h-9 pt-0 pb-0 py-2",
            Icon2 && "pl-10",
            type === "password" && "pr-11",
            className
          ),
          ref: inputRef,
          ...props
        }
      ),
      label && /* @__PURE__ */ jsxs(
        "label",
        {
          className: cn(
            "absolute left-3 top-[-6px] text-xs font-medium bg-background px-1 cursor-pointer inline-flex items-center gap-1",
            error ? "text-red-500" : "text-foreground",
            Icon2 && "left-10",
            labelClassName
          ),
          onClick: focusInput,
          children: [
            label,
            required && /* @__PURE__ */ jsx("span", { className: "text-red-500 ml-0.5", children: "*" }),
            labelSuffix
          ]
        }
      ),
      type === "password" && /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: togglePasswordVisibility,
          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10",
          "aria-label": showPassword ? "Ocultar senha" : "Mostrar senha",
          children: showPassword ? /* @__PURE__ */ jsxs(
            "svg",
            {
              className: "h-5 w-5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              children: [
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsx(
            "svg",
            {
              className: "h-5 w-5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                }
              )
            }
          )
        }
      )
    ] });
  }
);
Input.displayName = "Input";
var badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-primary/15 bg-primary/5 text-primary hover:bg-primary/15",
        secondary: "border-secondary/15 bg-secondary/80 text-secondary-foreground hover:bg-secondary/70",
        success: "border-green-500/15 bg-green-500/5 text-green-600 dark:text-green-400 hover:bg-green-500/15",
        warning: "border-yellow-500/15 bg-yellow-500/5 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/15",
        error: "border-red-500/15 bg-red-500/5 text-red-600 dark:text-red-400 hover:bg-red-500/15",
        info: "border-blue-500/15 bg-blue-500/5 text-blue-600 dark:text-blue-400 hover:bg-blue-500/15",
        outline: "border-border text-foreground hover:bg-muted"
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-3 py-1 text-sm"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Badge({ className, variant, size, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant, size }), className), ...props });
}
Badge.displayName = "Badge";
var colorClasses = {
  "chart-1": "text-chart-1",
  "chart-2": "text-chart-2",
  "chart-3": "text-chart-3",
  "chart-4": "text-chart-4",
  "chart-5": "text-chart-5"
};
function generateSmoothPath(points) {
  if (points.length < 2) return "";
  if (points.length === 2) {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
  }
  let path = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const tension = 0.3;
    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;
    path += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return path;
}
function Sparkline({
  data,
  color = "chart-1",
  animate = true,
  className,
  show = true
}) {
  const gradientId = React10.useId();
  const { linePath, areaPath } = React10.useMemo(() => {
    if (data.length < 2) {
      return { linePath: "", areaPath: "" };
    }
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const points = data.map((value, index) => ({
      x: index / (data.length - 1) * 100,
      y: 100 - (value - min) / range * 70 - 15
      // 15% padding top, 15% bottom
    }));
    const line = generateSmoothPath(points);
    const area = `${line} L 100 100 L 0 100 Z`;
    return { linePath: line, areaPath: area };
  }, [data]);
  if (!show || data.length < 2) {
    return null;
  }
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      viewBox: "0 0 100 100",
      preserveAspectRatio: "none",
      className: cn("w-full h-16", colorClasses[color], className),
      children: [
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: gradientId, x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "currentColor", stopOpacity: "0.3" }),
          /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "currentColor", stopOpacity: "0" })
        ] }) }),
        /* @__PURE__ */ jsx(
          motion.path,
          {
            d: areaPath,
            fill: `url(#${gradientId})`,
            initial: animate ? { opacity: 0 } : void 0,
            animate: { opacity: 1 },
            transition: { duration: 0.5, delay: 0.3 }
          }
        ),
        /* @__PURE__ */ jsx(
          motion.path,
          {
            d: linePath,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            vectorEffect: "non-scaling-stroke",
            initial: animate ? { pathLength: 0 } : void 0,
            animate: { pathLength: 1 },
            transition: { duration: 0.8, ease: "easeOut" }
          }
        )
      ]
    }
  );
}
Sparkline.displayName = "BigNumberCard.Sparkline";
var rootVariants = cva(
  "relative overflow-hidden rounded-xl border border-border bg-card shadow-sm min-h-[140px]",
  {
    variants: {
      size: {
        default: "p-5 pb-14",
        sm: "p-4 pb-12",
        lg: "p-6 pb-16"
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
);
function BigNumberCardRoot({ children, className, size }) {
  return /* @__PURE__ */ jsx("div", { className: cn(rootVariants({ size }), className), children });
}
BigNumberCardRoot.displayName = "BigNumberCard.Root";
function BigNumberCardHeader({ children, className }) {
  return /* @__PURE__ */ jsx("div", { className: cn("flex items-center justify-between", className), children });
}
BigNumberCardHeader.displayName = "BigNumberCard.Header";
function BigNumberCardTitle({ children, className }) {
  return /* @__PURE__ */ jsx("span", { className: cn("text-sm font-medium text-muted-foreground", className), children });
}
BigNumberCardTitle.displayName = "BigNumberCard.Title";
function BigNumberCardLink({ children, href, onClick, className }) {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };
  return /* @__PURE__ */ jsx(
    "a",
    {
      href: href ?? "#",
      onClick: handleClick,
      className: cn(
        "text-xs font-medium text-primary hover:text-primary/80 hover:underline transition-colors",
        className
      ),
      children
    }
  );
}
BigNumberCardLink.displayName = "BigNumberCard.Link";
function BigNumberCardContent({ children, className }) {
  return /* @__PURE__ */ jsx("div", { className: cn("mt-3 space-y-1", className), children });
}
BigNumberCardContent.displayName = "BigNumberCard.Content";
function BigNumberCardValue({ children, prefix, suffix, className }) {
  return /* @__PURE__ */ jsxs("div", { className: cn("mt-3 text-3xl font-bold tracking-tight text-foreground", className), children: [
    prefix && /* @__PURE__ */ jsx("span", { className: "text-2xl", children: prefix }),
    children,
    suffix && /* @__PURE__ */ jsx("span", { className: "text-2xl ml-0.5", children: suffix })
  ] });
}
BigNumberCardValue.displayName = "BigNumberCard.Value";
function BigNumberCardTrend({ value, direction, children, className, show = true }) {
  if (!show) {
    return null;
  }
  const isUp = direction === "up";
  const Icon2 = isUp ? TrendingUp : TrendingDown;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "mt-2 flex items-center gap-1.5 text-sm",
        isUp ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400",
        className
      ),
      children: [
        /* @__PURE__ */ jsx(Icon2, { className: "h-4 w-4 flex-shrink-0" }),
        /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
          isUp ? "+" : "",
          value.toFixed(1),
          "%"
        ] }),
        children && /* @__PURE__ */ jsx("span", { className: "text-muted-foreground font-normal", children })
      ]
    }
  );
}
BigNumberCardTrend.displayName = "BigNumberCard.Trend";
function BigNumberCardDescription({ children, className, show = true }) {
  if (!show) {
    return null;
  }
  return /* @__PURE__ */ jsx("p", { className: cn("mt-1 text-xs text-muted-foreground", className), children });
}
BigNumberCardDescription.displayName = "BigNumberCard.Description";
function BigNumberCardSparklineWrapper(props) {
  const { show = true, ...rest } = props;
  if (!show) {
    return null;
  }
  return /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-16 opacity-80", children: /* @__PURE__ */ jsx(Sparkline, { ...rest, show }) });
}
BigNumberCardSparklineWrapper.displayName = "BigNumberCard.Sparkline";
var BigNumberCard = {
  Root: BigNumberCardRoot,
  Header: BigNumberCardHeader,
  Title: BigNumberCardTitle,
  Link: BigNumberCardLink,
  Content: BigNumberCardContent,
  Value: BigNumberCardValue,
  Trend: BigNumberCardTrend,
  Description: BigNumberCardDescription,
  Sparkline: BigNumberCardSparklineWrapper
};
function Skeleton({
  className,
  variant = "default",
  animation = "pulse",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "bg-muted",
        {
          "rounded-md": variant === "default",
          "rounded-full": variant === "circular",
          "rounded h-4": variant === "text",
          "animate-pulse": animation === "pulse",
          "animate-shimmer": animation === "wave"
        },
        className
      ),
      ...props
    }
  );
}
Skeleton.displayName = "Skeleton";
var selectVariants = cva(
  "w-full h-12 px-3 pt-4 pb-2 text-sm bg-background rounded-md border-2 transition-colors focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-border focus:border-primary",
        error: "border-red-500 focus:border-red-600"
      },
      selectSize: {
        default: "h-12",
        sm: "h-10 pt-3 pb-1",
        lg: "h-14 pt-5 pb-2"
      }
    },
    defaultVariants: {
      variant: "default",
      selectSize: "default"
    }
  }
);
var Select = React10.forwardRef(
  ({
    className,
    variant,
    selectSize,
    error,
    label,
    icon: Icon2,
    required,
    containerClassName,
    labelClassName,
    placeholder,
    children,
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsxs(SelectPrimitive.Root, { ...props, children: [
      /* @__PURE__ */ jsxs("div", { className: cn("relative", containerClassName), children: [
        Icon2 && /* @__PURE__ */ jsx(Icon2, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 z-10 pointer-events-none" }),
        /* @__PURE__ */ jsxs(
          SelectPrimitive.Trigger,
          {
            ref,
            className: cn(
              selectVariants({
                variant: error ? "error" : variant,
                selectSize
              }),
              !label && "h-9 pt-0 pb-0 py-2",
              Icon2 && "pl-10",
              "flex items-center justify-between",
              className
            ),
            children: [
              /* @__PURE__ */ jsx(SelectPrimitive.Value, { placeholder }),
              /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
            ]
          }
        ),
        label && /* @__PURE__ */ jsxs(
          "label",
          {
            className: cn(
              "absolute left-3 top-[-6px] text-xs font-medium bg-background px-1 pointer-events-none",
              error ? "text-red-500" : "text-foreground",
              Icon2 && "left-10",
              labelClassName
            ),
            children: [
              label,
              required && /* @__PURE__ */ jsx("span", { className: "text-red-500 ml-0.5", children: "*" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsx(
        SelectPrimitive.Content,
        {
          className: cn(
            "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          ),
          position: "popper",
          sideOffset: 4,
          children: /* @__PURE__ */ jsx(SelectPrimitive.Viewport, { className: "p-1", children })
        }
      ) })
    ] });
  }
);
Select.displayName = "Select";
var SelectItem = React10.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = "SelectItem";
var SelectGroup = SelectPrimitive.Group;
var SelectLabel = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = "SelectLabel";
var SelectSeparator = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = "SelectSeparator";
var Tabs = TabsPrimitive.Root;
var TabsList = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-12 items-center gap-6 border-b border-border",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
var TabsTrigger = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap px-1 py-3 text-sm font-medium text-muted-foreground ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:-mb-px",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
var TabsContent = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
var loaderVariants = cva("flex items-center justify-center backdrop-blur-sm", {
  variants: {
    variant: {
      default: "",
      spinner: "",
      dots: "",
      pulse: "",
      bars: ""
    },
    scope: {
      global: "fixed inset-0 z-[9999]",
      local: "absolute inset-0 z-50"
    }
  },
  defaultVariants: {
    variant: "default",
    scope: "global"
  }
});
var containerVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 }
};
function SpinnerLoader() {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "h-12 w-12 rounded-full border-4 border-primary border-t-transparent",
      animate: { rotate: 360 },
      transition: { duration: 1, repeat: Infinity, ease: "linear" }
    }
  );
}
function DotsLoader() {
  return /* @__PURE__ */ jsx("div", { className: "flex space-x-2", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "h-3 w-3 rounded-full bg-primary",
      initial: { scale: 0 },
      animate: { scale: [0, 1, 0] },
      transition: {
        duration: 1,
        repeat: Infinity,
        delay: i * 0.2,
        ease: "easeInOut"
      }
    },
    i
  )) });
}
function PulseLoader() {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "h-12 w-12 rounded-full bg-primary/20",
      initial: { scale: 0.8 },
      animate: { scale: 1, opacity: [1, 0.5, 1] },
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      },
      children: /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "h-full w-full rounded-full bg-primary/40",
          initial: { scale: 0.8 },
          animate: { scale: 1, opacity: [1, 0, 1] },
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2
          }
        }
      )
    }
  );
}
function BarsLoader() {
  return /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-1", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "h-8 w-1 rounded-full bg-primary",
      initial: { scaleY: 0.3 },
      animate: { scaleY: [0.3, 1, 0.3] },
      transition: {
        duration: 0.8,
        repeat: Infinity,
        delay: i * 0.1,
        ease: "easeInOut"
      }
    },
    i
  )) });
}
var Loader = React10.forwardRef(
  ({
    variant = "default",
    message,
    scope = "global",
    isTransparentBg = true,
    show = true,
    ...props
  }, ref) => {
    const loaderComponents = {
      default: /* @__PURE__ */ jsx(SpinnerLoader, {}),
      spinner: /* @__PURE__ */ jsx(SpinnerLoader, {}),
      dots: /* @__PURE__ */ jsx(DotsLoader, {}),
      pulse: /* @__PURE__ */ jsx(PulseLoader, {}),
      bars: /* @__PURE__ */ jsx(BarsLoader, {})
    };
    if (!show) return null;
    return /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsx(
      motion.div,
      {
        ref,
        className: cn(
          loaderVariants({ variant, scope }),
          isTransparentBg ? "bg-background/90" : "bg-background"
        ),
        initial: "initial",
        animate: "animate",
        exit: "exit",
        variants: containerVariants,
        transition: { duration: 0.2 },
        ...props,
        children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4", children: [
          loaderComponents[variant || "default"],
          message && /* @__PURE__ */ jsx(
            motion.p,
            {
              className: "text-lg text-muted-foreground",
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -10 },
              transition: { delay: 0.1 },
              children: message
            }
          )
        ] })
      }
    ) });
  }
);
Loader.displayName = "Loader";
var LoaderContext = React10.createContext(
  void 0
);
function LoaderProvider({ children }) {
  const [isLoading, setIsLoading] = React10.useState(false);
  const [loaderOptions, setLoaderOptions] = React10.useState({});
  const show = React10.useCallback((options = {}) => {
    setLoaderOptions(options);
    setIsLoading(true);
  }, []);
  const hide = React10.useCallback(() => {
    setIsLoading(false);
    setTimeout(() => setLoaderOptions({}), 300);
  }, []);
  const value = React10.useMemo(
    () => ({ show, hide, isLoading }),
    [show, hide, isLoading]
  );
  return /* @__PURE__ */ jsxs(LoaderContext.Provider, { value, children: [
    children,
    isLoading && /* @__PURE__ */ jsx(
      Loader,
      {
        variant: loaderOptions.variant,
        message: loaderOptions.message,
        scope: loaderOptions.scope,
        isTransparentBg: loaderOptions.isTransparentBg,
        show: isLoading
      }
    )
  ] });
}
function useLoader() {
  const context = React10.useContext(LoaderContext);
  if (context === void 0) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
}
var globalLoaderController = null;
function setGlobalLoader(controller) {
  globalLoaderController = controller;
}
var loader = {
  show: (options) => {
    if (globalLoaderController) {
      globalLoaderController.show(options);
    } else {
      console.warn(
        "Loader: GlobalLoaderController not initialized. Wrap your app with LoaderProvider."
      );
    }
  },
  hide: () => {
    if (globalLoaderController) {
      globalLoaderController.hide();
    } else {
      console.warn(
        "Loader: GlobalLoaderController not initialized. Wrap your app with LoaderProvider."
      );
    }
  }
};
function GlobalLoaderController() {
  const loaderController = useLoader();
  React10.useEffect(() => {
    setGlobalLoader(loaderController);
    return () => {
      setGlobalLoader(null);
    };
  }, [loaderController]);
  return null;
}
var emptyStateVariants = cva(
  "flex items-center justify-center p-8 text-center w-full",
  {
    variants: {
      layout: {
        vertical: "flex-col",
        horizontal: "flex-row gap-4 px-4 py-3"
      }
    },
    defaultVariants: {
      layout: "vertical"
    }
  }
);
var iconWrapperVariants = cva("rounded-full bg-primary/5", {
  variants: {
    size: {
      default: "mb-3 p-6",
      sm: "mb-4 p-3"
    },
    layout: {
      vertical: "",
      horizontal: "mb-0"
    }
  },
  defaultVariants: {
    size: "default",
    layout: "vertical"
  }
});
var iconVariants = cva("text-primary", {
  variants: {
    size: {
      default: "h-10 w-10",
      sm: "h-8 w-8"
    }
  },
  defaultVariants: {
    size: "default"
  }
});
var titleVariants = cva("font-semibold text-foreground", {
  variants: {
    size: {
      default: "text-lg",
      sm: "text-base"
    }
  },
  defaultVariants: {
    size: "default"
  }
});
var descriptionVariants = cva("text-muted-foreground", {
  variants: {
    size: {
      default: "mb-6 text-sm",
      sm: "mb-4 text-xs"
    },
    layout: {
      vertical: "",
      horizontal: "mb-0"
    }
  },
  defaultVariants: {
    size: "default",
    layout: "vertical"
  }
});
var defaultDescriptionMessage = "N\xE3o se preocupe, isso \xE9 normal quando n\xE3o h\xE1 itens para exibir.";
var containerAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};
var iconAnimation = {
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.9 }
};
var EmptyStateContent = React10.memo(
  ({
    message = "Nenhum item encontrado",
    description,
    icon: IconComponent = Inbox,
    actionLabel,
    onAction,
    hideDescription = false,
    size = "default",
    layout = "vertical",
    className
  }) => {
    const handleAction = React10.useCallback(() => {
      if (onAction) {
        onAction();
      }
    }, [onAction]);
    return /* @__PURE__ */ jsxs("div", { className: cn(emptyStateVariants({ layout }), className), children: [
      /* @__PURE__ */ jsx("div", { className: iconWrapperVariants({ size, layout }), children: /* @__PURE__ */ jsx(
        IconComponent,
        {
          className: iconVariants({ size }),
          "aria-hidden": "true"
        }
      ) }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: cn(
            layout === "horizontal" && "flex flex-col items-start text-left"
          ),
          children: [
            /* @__PURE__ */ jsx("h3", { className: titleVariants({ size }), children: message }),
            !hideDescription && /* @__PURE__ */ jsx("p", { className: descriptionVariants({ size, layout }), children: description || defaultDescriptionMessage })
          ]
        }
      ),
      actionLabel && onAction && /* @__PURE__ */ jsx(Button, { onClick: handleAction, className: "mt-2", children: actionLabel })
    ] });
  }
);
EmptyStateContent.displayName = "EmptyStateContent";
var AnimatedEmptyState = React10.memo((props) => {
  const {
    message = "Nenhum item encontrado",
    description,
    icon: IconComponent = Inbox,
    actionLabel,
    onAction,
    hideDescription = false,
    size = "default",
    layout = "vertical",
    className
  } = props;
  const handleAction = React10.useCallback(() => {
    if (onAction) {
      onAction();
    }
  }, [onAction]);
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      ...containerAnimation,
      className: cn(emptyStateVariants({ layout }), className),
      children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            ...iconAnimation,
            className: iconWrapperVariants({ size, layout }),
            children: /* @__PURE__ */ jsx(
              IconComponent,
              {
                className: iconVariants({ size }),
                "aria-hidden": "true"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: cn(
              layout === "horizontal" && "flex flex-col items-start text-left"
            ),
            children: [
              /* @__PURE__ */ jsx("h3", { className: titleVariants({ size }), children: message }),
              !hideDescription && /* @__PURE__ */ jsx("p", { className: descriptionVariants({ size, layout }), children: description || defaultDescriptionMessage })
            ]
          }
        ),
        actionLabel && onAction && /* @__PURE__ */ jsx(Button, { onClick: handleAction, className: "mt-2", children: actionLabel })
      ]
    }
  );
});
AnimatedEmptyState.displayName = "AnimatedEmptyState";
var EmptyState = React10.memo(
  ({ animated = true, ...props }) => {
    if (!animated) {
      return /* @__PURE__ */ jsx(EmptyStateContent, { ...props });
    }
    return /* @__PURE__ */ jsx(AnimatedEmptyState, { ...props });
  }
);
EmptyState.displayName = "EmptyState";
function useDataTableInternal({
  data,
  columns,
  getRowId,
  manualPagination = false,
  pageCount: externalPageCount,
  initialPageSize = 10,
  onPaginationChange: onPaginationChangeProp
}) {
  const [rowSelection, setRowSelection] = React10.useState({});
  const [columnVisibility, setColumnVisibility] = React10.useState({});
  const [columnFilters, setColumnFilters] = React10.useState([]);
  const [sorting, setSorting] = React10.useState([]);
  const [globalFilter, setGlobalFilter] = React10.useState("");
  const [density, setDensity] = React10.useState("default");
  const [pagination, setPagination] = React10.useState({
    pageIndex: 0,
    pageSize: initialPageSize
  });
  const table = useReactTable({
    data,
    columns,
    getRowId,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
      globalFilter
    },
    // Features
    enableRowSelection: true,
    enableSorting: true,
    enableFilters: true,
    enableGlobalFilter: true,
    // Server-side pagination support
    manualPagination,
    pageCount: manualPagination ? externalPageCount : void 0,
    // Handlers
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    // Row Models
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel()
  });
  React10.useEffect(() => {
    if (onPaginationChangeProp) {
      onPaginationChangeProp({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize
      });
    }
  }, [pagination.pageIndex, pagination.pageSize, onPaginationChangeProp]);
  const meta = React10.useMemo(
    () => ({
      isLoading: false,
      // Loading é controlado externamente via DataTable.Loading
      isEmpty: data.length === 0,
      selectedRowCount: Object.keys(rowSelection).length,
      totalRows: data.length,
      density
    }),
    [data.length, rowSelection, density]
  );
  return {
    table,
    meta,
    density,
    setDensity,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize
  };
}
var DataTableLoadingContext = React10.createContext(null);
var DataTableEmptyStateConfigContext = React10.createContext(null);
var DataTableInstanceContext = React10.createContext(null);
DataTableInstanceContext.displayName = "DataTableInstanceContext";
var DataTableMetaContext = React10.createContext(null);
DataTableMetaContext.displayName = "DataTableMetaContext";
var DataTableDensityContext = React10.createContext(null);
DataTableDensityContext.displayName = "DataTableDensityContext";
var DataTablePaginationContext = React10.createContext(null);
DataTablePaginationContext.displayName = "DataTablePaginationContext";
function DataTableProvider({
  children,
  table,
  meta,
  density,
  setDensity,
  pageIndex,
  pageSize
}) {
  const [isLoading, setIsLoading] = React10.useState(false);
  const [skeletonRows, setSkeletonRows] = React10.useState(5);
  const loadingValue = React10.useMemo(
    () => ({ isLoading, setIsLoading, skeletonRows, setSkeletonRows }),
    [isLoading, skeletonRows]
  );
  const [emptyStateConfig, setEmptyStateConfig] = React10.useState({});
  const emptyStateValue = React10.useMemo(
    () => ({ config: emptyStateConfig, setConfig: setEmptyStateConfig }),
    [emptyStateConfig]
  );
  const metaValue = React10.useMemo(
    () => meta,
    [meta.isLoading, meta.isEmpty, meta.selectedRowCount, meta.totalRows, meta.density]
  );
  const densityValue = React10.useMemo(
    () => ({ density, setDensity }),
    [density, setDensity]
  );
  const paginationValue = React10.useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize]
  );
  const tableValue = table;
  return /* @__PURE__ */ jsx(DataTableLoadingContext.Provider, { value: loadingValue, children: /* @__PURE__ */ jsx(DataTableEmptyStateConfigContext.Provider, { value: emptyStateValue, children: /* @__PURE__ */ jsx(DataTableInstanceContext.Provider, { value: tableValue, children: /* @__PURE__ */ jsx(DataTableMetaContext.Provider, { value: metaValue, children: /* @__PURE__ */ jsx(DataTableDensityContext.Provider, { value: densityValue, children: /* @__PURE__ */ jsx(DataTablePaginationContext.Provider, { value: paginationValue, children }) }) }) }) }) });
}
function useDataTable() {
  const context = React10.useContext(DataTableInstanceContext);
  if (!context) {
    throw new Error(
      "useDataTable must be used within <DataTable>. Make sure your component is wrapped with DataTable."
    );
  }
  return context;
}
function useDataTableMeta() {
  const context = React10.useContext(DataTableMetaContext);
  if (!context) {
    throw new Error(
      "useDataTableMeta must be used within <DataTable>. Make sure your component is wrapped with DataTable."
    );
  }
  return context;
}
function useDataTableLoading() {
  const meta = useDataTableMeta();
  return meta.isLoading;
}
function useDataTableEmpty() {
  const meta = useDataTableMeta();
  return meta.isEmpty;
}
function useDataTableSelection() {
  const table = useDataTable();
  return React10.useMemo(() => {
    return table.getSelectedRowModel().rows.map((row) => row.original);
  }, [table.getSelectedRowModel().rows]);
}
function useDataTableDensity() {
  const context = React10.useContext(DataTableDensityContext);
  if (!context) {
    throw new Error(
      "useDataTableDensity must be used within <DataTable>. Make sure your component is wrapped with DataTable."
    );
  }
  return context;
}
function useDataTablePaginationContext() {
  const context = React10.useContext(DataTablePaginationContext);
  if (!context) {
    throw new Error(
      "useDataTablePagination must be used within <DataTable>. Make sure your component is wrapped with DataTable."
    );
  }
  return context;
}
function useDataTablePagination() {
  const table = useDataTable();
  const { pageIndex, pageSize } = useDataTablePaginationContext();
  return React10.useMemo(() => {
    const pageCount = table.getPageCount();
    return {
      pageIndex,
      pageSize,
      pageCount,
      canPreviousPage: pageIndex > 0,
      canNextPage: pageIndex < pageCount - 1,
      setPageIndex: (index) => table.setPageIndex(index),
      setPageSize: (size) => table.setPageSize(size),
      previousPage: () => table.previousPage(),
      nextPage: () => table.nextPage(),
      firstPage: () => table.setPageIndex(0),
      lastPage: () => table.setPageIndex(pageCount - 1)
    };
  }, [table, pageIndex, pageSize]);
}
function useDataTableSorting() {
  const table = useDataTable();
  const sorting = table.getState().sorting;
  return React10.useMemo(() => ({
    sorting,
    setSorting: table.setSorting,
    clearSorting: () => table.resetSorting(),
    toggleSort: (columnId) => {
      const column = table.getColumn(columnId);
      column?.toggleSorting();
    }
  }), [table, sorting]);
}
function useDataTableColumnVisibility() {
  const table = useDataTable();
  const columnVisibility = table.getState().columnVisibility;
  return React10.useMemo(() => ({
    columnVisibility,
    setColumnVisibility: table.setColumnVisibility,
    toggleColumn: (columnId) => {
      const column = table.getColumn(columnId);
      column?.toggleVisibility();
    },
    getAllColumns: () => table.getAllColumns().filter((col) => col.getCanHide())
  }), [table, columnVisibility]);
}
function useDataTableLoadingState() {
  const context = React10.useContext(DataTableLoadingContext);
  if (!context) {
    throw new Error(
      "useDataTableLoadingState must be used within <DataTable>."
    );
  }
  return context;
}
function useDataTableEmptyStateConfig() {
  const context = React10.useContext(DataTableEmptyStateConfigContext);
  if (!context) {
    throw new Error(
      "useDataTableEmptyStateConfig must be used within <DataTable>."
    );
  }
  return context;
}
var useDataTableInstance = useDataTable;
var useDataTableState = useDataTableMeta;
function DataTableRoot({
  children,
  data,
  columns,
  getRowId,
  manualPagination,
  pageCount,
  initialPageSize,
  onPaginationChange,
  className
}) {
  const { table, meta, density, setDensity, pageIndex, pageSize } = useDataTableInternal({
    data,
    columns,
    getRowId,
    manualPagination,
    pageCount,
    initialPageSize,
    onPaginationChange
  });
  return /* @__PURE__ */ jsx(
    DataTableProvider,
    {
      table,
      meta,
      density,
      setDensity,
      pageIndex,
      pageSize,
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: cn("w-full space-y-4", className),
          "data-density": density,
          children
        }
      )
    }
  );
}
DataTableRoot.displayName = "DataTable";

// src/components/Table/types.ts
var DENSITY_CONFIG = {
  compact: {
    rowHeight: 32,
    fontSize: "text-xs",
    padding: "py-1 px-2"
  },
  default: {
    rowHeight: 40,
    fontSize: "text-sm",
    padding: "py-2 px-4"
  },
  comfortable: {
    rowHeight: 52,
    fontSize: "text-sm",
    padding: "py-3 px-4"
  }
};
function useAvailableHeight(options = {}) {
  const { bottomOffset = 16, minHeight = 200, enabled = true } = options;
  const ref = useRef(null);
  const [height, setHeight] = useState(void 0);
  const calculate = useCallback(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const rect = el.getBoundingClientRect();
    const available = window.innerHeight - rect.top - bottomOffset;
    setHeight(Math.max(minHeight, Math.round(available)));
  }, [bottomOffset, minHeight, enabled]);
  useEffect(() => {
    if (!enabled) return;
    const frame = requestAnimationFrame(calculate);
    window.addEventListener("resize", calculate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", calculate);
    };
  }, [calculate, enabled]);
  return {
    ref,
    height,
    style: height ? { maxHeight: `${height}px` } : void 0
  };
}
function useAutoPageSize(options = {}) {
  const {
    rowHeight = 49,
    bottomOffset = 64,
    minRows = 3,
    maxRows = 50,
    enabled = true
  } = options;
  const ref = useRef(null);
  const [autoPerPage, setAutoPerPage] = useState(minRows);
  const [userOverride, setUserOverride] = useState(null);
  const calculate = useCallback(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const rect = el.getBoundingClientRect();
    const availableHeight = window.innerHeight - rect.top - bottomOffset;
    const rows = Math.floor(availableHeight / rowHeight);
    const clamped = Math.max(minRows, Math.min(maxRows, rows));
    setAutoPerPage(clamped);
  }, [rowHeight, bottomOffset, minRows, maxRows, enabled]);
  useEffect(() => {
    if (!enabled) return;
    const frame = requestAnimationFrame(calculate);
    window.addEventListener("resize", calculate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", calculate);
    };
  }, [calculate, enabled]);
  const setPerPage = useCallback((size) => {
    setUserOverride(size);
  }, []);
  return {
    ref,
    perPage: userOverride ?? autoPerPage,
    setPerPage,
    autoPerPage,
    isAutoSized: userOverride === null
  };
}
var Table = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "table",
  {
    ref,
    className: cn("w-full caption-bottom text-sm", className),
    ...props
  }
));
Table.displayName = "Table";
var TableHeader = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
var TableBody = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
var TableFooter = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tfoot",
  {
    ref,
    className: cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    ),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
var TableRow = React10.memo(
  React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "tr",
    {
      ref,
      className: cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      ),
      ...props
    }
  ))
);
TableRow.displayName = "TableRow";
var TableHead = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "th",
  {
    ref,
    className: cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
var TableCell = React10.memo(
  React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "td",
    {
      ref,
      className: cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className),
      ...props
    }
  ))
);
TableCell.displayName = "TableCell";
var TableCaption = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";
var DataTableContent = React10.memo(function DataTableContent2({
  stickyHeader = false,
  stripedRows = false,
  highlightOnHover = true,
  onRowClick,
  scrollable = false,
  scrollBottomOffset = 68,
  autoPageSize = false,
  className
}) {
  const table = useDataTable();
  const { isEmpty } = useDataTableMeta();
  const { density } = useDataTableDensity();
  const { config: emptyStateConfig } = useDataTableEmptyStateConfig();
  const { isLoading, skeletonRows } = useDataTableLoadingState();
  const { setPageSize } = useDataTablePagination();
  const tbodyRef = React10.useRef(null);
  const { ref: scrollRef, style: scrollStyle } = useAvailableHeight({
    bottomOffset: scrollBottomOffset,
    enabled: scrollable
  });
  const densityStyles = DENSITY_CONFIG[density];
  const rowHeight = densityStyles.rowHeight + 1;
  const cellClasses = cn(densityStyles.padding, densityStyles.fontSize);
  const columnCount = table.getVisibleLeafColumns().length;
  const hasRows = table.getRowModel().rows?.length > 0;
  const effectiveStickyHeader = stickyHeader || scrollable;
  React10.useEffect(() => {
    if (!autoPageSize) return;
    const calculate = () => {
      const tbody = tbodyRef.current;
      if (!tbody) return;
      const rect = tbody.getBoundingClientRect();
      const available = window.innerHeight - rect.top - 68;
      const rows = Math.floor(available / rowHeight);
      const clamped = Math.max(3, Math.min(50, rows));
      setPageSize(clamped);
    };
    const frame = requestAnimationFrame(calculate);
    window.addEventListener("resize", calculate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", calculate);
    };
  }, [autoPageSize, rowHeight, setPageSize]);
  if (!hasRows && isEmpty && !isLoading) {
    return /* @__PURE__ */ jsx(
      EmptyState,
      {
        message: emptyStateConfig.title,
        description: emptyStateConfig.description,
        icon: emptyStateConfig.icon,
        animated: false
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: scrollRef,
      className: cn("rounded-md overflow-auto bg-card", className),
      style: scrollStyle,
      children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(
          TableHeader,
          {
            className: cn(
              effectiveStickyHeader && "sticky top-0 z-10 bg-background shadow-[0_1px_0_0_hsl(var(--border))]"
            ),
            children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx(TableRow, { children: headerGroup.headers.map((header) => /* @__PURE__ */ jsx(
              TableHead,
              {
                className: cn(cellClasses, "font-medium"),
                style: { width: header.getSize() !== 150 ? header.getSize() : void 0 },
                children: header.isPlaceholder ? null : flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )
              },
              header.id
            )) }, headerGroup.id))
          }
        ),
        /* @__PURE__ */ jsx(TableBody, { ref: tbodyRef, children: isLoading ? Array.from({ length: skeletonRows }).map((_, index) => /* @__PURE__ */ jsx(TableRow, { className: "animate-pulse", children: Array.from({ length: columnCount || 4 }).map((_2, colIndex) => /* @__PURE__ */ jsx(TableCell, { className: cellClasses, children: /* @__PURE__ */ jsx("div", { className: "h-4 bg-muted rounded w-3/4" }) }, colIndex)) }, `skeleton-${index}`)) : table.getRowModel().rows.map((row, index) => /* @__PURE__ */ jsx(
          TableRow,
          {
            "data-state": row.getIsSelected() && "selected",
            className: cn(
              highlightOnHover && "hover:bg-muted/50",
              stripedRows && index % 2 === 1 && "bg-muted/30",
              onRowClick && "cursor-pointer"
            ),
            onClick: onRowClick ? () => onRowClick(row) : void 0,
            children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { className: cellClasses, children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id))
          },
          row.id
        )) })
      ] })
    }
  );
});
DataTableContent.displayName = "DataTable.Content";
var DataTableToolbar = React10.memo(function DataTableToolbar2({
  className,
  children
}) {
  return /* @__PURE__ */ jsx("div", { className: cn("flex items-center justify-between gap-2 bg-accent/50 p-4 rounded-t-lg", className), children });
});
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = React10.useState(value);
  React10.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
function useDebouncedCallback(callback, delay = 300) {
  const callbackRef = React10.useRef(callback);
  const timeoutRef = React10.useRef(null);
  React10.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  return React10.useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  );
}
var DataTableSearch = React10.memo(function DataTableSearch2({
  column,
  placeholder = "Buscar...",
  debounce = 300,
  onSearch,
  className
}) {
  const table = useDataTableInstance();
  const columnInstance = column ? table.getColumn(column) : null;
  const [value, setValue] = React10.useState(
    columnInstance?.getFilterValue() ?? ""
  );
  const debouncedValue = useDebounce(value, debounce);
  const isServerSide = !!onSearch;
  React10.useEffect(() => {
    if (isServerSide) {
      onSearch(debouncedValue);
    } else if (columnInstance) {
      columnInstance.setFilterValue(debouncedValue || void 0);
    }
  }, [debouncedValue, columnInstance, onSearch, isServerSide]);
  React10.useEffect(() => {
    if (isServerSide || !columnInstance) return;
    const filterValue = columnInstance.getFilterValue() ?? "";
    if (filterValue !== value) {
      setValue(filterValue);
    }
  }, [columnInstance?.getFilterValue(), isServerSide]);
  return /* @__PURE__ */ jsxs("div", { className: cn("relative w-[150px] lg:w-[250px]", className), children: [
    /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" }),
    /* @__PURE__ */ jsx(
      Input,
      {
        placeholder,
        value,
        onChange: (e) => setValue(e.target.value),
        className: "h-9 pl-9"
      }
    )
  ] });
});
var DataTableFilters = React10.memo(function DataTableFilters2({
  onChange,
  className,
  children
}) {
  const table = useDataTableInstance();
  const filters = table.getState().columnFilters;
  const filtersRef = React10.useRef(filters);
  React10.useEffect(() => {
    if (onChange && JSON.stringify(filters) !== JSON.stringify(filtersRef.current)) {
      filtersRef.current = filters;
      onChange(filters);
    }
  }, [filters, onChange]);
  return /* @__PURE__ */ jsx("div", { className: cn("flex gap-2", className), children });
});
var DataTableFilter = React10.memo(function DataTableFilter2({
  column: columnId,
  title,
  options,
  onValueChange: onServerValueChange,
  className
}) {
  const table = useDataTableInstance();
  const column = columnId ? table.getColumn(columnId) : null;
  const filterValue = column?.getFilterValue() ?? [];
  const [localValue, setLocalValue] = React10.useState("all");
  const currentValue = column ? filterValue.length > 0 ? filterValue[0] : "all" : localValue;
  const isServerSide = !!onServerValueChange;
  const handleValueChange = React10.useCallback(
    (value) => {
      const resolvedValue = value === "all" ? void 0 : value;
      if (isServerSide) {
        onServerValueChange(resolvedValue);
      } else if (column) {
        column.setFilterValue(resolvedValue ? [resolvedValue] : void 0);
      }
      setLocalValue(value);
    },
    [column, onServerValueChange]
  );
  return /* @__PURE__ */ jsxs(
    Select,
    {
      value: currentValue,
      onValueChange: handleValueChange,
      selectSize: "sm",
      placeholder: title,
      className,
      children: [
        /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "Todos" }),
        options.map((option) => /* @__PURE__ */ jsx(SelectItem, { value: option.value, children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
          option.icon && /* @__PURE__ */ jsx("span", { className: "shrink-0 text-muted-foreground", children: option.icon }),
          option.label
        ] }) }, option.value))
      ]
    }
  );
});
var DataTablePagination = React10.memo(function DataTablePagination2({
  mode = "client",
  pageCount: externalPageCount,
  pageSizes = [10, 20, 30, 50],
  showPageSize = true,
  showPageInfo = true,
  showFirstLast = true,
  className
}) {
  useDataTable();
  const { selectedRowCount, totalRows } = useDataTableMeta();
  const paginationHook = useDataTablePagination();
  const {
    pageIndex,
    pageSize,
    pageCount: internalPageCount,
    canPreviousPage,
    canNextPage,
    setPageIndex,
    setPageSize,
    previousPage,
    nextPage,
    firstPage,
    lastPage
  } = paginationHook;
  const pageCount = mode === "server" && externalPageCount !== void 0 ? externalPageCount : internalPageCount;
  const canGoPrevious = pageIndex > 0;
  const canGoNext = pageIndex < pageCount - 1;
  const handlePageSizeChange = React10.useCallback(
    (value) => {
      setPageSize(Number(value));
    },
    [setPageSize]
  );
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex flex-col-reverse items-center justify-between gap-4 sm:flex-row",
        className
      ),
      children: [
        showPageInfo && /* @__PURE__ */ jsx("div", { className: "flex-1 text-sm text-muted-foreground", children: selectedRowCount > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
          selectedRowCount,
          " de ",
          totalRows,
          " linha(s) selecionada(s)"
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          "P\xE1gina ",
          pageIndex + 1,
          " de ",
          pageCount
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
          showPageSize && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium whitespace-nowrap", children: "Linhas por p\xE1gina" }),
            /* @__PURE__ */ jsx(
              Select,
              {
                value: `${pageSize}`,
                onValueChange: handlePageSizeChange,
                selectSize: "sm",
                children: [.../* @__PURE__ */ new Set([pageSize, ...pageSizes])].sort((a, b) => a - b).map((size) => /* @__PURE__ */ jsx(SelectItem, { value: `${size}`, children: size }, size))
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            showFirstLast && /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                size: "icon-sm",
                className: "hidden h-8 w-8 p-0 lg:flex",
                onClick: firstPage,
                disabled: !canGoPrevious,
                "aria-label": "Primeira p\xE1gina",
                children: /* @__PURE__ */ jsx(ChevronsLeft, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                size: "icon-sm",
                className: "h-8 w-8 p-0",
                onClick: previousPage,
                disabled: !canGoPrevious,
                "aria-label": "P\xE1gina anterior",
                children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxs("span", { className: "flex h-8 min-w-[4rem] items-center justify-center text-sm font-medium", children: [
              pageIndex + 1,
              " / ",
              pageCount
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                size: "icon-sm",
                className: "h-8 w-8 p-0",
                onClick: nextPage,
                disabled: !canGoNext,
                "aria-label": "Pr\xF3xima p\xE1gina",
                children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
              }
            ),
            showFirstLast && /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                size: "icon-sm",
                className: "hidden h-8 w-8 p-0 lg:flex",
                onClick: lastPage,
                disabled: !canGoNext,
                "aria-label": "\xDAltima p\xE1gina",
                children: /* @__PURE__ */ jsx(ChevronsRight, { className: "h-4 w-4" })
              }
            )
          ] })
        ] })
      ]
    }
  );
});
DataTablePagination.displayName = "DataTable.Pagination";
var DataTableEmptyState = React10.memo(function DataTableEmptyState2({
  title,
  description,
  icon,
  action
}) {
  const { setConfig } = useDataTableEmptyStateConfig();
  React10.useLayoutEffect(() => {
    setConfig({ title, description, icon, action });
    return () => setConfig({});
  }, [title, description, icon, action, setConfig]);
  return null;
});
DataTableEmptyState.displayName = "DataTable.EmptyState";
function DataTableLoading({
  visible,
  skeletonRows = 5
}) {
  const { setIsLoading, setSkeletonRows } = useDataTableLoadingState();
  React10.useLayoutEffect(() => {
    setIsLoading(visible);
    return () => setIsLoading(false);
  }, [visible, setIsLoading]);
  React10.useLayoutEffect(() => {
    setSkeletonRows(skeletonRows);
  }, [skeletonRows, setSkeletonRows]);
  return null;
}
DataTableLoading.displayName = "DataTable.Loading";
function DataTableColumnHeader({
  column,
  title,
  className
}) {
  if (!column.getCanSort()) {
    return /* @__PURE__ */ jsx("div", { className: cn(className), children: title });
  }
  const handleSort = () => {
    const currentSort = column.getIsSorted();
    if (currentSort === "asc") {
      column.toggleSorting(true);
    } else if (currentSort === "desc") {
      column.clearSorting();
    } else {
      column.toggleSorting(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: cn("flex items-center space-x-2", className), children: /* @__PURE__ */ jsxs(
    Button,
    {
      variant: "ghost",
      size: "sm",
      className: "-ml-3 h-8 data-[state=open]:bg-accent",
      onClick: handleSort,
      children: [
        /* @__PURE__ */ jsx("span", { children: title }),
        column.getIsSorted() === "desc" ? /* @__PURE__ */ jsx(ArrowDown, { className: "ml-2 h-4 w-4" }) : column.getIsSorted() === "asc" ? /* @__PURE__ */ jsx(ArrowUp, { className: "ml-2 h-4 w-4" }) : /* @__PURE__ */ jsx(ChevronsUpDown, { className: "ml-2 h-4 w-4" })
      ]
    }
  ) });
}
var checkboxVariants = cva(
  [
    "peer shrink-0 rounded-sm border-2 ring-offset-background",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "transition-all duration-200"
  ],
  {
    variants: {
      variant: {
        default: "border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        muted: "border-muted-foreground/40 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        secondary: "border-secondary data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground",
        outline: "border-border data-[state=checked]:bg-background data-[state=checked]:text-primary data-[state=checked]:border-primary"
      },
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
var iconSizeMap = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5"
};
var Checkbox = React10.memo(
  React10.forwardRef(({ className, variant, size = "md", ...props }, ref) => {
    const iconSize = iconSizeMap[size || "md"];
    return /* @__PURE__ */ jsx(
      CheckboxPrimitive.Root,
      {
        ref,
        className: cn(checkboxVariants({ variant, size, className })),
        ...props,
        children: /* @__PURE__ */ jsx(
          CheckboxPrimitive.Indicator,
          {
            className: cn("flex items-center justify-center text-current"),
            children: /* @__PURE__ */ jsx(Check, { className: iconSize })
          }
        )
      }
    );
  })
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
function DataTableColumnVisibility({
  className
}) {
  const table = useDataTable();
  const [open, setOpen] = React10.useState(false);
  const dropdownRef = React10.useRef(null);
  React10.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);
  const columns = table.getAllColumns().filter((column) => column.getCanHide());
  return /* @__PURE__ */ jsxs("div", { className: cn("relative", className), ref: dropdownRef, children: [
    /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "outline",
        size: "sm",
        className: "h-8",
        onClick: () => setOpen(!open),
        "aria-expanded": open,
        "aria-haspopup": "true",
        children: [
          /* @__PURE__ */ jsx(SlidersHorizontal, { className: "mr-2 h-4 w-4" }),
          "Colunas"
        ]
      }
    ),
    open && /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "absolute right-0 top-full z-50 mt-1 w-48",
          "rounded-md border bg-popover p-2 shadow-md",
          "animate-in fade-in-0 zoom-in-95"
        ),
        children: [
          /* @__PURE__ */ jsx("div", { className: "px-2 py-1.5 text-sm font-semibold", children: "Alternar colunas" }),
          /* @__PURE__ */ jsx("div", { className: "h-px bg-border my-1" }),
          /* @__PURE__ */ jsx("div", { className: "max-h-60 overflow-auto", children: columns.map((column) => {
            const header = column.columnDef.header;
            const title = typeof header === "string" ? header : column.id;
            return /* @__PURE__ */ jsxs(
              "label",
              {
                className: cn(
                  "flex items-center gap-2 px-2 py-1.5 rounded-sm cursor-pointer",
                  "hover:bg-accent hover:text-accent-foreground",
                  "text-sm"
                ),
                children: [
                  /* @__PURE__ */ jsx(
                    Checkbox,
                    {
                      checked: column.getIsVisible(),
                      onCheckedChange: (value) => column.toggleVisibility(!!value)
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "capitalize", children: title })
                ]
              },
              column.id
            );
          }) })
        ]
      }
    )
  ] });
}
DataTableColumnVisibility.displayName = "DataTable.ColumnVisibility";
var densityOptions = [
  { value: "compact", label: "Compacto", icon: Rows4 },
  { value: "default", label: "Padr\xE3o", icon: Rows3 },
  { value: "comfortable", label: "Confort\xE1vel", icon: LayoutList }
];
function DataTableDensityToggle({
  className
}) {
  const { density, setDensity } = useDataTableDensity();
  const [open, setOpen] = React10.useState(false);
  const dropdownRef = React10.useRef(null);
  React10.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);
  const currentOption = densityOptions.find((opt) => opt.value === density) ?? densityOptions[1];
  const Icon2 = currentOption.icon;
  return /* @__PURE__ */ jsxs("div", { className: cn("relative", className), ref: dropdownRef, children: [
    /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "outline",
        size: "sm",
        className: "h-8",
        onClick: () => setOpen(!open),
        "aria-expanded": open,
        "aria-haspopup": "true",
        children: [
          /* @__PURE__ */ jsx(Icon2, { className: "mr-2 h-4 w-4" }),
          "Densidade"
        ]
      }
    ),
    open && /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "absolute right-0 top-full z-50 mt-1 w-40",
          "rounded-md border bg-popover p-1 shadow-md",
          "animate-in fade-in-0 zoom-in-95"
        ),
        children: densityOptions.map((option) => {
          const OptionIcon = option.icon;
          const isSelected = density === option.value;
          return /* @__PURE__ */ jsxs(
            "button",
            {
              className: cn(
                "flex w-full items-center gap-2 px-2 py-1.5 rounded-sm cursor-pointer",
                "hover:bg-accent hover:text-accent-foreground",
                "text-sm text-left",
                isSelected && "bg-accent"
              ),
              onClick: () => {
                setDensity(option.value);
                setOpen(false);
              },
              children: [
                /* @__PURE__ */ jsx(OptionIcon, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx("span", { children: option.label }),
                isSelected && /* @__PURE__ */ jsx("span", { className: "ml-auto text-xs text-muted-foreground", children: "\u2713" })
              ]
            },
            option.value
          );
        })
      }
    )
  ] });
}
DataTableDensityToggle.displayName = "DataTable.DensityToggle";
function DataTableBulkActions({
  children,
  className
}) {
  const table = useDataTable();
  const { selectedRowCount } = useDataTableMeta();
  const selectedRows = useDataTableSelection();
  if (selectedRowCount === 0) {
    return null;
  }
  const handleClearSelection = () => {
    table.toggleAllRowsSelected(false);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex items-center gap-3 rounded-lg border bg-muted/50 p-3",
        "animate-in fade-in-0 slide-in-from-top-2",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium", children: [
            selectedRowCount,
            " ",
            selectedRowCount === 1 ? "item selecionado" : "itens selecionados"
          ] }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "h-7 px-2",
              onClick: handleClearSelection,
              children: [
                /* @__PURE__ */ jsx(X, { className: "h-4 w-4 mr-1" }),
                "Limpar"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-5 w-px bg-border" }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: children(selectedRows) })
      ]
    }
  );
}
DataTableBulkActions.displayName = "DataTable.BulkActions";
var formatConfig = {
  csv: {
    label: "CSV",
    icon: FileText,
    mimeType: "text/csv",
    extension: "csv"
  },
  xlsx: {
    label: "Excel",
    icon: FileSpreadsheet,
    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    extension: "xlsx"
  },
  pdf: {
    label: "PDF",
    icon: FileText,
    mimeType: "application/pdf",
    extension: "pdf"
  }
};
function escapeCSV(value) {
  if (value === null || value === void 0) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}
function getNestedValue(obj, path) {
  return path.split(".").reduce((current, key) => {
    if (current && typeof current === "object" && key in current) {
      return current[key];
    }
    return void 0;
  }, obj);
}
function generateCSV(headers, rows, accessors) {
  const headerLine = headers.map(escapeCSV).join(",");
  const dataLines = rows.map(
    (row) => accessors.map((accessor) => {
      const value = getNestedValue(row, accessor);
      return escapeCSV(value);
    }).join(",")
  );
  return [headerLine, ...dataLines].join("\n");
}
function downloadFile(content, filename, mimeType) {
  const blob = new Blob(["\uFEFF" + content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
function DataTableExport({
  formats = ["csv"],
  filename = "export",
  className
}) {
  const table = useDataTable();
  const [open, setOpen] = React10.useState(false);
  const dropdownRef = React10.useRef(null);
  React10.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);
  const handleExport = React10.useCallback((format) => {
    const visibleColumns = table.getVisibleLeafColumns();
    const rows = table.getFilteredRowModel().rows;
    const headers = [];
    const accessors = [];
    visibleColumns.forEach((column) => {
      const header = column.columnDef.header;
      const headerText = typeof header === "string" ? header : column.id;
      const columnDef = column.columnDef;
      if (column.accessorFn || columnDef.accessorKey) {
        headers.push(headerText);
        accessors.push(columnDef.accessorKey || column.id);
      }
    });
    const data = rows.map((row) => row.original);
    if (format === "csv") {
      const csv = generateCSV(headers, data, accessors);
      const config = formatConfig[format];
      downloadFile(csv, `${filename}.${config.extension}`, config.mimeType);
    } else if (format === "xlsx") {
      console.warn("XLSX export requires xlsx library. Falling back to CSV.");
      const csv = generateCSV(headers, data, accessors);
      downloadFile(csv, `${filename}.csv`, "text/csv");
    } else if (format === "pdf") {
      console.warn("PDF export not implemented yet.");
    }
    setOpen(false);
  }, [table, filename]);
  if (formats.length === 1) {
    const format = formats[0];
    const config = formatConfig[format];
    const Icon2 = config.icon;
    return /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "outline",
        size: "sm",
        className: cn("h-8", className),
        onClick: () => handleExport(format),
        children: [
          /* @__PURE__ */ jsx(Icon2, { className: "mr-2 h-4 w-4" }),
          "Exportar ",
          config.label
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs("div", { className: cn("relative", className), ref: dropdownRef, children: [
    /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "outline",
        size: "sm",
        className: "h-8",
        onClick: () => setOpen(!open),
        "aria-expanded": open,
        "aria-haspopup": "true",
        children: [
          /* @__PURE__ */ jsx(Download, { className: "mr-2 h-4 w-4" }),
          "Exportar"
        ]
      }
    ),
    open && /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "absolute right-0 top-full z-50 mt-1 w-36",
          "rounded-md border bg-popover p-1 shadow-md",
          "animate-in fade-in-0 zoom-in-95"
        ),
        children: formats.map((format) => {
          const config = formatConfig[format];
          const Icon2 = config.icon;
          return /* @__PURE__ */ jsxs(
            "button",
            {
              className: cn(
                "flex w-full items-center gap-2 px-2 py-1.5 rounded-sm cursor-pointer",
                "hover:bg-accent hover:text-accent-foreground",
                "text-sm text-left"
              ),
              onClick: () => handleExport(format),
              children: [
                /* @__PURE__ */ jsx(Icon2, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx("span", { children: config.label })
              ]
            },
            format
          );
        })
      }
    )
  ] });
}
DataTableExport.displayName = "DataTable.Export";
function DataTableTabs({
  tabs,
  value,
  defaultValue,
  onValueChange,
  className
}) {
  const [internalValue, setInternalValue] = React10.useState(defaultValue ?? tabs[0]?.value);
  const activeValue = value ?? internalValue;
  const handleTabClick = (tabValue) => {
    if (value === void 0) {
      setInternalValue(tabValue);
    }
    onValueChange?.(tabValue);
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("flex items-center gap-1", className),
      role: "tablist",
      "aria-label": "Filtros",
      children: tabs.map((tab) => {
        const isActive = activeValue === tab.value;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            role: "tab",
            "aria-selected": isActive,
            "aria-controls": `tabpanel-${tab.value}`,
            className: cn(
              "relative px-4 py-2.5 text-sm font-medium transition-colors",
              "hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground/80"
            ),
            onClick: () => handleTabClick(tab.value),
            children: [
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                tab.label,
                tab.count !== void 0 && /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: cn(
                      "inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded text-xs font-medium",
                      isActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    ),
                    children: tab.count
                  }
                )
              ] }),
              isActive && /* @__PURE__ */ jsx(
                "span",
                {
                  className: "absolute bottom-0 left-0 right-0 h-0.5 bg-primary",
                  "aria-hidden": "true"
                }
              )
            ]
          },
          tab.value
        );
      })
    }
  );
}
DataTableTabs.displayName = "DataTable.Tabs";

// src/components/Table/index.ts
var DataTable = Object.assign(DataTableRoot, {
  // Estado
  Loading: DataTableLoading,
  EmptyState: DataTableEmptyState,
  // Layout
  Tabs: DataTableTabs,
  Toolbar: DataTableToolbar,
  Content: DataTableContent,
  // Search & Filter
  Search: DataTableSearch,
  Filters: DataTableFilters,
  Filter: DataTableFilter,
  // Pagination
  Pagination: DataTablePagination,
  // Actions
  BulkActions: DataTableBulkActions,
  // Preferences
  ColumnVisibility: DataTableColumnVisibility,
  DensityToggle: DataTableDensityToggle,
  Export: DataTableExport,
  // Column utilities (para uso em column definitions)
  ColumnHeader: DataTableColumnHeader
});
function DialogMeshEffect() {
  return /* @__PURE__ */ jsxs("div", { className: "absolute top-0 left-0 right-0 h-[48px] overflow-hidden rounded-t-lg pointer-events-none z-[1]", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0",
        style: {
          background: `
            radial-gradient(ellipse at 30% -30%, hsl(var(--primary) / 0.2) 0%, transparent 70%),
            radial-gradient(ellipse at 80% -20%, hsl(var(--primary) / 0.14) 0%, transparent 65%),
            linear-gradient(to bottom, hsl(var(--primary) / 0.06), transparent 80%)
          `
        }
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0",
        style: {
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.07) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.07) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
          mask: "linear-gradient(to bottom, black 0%, transparent 90%)",
          WebkitMask: "linear-gradient(to bottom, black 0%, transparent 90%)"
        }
      }
    )
  ] });
}
var Dialog = DialogPrimitive.Root;
var DialogTrigger = DialogPrimitive.Trigger;
var DialogPortal = DialogPrimitive.Portal;
var DialogClose = DialogPrimitive.Close;
var DialogOverlay = React10.memo(
  React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    DialogPrimitive.Overlay,
    {
      ref,
      className: cn(
        "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      ),
      ...props
    }
  ))
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var dialogContentVariants = cva(
  [
    "fixed left-[50%] top-[50%] z-50",
    "translate-x-[-50%] translate-y-[-50%]",
    "grid w-full gap-4",
    "border bg-background p-6 shadow-lg",
    "duration-200",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
    "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
    "sm:rounded-lg"
  ],
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        full: "max-w-[95vw] max-h-[95vh]"
      }
    },
    defaultVariants: {
      size: "lg"
    }
  }
);
var DialogContent = React10.memo(
  React10.forwardRef(({ className, children, showCloseButton = true, disableMeshEffect = false, size, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Content,
      {
        ref,
        className: cn(dialogContentVariants({ size, className }), "overflow-hidden"),
        ...props,
        children: [
          !disableMeshEffect && /* @__PURE__ */ jsx(DialogMeshEffect, {}),
          children,
          showCloseButton && /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
            /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Fechar" })
          ] })
        ]
      }
    )
  ] }))
);
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = React10.memo(
  ({ className, ...props }) => /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className
      ),
      ...props
    }
  )
);
DialogHeader.displayName = "DialogHeader";
var DialogFooter = React10.memo(
  ({ className, ...props }) => /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      ),
      ...props
    }
  )
);
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React10.memo(
  React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    DialogPrimitive.Title,
    {
      ref,
      className: cn(
        "text-2xl font-semibold leading-none tracking-tight font-heading",
        className
      ),
      ...props
    }
  ))
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React10.memo(
  React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    DialogPrimitive.Description,
    {
      ref,
      className: cn("text-sm text-muted-foreground", className),
      ...props
    }
  ))
);
DialogDescription.displayName = DialogPrimitive.Description.displayName;
var DialogBody = React10.memo(
  ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex-1 overflow-y-auto py-2", className), ...props })
);
DialogBody.displayName = "DialogBody";
var SIZE_CONFIG = {
  sm: { base: 8, increment: 2 },
  md: { base: 12, increment: 4 },
  lg: { base: 16, increment: 6 },
  xl: { base: 28, increment: 14 },
  xxl: { base: 36, increment: 16 }
};
var INTENSITY_CONFIG = {
  light: [4, 6, 8, 10, 12],
  medium: [6, 8, 10, 12, 16],
  strong: [8, 12, 16, 20, 25]
};
var POSITION_CONFIG = {
  center: "items-center justify-center",
  "top-left": "items-start justify-start",
  "top-right": "items-start justify-end",
  "bottom-left": "items-end justify-start",
  "bottom-right": "items-end justify-end",
  "top-center": "items-start justify-center",
  "bottom-center": "items-end justify-center"
};
var COLOR_MAP = {
  primary: "border-primary",
  secondary: "border-secondary",
  accent: "border-accent",
  muted: "border-muted"
};
var RippleRing = React10.memo(({ size, color, opacity }) => {
  const borderColorClass = COLOR_MAP[color] || COLOR_MAP.primary;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("absolute rounded-full", borderColorClass),
      style: {
        width: `${size * 4}px`,
        height: `${size * 4}px`,
        borderWidth: "1px",
        opacity: opacity / 100,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }
    }
  );
});
RippleRing.displayName = "RippleRing";
var RippleEffect = React10.memo(
  ({
    size = "md",
    color = "primary",
    intensity = "medium",
    rings = 5,
    position = "center",
    className
  }) => {
    const { base, increment } = SIZE_CONFIG[size];
    const opacities = INTENSITY_CONFIG[intensity];
    const positionClasses2 = POSITION_CONFIG[position];
    const rippleRings = React10.useMemo(
      () => Array.from({ length: rings }).map((_, index) => {
        const ringSize = base + increment * (rings - index - 1);
        const opacity = opacities[index] || opacities[opacities.length - 1];
        return /* @__PURE__ */ jsx(
          RippleRing,
          {
            size: ringSize,
            color,
            opacity
          },
          index
        );
      }),
      [base, increment, rings, opacities, color]
    );
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "absolute inset-0 flex pointer-events-none",
          positionClasses2,
          className
        ),
        children: /* @__PURE__ */ jsx("div", { className: "relative", children: rippleRings })
      }
    );
  }
);
RippleEffect.displayName = "RippleEffect";
var RippleWrapper = React10.memo(
  ({ children, rippleProps, className }) => {
    return /* @__PURE__ */ jsxs("div", { className: cn("relative", className), children: [
      rippleProps && /* @__PURE__ */ jsx(RippleEffect, { ...rippleProps }),
      /* @__PURE__ */ jsx("div", { className: "relative z-10", children })
    ] });
  }
);
RippleWrapper.displayName = "RippleWrapper";
var RippleBackground = React10.memo(
  ({ containerClassName, ...rippleProps }) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "absolute inset-0 overflow-hidden pointer-events-none",
          containerClassName
        ),
        children: /* @__PURE__ */ jsx(RippleEffect, { ...rippleProps })
      }
    );
  }
);
RippleBackground.displayName = "RippleBackground";
var iconWrapperVariants2 = cva(
  "p-3 rounded-2xl shadow-lg transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-primary shadow-primary/25",
        secondary: "bg-secondary shadow-secondary/25",
        accent: "bg-accent shadow-accent/25",
        destructive: "bg-red-600 shadow-red-600/25",
        success: "bg-green-600 shadow-green-600/25",
        muted: "bg-muted-foreground shadow-muted-foreground/25"
      },
      size: {
        sm: "p-2",
        md: "p-3",
        lg: "p-4"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
var iconVariants2 = cva("text-white", {
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
var statusIndicatorVariants = cva(
  "absolute -top-1 -right-0 w-4 h-4 rounded-full border-2 border-white/70 shadow-sm z-20",
  {
    variants: {
      status: {
        active: "bg-green-500",
        inactive: "bg-slate-500",
        warning: "bg-yellow-500",
        error: "bg-red-500"
      }
    },
    defaultVariants: {
      status: "active"
    }
  }
);
var DialogWrapper = React10.memo(
  ({
    children,
    className,
    icon: Icon2,
    status,
    variant = "default",
    size = "md",
    iconSize = "md",
    showRipple = true,
    rippleProps,
    ...props
  }) => {
    const defaultRippleProps = React10.useMemo(
      () => ({
        size: size === "sm" ? "md" : size === "lg" ? "xl" : "lg",
        color: variant === "secondary" ? "secondary" : variant === "accent" ? "accent" : "primary",
        intensity: "light",
        rings: 3,
        ...rippleProps
      }),
      [size, variant, rippleProps]
    );
    const backgroundRippleProps = React10.useMemo(
      () => ({
        position: "top-right",
        size: "xl",
        color: variant === "secondary" ? "secondary" : variant === "accent" ? "accent" : "primary",
        intensity: "light",
        rings: 5
      }),
      [variant]
    );
    if (!Icon2) {
      return /* @__PURE__ */ jsxs(
        DialogHeader,
        {
          className: cn("flex flex-col justify-between px-0", className),
          ...props,
          children: [
            showRipple && /* @__PURE__ */ jsx(RippleBackground, { ...backgroundRippleProps }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3 w-full", children: /* @__PURE__ */ jsx("div", { className: "w-full", children }) })
          ]
        }
      );
    }
    return /* @__PURE__ */ jsxs(
      DialogHeader,
      {
        className: cn("flex flex-col justify-between px-0 pb-3", className),
        ...props,
        children: [
          showRipple && /* @__PURE__ */ jsx(RippleBackground, { ...backgroundRippleProps }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 w-full", children: [
            /* @__PURE__ */ jsxs(
              RippleWrapper,
              {
                rippleProps: showRipple ? defaultRippleProps : void 0,
                children: [
                  /* @__PURE__ */ jsx("div", { className: cn(iconWrapperVariants2({ variant, size }), "mr-2"), children: /* @__PURE__ */ jsx(Icon2, { className: iconVariants2({ size: iconSize }) }) }),
                  status && /* @__PURE__ */ jsx("div", { className: statusIndicatorVariants({ status }) })
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "w-full", children })
          ] })
        ]
      }
    );
  }
);
DialogWrapper.displayName = "DialogWrapper";
var toastVariants = {
  default: {
    bg: "bg-card",
    border: "border-border",
    barColor: "bg-muted-foreground",
    icon: /* @__PURE__ */ jsx(Info, { className: "h-5 w-5 text-muted-foreground" }),
    textColor: "text-foreground"
  },
  success: {
    bg: "bg-card",
    border: "border-green-300 dark:border-green-700",
    barColor: "bg-green-500",
    icon: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-5 w-5 text-green-600 dark:text-green-500" }),
    textColor: "text-foreground"
  },
  error: {
    bg: "bg-card",
    border: "border-red-300 dark:border-red-700",
    barColor: "bg-red-500",
    icon: /* @__PURE__ */ jsx(XCircle, { className: "h-5 w-5 text-red-600 dark:text-red-500" }),
    textColor: "text-foreground"
  },
  warning: {
    bg: "bg-card",
    border: "border-yellow-400 dark:border-yellow-700",
    barColor: "bg-yellow-500",
    icon: /* @__PURE__ */ jsx(AlertTriangle, { className: "h-5 w-5 text-yellow-600 dark:text-yellow-500" }),
    textColor: "text-foreground"
  },
  info: {
    bg: "bg-card",
    border: "border-blue-300 dark:border-blue-700",
    barColor: "bg-blue-500",
    icon: /* @__PURE__ */ jsx(Info, { className: "h-5 w-5 text-blue-600 dark:text-blue-500" }),
    textColor: "text-foreground"
  }
};
var Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      position: "top-right",
      expand: false,
      closeButton: false,
      toastOptions: {
        unstyled: true,
        classNames: {
          toast: "w-full"
        }
      },
      ...props
    }
  );
};
var CustomToast = React10.memo(
  ({ title, description, variant = "default", action, onClose }) => {
    const variantStyles = toastVariants[variant];
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "flex items-start gap-3 p-4 pr-3 rounded-lg shadow-lg border min-w-[350px] max-w-[450px] relative overflow-hidden",
          variantStyles.bg,
          variantStyles.border
        ),
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "absolute left-0 top-0 bottom-0 w-1.5",
                variantStyles.barColor
              )
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 ml-2", children: variantStyles.icon }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: cn("text-sm font-medium", variantStyles.textColor), children: title }),
            description && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: description })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
            action && /* @__PURE__ */ jsx(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  action.onClick();
                },
                className: cn(
                  "text-sm font-medium px-2 py-1 rounded hover:bg-accent transition-colors",
                  variant === "error" || variant === "warning" ? "text-red-700 dark:text-red-400" : variant === "success" ? "text-green-700 dark:text-green-400" : variant === "info" ? "text-blue-700 dark:text-blue-400" : "text-foreground"
                ),
                children: action.label
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  onClose?.();
                },
                className: "p-1 rounded hover:bg-accent transition-colors",
                children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4 text-muted-foreground" })
              }
            )
          ] })
        ]
      }
    );
  }
);
CustomToast.displayName = "CustomToast";
var createToast = (message, variant = "default") => {
  const props = typeof message === "string" ? { title: message, variant } : message;
  return toast$1.custom(
    (t) => /* @__PURE__ */ jsx(CustomToast, { ...props, onClose: () => toast$1.dismiss(t) }),
    {
      duration: props.action ? 1e4 : 4e3
    }
  );
};
var toast = Object.assign(
  (message) => createToast(message, "default"),
  {
    success: (message) => createToast(
      typeof message === "string" ? { title: message } : message,
      "success"
    ),
    error: (message) => createToast(
      typeof message === "string" ? { title: message } : message,
      "error"
    ),
    warning: (message) => createToast(
      typeof message === "string" ? { title: message } : message,
      "warning"
    ),
    info: (message) => createToast(
      typeof message === "string" ? { title: message } : message,
      "info"
    ),
    custom: (component, options) => toast$1.custom(component, options),
    dismiss: (id) => toast$1.dismiss(id),
    promise: (promise, options) => toast$1.promise(promise, options)
  }
);
var NumberStepper = React10.forwardRef(
  ({
    value = 1,
    onChange,
    onBlur,
    min = 0,
    max,
    step = 0.5,
    defaultValue,
    label,
    required,
    disabled,
    error,
    labelSuffix,
    className,
    name
  }, ref) => {
    const inputRef = React10.useRef(null);
    const [displayValue, setDisplayValue] = React10.useState(String(value));
    const [isFocused, setIsFocused] = React10.useState(false);
    React10.useImperativeHandle(ref, () => inputRef.current, []);
    React10.useEffect(() => {
      if (!isFocused) {
        setDisplayValue(String(value));
      }
    }, [value, isFocused]);
    const canDecrement = value - step >= min;
    const canIncrement = max === void 0 || value + step <= max;
    const handleDecrement = React10.useCallback(() => {
      if (!canDecrement || disabled) return;
      const newValue = Math.round((value - step) * 1e3) / 1e3;
      onChange?.(newValue);
    }, [value, step, min, disabled, onChange, canDecrement]);
    const handleIncrement = React10.useCallback(() => {
      if (!canIncrement || disabled) return;
      const newValue = Math.round((value + step) * 1e3) / 1e3;
      onChange?.(newValue);
    }, [value, step, max, disabled, onChange, canIncrement]);
    const handleInputChange = React10.useCallback(
      (e) => {
        const raw = e.target.value;
        setDisplayValue(raw);
        if (raw === "" || raw === "-" || raw === ".") return;
        const parsed = parseFloat(raw);
        if (isNaN(parsed)) return;
        onChange?.(parsed);
      },
      [onChange]
    );
    const handleInputFocus = React10.useCallback(() => {
      setIsFocused(true);
    }, []);
    const handleInputBlur = React10.useCallback(() => {
      setIsFocused(false);
      const parsed = parseFloat(displayValue);
      if (isNaN(parsed) || displayValue === "") {
        const resetValue = defaultValue ?? min;
        setDisplayValue(String(resetValue));
        if (value !== resetValue) onChange?.(resetValue);
        onBlur?.();
        return;
      }
      let clamped = parsed;
      if (clamped < min) clamped = min;
      if (max !== void 0 && clamped > max) clamped = max;
      setDisplayValue(String(clamped));
      if (clamped !== value) onChange?.(clamped);
      onBlur?.();
    }, [displayValue, value, min, max, onChange, onBlur]);
    return /* @__PURE__ */ jsxs("div", { className: cn("relative", className), children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: cn(
            "flex items-center h-12 rounded-md border-2 transition-colors overflow-hidden bg-background",
            error ? "border-red-500 focus-within:border-red-600" : "border-border focus-within:border-primary",
            disabled && "opacity-50 cursor-not-allowed"
          ),
          children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                tabIndex: -1,
                onClick: handleDecrement,
                disabled: disabled || !canDecrement,
                className: cn(
                  "flex items-center justify-center w-11 h-full transition-colors select-none shrink-0",
                  "text-muted-foreground hover:text-foreground hover:bg-muted",
                  "disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground disabled:cursor-not-allowed"
                ),
                "aria-label": "Diminuir",
                children: /* @__PURE__ */ jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: /* @__PURE__ */ jsx("line", { x1: "5", y1: "12", x2: "19", y2: "12" }) })
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "w-px h-6 bg-border shrink-0" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                ref: inputRef,
                name,
                type: "text",
                inputMode: "decimal",
                value: displayValue,
                onChange: handleInputChange,
                onFocus: handleInputFocus,
                onBlur: handleInputBlur,
                disabled,
                className: cn(
                  "flex-1 min-w-0 h-full text-center text-sm font-medium bg-transparent outline-none",
                  "disabled:cursor-not-allowed",
                  label ? "pt-1" : ""
                )
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "w-px h-6 bg-border shrink-0" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                tabIndex: -1,
                onClick: handleIncrement,
                disabled: disabled || !canIncrement,
                className: cn(
                  "flex items-center justify-center w-11 h-full transition-colors select-none shrink-0",
                  "text-muted-foreground hover:text-foreground hover:bg-muted",
                  "disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground disabled:cursor-not-allowed"
                ),
                "aria-label": "Aumentar",
                children: /* @__PURE__ */ jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: [
                  /* @__PURE__ */ jsx("line", { x1: "12", y1: "5", x2: "12", y2: "19" }),
                  /* @__PURE__ */ jsx("line", { x1: "5", y1: "12", x2: "19", y2: "12" })
                ] })
              }
            )
          ]
        }
      ),
      label && /* @__PURE__ */ jsxs(
        "label",
        {
          className: cn(
            "absolute left-3 top-[-6px] text-xs font-medium bg-background px-1 cursor-pointer inline-flex items-center gap-1",
            error ? "text-red-500" : "text-foreground"
          ),
          onClick: () => inputRef.current?.focus(),
          children: [
            label,
            required && /* @__PURE__ */ jsx("span", { className: "text-red-500 ml-0.5", children: "*" }),
            labelSuffix
          ]
        }
      )
    ] });
  }
);
NumberStepper.displayName = "NumberStepper";
var switchVariants = cva(
  [
    "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
    "transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:cursor-not-allowed disabled:opacity-50"
  ],
  {
    variants: {
      variant: {
        default: "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        secondary: "data-[state=checked]:bg-secondary data-[state=unchecked]:bg-input",
        success: "data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-input"
      },
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-14"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
var thumbVariants = cva(
  [
    "pointer-events-none block rounded-full bg-background shadow-lg ring-0",
    "transition-transform"
  ],
  {
    variants: {
      size: {
        sm: "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
        md: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        lg: "h-6 w-6 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
var Switch = React10.memo(
  React10.forwardRef(({ className, variant, size = "md", ...props }, ref) => /* @__PURE__ */ jsx(
    SwitchPrimitives.Root,
    {
      className: cn(switchVariants({ variant, size, className })),
      ...props,
      ref,
      children: /* @__PURE__ */ jsx(SwitchPrimitives.Thumb, { className: cn(thumbVariants({ size })) })
    }
  ))
);
Switch.displayName = SwitchPrimitives.Root.displayName;
var textareaVariants = cva(
  "w-full px-3 pt-4 pb-2 text-sm bg-background rounded-md border-2 transition-colors focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
  {
    variants: {
      variant: {
        default: "border-border focus:border-primary",
        error: "border-red-500 focus:border-red-600"
      },
      textareaSize: {
        sm: "min-h-[80px] pt-3 pb-1",
        default: "min-h-[100px]",
        lg: "min-h-[120px] pt-5 pb-2"
      }
    },
    defaultVariants: {
      variant: "default",
      textareaSize: "default"
    }
  }
);
var Textarea = React10.memo(
  React10.forwardRef(
    ({
      className,
      variant,
      textareaSize,
      error,
      label,
      icon: Icon2,
      required,
      containerClassName,
      labelClassName,
      autoResize = false,
      onChange,
      ...props
    }, ref) => {
      const textareaRef = React10.useRef(null);
      React10.useImperativeHandle(ref, () => textareaRef.current, []);
      const focusTextarea = React10.useCallback(() => {
        textareaRef.current?.focus();
      }, []);
      const handleChange = React10.useCallback(
        (e) => {
          if (autoResize && textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
          }
          onChange?.(e);
        },
        [autoResize, onChange]
      );
      React10.useEffect(() => {
        if (autoResize && textareaRef.current) {
          textareaRef.current.style.height = "auto";
          textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
      }, [autoResize]);
      return /* @__PURE__ */ jsxs("div", { className: cn("relative", containerClassName), children: [
        Icon2 && /* @__PURE__ */ jsx(
          Icon2,
          {
            className: "absolute left-3 top-4 text-muted-foreground h-4 w-4 cursor-pointer z-10",
            onClick: focusTextarea
          }
        ),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            className: cn(
              textareaVariants({
                variant: error ? "error" : variant,
                textareaSize
              }),
              Icon2 && "pl-10",
              className
            ),
            ref: textareaRef,
            onChange: handleChange,
            ...props
          }
        ),
        label && /* @__PURE__ */ jsxs(
          "label",
          {
            className: cn(
              "absolute left-3 top-[-6px] text-xs font-medium bg-background px-1 cursor-pointer",
              error ? "text-red-500" : "text-foreground",
              Icon2 && "left-10",
              labelClassName
            ),
            onClick: focusTextarea,
            children: [
              label,
              required && /* @__PURE__ */ jsx("span", { className: "text-red-500 ml-0.5", children: "*" })
            ]
          }
        )
      ] });
    }
  )
);
Textarea.displayName = "Textarea";
var FormFieldContext = React10.createContext(null);
function useFormFieldContext() {
  const context = React10.useContext(FormFieldContext);
  if (!context) {
    throw new Error("useFormFieldContext must be used within a Form.Field");
  }
  return context;
}
function useFormFieldContextOptional() {
  return React10.useContext(FormFieldContext);
}
function FormFieldProvider({ name, children }) {
  const form = useFormContext();
  const id = React10.useId();
  const fieldState = form.getFieldState(name, form.formState);
  const error = fieldState.error?.message;
  const value = React10.useMemo(
    () => ({
      name,
      id,
      error,
      isRequired: false
    }),
    [name, id, error]
  );
  return /* @__PURE__ */ jsx(FormFieldContext.Provider, { value, children });
}
var TooltipProvider = TooltipPrimitive.Provider;
var TooltipRoot = TooltipPrimitive.Root;
var TooltipTrigger = TooltipPrimitive.Trigger;
var TooltipPortal = TooltipPrimitive.Portal;
var TooltipArrow = React10.forwardRef(({ className, variant = "light", ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Arrow,
  {
    ref,
    className: cn(
      "z-50",
      variant === "dark" ? "fill-popover" : "fill-background",
      className
    ),
    ...props
  }
));
TooltipArrow.displayName = "TooltipArrow";
var tooltipContentVariants = cva(
  "z-50 overflow-hidden rounded-lg shadow-lg outline-none animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        light: "bg-background text-foreground border border-border",
        dark: "bg-popover text-popover-foreground border border-border"
      },
      size: {
        sm: "max-w-[200px] p-2",
        md: "max-w-[280px] p-3",
        lg: "max-w-[360px] p-4"
      }
    },
    defaultVariants: {
      variant: "light",
      size: "md"
    }
  }
);
var TooltipContent = React10.forwardRef(
  ({
    className,
    variant = "light",
    size = "md",
    sideOffset = 8,
    showArrow = true,
    onDismiss,
    children,
    ...props
  }, ref) => /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    TooltipPrimitive.Content,
    {
      ref,
      sideOffset,
      className: cn(tooltipContentVariants({ variant, size }), className),
      ...props,
      children: [
        onDismiss && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onDismiss,
            className: "absolute top-2 right-2 p-1 rounded-full transition-colors hover:bg-muted text-muted-foreground hover:text-foreground",
            "aria-label": "Fechar",
            children: /* @__PURE__ */ jsx(X, { className: "h-3.5 w-3.5" })
          }
        ),
        children,
        showArrow && /* @__PURE__ */ jsx(TooltipArrow, { variant: variant ?? "light", width: 12, height: 6 })
      ]
    }
  ) })
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
var TooltipHeader = React10.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex flex-col gap-1", className), ...props })
);
TooltipHeader.displayName = "TooltipHeader";
var TooltipTitle = React10.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "h4",
    {
      ref,
      className: cn("text-sm font-semibold leading-tight", className),
      ...props
    }
  )
);
TooltipTitle.displayName = "TooltipTitle";
var TooltipDescription = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    className: cn("text-xs leading-relaxed text-muted-foreground", className),
    ...props
  }
));
TooltipDescription.displayName = "TooltipDescription";
var TooltipActions = React10.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("flex items-center gap-2 mt-3", className),
      ...props
    }
  )
);
TooltipActions.displayName = "TooltipActions";
var tooltipActionVariants = cva(
  "inline-flex items-center justify-center text-xs font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1.5",
        secondary: "bg-transparent text-muted-foreground hover:text-foreground hover:underline px-2 py-1.5",
        outline: "border border-border bg-background text-foreground hover:bg-muted px-3 py-1.5"
      }
    },
    defaultVariants: {
      variant: "primary"
    }
  }
);
var TooltipAction = React10.forwardRef(
  ({ className, variant = "primary", ...props }, ref) => /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      className: cn(tooltipActionVariants({ variant }), className),
      ...props
    }
  )
);
TooltipAction.displayName = "TooltipAction";
var TooltipIcon = React10.forwardRef(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn(
        "flex items-center justify-center w-10 h-10 rounded-full mb-3 bg-muted",
        className
      ),
      ...props,
      children
    }
  )
);
TooltipIcon.displayName = "TooltipIcon";
var SimpleTooltip = ({
  children,
  content,
  variant = "light",
  side = "top",
  align = "center",
  delayDuration = 200,
  open,
  defaultOpen,
  onOpenChange
}) => /* @__PURE__ */ jsxs(
  TooltipRoot,
  {
    open,
    defaultOpen,
    onOpenChange,
    delayDuration,
    children: [
      /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children }),
      /* @__PURE__ */ jsx(TooltipContent, { variant, side, align, size: "sm", children: /* @__PURE__ */ jsx("span", { className: "text-xs", children: content }) })
    ]
  }
);
SimpleTooltip.displayName = "SimpleTooltip";
var Tooltip = Object.assign(TooltipRoot, {
  Provider: TooltipProvider,
  Trigger: TooltipTrigger,
  Portal: TooltipPortal,
  Content: TooltipContent,
  Arrow: TooltipArrow,
  Header: TooltipHeader,
  Title: TooltipTitle,
  Description: TooltipDescription,
  Actions: TooltipActions,
  Action: TooltipAction,
  Icon: TooltipIcon,
  Simple: SimpleTooltip
});
var FormLabel = React10.forwardRef(
  ({ className, required, children, ...props }, ref) => {
    const fieldContext = useFormFieldContextOptional();
    return /* @__PURE__ */ jsxs(
      "label",
      {
        ref,
        htmlFor: fieldContext?.id,
        className: cn(
          "text-sm font-medium leading-none",
          fieldContext?.error && "text-red-500",
          className
        ),
        ...props,
        children: [
          children,
          (required || fieldContext?.isRequired) && /* @__PURE__ */ jsx("span", { className: "text-red-500 ml-0.5", children: "*" })
        ]
      }
    );
  }
);
FormLabel.displayName = "Form.Label";
var FormDescription = React10.forwardRef(({ className, ...props }, ref) => {
  const fieldContext = useFormFieldContextOptional();
  if (fieldContext?.error) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      className: cn("text-xs text-muted-foreground", className),
      ...props
    }
  );
});
FormDescription.displayName = "Form.Description";
var FormError = React10.forwardRef(
  ({ className, message, children, ...props }, ref) => {
    const fieldContext = useFormFieldContextOptional();
    const errorMessage = message ?? fieldContext?.error;
    if (!errorMessage && !children) {
      return null;
    }
    return /* @__PURE__ */ jsx(
      "p",
      {
        ref,
        className: cn("text-xs text-red-500", className),
        ...props,
        children: children || errorMessage
      }
    );
  }
);
FormError.displayName = "Form.Error";
var FormFieldWrapper = React10.forwardRef(({ className, label, description, required, error, children, ...props }, ref) => {
  return /* @__PURE__ */ jsxs("div", { ref, className: cn("space-y-1", className), ...props, children: [
    label && /* @__PURE__ */ jsx(FormLabel, { required, children: label }),
    children,
    description && /* @__PURE__ */ jsx(FormDescription, { children: description }),
    error && /* @__PURE__ */ jsx(FormError, { message: error })
  ] });
});
FormFieldWrapper.displayName = "Form.FieldWrapper";
function FieldTooltipIcon({ tooltip }) {
  return /* @__PURE__ */ jsxs(TooltipRoot, { delayDuration: 200, children: [
    /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Info, { className: "h-3 w-3 text-primary cursor-help shrink-0" }) }),
    /* @__PURE__ */ jsx(TooltipContent, { side: "top", size: "md", children: typeof tooltip === "string" ? /* @__PURE__ */ jsx("span", { className: "text-xs", children: tooltip }) : /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold leading-snug", children: tooltip.title }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground leading-snug", children: tooltip.description })
    ] }) })
  ] });
}
function applyMask(value, mask) {
  const digits = value.replace(/\D/g, "");
  switch (mask) {
    case "phone":
      if (digits.length <= 10) {
        return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim();
      }
      return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim();
    case "cpf":
      return digits.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    case "cnpj":
      return digits.replace(/(\d{2})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1/$2").replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    case "cep":
      return digits.replace(/(\d{5})(\d{0,3})/, "$1-$2");
    case "money":
      if (!digits) return "";
      const cents = parseInt(digits, 10) / 100;
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(cents);
    case "percent":
      if (!digits) return "";
      const percent = parseInt(digits, 10) / 100;
      return `${percent.toFixed(2)}%`;
    case "plate":
      const upper = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
      if (upper.length <= 3) return upper;
      if (upper.length <= 7) {
        return upper.replace(/([A-Z]{3})(\d{0,1})([A-Z0-9]{0,1})(\d{0,2})/, "$1-$2$3$4");
      }
      return upper.slice(0, 7).replace(/([A-Z]{3})(\d{0,1})([A-Z0-9]{0,1})(\d{0,2})/, "$1-$2$3$4");
    case "date":
      return digits.replace(/(\d{2})(\d)/, "$1/$2").replace(/(\d{2})(\d)/, "$1/$2").slice(0, 10);
    case "time":
      return digits.replace(/(\d{2})(\d{0,2})/, "$1:$2").slice(0, 5);
    case "datetime":
      const dateTime = digits.replace(/(\d{2})(\d)/, "$1/$2").replace(/(\d{2})(\d)/, "$1/$2").replace(/(\d{4})(\d)/, "$1 $2").replace(/(\d{2})(\d{0,2})$/, "$1:$2");
      return dateTime.slice(0, 16);
    default:
      return value;
  }
}
function getMaxLength(mask) {
  switch (mask) {
    case "phone":
      return 15;
    case "cpf":
      return 14;
    case "cnpj":
      return 18;
    case "cep":
      return 9;
    case "plate":
      return 8;
    case "date":
      return 10;
    case "time":
      return 5;
    case "datetime":
      return 16;
    default:
      return void 0;
  }
}
function parseValue(displayValue, mask) {
  if (!displayValue) return void 0;
  switch (mask) {
    case "money":
      const moneyDigits = displayValue.replace(/\D/g, "");
      return moneyDigits ? parseInt(moneyDigits, 10) / 100 : void 0;
    case "percent":
      const percentDigits = displayValue.replace(/\D/g, "");
      return percentDigits ? parseInt(percentDigits, 10) / 100 : void 0;
    default:
      return displayValue || void 0;
  }
}
function FormInput({
  name,
  label,
  description,
  tooltip,
  required,
  disabled,
  className,
  mask,
  icon,
  showPasswordToggle = true,
  inputSize = "default",
  hideError = false,
  type = "text",
  maxLength,
  ...inputProps
}) {
  const form = useFormContext();
  const fieldState = form.getFieldState(name, form.formState);
  const error = fieldState.error?.message;
  const getInputType = React10.useCallback(() => {
    if (["money", "percent", "phone", "cpf", "cnpj", "cep"].includes(mask || "")) {
      return "tel";
    }
    return type;
  }, [mask, type]);
  return /* @__PURE__ */ jsx(FormFieldProvider, { name, children: /* @__PURE__ */ jsx(
    Controller,
    {
      control: form.control,
      name,
      render: ({ field }) => {
        const getDisplayValue = () => {
          if (field.value === void 0 || field.value === null) return "";
          if (mask) {
            return applyMask(String(field.value), mask);
          }
          return String(field.value);
        };
        const handleChange = (e) => {
          let newValue = e.target.value;
          if (mask) {
            newValue = applyMask(newValue, mask);
            const parsed = parseValue(newValue, mask);
            field.onChange(parsed);
          } else {
            field.onChange(newValue || void 0);
          }
        };
        return /* @__PURE__ */ jsxs("div", { className: cn("space-y-1", className), children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              ...inputProps,
              ref: field.ref,
              name: field.name,
              value: getDisplayValue(),
              onChange: handleChange,
              onBlur: field.onBlur,
              disabled,
              type: getInputType(),
              label,
              required,
              error: !!error,
              icon,
              inputSize,
              maxLength: maxLength ?? getMaxLength(mask),
              labelSuffix: tooltip ? /* @__PURE__ */ jsx(FieldTooltipIcon, { tooltip }) : void 0
            }
          ),
          description && !error && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground px-1", children: description }),
          !hideError && error && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 px-1", children: error })
        ] });
      }
    }
  ) });
}
FormInput.displayName = "Form.Input";
var Popover = PopoverPrimitive.Root;
var PopoverTrigger = PopoverPrimitive.Trigger;
var PopoverContent = React10.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  PopoverPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-auto rounded-md border bg-popover p-4 text-popover-foreground shadow-lg outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
function FormSelect({
  name,
  label,
  description,
  tooltip,
  required,
  disabled,
  className,
  options,
  placeholder = "Selecione...",
  hideError = false,
  emptyText = "Nenhuma op\xE7\xE3o dispon\xEDvel",
  loading = false,
  searchable = false,
  onSearch,
  onLoadMore,
  hasMore,
  searchPlaceholder = "Buscar...",
  dropdownPosition = "bottom"
}) {
  const form = useFormContext();
  const fieldState = form.getFieldState(name, form.formState);
  const error = fieldState.error?.message;
  return /* @__PURE__ */ jsx(FormFieldProvider, { name, children: /* @__PURE__ */ jsx(
    Controller,
    {
      control: form.control,
      name,
      render: ({ field }) => /* @__PURE__ */ jsxs("div", { className: cn("space-y-1", className), children: [
        /* @__PURE__ */ jsx(
          SelectDropdown,
          {
            options,
            value: field.value,
            onChange: (v) => field.onChange(v || void 0),
            disabled,
            label,
            tooltip,
            required,
            error: !!error,
            placeholder,
            searchable,
            onSearch,
            onLoadMore,
            hasMore,
            loading,
            emptyText,
            searchPlaceholder,
            dropdownPosition
          }
        ),
        description && !error && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground px-1", children: description }),
        !hideError && error && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 px-1", children: error })
      ] })
    }
  ) });
}
FormSelect.displayName = "Form.Select";
function SelectDropdown({
  options,
  value,
  onChange,
  disabled,
  label,
  tooltip,
  required,
  error,
  placeholder = "Selecione...",
  searchable,
  onSearch,
  onLoadMore,
  hasMore,
  loading,
  emptyText = "Nenhuma op\xE7\xE3o dispon\xEDvel",
  searchPlaceholder = "Buscar...",
  dropdownPosition = "bottom"
}) {
  const [open, setOpen] = React10.useState(false);
  const [search, setSearch] = React10.useState("");
  const selected = options.find((o) => o.value === value);
  const contentRef = React10.useRef(null);
  const listRef = React10.useRef(null);
  const searchRef = React10.useRef(null);
  const filteredOptions = React10.useMemo(() => {
    if (!searchable || onSearch || !search) return options;
    const q = search.toLowerCase();
    return options.filter(
      (o) => o.label.toLowerCase().includes(q) || o.description?.toLowerCase().includes(q)
    );
  }, [options, search, searchable, onSearch]);
  const handleSearch = React10.useCallback(
    (val) => {
      setSearch(val);
      if (onSearch) onSearch(val);
    },
    [onSearch]
  );
  const handleOpenChange = React10.useCallback(
    (nextOpen) => {
      setOpen(nextOpen);
      if (!nextOpen) {
        setSearch("");
        if (onSearch) onSearch("");
      }
    },
    [onSearch]
  );
  const handleScroll = React10.useCallback(() => {
    if (!onLoadMore || !hasMore || loading) return;
    const el = listRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    if (scrollHeight - scrollTop - clientHeight < 80) {
      onLoadMore();
    }
  }, [onLoadMore, hasMore, loading]);
  React10.useEffect(() => {
    if (!open) return;
    let cancelled = false;
    let removeHandler;
    requestAnimationFrame(() => {
      if (cancelled) return;
      const content = contentRef.current;
      const list = listRef.current;
      if (!content || !list) return;
      const handleWheel = (e) => {
        if (!content.contains(e.target)) return;
        const { scrollTop, scrollHeight, clientHeight } = list;
        if (scrollHeight <= clientHeight) return;
        e.preventDefault();
        e.stopPropagation();
        list.scrollTop = Math.max(0, Math.min(scrollTop + e.deltaY, scrollHeight - clientHeight));
      };
      document.addEventListener("wheel", handleWheel, { passive: false, capture: true });
      removeHandler = () => document.removeEventListener("wheel", handleWheel, { capture: true });
    });
    return () => {
      cancelled = true;
      removeHandler?.();
    };
  }, [open]);
  const side = dropdownPosition === "top" ? "top" : "bottom";
  const avoidCollisions = dropdownPosition === "auto";
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: handleOpenChange, children: [
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          disabled,
          className: cn(
            "flex w-full items-center justify-between rounded-md border-2 bg-background px-3 text-sm transition-colors",
            "focus:outline-none focus:border-primary",
            "disabled:cursor-not-allowed disabled:opacity-50",
            label ? "h-12 pt-4 pb-2" : "h-9 py-2",
            error ? "border-red-500" : "border-border",
            open && !error && "border-primary"
          ),
          children: [
            selected ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 truncate", children: [
              selected.icon && /* @__PURE__ */ jsx(selected.icon, { className: "h-4 w-4 shrink-0 text-muted-foreground" }),
              /* @__PURE__ */ jsx("span", { className: "truncate", children: selected.label })
            ] }) : /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: placeholder }),
            /* @__PURE__ */ jsx(ChevronDown, { className: cn("h-4 w-4 shrink-0 opacity-50 transition-transform", open && "rotate-180") })
          ]
        }
      ) }),
      label && /* @__PURE__ */ jsxs(
        "label",
        {
          className: cn(
            "absolute left-3 top-[-6px] text-xs font-medium bg-background px-1 inline-flex items-center gap-1",
            tooltip ? "pointer-events-auto" : "pointer-events-none",
            error ? "text-red-500" : "text-foreground"
          ),
          children: [
            label,
            required && /* @__PURE__ */ jsx("span", { className: "text-red-500 ml-0.5", children: "*" }),
            tooltip && /* @__PURE__ */ jsx(FieldTooltipIcon, { tooltip })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(
      PopoverContent,
      {
        ref: contentRef,
        side,
        align: "start",
        sideOffset: 4,
        avoidCollisions,
        collisionPadding: 16,
        className: "p-0 overflow-hidden flex flex-col",
        style: {
          minWidth: "var(--radix-popover-trigger-width)",
          width: "fit-content",
          maxWidth: "var(--radix-popover-content-available-width, 100%)",
          maxHeight: "min(340px, var(--radix-popover-content-available-height, 340px))"
        },
        onOpenAutoFocus: (e) => {
          e.preventDefault();
          if (searchable) {
            setTimeout(() => searchRef.current?.focus(), 0);
          }
        },
        children: [
          searchable && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-3 py-2 border-b border-border", children: [
            /* @__PURE__ */ jsx(Search, { className: "h-4 w-4 shrink-0 text-muted-foreground" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                ref: searchRef,
                type: "text",
                value: search,
                onChange: (e) => handleSearch(e.target.value),
                placeholder: searchPlaceholder,
                className: "flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "div",
            {
              ref: listRef,
              className: "overflow-y-auto overscroll-contain min-h-0 flex-1",
              onScroll: handleScroll,
              children: /* @__PURE__ */ jsxs("div", { className: "p-1", children: [
                filteredOptions.length === 0 && !loading ? /* @__PURE__ */ jsx("p", { className: "py-4 text-center text-sm text-muted-foreground", children: emptyText }) : filteredOptions.map((option) => {
                  const isSelected = value === option.value;
                  const isDisabled = option.disabled || disabled;
                  return /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      disabled: isDisabled,
                      onClick: () => {
                        onChange(option.value);
                        setOpen(false);
                      },
                      className: cn(
                        "flex w-full items-center gap-2 rounded-sm px-2 text-left text-sm outline-none",
                        "cursor-pointer hover:bg-accent hover:text-accent-foreground",
                        isSelected && "bg-accent/50",
                        isDisabled && "pointer-events-none opacity-50",
                        option.description ? "py-2" : "py-1.5"
                      ),
                      children: [
                        option.icon && /* @__PURE__ */ jsx("div", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsx(option.icon, { className: "h-3 w-3 text-primary" }) }),
                        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                          /* @__PURE__ */ jsx("span", { className: "block leading-tight", children: option.label }),
                          option.description && /* @__PURE__ */ jsx("span", { className: "block text-xs leading-tight text-muted-foreground", children: option.description })
                        ] }),
                        isSelected && /* @__PURE__ */ jsx(Check, { className: "h-4 w-4 shrink-0 text-primary" })
                      ]
                    },
                    option.value
                  );
                }),
                loading && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-3", children: /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin text-muted-foreground" }) })
              ] })
            }
          )
        ]
      }
    )
  ] });
}
function FormMultiSelect({
  name,
  label,
  description,
  tooltip,
  required,
  disabled,
  className,
  options,
  placeholder = "Selecione...",
  hideError = false,
  emptyText = "Nenhuma op\xE7\xE3o dispon\xEDvel",
  loading = false,
  searchable = false,
  searchPlaceholder = "Buscar...",
  clearable = true,
  maxVisibleChips = 3,
  dropdownPosition = "bottom"
}) {
  const form = useFormContext();
  const fieldState = form.getFieldState(name, form.formState);
  const error = fieldState.error?.message;
  return /* @__PURE__ */ jsx(FormFieldProvider, { name, children: /* @__PURE__ */ jsx(
    Controller,
    {
      control: form.control,
      name,
      render: ({ field }) => {
        const values = Array.isArray(field.value) ? field.value : [];
        return /* @__PURE__ */ jsxs("div", { className: cn("space-y-1", className), children: [
          /* @__PURE__ */ jsx(
            MultiSelectDropdown,
            {
              options,
              value: values,
              onChange: (v) => field.onChange(v),
              disabled,
              label,
              tooltip,
              required,
              error: !!error,
              placeholder,
              searchable,
              loading,
              emptyText,
              searchPlaceholder,
              clearable,
              maxVisibleChips,
              dropdownPosition
            }
          ),
          description && !error && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground px-1", children: description }),
          !hideError && error && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 px-1", children: error })
        ] });
      }
    }
  ) });
}
FormMultiSelect.displayName = "Form.MultiSelect";
function MultiSelectDropdown({
  options,
  value,
  onChange,
  disabled,
  label,
  tooltip,
  required,
  error,
  placeholder = "Selecione...",
  searchable,
  loading,
  emptyText = "Nenhuma op\xE7\xE3o dispon\xEDvel",
  searchPlaceholder = "Buscar...",
  clearable = true,
  maxVisibleChips = 3,
  dropdownPosition = "bottom"
}) {
  const [open, setOpen] = React10.useState(false);
  const [search, setSearch] = React10.useState("");
  const [computedMax, setComputedMax] = React10.useState(maxVisibleChips);
  const [prevValueKey, setPrevValueKey] = React10.useState(() => value.join(","));
  const contentRef = React10.useRef(null);
  const listRef = React10.useRef(null);
  const searchRef = React10.useRef(null);
  const chipsRef = React10.useRef(null);
  const selectedOptions = React10.useMemo(
    () => options.filter((o) => value.includes(o.value)),
    [options, value]
  );
  const valueKey = value.join(",");
  if (valueKey !== prevValueKey) {
    setPrevValueKey(valueKey);
    setComputedMax(maxVisibleChips);
  }
  React10.useLayoutEffect(() => {
    const container = chipsRef.current;
    if (!container || selectedOptions.length === 0) return;
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const chips = container.querySelectorAll("[data-chip]");
    if (chips.length === 0 || containerWidth === 0) return;
    const gap = 4;
    const buffer = 4;
    const badge = container.querySelector("[data-badge]");
    const badgeWidth = badge ? badge.getBoundingClientRect().width : 28;
    const availableWidth = containerWidth - buffer;
    let usedWidth = 0;
    let fits = 0;
    for (let i = 0; i < chips.length; i++) {
      const chipWidth = chips[i].getBoundingClientRect().width;
      const widthWithGap = fits > 0 ? chipWidth + gap : chipWidth;
      const remaining = selectedOptions.length - (fits + 1);
      const needsBadge = remaining > 0;
      const badgeSpace = needsBadge ? badgeWidth + gap : 0;
      if (usedWidth + widthWithGap + badgeSpace > availableWidth && fits > 0) {
        break;
      }
      usedWidth += widthWithGap;
      fits++;
    }
    const newMax = Math.max(1, fits);
    if (newMax !== computedMax) {
      setComputedMax(newMax);
    }
  });
  const filteredOptions = React10.useMemo(() => {
    if (!searchable || !search) return options;
    const q = search.toLowerCase();
    return options.filter(
      (o) => o.label.toLowerCase().includes(q) || o.description?.toLowerCase().includes(q)
    );
  }, [options, search, searchable]);
  const toggleOption = React10.useCallback(
    (optionValue) => {
      if (value.includes(optionValue)) {
        onChange(value.filter((v) => v !== optionValue));
      } else {
        onChange([...value, optionValue]);
      }
    },
    [value, onChange]
  );
  const handleClearAll = React10.useCallback(
    (e) => {
      e.stopPropagation();
      onChange([]);
    },
    [onChange]
  );
  const handleRemoveChip = React10.useCallback(
    (e, optionValue) => {
      e.stopPropagation();
      onChange(value.filter((v) => v !== optionValue));
    },
    [value, onChange]
  );
  const handleOpenChange = React10.useCallback((nextOpen) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setSearch("");
    }
  }, []);
  React10.useEffect(() => {
    if (!open) return;
    let cancelled = false;
    let removeHandler;
    requestAnimationFrame(() => {
      if (cancelled) return;
      const content = contentRef.current;
      const list = listRef.current;
      if (!content || !list) return;
      const handleWheel = (e) => {
        if (!content.contains(e.target)) return;
        const { scrollTop, scrollHeight, clientHeight } = list;
        if (scrollHeight <= clientHeight) return;
        e.preventDefault();
        e.stopPropagation();
        list.scrollTop = Math.max(0, Math.min(scrollTop + e.deltaY, scrollHeight - clientHeight));
      };
      document.addEventListener("wheel", handleWheel, { passive: false, capture: true });
      removeHandler = () => document.removeEventListener("wheel", handleWheel, { capture: true });
    });
    return () => {
      cancelled = true;
      removeHandler?.();
    };
  }, [open]);
  const side = dropdownPosition === "top" ? "top" : "bottom";
  const avoidCollisions = dropdownPosition === "auto";
  const visibleChips = selectedOptions.slice(0, computedMax);
  const overflowCount = selectedOptions.length - computedMax;
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: handleOpenChange, children: [
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          disabled,
          className: cn(
            "flex w-full items-center justify-between rounded-md border-2 bg-background px-3 text-sm transition-colors",
            "focus:outline-none focus:border-primary",
            "disabled:cursor-not-allowed disabled:opacity-50",
            label ? "min-h-[3rem] pt-4 pb-1.5" : "min-h-[2.25rem] py-1.5",
            error ? "border-red-500" : "border-border",
            open && !error && "border-primary"
          ),
          children: [
            /* @__PURE__ */ jsx("div", { ref: chipsRef, className: "flex gap-1 items-center flex-1 overflow-hidden", children: selectedOptions.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
              visibleChips.map((option) => /* @__PURE__ */ jsxs(
                "span",
                {
                  "data-chip": true,
                  className: "inline-flex items-center gap-1 max-w-[150px] shrink-0 rounded-sm bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary",
                  children: [
                    option.icon && /* @__PURE__ */ jsx(option.icon, { className: "h-3 w-3 shrink-0" }),
                    /* @__PURE__ */ jsx("span", { className: "truncate", children: option.label }),
                    /* @__PURE__ */ jsx(
                      X,
                      {
                        className: "h-3 w-3 shrink-0 cursor-pointer hover:text-destructive",
                        onClick: (e) => handleRemoveChip(e, option.value)
                      }
                    )
                  ]
                },
                option.value
              )),
              overflowCount > 0 && /* @__PURE__ */ jsxs("span", { "data-badge": true, className: "inline-flex items-center justify-center h-5 min-w-5 px-1.5 shrink-0 rounded-full bg-gray-100 text-gray-500 text-[10px] font-medium", children: [
                "+",
                overflowCount
              ] })
            ] }) : /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: placeholder }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 ml-1 shrink-0", children: [
              clearable && selectedOptions.length > 0 && /* @__PURE__ */ jsx(
                X,
                {
                  className: "h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer",
                  onClick: handleClearAll
                }
              ),
              /* @__PURE__ */ jsx(ChevronDown, { className: cn("h-4 w-4 opacity-50 transition-transform", open && "rotate-180") })
            ] })
          ]
        }
      ) }),
      label && /* @__PURE__ */ jsxs(
        "label",
        {
          className: cn(
            "absolute left-3 top-[-6px] text-xs font-medium bg-background px-1 inline-flex items-center gap-1",
            tooltip ? "pointer-events-auto" : "pointer-events-none",
            error ? "text-red-500" : "text-foreground"
          ),
          children: [
            label,
            required && /* @__PURE__ */ jsx("span", { className: "text-red-500 ml-0.5", children: "*" }),
            tooltip && /* @__PURE__ */ jsx(FieldTooltipIcon, { tooltip })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(
      PopoverContent,
      {
        ref: contentRef,
        side,
        align: "start",
        sideOffset: 4,
        avoidCollisions,
        collisionPadding: 16,
        className: "p-0 overflow-hidden flex flex-col",
        style: {
          minWidth: "var(--radix-popover-trigger-width)",
          width: "fit-content",
          maxWidth: "var(--radix-popover-content-available-width, 100%)",
          maxHeight: "min(340px, var(--radix-popover-content-available-height, 340px))"
        },
        onOpenAutoFocus: (e) => {
          e.preventDefault();
          if (searchable) {
            setTimeout(() => searchRef.current?.focus(), 0);
          }
        },
        children: [
          searchable && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-3 py-2 border-b border-border", children: [
            /* @__PURE__ */ jsx(Search, { className: "h-4 w-4 shrink-0 text-muted-foreground" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                ref: searchRef,
                type: "text",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                placeholder: searchPlaceholder,
                className: "flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "div",
            {
              ref: listRef,
              className: "overflow-y-auto overscroll-contain min-h-0 flex-1",
              children: /* @__PURE__ */ jsxs("div", { className: "p-1", children: [
                filteredOptions.length === 0 && !loading ? /* @__PURE__ */ jsx("p", { className: "py-4 text-center text-sm text-muted-foreground", children: emptyText }) : filteredOptions.map((option) => {
                  const isSelected = value.includes(option.value);
                  const isDisabled = option.disabled || disabled;
                  return /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      disabled: isDisabled,
                      onClick: () => toggleOption(option.value),
                      className: cn(
                        "flex w-full items-center gap-2 rounded-sm px-2 text-left text-sm outline-none",
                        "cursor-pointer hover:bg-accent hover:text-accent-foreground",
                        isSelected && "bg-accent/50",
                        isDisabled && "pointer-events-none opacity-50",
                        option.description ? "py-2" : "py-1.5"
                      ),
                      children: [
                        option.icon && /* @__PURE__ */ jsx("div", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsx(option.icon, { className: "h-3 w-3 text-primary" }) }),
                        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                          /* @__PURE__ */ jsx("span", { className: "block leading-tight", children: option.label }),
                          option.description && /* @__PURE__ */ jsx("span", { className: "block text-xs leading-tight text-muted-foreground", children: option.description })
                        ] }),
                        isSelected && /* @__PURE__ */ jsx(Check, { className: "h-4 w-4 shrink-0 text-primary" })
                      ]
                    },
                    option.value
                  );
                }),
                loading && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-3", children: /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin text-muted-foreground" }) })
              ] })
            }
          )
        ]
      }
    )
  ] });
}
function FormTextarea({
  name,
  label,
  description,
  required,
  disabled,
  className,
  hideError = false,
  showCount = false,
  maxLength,
  ...textareaProps
}) {
  const form = useFormContext();
  const fieldState = form.getFieldState(name, form.formState);
  const error = fieldState.error?.message;
  return /* @__PURE__ */ jsx(FormFieldProvider, { name, children: /* @__PURE__ */ jsx(
    Controller,
    {
      control: form.control,
      name,
      render: ({ field }) => {
        const charCount = field.value?.length ?? 0;
        return /* @__PURE__ */ jsxs("div", { className: cn("space-y-1", className), children: [
          /* @__PURE__ */ jsx(
            Textarea,
            {
              ...textareaProps,
              ref: field.ref,
              name: field.name,
              value: field.value ?? "",
              onChange: (e) => field.onChange(e.target.value || void 0),
              onBlur: field.onBlur,
              disabled,
              label,
              required,
              error: !!error,
              maxLength
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between px-1", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              description && !error && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: description }),
              !hideError && error && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500", children: error })
            ] }),
            showCount && maxLength && /* @__PURE__ */ jsxs(
              "p",
              {
                className: cn(
                  "text-xs",
                  charCount > maxLength ? "text-red-500" : "text-muted-foreground"
                ),
                children: [
                  charCount,
                  "/",
                  maxLength
                ]
              }
            )
          ] })
        ] });
      }
    }
  ) });
}
FormTextarea.displayName = "Form.Textarea";
function FormCheckbox({
  name,
  label,
  description,
  required,
  disabled,
  className,
  hideError = false
}) {
  const form = useFormContext();
  const fieldState = form.getFieldState(name, form.formState);
  const error = fieldState.error?.message;
  const id = React10.useId();
  return /* @__PURE__ */ jsx(FormFieldProvider, { name, children: /* @__PURE__ */ jsx(
    Controller,
    {
      control: form.control,
      name,
      render: ({ field }) => /* @__PURE__ */ jsxs("div", { className: cn("space-y-1", className), children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx(
            Checkbox,
            {
              id,
              ref: field.ref,
              checked: field.value ?? false,
              onCheckedChange: (checked) => field.onChange(checked),
              onBlur: field.onBlur,
              disabled
            }
          ),
          (label || description) && /* @__PURE__ */ jsxs("div", { className: "grid gap-0.5 leading-none", children: [
            label && /* @__PURE__ */ jsxs(
              "label",
              {
                htmlFor: id,
                className: cn(
                  "text-sm font-medium leading-none cursor-pointer",
                  disabled && "cursor-not-allowed opacity-50"
                ),
                children: [
                  label,
                  required && /* @__PURE__ */ jsx("span", { className: "text-red-500 ml-0.5", children: "*" })
                ]
              }
            ),
            description && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: description })
          ] })
        ] }),
        !hideError && error && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 pl-8", children: error })
      ] })
    }
  ) });
}
FormCheckbox.displayName = "Form.Checkbox";
function FormSwitch({
  name,
  label,
  description,
  required,
  disabled,
  className,
  hideError = false
}) {
  const form = useFormContext();
  const fieldState = form.getFieldState(name, form.formState);
  const error = fieldState.error?.message;
  const id = React10.useId();
  return /* @__PURE__ */ jsx(FormFieldProvider, { name, children: /* @__PURE__ */ jsx(
    Controller,
    {
      control: form.control,
      name,
      render: ({ field }) => /* @__PURE__ */ jsxs("div", { className: cn("space-y-1", className), children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4", children: [
          (label || description) && /* @__PURE__ */ jsxs("div", { className: "grid gap-0.5 leading-none", children: [
            label && /* @__PURE__ */ jsxs(
              "label",
              {
                htmlFor: id,
                className: cn(
                  "text-sm font-medium leading-none cursor-pointer",
                  disabled && "cursor-not-allowed opacity-50"
                ),
                children: [
                  label,
                  required && /* @__PURE__ */ jsx("span", { className: "text-red-500 ml-0.5", children: "*" })
                ]
              }
            ),
            description && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: description })
          ] }),
          /* @__PURE__ */ jsx(
            Switch,
            {
              id,
              ref: field.ref,
              checked: field.value ?? false,
              onCheckedChange: (checked) => field.onChange(checked),
              onBlur: field.onBlur,
              disabled
            }
          )
        ] }),
        !hideError && error && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500", children: error })
      ] })
    }
  ) });
}
FormSwitch.displayName = "Form.Switch";
var colorStyles = {
  default: {
    border: "border-primary",
    bg: "bg-primary/5",
    text: "text-primary",
    radio: "border-primary text-primary"
  },
  destructive: {
    border: "border-red-500",
    bg: "bg-red-500/10",
    text: "text-red-600",
    radio: "border-red-500 text-red-500"
  },
  warning: {
    border: "border-amber-500",
    bg: "bg-amber-500/10",
    text: "text-amber-600",
    radio: "border-amber-500 text-amber-500"
  },
  success: {
    border: "border-green-500",
    bg: "bg-green-500/10",
    text: "text-green-600",
    radio: "border-green-500 text-green-500"
  },
  info: {
    border: "border-blue-500",
    bg: "bg-blue-500/10",
    text: "text-blue-600",
    radio: "border-blue-500 text-blue-500"
  }
};
function FormRadioGroup({
  name,
  label,
  description,
  required,
  disabled,
  className,
  options,
  orientation = "vertical",
  hideError = false
}) {
  const form = useFormContext();
  const fieldState = form.getFieldState(name, form.formState);
  const error = fieldState.error?.message;
  return /* @__PURE__ */ jsx(FormFieldProvider, { name, children: /* @__PURE__ */ jsx(
    Controller,
    {
      control: form.control,
      name,
      render: ({ field }) => /* @__PURE__ */ jsxs("div", { className: cn("space-y-2", className), children: [
        label && /* @__PURE__ */ jsxs("label", { className: "text-sm font-medium", children: [
          label,
          required && /* @__PURE__ */ jsx("span", { className: "text-red-500 ml-0.5", children: "*" })
        ] }),
        description && !error && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: description }),
        /* @__PURE__ */ jsx(
          RadioGroupPrimitive.Root,
          {
            ref: field.ref,
            value: field.value,
            onValueChange: (value) => field.onChange(value || void 0),
            disabled,
            className: cn(
              "grid gap-2",
              orientation === "horizontal" && "flex flex-wrap gap-4"
            ),
            children: options.map((option) => {
              const optionId = `${name}-${option.value}`;
              const isSelected = field.value === option.value;
              const color = option.color || "default";
              const styles = colorStyles[color];
              return /* @__PURE__ */ jsxs(
                "label",
                {
                  htmlFor: optionId,
                  className: cn(
                    "flex items-center gap-3 border-2 py-2 px-4 rounded-lg transition-colors cursor-pointer",
                    isSelected ? cn(styles.border, styles.bg) : "border-border hover:border-muted-foreground/50",
                    (option.disabled || disabled) && "opacity-50 cursor-not-allowed"
                  ),
                  children: [
                    /* @__PURE__ */ jsx(
                      RadioGroupPrimitive.Item,
                      {
                        id: optionId,
                        value: option.value,
                        disabled: option.disabled || disabled,
                        className: cn(
                          "aspect-square h-4 w-4 rounded-full border",
                          isSelected ? styles.radio : "border-border text-muted-foreground",
                          "ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                          "disabled:cursor-not-allowed disabled:opacity-50"
                        ),
                        children: /* @__PURE__ */ jsx(RadioGroupPrimitive.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(Circle, { className: "h-2.5 w-2.5 fill-current text-current" }) })
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "grid gap-0.5 leading-none", children: [
                      /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: cn(
                            "text-sm font-medium leading-none",
                            isSelected && styles.text
                          ),
                          children: option.label
                        }
                      ),
                      option.description && /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: option.description })
                    ] })
                  ]
                },
                option.value
              );
            })
          }
        ),
        !hideError && error && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500", children: error })
      ] })
    }
  ) });
}
FormRadioGroup.displayName = "Form.RadioGroup";
function FormNumberStepper({
  name,
  label,
  description,
  tooltip,
  required,
  disabled,
  className,
  min = 0,
  max,
  step = 0.5,
  defaultValue,
  hideError = false
}) {
  const form = useFormContext();
  const fieldState = form.getFieldState(name, form.formState);
  const error = fieldState.error?.message;
  return /* @__PURE__ */ jsx(FormFieldProvider, { name, children: /* @__PURE__ */ jsx(
    Controller,
    {
      control: form.control,
      name,
      render: ({ field }) => /* @__PURE__ */ jsxs("div", { className: cn("space-y-1", className), children: [
        /* @__PURE__ */ jsx(
          NumberStepper,
          {
            ref: field.ref,
            name: field.name,
            value: typeof field.value === "number" ? field.value : 0,
            onChange: field.onChange,
            onBlur: field.onBlur,
            min,
            max,
            step,
            defaultValue,
            label,
            required,
            disabled,
            error: !!error,
            labelSuffix: tooltip ? /* @__PURE__ */ jsx(FieldTooltipIcon, { tooltip }) : void 0
          }
        ),
        description && !error && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground px-1", children: description }),
        !hideError && error && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 px-1", children: error })
      ] })
    }
  ) });
}
FormNumberStepper.displayName = "Form.NumberStepper";
function FormRoot({
  form,
  onSubmit,
  onError,
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(FormProvider, { ...form, children: /* @__PURE__ */ jsx(
    "form",
    {
      onSubmit: form.handleSubmit(onSubmit, onError),
      className: cn("space-y-4", className),
      ...props,
      children
    }
  ) });
}
FormRoot.displayName = "Form";
var Form = Object.assign(FormRoot, {
  // Campos com auto-bind
  Input: FormInput,
  Select: FormSelect,
  MultiSelect: FormMultiSelect,
  Textarea: FormTextarea,
  Checkbox: FormCheckbox,
  Switch: FormSwitch,
  RadioGroup: FormRadioGroup,
  NumberStepper: FormNumberStepper,
  // Partes auxiliares
  Label: FormLabel,
  Description: FormDescription,
  Error: FormError,
  FieldWrapper: FormFieldWrapper,
  Field: FormFieldProvider
});
var Avatar = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
var AvatarImage = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
var AvatarFallback = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-primary/10 text-primary font-semibold",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
var DropdownMenu = DropdownMenuPrimitive.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
var DropdownMenuGroup = DropdownMenuPrimitive.Group;
var DropdownMenuPortal = DropdownMenuPrimitive.Portal;
var DropdownMenuSub = DropdownMenuPrimitive.Sub;
var DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
var DropdownMenuSubTrigger = React10.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
var DropdownMenuSubContent = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
var DropdownMenuContent = React10.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
var DropdownMenuItem = React10.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
var DropdownMenuCheckboxItem = React10.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
var DropdownMenuRadioItem = React10.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
var DropdownMenuLabel = React10.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
var DropdownMenuSeparator = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
var DropdownMenuShortcut = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn("ml-auto text-xs tracking-widest opacity-60", className),
      ...props
    }
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
var AuthLayoutContext = React10.createContext({
  imagePosition: "left"
});
function AuthLayoutRoot({ children, className }) {
  const [imagePosition, setImagePosition] = React10.useState("left");
  React10.useEffect(() => {
    React10.Children.forEach(children, (child) => {
      if (React10.isValidElement(child) && child.type === AuthLayoutImage) {
        setImagePosition(child.props.position || "left");
      }
    });
  }, [children]);
  return /* @__PURE__ */ jsx(AuthLayoutContext.Provider, { value: { imagePosition }, children: /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "min-h-screen flex flex-col xl:flex-row max-xl:justify-center",
        imagePosition === "right" && "xl:flex-row-reverse",
        className
      ),
      children
    }
  ) });
}
function AuthLayoutImage({
  src,
  alt,
  position: _position = "left",
  className,
  priority = true,
  showPattern = false
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "hidden xl:block relative w-full xl:w-3/6 h-64 xl:h-screen overflow-hidden bg-muted",
        className
      ),
      children: [
        src ? /* @__PURE__ */ jsx(
          "img",
          {
            src,
            alt,
            className: "absolute inset-0 w-full h-full object-cover object-top",
            loading: priority ? "eager" : "lazy"
          }
        ) : null,
        showPattern && /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex items-center justify-center", children: [
          /* @__PURE__ */ jsxs(
            "svg",
            {
              className: "absolute inset-0 w-full h-full opacity-10",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx(
                  "pattern",
                  {
                    id: "auth-grid",
                    width: "40",
                    height: "40",
                    patternUnits: "userSpaceOnUse",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        d: "M 40 0 L 0 0 0 40",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "0.5"
                      }
                    )
                  }
                ) }),
                /* @__PURE__ */ jsx("rect", { width: "100%", height: "100%", fill: "url(#auth-grid)" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-64 h-64 rounded-full border border-muted-foreground/20" }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-muted-foreground/30 flex items-center justify-center", children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-10 h-10 text-muted-foreground/40",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 1,
                    d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-full ml-4 w-32 h-px bg-gradient-to-r from-muted-foreground/20 to-transparent" }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 right-full mr-4 w-32 h-px bg-gradient-to-l from-muted-foreground/20 to-transparent" }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-full left-1/2 -translate-x-1/2 mt-4 w-px h-32 bg-gradient-to-b from-muted-foreground/20 to-transparent" }),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-px h-32 bg-gradient-to-t from-muted-foreground/20 to-transparent" })
          ] })
        ] })
      ]
    }
  );
}
function AuthLayoutContent({
  children,
  className,
  maxWidth = "md"
}) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg"
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "relative w-full lg:w-3/6 flex items-center justify-center p-6 lg:p-12 bg-background",
        className
      ),
      children: /* @__PURE__ */ jsx("div", { className: cn("w-full space-y-8", maxWidthClasses[maxWidth]), children })
    }
  );
}
function AuthLayoutHeader({
  children,
  className,
  logo,
  title,
  description,
  centered = true,
  position = "top-right"
}) {
  if (position === "top-left" && logo) {
    return /* @__PURE__ */ jsx("div", { className: cn("absolute top-6 left-6 lg:top-8 lg:left-8", className), children: logo });
  }
  if (position === "top-right" && logo) {
    return /* @__PURE__ */ jsx("div", { className: cn("absolute top-6 right-6 lg:top-8 lg:right-8", className), children: logo });
  }
  if (children) {
    return /* @__PURE__ */ jsx("div", { className: cn("space-y-2", centered && "text-center", className), children });
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex flex-col gap-2",
        centered && "items-center text-center",
        className
      ),
      children: [
        logo && /* @__PURE__ */ jsx("div", { className: "mb-2", children: logo }),
        title && /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: title }),
        description && /* @__PURE__ */ jsx("p", { className: "text-balance text-sm text-muted-foreground", children: description })
      ]
    }
  );
}
function AuthLayoutBody({ children, className }) {
  return /* @__PURE__ */ jsx("div", { className: cn("space-y-6", className), children });
}
function AuthLayoutFooter({ children, className }) {
  return /* @__PURE__ */ jsx("div", { className: cn("text-center text-sm text-muted-foreground", className), children });
}
function AuthLayoutLink({ children, className, ...props }) {
  return /* @__PURE__ */ jsx(
    "a",
    {
      className: cn(
        "text-sm text-primary hover:underline cursor-pointer",
        className
      ),
      ...props,
      children
    }
  );
}
function AuthLayoutDivider({ text = "ou", className }) {
  return /* @__PURE__ */ jsxs("div", { className: cn("relative", className), children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsx("span", { className: "w-full border-t" }) }),
    /* @__PURE__ */ jsx("div", { className: "relative flex justify-center text-xs uppercase", children: /* @__PURE__ */ jsx("span", { className: "bg-background px-2 text-muted-foreground", children: text }) })
  ] });
}
AuthLayoutRoot.displayName = "AuthLayout";
AuthLayoutImage.displayName = "AuthLayout.Image";
AuthLayoutContent.displayName = "AuthLayout.Content";
AuthLayoutHeader.displayName = "AuthLayout.Header";
AuthLayoutBody.displayName = "AuthLayout.Body";
AuthLayoutFooter.displayName = "AuthLayout.Footer";
AuthLayoutLink.displayName = "AuthLayout.Link";
AuthLayoutDivider.displayName = "AuthLayout.Divider";
var AuthLayout = Object.assign(AuthLayoutRoot, {
  Image: AuthLayoutImage,
  Content: AuthLayoutContent,
  Header: AuthLayoutHeader,
  Body: AuthLayoutBody,
  Footer: AuthLayoutFooter,
  Link: AuthLayoutLink,
  Divider: AuthLayoutDivider
});
var TabsContext = React10.createContext(null);
function SelectionLayoutRoot({ children, className }) {
  return /* @__PURE__ */ jsx("div", { className: cn("min-h-screen bg-muted/30 flex flex-col lg:flex-row", className), children });
}
function SelectionLayoutSidebar({ children, className }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "lg:w-2/5 bg-gradient-to-br from-primary/90 to-primary p-6 lg:p-12",
        "flex flex-col justify-between text-white relative overflow-hidden",
        "min-h-[50vh] lg:min-h-screen",
        className
      ),
      children
    }
  );
}
function SelectionLayoutLogo({ children, className }) {
  return /* @__PURE__ */ jsx("div", { className: cn("flex items-center gap-3 mb-8 lg:mb-16", className), children });
}
function SelectionLayoutHeadline({
  title,
  bullets,
  className
}) {
  return /* @__PURE__ */ jsxs("div", { className: cn("space-y-4 lg:space-y-6 flex-1", className), children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl lg:text-5xl font-bold leading-tight", children: title }),
    bullets && bullets.length > 0 && /* @__PURE__ */ jsx("div", { className: "space-y-2 text-white/80", children: bullets.map((bullet, index) => /* @__PURE__ */ jsx("p", { className: "text-base lg:text-lg", children: bullet }, index)) })
  ] });
}
function SelectionLayoutStats({ label, value, className }) {
  return /* @__PURE__ */ jsx("div", { className: cn("bg-white/10 rounded-lg p-4 backdrop-blur-sm", className), children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm lg:text-base", children: [
    /* @__PURE__ */ jsx("span", { children: label }),
    /* @__PURE__ */ jsx("span", { className: "font-bold", children: value })
  ] }) });
}
function SelectionLayoutMain({ children, className }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "lg:w-3/5 bg-background flex flex-col min-h-[50vh] lg:min-h-screen",
        className
      ),
      children
    }
  );
}
function SelectionLayoutHeader({
  title,
  subtitle,
  action,
  className
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex justify-between items-center p-6 lg:p-8 border-b border-border",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl lg:text-2xl font-bold", children: title }),
          subtitle && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: subtitle })
        ] }),
        action && /* @__PURE__ */ jsx("div", { children: action })
      ]
    }
  );
}
function SelectionLayoutSearch({
  value,
  onChange,
  placeholder = "Buscar...",
  className
}) {
  return /* @__PURE__ */ jsx("div", { className: cn("p-6 lg:p-8 pb-4 lg:pb-6", className), children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        placeholder,
        value,
        onChange: (e) => onChange(e.target.value),
        className: cn(
          "w-full pl-10 h-11 rounded-md border border-input bg-muted/50",
          "focus:bg-background focus:outline-none focus:ring-2 focus:ring-ring",
          "text-sm placeholder:text-muted-foreground"
        )
      }
    )
  ] }) });
}
function SelectionLayoutTabs({
  children,
  value,
  onValueChange,
  className
}) {
  return /* @__PURE__ */ jsx(TabsContext.Provider, { value: { value, onValueChange }, children: /* @__PURE__ */ jsx("div", { className: cn("px-6 lg:px-8", className), children: /* @__PURE__ */ jsx("div", { className: "flex space-x-1 bg-muted p-1 rounded-lg", children }) }) });
}
function SelectionLayoutTab({
  value,
  label,
  icon: Icon2,
  badge,
  className
}) {
  const context = React10.useContext(TabsContext);
  if (!context) {
    throw new Error("SelectionLayout.Tab must be used within SelectionLayout.Tabs");
  }
  const isActive = context.value === value;
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: () => context.onValueChange(value),
      className: cn(
        "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all",
        isActive ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
        className
      ),
      children: [
        Icon2 && /* @__PURE__ */ jsx(Icon2, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: label }),
        badge !== void 0 && /* @__PURE__ */ jsx(
          "span",
          {
            className: cn(
              "text-xs px-2 py-0.5 rounded-full",
              isActive ? "bg-primary/10 text-primary" : "bg-muted-foreground/20"
            ),
            children: badge
          }
        )
      ]
    }
  );
}
function SelectionLayoutList({ children, className }) {
  return /* @__PURE__ */ jsx("div", { className: cn("flex-1 p-6 lg:p-8 pt-6", className), children: /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "space-y-3 max-h-[50vh] lg:max-h-[55vh] overflow-y-auto pr-2",
        "scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent"
      ),
      children
    }
  ) });
}
function SelectionLayoutCard({
  children,
  className,
  onClick,
  icon,
  title,
  description,
  badge,
  favorite,
  onFavoriteClick
}) {
  const isIconComponent = typeof icon === "function" || icon && typeof icon === "object" && "$$typeof" in icon;
  const IconComponent = isIconComponent ? icon : null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      onClick,
      className: cn(
        "cursor-pointer transition-all duration-200 rounded-lg border-2 bg-card",
        "hover:shadow-lg hover:border-primary/20 active:scale-[0.98] group",
        className
      ),
      children: /* @__PURE__ */ jsx("div", { className: "p-4 lg:p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 lg:gap-4 flex-1 min-w-0", children: [
          icon && /* @__PURE__ */ jsx("div", { className: "w-10 h-10 lg:w-12 lg:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0", children: IconComponent ? /* @__PURE__ */ jsx(IconComponent, { className: "w-5 h-5 lg:w-6 lg:h-6 text-primary" }) : icon }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm lg:text-base truncate", children: title }),
              favorite && /* @__PURE__ */ jsx(Star, { className: "w-4 h-4 text-yellow-500 fill-current flex-shrink-0" }),
              badge
            ] }),
            description && /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-xs lg:text-sm truncate", children: description }),
            children
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-shrink-0 ml-2", children: [
          onFavoriteClick && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: (e) => {
                e.stopPropagation();
                onFavoriteClick();
              },
              className: "p-2 hover:bg-muted rounded-md transition-colors",
              children: /* @__PURE__ */ jsx(
                Star,
                {
                  className: cn(
                    "w-4 h-4",
                    favorite ? "text-yellow-500 fill-current" : "text-muted-foreground"
                  )
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" })
        ] })
      ] }) })
    }
  );
}
function SelectionLayoutEmpty({
  icon: Icon2 = Building2,
  title,
  description,
  action,
  className
}) {
  return /* @__PURE__ */ jsxs("div", { className: cn("text-center py-12", className), children: [
    /* @__PURE__ */ jsx(Icon2, { className: "w-12 h-12 text-muted-foreground/50 mx-auto mb-4" }),
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium mb-2", children: title }),
    description && /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4", children: description }),
    action
  ] });
}
SelectionLayoutRoot.displayName = "SelectionLayout";
SelectionLayoutSidebar.displayName = "SelectionLayout.Sidebar";
SelectionLayoutLogo.displayName = "SelectionLayout.Logo";
SelectionLayoutHeadline.displayName = "SelectionLayout.Headline";
SelectionLayoutStats.displayName = "SelectionLayout.Stats";
SelectionLayoutMain.displayName = "SelectionLayout.Main";
SelectionLayoutHeader.displayName = "SelectionLayout.Header";
SelectionLayoutSearch.displayName = "SelectionLayout.Search";
SelectionLayoutTabs.displayName = "SelectionLayout.Tabs";
SelectionLayoutTab.displayName = "SelectionLayout.Tab";
SelectionLayoutList.displayName = "SelectionLayout.List";
SelectionLayoutCard.displayName = "SelectionLayout.Card";
SelectionLayoutEmpty.displayName = "SelectionLayout.Empty";
var SelectionLayout = Object.assign(SelectionLayoutRoot, {
  Sidebar: SelectionLayoutSidebar,
  Logo: SelectionLayoutLogo,
  Headline: SelectionLayoutHeadline,
  Stats: SelectionLayoutStats,
  Main: SelectionLayoutMain,
  Header: SelectionLayoutHeader,
  Search: SelectionLayoutSearch,
  Tabs: SelectionLayoutTabs,
  Tab: SelectionLayoutTab,
  List: SelectionLayoutList,
  Card: SelectionLayoutCard,
  Empty: SelectionLayoutEmpty
});
var DashboardLayoutContext = React10.createContext(null);
function useDashboardLayout() {
  const context = React10.useContext(DashboardLayoutContext);
  if (!context) {
    throw new Error("useDashboardLayout must be used within DashboardLayout");
  }
  return context;
}
function useMediaQuery(query) {
  const [matches, setMatches] = React10.useState(false);
  React10.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);
  return matches;
}
function DashboardLayoutRoot({
  children,
  className,
  defaultExpanded = false,
  defaultPinned = false
}) {
  const [sidebarExpanded, setSidebarExpanded] = React10.useState(defaultExpanded || defaultPinned);
  const [sidebarPinned, setSidebarPinned] = React10.useState(defaultPinned);
  const [mobileMenuOpen, setMobileMenuOpen] = React10.useState(false);
  const isMobile = useMediaQuery("(max-width: 1024px)");
  React10.useEffect(() => {
    if (!isMobile) {
      setMobileMenuOpen(false);
    }
  }, [isMobile]);
  const value = {
    sidebarExpanded,
    setSidebarExpanded,
    sidebarPinned,
    setSidebarPinned,
    isMobile,
    mobileMenuOpen,
    setMobileMenuOpen
  };
  return /* @__PURE__ */ jsx(DashboardLayoutContext.Provider, { value, children: /* @__PURE__ */ jsx("div", { className: cn("min-h-screen bg-muted/30 flex", className), children }) });
}
function DashboardLayoutSidebar({
  children,
  className,
  collapsedWidth = 64,
  expandedWidth = 256
}) {
  const {
    sidebarExpanded,
    setSidebarExpanded,
    sidebarPinned,
    isMobile,
    mobileMenuOpen,
    setMobileMenuOpen
  } = useDashboardLayout();
  const handleMouseEnter = () => {
    if (!sidebarPinned && !isMobile) {
      setSidebarExpanded(true);
    }
  };
  const handleMouseLeave = () => {
    if (!sidebarPinned && !isMobile) {
      setSidebarExpanded(false);
    }
  };
  if (isMobile) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      mobileMenuOpen && /* @__PURE__ */ jsx(
        "div",
        {
          className: "fixed inset-0 bg-black/50 z-40 lg:hidden",
          onClick: () => setMobileMenuOpen(false)
        }
      ),
      /* @__PURE__ */ jsx(
        "aside",
        {
          className: cn(
            "fixed top-0 left-0 h-full bg-card z-50 shadow-xl",
            "transform transition-transform duration-300 ease-in-out",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
            "w-[280px]",
            className
          ),
          children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setMobileMenuOpen(false),
                className: "absolute top-4 right-4 p-2 hover:bg-muted rounded-md",
                children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
              }
            ),
            children
          ] })
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsx(
    "aside",
    {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      style: {
        width: sidebarExpanded ? expandedWidth : collapsedWidth
      },
      className: cn(
        "fixed top-0 left-0 h-screen bg-card z-40",
        "flex flex-col shadow-[0_0_20px_rgba(0,0,0,0.06)]",
        "transition-[width] duration-300 ease-in-out",
        className
      ),
      children
    }
  );
}
function DashboardLayoutSidebarHeader({
  children,
  className,
  logo,
  collapsedLogo,
  title
}) {
  const { sidebarExpanded, sidebarPinned, setSidebarPinned, isMobile } = useDashboardLayout();
  if (children) {
    return /* @__PURE__ */ jsx("div", { className: cn("p-4 border-b border-border", className), children });
  }
  return /* @__PURE__ */ jsx("div", { className: cn("p-4 border-b border-border", className), children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: sidebarExpanded ? logo : collapsedLogo || logo }),
      sidebarExpanded && title && /* @__PURE__ */ jsx("span", { className: "font-semibold text-lg truncate", children: title })
    ] }),
    sidebarExpanded && !isMobile && /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setSidebarPinned(!sidebarPinned),
        className: "p-1.5 hover:bg-muted rounded-md transition-colors",
        title: sidebarPinned ? "Unpin sidebar" : "Pin sidebar",
        children: sidebarPinned ? /* @__PURE__ */ jsx(PinOff, { className: "w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ jsx(Pin, { className: "w-4 h-4 text-muted-foreground" })
      }
    )
  ] }) });
}
function DashboardLayoutSidebarNav({ children, className }) {
  return /* @__PURE__ */ jsx("nav", { className: cn("flex-1 overflow-y-auto overflow-x-hidden py-2", className), children });
}
function DashboardLayoutSidebarNavItem({
  icon,
  label,
  href,
  onClick,
  isActive,
  badge,
  badgeVariant = "default",
  className,
  disabled
}) {
  const { sidebarExpanded } = useDashboardLayout();
  const badgeColors = {
    default: "bg-muted text-muted-foreground",
    primary: "bg-primary/10 text-primary",
    destructive: "bg-destructive/10 text-destructive"
  };
  const renderIcon4 = () => {
    if (!icon) return null;
    if (React10.isValidElement(icon)) {
      return icon;
    }
    if (typeof icon === "function" || typeof icon === "object" && "$$typeof" in icon) {
      const IconComponent = icon;
      return /* @__PURE__ */ jsx(IconComponent, { className: "w-5 h-5 flex-shrink-0" });
    }
    return null;
  };
  const content = /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex items-center gap-3 px-3 py-2.5 mx-2 rounded-md transition-colors",
        "hover:bg-muted cursor-pointer",
        isActive && "bg-primary/10 text-primary hover:bg-primary/15",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      ),
      onClick: disabled ? void 0 : onClick,
      children: [
        renderIcon4(),
        sidebarExpanded && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { className: "flex-1 truncate text-sm", children: label }),
          badge !== void 0 && /* @__PURE__ */ jsx(
            "span",
            {
              className: cn(
                "text-xs px-2 py-0.5 rounded-full",
                badgeColors[badgeVariant]
              ),
              children: badge
            }
          )
        ] }),
        !sidebarExpanded && badge !== void 0 && /* @__PURE__ */ jsx("span", { className: "absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" })
      ]
    }
  );
  if (href && !disabled) {
    return /* @__PURE__ */ jsx("a", { href, className: "block relative", children: content });
  }
  return /* @__PURE__ */ jsx("div", { className: "relative", children: content });
}
function DashboardLayoutSidebarNavGroup({
  icon,
  label,
  children,
  defaultOpen = false,
  isActive,
  badge,
  badgeVariant = "default",
  className
}) {
  const { sidebarExpanded } = useDashboardLayout();
  const [isOpen, setIsOpen] = React10.useState(defaultOpen);
  const badgeColors = {
    default: "bg-muted text-muted-foreground",
    primary: "bg-primary/10 text-primary",
    destructive: "bg-destructive/10 text-destructive"
  };
  const renderIcon4 = () => {
    if (!icon) return null;
    if (React10.isValidElement(icon)) {
      return icon;
    }
    if (typeof icon === "function" || typeof icon === "object" && "$$typeof" in icon) {
      const IconComponent = icon;
      return /* @__PURE__ */ jsx(IconComponent, { className: "w-5 h-5 flex-shrink-0" });
    }
    return null;
  };
  React10.useEffect(() => {
    if (isActive && sidebarExpanded) {
      setIsOpen(true);
    }
  }, [isActive, sidebarExpanded]);
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        onClick: () => sidebarExpanded && setIsOpen(!isOpen),
        className: cn(
          "flex items-center gap-3 px-3 py-2.5 mx-2 rounded-md transition-colors",
          "hover:bg-muted cursor-pointer",
          isActive && "text-primary"
        ),
        children: [
          renderIcon4(),
          sidebarExpanded && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { className: "flex-1 truncate text-sm", children: label }),
            badge !== void 0 && /* @__PURE__ */ jsx(
              "span",
              {
                className: cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  badgeColors[badgeVariant]
                ),
                children: badge
              }
            ),
            isOpen ? /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground" })
          ] })
        ]
      }
    ),
    sidebarExpanded && isOpen && /* @__PURE__ */ jsx("div", { className: "ml-4 mt-1 space-y-0.5", children })
  ] });
}
function DashboardLayoutSidebarSection({
  title,
  children,
  className
}) {
  const { sidebarExpanded } = useDashboardLayout();
  return /* @__PURE__ */ jsxs("div", { className: cn("mb-2", className), children: [
    title && sidebarExpanded && /* @__PURE__ */ jsx("div", { className: "px-5 py-2", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-medium uppercase tracking-wider text-muted-foreground", children: title }) }),
    children
  ] });
}
function DashboardLayoutSidebarFooter({ children, className }) {
  return /* @__PURE__ */ jsx("div", { className: cn("p-4 border-t border-border mt-auto", className), children });
}
function DashboardLayoutHeader({ children, className }) {
  const { isMobile, setMobileMenuOpen, sidebarPinned } = useDashboardLayout();
  const marginLeft = isMobile ? 0 : sidebarPinned ? 256 : 64;
  return /* @__PURE__ */ jsxs(
    "header",
    {
      style: { marginLeft },
      className: cn(
        "h-16 bg-background border-b border-border",
        "flex items-center px-4 lg:px-6",
        "sticky top-0 z-30",
        !isMobile && "transition-[margin-left] duration-300",
        className
      ),
      children: [
        isMobile && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setMobileMenuOpen(true),
            className: "p-2 hover:bg-muted rounded-md mr-2",
            children: /* @__PURE__ */ jsx(Menu, { className: "w-5 h-5" })
          }
        ),
        children
      ]
    }
  );
}
function DashboardLayoutHeaderTitle({
  children,
  className,
  title,
  subtitle
}) {
  if (children) {
    return /* @__PURE__ */ jsx("div", { className: cn("flex-1", className), children });
  }
  return /* @__PURE__ */ jsxs("div", { className: cn("flex-1 min-w-0", className), children: [
    title && /* @__PURE__ */ jsx("h1", { className: "font-semibold text-lg truncate", children: title }),
    subtitle && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground truncate", children: subtitle })
  ] });
}
function DashboardLayoutHeaderActions({ children, className }) {
  return /* @__PURE__ */ jsx("div", { className: cn("flex items-center gap-2", className), children });
}
function DashboardLayoutHeaderUser({
  name,
  email,
  avatar,
  className,
  children,
  onLogout
}) {
  const [isOpen, setIsOpen] = React10.useState(false);
  return /* @__PURE__ */ jsxs("div", { className: cn("relative", className), children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        className: "flex items-center gap-2 p-1.5 hover:bg-muted rounded-md transition-colors",
        children: [
          avatar ? /* @__PURE__ */ jsx(
            "img",
            {
              src: avatar,
              alt: name,
              className: "w-8 h-8 rounded-full object-cover"
            }
          ) : /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(User, { className: "w-4 h-4 text-primary" }) }),
          /* @__PURE__ */ jsxs("div", { className: "hidden sm:block text-left", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium truncate max-w-[120px]", children: name }),
            email && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground truncate max-w-[120px]", children: email })
          ] }),
          /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground hidden sm:block" })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "fixed inset-0 z-40",
          onClick: () => setIsOpen(false)
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "absolute right-0 top-full mt-1 w-56 bg-card border border-border rounded-md shadow-lg z-50", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-3 border-b border-border", children: [
          /* @__PURE__ */ jsx("p", { className: "font-medium truncate", children: name }),
          email && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground truncate", children: email })
        ] }),
        children && /* @__PURE__ */ jsx("div", { className: "p-1", children }),
        onLogout && /* @__PURE__ */ jsx("div", { className: "p-1 border-t border-border", children: /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              setIsOpen(false);
              onLogout();
            },
            className: "flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors text-destructive",
            children: [
              /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4" }),
              "Sair"
            ]
          }
        ) })
      ] })
    ] })
  ] });
}
function DashboardLayoutContent({ children, className }) {
  const { isMobile, sidebarPinned } = useDashboardLayout();
  const marginLeft = isMobile ? 0 : sidebarPinned ? 256 : 64;
  return /* @__PURE__ */ jsx(
    "main",
    {
      style: { marginLeft },
      className: cn(
        "flex-1 flex flex-col min-h-screen",
        "transition-[margin-left] duration-300",
        className
      ),
      children
    }
  );
}
function DashboardLayoutBreadcrumbs({
  items,
  className,
  separator
}) {
  const defaultSeparator = /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground" });
  return /* @__PURE__ */ jsx("nav", { className: cn("flex items-center gap-1 text-sm", className), children: items.map((item, index) => {
    const Icon2 = item.icon;
    const isLast = index === items.length - 1;
    return /* @__PURE__ */ jsxs(React10.Fragment, { children: [
      item.href && !isLast ? /* @__PURE__ */ jsxs(
        "a",
        {
          href: item.href,
          className: "flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors",
          children: [
            Icon2 && /* @__PURE__ */ jsx(Icon2, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("span", { children: item.label })
          ]
        }
      ) : /* @__PURE__ */ jsxs(
        "span",
        {
          className: cn(
            "flex items-center gap-1",
            isLast ? "text-foreground font-medium" : "text-muted-foreground"
          ),
          children: [
            Icon2 && /* @__PURE__ */ jsx(Icon2, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("span", { children: item.label })
          ]
        }
      ),
      !isLast && /* @__PURE__ */ jsx("span", { className: "mx-1", children: separator || defaultSeparator })
    ] }, index);
  }) });
}
function DashboardLayoutMobileNav({ children, className }) {
  return /* @__PURE__ */ jsx(
    "nav",
    {
      className: cn(
        "fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border",
        "flex items-center justify-around px-2 z-50 lg:hidden",
        className
      ),
      children
    }
  );
}
function DashboardLayoutMobileNavItem({
  icon: Icon2,
  label,
  href,
  onClick,
  isActive,
  badge
}) {
  const content = /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex flex-col items-center gap-1 p-2 rounded-md transition-colors relative",
        "hover:bg-muted",
        isActive && "text-primary"
      ),
      onClick,
      children: [
        /* @__PURE__ */ jsx(Icon2, { className: "w-5 h-5" }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px]", children: label }),
        badge !== void 0 && /* @__PURE__ */ jsx("span", { className: "absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-medium bg-destructive text-destructive-foreground rounded-full px-1", children: badge })
      ]
    }
  );
  if (href) {
    return /* @__PURE__ */ jsx("a", { href, children: content });
  }
  return content;
}
DashboardLayoutRoot.displayName = "DashboardLayout";
DashboardLayoutSidebar.displayName = "DashboardLayout.Sidebar";
DashboardLayoutSidebarHeader.displayName = "DashboardLayout.SidebarHeader";
DashboardLayoutSidebarNav.displayName = "DashboardLayout.SidebarNav";
DashboardLayoutSidebarNavItem.displayName = "DashboardLayout.SidebarNavItem";
DashboardLayoutSidebarNavGroup.displayName = "DashboardLayout.SidebarNavGroup";
DashboardLayoutSidebarSection.displayName = "DashboardLayout.SidebarSection";
DashboardLayoutSidebarFooter.displayName = "DashboardLayout.SidebarFooter";
DashboardLayoutHeader.displayName = "DashboardLayout.Header";
DashboardLayoutHeaderTitle.displayName = "DashboardLayout.HeaderTitle";
DashboardLayoutHeaderActions.displayName = "DashboardLayout.HeaderActions";
DashboardLayoutHeaderUser.displayName = "DashboardLayout.HeaderUser";
DashboardLayoutContent.displayName = "DashboardLayout.Content";
DashboardLayoutBreadcrumbs.displayName = "DashboardLayout.Breadcrumbs";
DashboardLayoutMobileNav.displayName = "DashboardLayout.MobileNav";
DashboardLayoutMobileNavItem.displayName = "DashboardLayout.MobileNavItem";
var DashboardLayout = Object.assign(DashboardLayoutRoot, {
  Sidebar: DashboardLayoutSidebar,
  SidebarHeader: DashboardLayoutSidebarHeader,
  SidebarNav: DashboardLayoutSidebarNav,
  SidebarNavItem: DashboardLayoutSidebarNavItem,
  SidebarNavGroup: DashboardLayoutSidebarNavGroup,
  SidebarSection: DashboardLayoutSidebarSection,
  SidebarFooter: DashboardLayoutSidebarFooter,
  Header: DashboardLayoutHeader,
  HeaderTitle: DashboardLayoutHeaderTitle,
  HeaderActions: DashboardLayoutHeaderActions,
  HeaderUser: DashboardLayoutHeaderUser,
  Content: DashboardLayoutContent,
  Breadcrumbs: DashboardLayoutBreadcrumbs,
  MobileNav: DashboardLayoutMobileNav,
  MobileNavItem: DashboardLayoutMobileNavItem
});
var SidebarContext = React10.createContext(null);
function useSidebar() {
  const context = React10.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a Sidebar component");
  }
  return context;
}
function useSidebarOptional() {
  return React10.useContext(SidebarContext);
}
function SidebarProvider({ children, value }) {
  return /* @__PURE__ */ jsx(SidebarContext.Provider, { value, children });
}
function useMediaQuery2(query) {
  const [matches, setMatches] = React10.useState(false);
  React10.useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);
    const handler = (event) => {
      setMatches(event.matches);
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);
  return matches;
}
var SidebarHeader = React10.memo(function SidebarHeader2({
  logo,
  collapsedLogo,
  title,
  showPinButton = true,
  className
}) {
  const { expanded, pinned, setPinned } = useSidebar();
  const handleTogglePin = React10.useCallback(() => {
    setPinned(!pinned);
  }, [pinned, setPinned]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex items-center justify-between h-[60px] border-b border-border bg-primary px-3",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 overflow-hidden", children: [
          /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: !expanded && collapsedLogo && /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.8 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.8 },
              transition: { duration: 0.15 },
              className: "flex items-center justify-center",
              children: collapsedLogo
            },
            "collapsed-logo"
          ) }),
          /* @__PURE__ */ jsx(AnimatePresence, { children: expanded && /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -10 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: -10 },
              transition: { duration: 0.2 },
              className: "flex items-center gap-2",
              children: [
                logo && /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: logo }),
                title && /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-primary-foreground whitespace-nowrap", children: title })
              ]
            }
          ) }),
          expanded && !logo && collapsedLogo && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            collapsedLogo,
            title && /* @__PURE__ */ jsx(
              motion.span,
              {
                initial: { opacity: 0, x: -10 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: -10 },
                transition: { duration: 0.2 },
                className: "text-sm font-semibold text-primary-foreground whitespace-nowrap",
                children: title
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(AnimatePresence, { children: showPinButton && expanded && /* @__PURE__ */ jsx(
          motion.button,
          {
            initial: { opacity: 0, scale: 0.8 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.8 },
            transition: { duration: 0.15 },
            onClick: handleTogglePin,
            className: cn(
              "flex h-6 w-6 items-center justify-center rounded-md transition-colors",
              "hover:bg-primary-foreground/10"
              // pinned ? '' : 'text-primary-foreground/60'
            ),
            title: pinned ? "Unpin sidebar" : "Pin sidebar",
            children: pinned ? /* @__PURE__ */ jsx(PinOff, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx(Pin, { className: "h-3.5 w-3.5" })
          }
        ) })
      ]
    }
  );
});
SidebarHeader.displayName = "Sidebar.Header";
var SidebarNav = React10.memo(function SidebarNav2({
  children,
  className
}) {
  return /* @__PURE__ */ jsx(
    "nav",
    {
      className: cn(
        "flex-1 overflow-y-auto overflow-x-hidden py-1 custom-scrollbar",
        className
      ),
      children: /* @__PURE__ */ jsx("div", { className: "space-y-0.5 px-2", children })
    }
  );
});
SidebarNav.displayName = "Sidebar.Nav";
var SidebarSection = React10.memo(function SidebarSection2({
  title,
  children,
  className
}) {
  const { expanded } = useSidebar();
  return /* @__PURE__ */ jsxs("div", { className: cn("space-y-0.5", className), children: [
    /* @__PURE__ */ jsx(AnimatePresence, { children: title && expanded && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "auto" },
        exit: { opacity: 0, height: 0 },
        transition: { duration: 0.2 },
        className: "mb-1 px-2 py-1",
        children: /* @__PURE__ */ jsx("p", { className: "text-[10px] font-medium uppercase tracking-wider text-muted-foreground", children: title })
      }
    ) }),
    children
  ] });
});
SidebarSection.displayName = "Sidebar.Section";
function renderIcon(icon, className) {
  if (!icon) return null;
  if (React10.isValidElement(icon)) {
    return React10.cloneElement(icon, { className });
  }
  if (typeof icon === "function" || typeof icon === "object" && icon !== null && "$$typeof" in icon) {
    const IconComponent = icon;
    return /* @__PURE__ */ jsx(IconComponent, { className });
  }
  return null;
}
var badgeVariantStyles = {
  default: "bg-primary/10 text-primary",
  notification: "bg-destructive/20 text-destructive",
  success: "bg-green-100 text-green-600",
  warning: "bg-amber-100 text-amber-600"
};
var SidebarNavItem = React10.memo(function SidebarNavItem2({
  icon,
  label,
  href,
  onClick,
  isActive = false,
  badge,
  badgeVariant = "default",
  disabled = false,
  className
}) {
  const { expanded } = useSidebar();
  const handleClick = React10.useCallback(() => {
    if (disabled) return;
    if (onClick) {
      onClick();
    } else if (href && typeof window !== "undefined") {
      window.location.href = href;
    }
  }, [disabled, onClick, href]);
  const iconSize = expanded ? "h-3.5 w-3.5" : "h-4 w-4";
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: handleClick,
      disabled,
      className: cn(
        "group relative flex w-full items-center rounded-md px-2 py-1.5 transition-all duration-200",
        isActive ? "bg-primary/10 text-primary" : "hover:bg-primary/5 hover:text-primary",
        disabled && "opacity-50 cursor-not-allowed",
        className
      ),
      children: [
        isActive && /* @__PURE__ */ jsx(
          motion.div,
          {
            layoutId: "sidebarActiveIndicator",
            className: "absolute left-0 top-0 bottom-0 w-0.5 rounded-r-full bg-primary",
            transition: { type: "spring", stiffness: 300, damping: 30 }
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "flex h-6 w-6 items-center justify-center rounded-md transition-all duration-200",
              isActive ? "text-primary bg-primary/10 group-hover:bg-primary/20" : "text-muted-foreground group-hover:text-foreground"
            ),
            children: renderIcon(icon, iconSize)
          }
        ),
        /* @__PURE__ */ jsx(AnimatePresence, { children: expanded && /* @__PURE__ */ jsx(
          motion.span,
          {
            initial: { opacity: 0, x: -10 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -10 },
            transition: { duration: 0.2 },
            className: "ml-2 flex-1 text-left text-xs font-medium truncate",
            children: label
          }
        ) }),
        /* @__PURE__ */ jsx(AnimatePresence, { children: badge !== void 0 && expanded && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.8 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.8 },
            transition: { duration: 0.2 },
            className: cn(
              "ml-1 flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] font-medium",
              badgeVariantStyles[badgeVariant]
            ),
            children: badge
          }
        ) }),
        badge !== void 0 && !expanded && /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "absolute top-1 right-1 h-2 w-2 rounded-full",
              badgeVariant === "notification" && "bg-destructive",
              badgeVariant === "success" && "bg-green-500",
              badgeVariant === "warning" && "bg-amber-500",
              badgeVariant === "default" && "bg-primary"
            )
          }
        )
      ]
    }
  );
});
SidebarNavItem.displayName = "Sidebar.NavItem";
function renderIcon2(icon, className) {
  if (!icon) return null;
  if (React10.isValidElement(icon)) {
    return React10.cloneElement(icon, { className });
  }
  if (typeof icon === "function" || typeof icon === "object" && icon !== null && "$$typeof" in icon) {
    const IconComponent = icon;
    return /* @__PURE__ */ jsx(IconComponent, { className });
  }
  return null;
}
var badgeVariantStyles2 = {
  default: "bg-primary/10 text-primary",
  notification: "bg-destructive/20 text-destructive",
  success: "bg-green-100 text-green-600",
  warning: "bg-amber-100 text-amber-600"
};
var SidebarNavGroup = React10.memo(function SidebarNavGroup2({
  icon,
  label,
  children,
  id,
  defaultOpen = false,
  isActive = false,
  badge,
  badgeVariant = "default",
  className
}) {
  const { expanded, activeSection, setActiveSection } = useSidebar();
  const [isOpen, setIsOpen] = React10.useState(defaultOpen);
  const groupId = id || label.toLowerCase().replace(/\s+/g, "-");
  const isExpanded = expanded && (activeSection === groupId || isOpen);
  const handleClick = React10.useCallback(() => {
    if (activeSection === groupId) {
      setActiveSection(null);
      setIsOpen(false);
    } else {
      setActiveSection(groupId);
      setIsOpen(true);
    }
  }, [activeSection, groupId, setActiveSection]);
  React10.useEffect(() => {
    if (expanded && isActive && !isOpen) {
      setIsOpen(true);
      setActiveSection(groupId);
    }
  }, [expanded, isActive, isOpen, setActiveSection, groupId]);
  const iconSize = expanded ? "h-3.5 w-3.5" : "h-4 w-4";
  return /* @__PURE__ */ jsxs("div", { className: cn("relative", className), children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: handleClick,
        className: cn(
          "group relative flex w-full items-center rounded-md px-2 py-1.5 transition-all duration-200",
          isActive ? "bg-primary/10 text-primary" : "hover:bg-primary/5 hover:text-primary"
        ),
        children: [
          isActive && /* @__PURE__ */ jsx(
            motion.div,
            {
              layoutId: "sidebarGroupActiveIndicator",
              className: "absolute left-0 top-0 bottom-0 w-0.5 rounded-r-full bg-primary",
              transition: { type: "spring", stiffness: 300, damping: 30 }
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "flex h-6 w-6 items-center justify-center rounded-md transition-all duration-200",
                isActive ? "text-primary bg-primary/10 group-hover:bg-primary/20" : "text-muted-foreground group-hover:text-foreground"
              ),
              children: renderIcon2(icon, iconSize)
            }
          ),
          /* @__PURE__ */ jsx(AnimatePresence, { children: expanded && /* @__PURE__ */ jsx(
            motion.span,
            {
              initial: { opacity: 0, x: -10 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: -10 },
              transition: { duration: 0.2 },
              className: "ml-2 flex-1 text-left text-xs font-medium truncate",
              children: label
            }
          ) }),
          /* @__PURE__ */ jsx(AnimatePresence, { children: badge !== void 0 && expanded && /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.8 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.8 },
              transition: { duration: 0.2 },
              className: cn(
                "ml-1 flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] font-medium",
                badgeVariantStyles2[badgeVariant]
              ),
              children: badge
            }
          ) }),
          expanded && /* @__PURE__ */ jsx(
            motion.div,
            {
              animate: { rotate: isExpanded ? 90 : 0 },
              transition: { duration: 0.2 },
              className: "ml-1",
              children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-3 w-3 text-muted-foreground" })
            }
          ),
          badge !== void 0 && !expanded && /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "absolute top-1 right-1 h-2 w-2 rounded-full",
                badgeVariant === "notification" && "bg-destructive",
                badgeVariant === "success" && "bg-green-500",
                badgeVariant === "warning" && "bg-amber-500",
                badgeVariant === "default" && "bg-primary"
              )
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isExpanded && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { height: 0, opacity: 0 },
        animate: { height: "auto", opacity: 1 },
        exit: { height: 0, opacity: 0 },
        transition: { duration: 0.2, ease: "easeInOut" },
        className: "overflow-hidden",
        children: /* @__PURE__ */ jsx("div", { className: "mt-0.5 space-y-0.5 pl-4 pr-2", children })
      }
    ) })
  ] });
});
SidebarNavGroup.displayName = "Sidebar.NavGroup";
function isLucideIcon(icon) {
  return typeof icon === "function";
}
function getInitials(name) {
  return name.split(" ").map((part) => part.charAt(0)).slice(0, 2).join("").toUpperCase();
}
var SidebarFooter = React10.memo(function SidebarFooter2({
  user,
  menuItems,
  children,
  className
}) {
  const { expanded } = useSidebar();
  const [menuOpen, setMenuOpen] = React10.useState(false);
  const handleToggleMenu = React10.useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);
  React10.useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (event) => {
      const target = event.target;
      if (!target.closest("[data-sidebar-footer]")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);
  if (children) {
    return /* @__PURE__ */ jsx("div", { className: cn("border-t border-border p-2", className), children });
  }
  if (!user) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-sidebar-footer": true,
      className: cn("group cursor-pointer border-t border-border p-2", className),
      children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleToggleMenu,
            className: cn(
              "flex w-full items-center gap-2 rounded-md p-1.5 transition-all",
              "hover:bg-muted",
              menuOpen && "bg-muted"
            ),
            children: [
              /* @__PURE__ */ jsx("div", { className: "relative flex-shrink-0", children: user.avatar ? /* @__PURE__ */ jsx(
                "img",
                {
                  src: user.avatar,
                  alt: user.name,
                  className: "h-8 w-8 rounded-full object-cover"
                }
              ) : /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary", children: getInitials(user.name) }) }),
              /* @__PURE__ */ jsx(AnimatePresence, { children: expanded && /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, x: -10 },
                  animate: { opacity: 1, x: 0 },
                  exit: { opacity: 0, x: -10 },
                  transition: { duration: 0.2 },
                  className: "flex flex-1 items-center justify-between",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs font-medium truncate max-w-[120px]", children: user.name }),
                      user.email && /* @__PURE__ */ jsx("span", { className: "text-[10px] text-muted-foreground truncate max-w-[120px]", children: user.email })
                    ] }),
                    /* @__PURE__ */ jsx(
                      ChevronDown,
                      {
                        className: cn(
                          "h-3 w-3 text-muted-foreground transition-transform",
                          menuOpen && "rotate-180"
                        )
                      }
                    )
                  ]
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsx(AnimatePresence, { children: menuOpen && expanded && menuItems && menuItems.length > 0 && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -10 },
            transition: { duration: 0.15 },
            className: "absolute bottom-full left-0 right-0 mb-1 overflow-hidden rounded-md border border-border bg-card shadow-lg",
            children: /* @__PURE__ */ jsx("div", { className: "py-1", children: menuItems.map((item, index) => {
              const IconComponent = item.icon && isLucideIcon(item.icon) ? item.icon : null;
              const isDestructive = item.variant === "destructive";
              return /* @__PURE__ */ jsxs(React10.Fragment, { children: [
                isDestructive && index > 0 && /* @__PURE__ */ jsx("div", { className: "my-1 border-t border-border" }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => {
                      item.onClick();
                      setMenuOpen(false);
                    },
                    className: cn(
                      "flex w-full items-center gap-2 px-3 py-1.5 text-xs transition-colors",
                      isDestructive ? "text-destructive hover:bg-destructive/10" : "text-foreground hover:bg-muted"
                    ),
                    children: [
                      IconComponent && /* @__PURE__ */ jsx(IconComponent, { className: "h-3 w-3" }),
                      /* @__PURE__ */ jsx("span", { children: item.label })
                    ]
                  }
                )
              ] }, item.label);
            }) })
          }
        ) })
      ] })
    }
  );
});
SidebarFooter.displayName = "Sidebar.Footer";
var COLLAPSED_WIDTH = 60;
var EXPANDED_WIDTH = 250;
function SidebarRoot({
  children,
  defaultExpanded = false,
  defaultPinned = false,
  collapsedWidth = COLLAPSED_WIDTH,
  expandedWidth = EXPANDED_WIDTH
}) {
  const [expanded, setExpanded] = React10.useState(defaultExpanded || defaultPinned);
  const [pinned, setPinned] = React10.useState(defaultPinned);
  const [activeSection, setActiveSection] = React10.useState(null);
  const isMobile = useMediaQuery2("(max-width: 768px)");
  const handleSetPinned = React10.useCallback((value) => {
    setPinned(value);
    if (value) {
      setExpanded(true);
    }
  }, []);
  const contextValue = React10.useMemo(
    () => ({
      expanded,
      setExpanded,
      pinned,
      setPinned: handleSetPinned,
      activeSection,
      setActiveSection,
      isMobile,
      collapsedWidth,
      expandedWidth
    }),
    [expanded, pinned, handleSetPinned, activeSection, isMobile, collapsedWidth, expandedWidth]
  );
  return /* @__PURE__ */ jsx(SidebarProvider, { value: contextValue, children });
}
SidebarRoot.displayName = "SidebarRoot";
function SidebarAside({ children, className }) {
  const { expanded, pinned, setExpanded, isMobile, collapsedWidth, expandedWidth } = useSidebar();
  const sidebarRef = React10.useRef(null);
  const handleMouseEnter = React10.useCallback(() => {
    if (!pinned && !isMobile) {
      setExpanded(true);
    }
  }, [pinned, isMobile, setExpanded]);
  const handleMouseLeave = React10.useCallback(() => {
    if (!pinned && !isMobile) {
      setExpanded(false);
    }
  }, [pinned, isMobile, setExpanded]);
  if (isMobile) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    motion.aside,
    {
      ref: sidebarRef,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      initial: { width: collapsedWidth },
      animate: { width: expanded ? expandedWidth : collapsedWidth },
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1
      },
      className: cn(
        "relative flex h-screen flex-col bg-card",
        "shadow-[0_0_20px_rgba(0,0,0,0.06)]",
        "fixed top-0 left-0 z-50",
        className
      ),
      children
    }
  );
}
SidebarAside.displayName = "SidebarAside";
function SidebarContent({ children, className }) {
  const sidebar = useSidebarOptional();
  if (!sidebar) {
    return /* @__PURE__ */ jsx("div", { className, children });
  }
  const { expanded, pinned, isMobile, collapsedWidth, expandedWidth } = sidebar;
  if (isMobile) {
    return /* @__PURE__ */ jsx("div", { className, children });
  }
  const marginLeft = pinned && expanded ? expandedWidth : collapsedWidth;
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { marginLeft: collapsedWidth },
      animate: { marginLeft },
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1
      },
      className: cn("min-h-screen flex flex-col", className),
      children
    }
  );
}
SidebarContent.displayName = "SidebarContent";
function LegacySidebar({
  children,
  defaultExpanded = false,
  defaultPinned = false,
  collapsedWidth = COLLAPSED_WIDTH,
  expandedWidth = EXPANDED_WIDTH,
  className
}) {
  const [expanded, setExpanded] = React10.useState(defaultExpanded || defaultPinned);
  const [pinned, setPinned] = React10.useState(defaultPinned);
  const [activeSection, setActiveSection] = React10.useState(null);
  const isMobile = useMediaQuery2("(max-width: 768px)");
  const sidebarRef = React10.useRef(null);
  const handleMouseEnter = React10.useCallback(() => {
    if (!pinned && !isMobile) {
      setExpanded(true);
    }
  }, [pinned, isMobile]);
  const handleMouseLeave = React10.useCallback(() => {
    if (!pinned && !isMobile) {
      setExpanded(false);
    }
  }, [pinned, isMobile]);
  const handleSetPinned = React10.useCallback((value) => {
    setPinned(value);
    if (value) {
      setExpanded(true);
    }
  }, []);
  const contextValue = React10.useMemo(
    () => ({
      expanded,
      setExpanded,
      pinned,
      setPinned: handleSetPinned,
      activeSection,
      setActiveSection,
      isMobile,
      collapsedWidth,
      expandedWidth
    }),
    [expanded, pinned, handleSetPinned, activeSection, isMobile, collapsedWidth, expandedWidth]
  );
  if (isMobile) {
    return /* @__PURE__ */ jsx(SidebarProvider, { value: contextValue, children });
  }
  return /* @__PURE__ */ jsx(SidebarProvider, { value: contextValue, children: /* @__PURE__ */ jsx(
    motion.aside,
    {
      ref: sidebarRef,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      initial: { width: collapsedWidth },
      animate: { width: expanded ? expandedWidth : collapsedWidth },
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1
      },
      className: cn(
        "relative flex h-screen flex-col bg-card",
        "shadow-[0_0_20px_rgba(0,0,0,0.06)]",
        "fixed top-0 left-0 z-50",
        className
      ),
      children
    }
  ) });
}
LegacySidebar.displayName = "Sidebar";
var Sidebar = Object.assign(LegacySidebar, {
  // Layout components
  Root: SidebarRoot,
  Aside: SidebarAside,
  Content: SidebarContent,
  // Sidebar content components
  Header: SidebarHeader,
  Nav: SidebarNav,
  Section: SidebarSection,
  NavItem: SidebarNavItem,
  NavGroup: SidebarNavGroup,
  Footer: SidebarFooter
});
function renderIcon3(icon, className) {
  if (!icon) return null;
  if (React10.isValidElement(icon)) {
    return React10.cloneElement(icon, { className });
  }
  if (typeof icon === "function" || typeof icon === "object" && icon !== null && "$$typeof" in icon) {
    const IconComponent = icon;
    return /* @__PURE__ */ jsx(IconComponent, { className });
  }
  return null;
}
var MobileNavItem = React10.memo(function MobileNavItem2({
  icon,
  label,
  isActive = false,
  onClick
}) {
  return /* @__PURE__ */ jsxs("button", { onClick, className: "group flex flex-col items-center", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "flex items-center justify-center rounded-full p-1.5 transition-colors",
          isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
        ),
        children: renderIcon3(icon, "h-5 w-5")
      }
    ),
    /* @__PURE__ */ jsx(
      "span",
      {
        className: cn(
          "mt-0.5 text-[10px] font-medium",
          isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
        ),
        children: label
      }
    ),
    isActive && /* @__PURE__ */ jsx(
      motion.div,
      {
        layoutId: "mobileNavActiveIndicator",
        className: "mt-1 h-1 w-8 rounded-full bg-primary",
        transition: { type: "spring", stiffness: 500, damping: 30 }
      }
    )
  ] });
});
MobileNavItem.displayName = "MobileNavItem";
var MobileNav = React10.memo(function MobileNav2({
  items,
  fabAction,
  className
}) {
  const leftItems = fabAction ? items.slice(0, Math.ceil(items.length / 2)) : items;
  const rightItems = fabAction ? items.slice(Math.ceil(items.length / 2)) : [];
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-card px-2 pb-2 pt-1.5 md:hidden",
        "border-t border-border",
        className
      ),
      children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-around", children: [
        leftItems.map((item, index) => /* @__PURE__ */ jsx(
          MobileNavItem,
          {
            icon: item.icon,
            label: item.label,
            isActive: item.isActive,
            onClick: () => {
              if (item.onClick) {
                item.onClick();
              } else if (item.href && typeof window !== "undefined") {
                window.location.href = item.href;
              }
            }
          },
          `left-${index}-${item.label}`
        )),
        fabAction && /* @__PURE__ */ jsxs("div", { className: "relative -mt-5", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: fabAction.onClick,
              className: cn(
                "flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg",
                "transition-transform hover:bg-primary/90 active:scale-95"
              ),
              "aria-label": fabAction.label,
              children: fabAction.icon
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "mt-1 block text-center text-[10px] font-medium text-muted-foreground", children: fabAction.label })
        ] }),
        rightItems.map((item, index) => /* @__PURE__ */ jsx(
          MobileNavItem,
          {
            icon: item.icon,
            label: item.label,
            isActive: item.isActive,
            onClick: () => {
              if (item.onClick) {
                item.onClick();
              } else if (item.href && typeof window !== "undefined") {
                window.location.href = item.href;
              }
            }
          },
          `right-${index}-${item.label}`
        ))
      ] })
    }
  );
});
MobileNav.displayName = "MobileNav";
var Navbar = React10.memo(function Navbar2({
  children,
  className,
  style
}) {
  return /* @__PURE__ */ jsx(
    "nav",
    {
      className: cn(
        "fixed top-0 right-0 bg-card border-b/50 h-16 z-40 w-full shadow-sm",
        className
      ),
      style,
      children: /* @__PURE__ */ jsx("div", { className: "h-full px-4 sm:px-6 lg:pr-8 lg:pl-20", children: /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center h-full", children }) })
    }
  );
});
Navbar.displayName = "Navbar";
function ThemeToggle({ className }) {
  const [isDark, setIsDark] = React10.useState(false);
  React10.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);
  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    }
  };
  return /* @__PURE__ */ jsxs(
    Button,
    {
      variant: "ghost",
      size: "icon",
      onClick: toggleTheme,
      "aria-label": "Alternar tema",
      className,
      children: [
        isDark ? /* @__PURE__ */ jsx(Sun, { className: "h-[1.2rem] w-[1.2rem] text-muted-foreground transition-all" }) : /* @__PURE__ */ jsx(Moon, { className: "h-[1.2rem] w-[1.2rem] text-muted-foreground transition-all" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Alternar tema" })
      ]
    }
  );
}
ThemeToggle.displayName = "ThemeToggle";
function NavbarNotification({
  notifications = [],
  onMarkAllAsRead,
  onViewAll
}) {
  const hasNotifications = notifications.length > 0;
  return /* @__PURE__ */ jsxs(Popover, { children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", className: "rounded-full relative", children: [
      /* @__PURE__ */ jsx(Bell, { className: "h-5 w-5 text-muted-foreground" }),
      hasNotifications && /* @__PURE__ */ jsx("span", { className: "absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" }),
      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Abrir notifica\xE7\xF5es" })
    ] }) }),
    /* @__PURE__ */ jsx(PopoverContent, { className: "w-[400px] p-0", align: "end", children: /* @__PURE__ */ jsxs(Card, { className: "border-0 shadow-none", children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
        /* @__PURE__ */ jsx(CardTitle, { className: "text-xl font-bold", children: "Notifica\xE7\xF5es" }),
        onMarkAllAsRead && /* @__PURE__ */ jsx(
          Button,
          {
            variant: "link",
            className: "text-primary hover:text-primary/80",
            onClick: onMarkAllAsRead,
            children: "Marcar todas como lidas"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(CardContent, { className: "px-0", children: notifications.length === 0 ? /* @__PURE__ */ jsx("div", { className: "py-8 text-center text-muted-foreground", children: "Nenhuma notifica\xE7\xE3o" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "bg-background/30 px-6 py-2 text-sm font-medium text-gray-500", children: "Hoje" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4 px-6 py-3", children: notifications.map((notification) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: `flex items-start space-x-4 ${notification.isHighlighted ? "rounded-lg bg-primary/5 p-3" : ""}`,
            children: [
              notification.icon && /* @__PURE__ */ jsx(
                "div",
                {
                  className: `mt-1 rounded-full p-2 ${notification.isHighlighted ? "bg-primary/25" : "bg-gray-500/20"}`,
                  children: notification.icon
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: notification.title }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: notification.description }),
                /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-gray-400", children: notification.time })
              ] })
            ]
          },
          notification.id
        )) })
      ] }) }),
      onViewAll && /* @__PURE__ */ jsx(CardFooter, { className: "justify-center", children: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "link",
          className: "text-primary hover:text-primary/80",
          onClick: onViewAll,
          children: "Ver todas notifica\xE7\xF5es"
        }
      ) })
    ] }) })
  ] });
}
NavbarNotification.displayName = "NavbarNotification";
var ScrollArea = React10.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  ScrollAreaPrimitive.Root,
  {
    ref,
    className: cn("relative overflow-hidden", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(ScrollAreaPrimitive.Viewport, { className: "h-full w-full rounded-[inherit]", children }),
      /* @__PURE__ */ jsx(ScrollBar, {}),
      /* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, {})
    ]
  }
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
var ScrollBar = React10.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsx(
  ScrollAreaPrimitive.ScrollAreaScrollbar,
  {
    ref,
    orientation,
    className: cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
var Separator3 = React10.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      ref,
      decorative,
      orientation,
      className: cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      ),
      ...props
    }
  )
);
Separator3.displayName = SeparatorPrimitive.Root.displayName;
function getInitials2(name) {
  return name.slice(0, 2).toUpperCase();
}
function defaultFormatCnpj(cnpj) {
  return cnpj.replace(/\D/g, "").replace(/^(\d{2})(\d)/, "$1.$2").replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1/$2").replace(/(\d{4})(\d)/, "$1-$2").slice(0, 18);
}
function NavbarCompanyProfile({
  companies,
  activeCompanyId,
  onCompanySelect,
  isLoading = false,
  formatCnpj = defaultFormatCnpj
}) {
  const currentCompany = companies.find(
    (company) => company.id === activeCompanyId
  );
  if (!currentCompany) {
    return isLoading ? /* @__PURE__ */ jsx(Loader, { variant: "dots" }) : null;
  }
  const handleCompanyClick = (companyId) => {
    if (onCompanySelect) {
      onCompanySelect(companyId);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 bg-primary/5 text-primary px-2 py-1 rounded-md", children: [
    /* @__PURE__ */ jsx(Avatar, { className: "h-10 w-10 bg-primary/20", children: /* @__PURE__ */ jsx(AvatarFallback, { className: "font-semibold", children: getInitials2(currentCompany.name) }) }),
    /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex sm:flex-col sm:flex-grow", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm", children: currentCompany.name }),
      currentCompany.cnpj && /* @__PURE__ */ jsx("p", { className: "text-xs text-primary/70", children: formatCnpj(currentCompany.cnpj) })
    ] }),
    /* @__PURE__ */ jsxs(Popover, { children: [
      /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 px-2 text-primary hover:bg-primary/20",
          children: [
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Abrir menu de empresas" }),
            /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxs(PopoverContent, { className: "w-80 p-0", align: "end", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-primary/5 p-4 rounded-t-lg", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-sm mb-1", children: "Empresas Vinculadas" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Selecione para mudar de empresa" })
        ] }),
        /* @__PURE__ */ jsx(ScrollArea, { className: "h-64", children: /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
          isLoading && /* @__PURE__ */ jsx("div", { className: "flex justify-center py-4", children: /* @__PURE__ */ jsx(Loader, { variant: "spinner" }) }),
          !isLoading && companies.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground", children: "Nenhuma empresa encontrada." }),
          companies.map((company, index) => /* @__PURE__ */ jsxs(React10.Fragment, { children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                className: "w-full justify-start text-sm mb-1 hover:bg-primary/10",
                onClick: () => handleCompanyClick(company.id),
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-center w-full", children: [
                  /* @__PURE__ */ jsx(Avatar, { className: "h-8 w-8 mr-3", children: /* @__PURE__ */ jsx(AvatarFallback, { className: "bg-primary/20 text-primary text-xs", children: getInitials2(company.name) }) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex-grow text-left", children: [
                    /* @__PURE__ */ jsx("div", { className: "font-medium", children: company.name }),
                    company.cnpj && /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: formatCnpj(company.cnpj) })
                  ] }),
                  company.id === activeCompanyId && /* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4 text-primary ml-2" })
                ] })
              }
            ),
            index < companies.length - 1 && /* @__PURE__ */ jsx(Separator3, { className: "my-2" })
          ] }, company.id))
        ] }) })
      ] })
    ] })
  ] }) });
}
NavbarCompanyProfile.displayName = "NavbarCompanyProfile";
function getInitials3(name) {
  return name.split(" ").map((part) => part[0]).join("").toUpperCase().slice(0, 2);
}
var defaultMenuItems = [
  { icon: /* @__PURE__ */ jsx(User, { className: "h-4 w-4" }), label: "Ver Perfil" },
  { icon: /* @__PURE__ */ jsx(Settings, { className: "h-4 w-4" }), label: "Configura\xE7\xF5es" },
  { icon: /* @__PURE__ */ jsx(Bell, { className: "h-4 w-4" }), label: "Atualiza\xE7\xF5es" },
  { icon: /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }), label: "Sair", variant: "destructive" }
];
function NavbarUserMenu({
  name,
  email,
  avatarUrl,
  isCollapsed = false,
  menuItems = defaultMenuItems,
  children
}) {
  return /* @__PURE__ */ jsxs(Popover, { children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", className: "w-full justify-start p-2", children: [
      /* @__PURE__ */ jsxs(Avatar, { className: "h-8 w-8", children: [
        avatarUrl && /* @__PURE__ */ jsx(AvatarImage, { src: avatarUrl, alt: name }),
        /* @__PURE__ */ jsx(AvatarFallback, { children: getInitials3(name) })
      ] }),
      !isCollapsed && /* @__PURE__ */ jsxs("div", { className: "ml-2 text-left", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: name }),
        email && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: email })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(PopoverContent, { className: "w-56 p-2", align: "end", children: children ? children : /* @__PURE__ */ jsx("div", { className: "space-y-1", children: menuItems.map((item, index) => {
      const content = /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "ghost",
          className: `w-full justify-start text-sm ${item.variant === "destructive" ? "text-red-500" : ""}`,
          onClick: item.onClick,
          children: [
            item.icon && /* @__PURE__ */ jsx("span", { className: "mr-2", children: item.icon }),
            item.label
          ]
        },
        index
      );
      if (item.href) {
        return /* @__PURE__ */ jsx(
          "a",
          {
            href: item.href,
            className: "flex flex-col items-center text-center",
            children: content
          },
          index
        );
      }
      return content;
    }) }) })
  ] });
}
NavbarUserMenu.displayName = "NavbarUserMenu";
var Breadcrumb = React10.forwardRef(({ ...props }, ref) => /* @__PURE__ */ jsx("nav", { ref, "aria-label": "breadcrumb", ...props }));
Breadcrumb.displayName = "Breadcrumb";
var BreadcrumbList = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "ol",
  {
    ref,
    className: cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    ),
    ...props
  }
));
BreadcrumbList.displayName = "BreadcrumbList";
var BreadcrumbItem = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "li",
  {
    ref,
    className: cn("inline-flex items-center gap-1.5", className),
    ...props
  }
));
BreadcrumbItem.displayName = "BreadcrumbItem";
var BreadcrumbLink = React10.forwardRef(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      ref,
      className: cn("transition-colors hover:text-foreground", className),
      ...props
    }
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";
var BreadcrumbPage = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "span",
  {
    ref,
    role: "link",
    "aria-disabled": "true",
    "aria-current": "page",
    className: cn("font-semibold text-primary", className),
    ...props
  }
));
BreadcrumbPage.displayName = "BreadcrumbPage";
var BreadcrumbSeparator = ({
  children,
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "li",
  {
    role: "presentation",
    "aria-hidden": "true",
    className: cn("[&>svg]:size-3.5", className),
    ...props,
    children: children ?? /* @__PURE__ */ jsx(ChevronRight, {})
  }
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
var BreadcrumbEllipsis = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxs(
  "span",
  {
    role: "presentation",
    "aria-hidden": "true",
    className: cn("flex h-9 w-9 items-center justify-center", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(MoreHorizontal, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "More" })
    ]
  }
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";
function SectionHeaderRoot({
  children,
  className,
  gradient = true,
  bordered = true,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "px-6 py-4",
        gradient && "bg-gradient-to-r from-primary/5 to-transparent",
        bordered && "border-b border-border/50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between gap-4", children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3 min-w-0 flex-1", children }) })
    }
  );
}
SectionHeaderRoot.displayName = "SectionHeader";
function SectionHeaderIcon({ icon: Icon2, className }) {
  return /* @__PURE__ */ jsx("div", { className: cn("p-2.5 rounded-xl bg-primary/10 shrink-0", className), children: /* @__PURE__ */ jsx(Icon2, { className: "h-5 w-5 text-primary" }) });
}
SectionHeaderIcon.displayName = "SectionHeader.Icon";
function SectionHeaderContent({ children, className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("min-w-0 flex-1", className), ...props, children });
}
SectionHeaderContent.displayName = "SectionHeader.Content";
function SectionHeaderTitle({ children, className, ...props }) {
  return /* @__PURE__ */ jsx(
    "h3",
    {
      className: cn("font-semibold text-foreground truncate", className),
      ...props,
      children
    }
  );
}
SectionHeaderTitle.displayName = "SectionHeader.Title";
function SectionHeaderSubtitle({ children, className, ...props }) {
  return /* @__PURE__ */ jsx(
    "p",
    {
      className: cn("text-sm text-muted-foreground truncate", className),
      ...props,
      children
    }
  );
}
SectionHeaderSubtitle.displayName = "SectionHeader.Subtitle";
function SectionHeaderActions({ children, className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("flex items-center gap-2 shrink-0 ml-auto", className),
      ...props,
      children
    }
  );
}
SectionHeaderActions.displayName = "SectionHeader.Actions";
function SectionHeaderBadge({
  children,
  className,
  variant = "muted",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn(
        "text-xs px-2 py-1 rounded-full shrink-0",
        variant === "muted" && "bg-muted text-muted-foreground",
        variant === "default" && "bg-primary/10 text-primary",
        className
      ),
      ...props,
      children
    }
  );
}
SectionHeaderBadge.displayName = "SectionHeader.Badge";
var SectionHeader = Object.assign(SectionHeaderRoot, {
  Icon: SectionHeaderIcon,
  Content: SectionHeaderContent,
  Title: SectionHeaderTitle,
  Subtitle: SectionHeaderSubtitle,
  Actions: SectionHeaderActions,
  Badge: SectionHeaderBadge
});
var PageHeader = React10.memo(function PageHeader2({
  title,
  description,
  children,
  className
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "px-3 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col leading-none", children: [
          /* @__PURE__ */ jsx("span", { className: "text-3xl font-semibold font-heading", children: title }),
          /* @__PURE__ */ jsx("span", { className: "text-[1.05rem] text-muted-foreground max-w-lg text-balance leading-relaxed", children: description })
        ] }),
        children && /* @__PURE__ */ jsx("div", { className: "flex gap-3 mt-2 sm:mt-0 shrink-0", children })
      ]
    }
  );
});
PageHeader.displayName = "PageHeader";
var KanbanContext = React10.createContext(null);
function useKanban() {
  const context = React10.useContext(KanbanContext);
  if (!context) {
    throw new Error("useKanban must be used within a Kanban.Board component");
  }
  return context;
}
function useKanbanOptional() {
  return React10.useContext(KanbanContext);
}
function KanbanProvider({ children, value }) {
  return /* @__PURE__ */ jsx(KanbanContext.Provider, { value, children });
}
function KanbanBoard({
  children,
  onDragEnd,
  onDragStart,
  className
}) {
  const [isDragging, setIsDragging] = React10.useState(false);
  const [draggedItemId, setDraggedItemId] = React10.useState(null);
  const [sourceColumnId, setSourceColumnId] = React10.useState(null);
  const [hoveredColumnId, setHoveredColumnId] = React10.useState(null);
  const dropValidatorsRef = React10.useRef(/* @__PURE__ */ new Map());
  const registerDropValidator = React10.useCallback((columnId, validator) => {
    dropValidatorsRef.current.set(columnId, validator);
  }, []);
  const unregisterDropValidator = React10.useCallback((columnId) => {
    dropValidatorsRef.current.delete(columnId);
  }, []);
  const canDropInColumn = React10.useCallback((columnId) => {
    if (!draggedItemId || !sourceColumnId) return false;
    if (columnId === sourceColumnId) return false;
    const validator = dropValidatorsRef.current.get(columnId);
    if (validator) {
      return validator(draggedItemId, sourceColumnId);
    }
    return true;
  }, [draggedItemId, sourceColumnId]);
  const handleDragStart = React10.useCallback((itemId, colId) => {
    setIsDragging(true);
    setDraggedItemId(itemId);
    setSourceColumnId(colId);
    onDragStart?.(itemId, colId);
  }, [onDragStart]);
  const handleDrop = React10.useCallback((destinationColumnId) => {
    if (draggedItemId && sourceColumnId && destinationColumnId !== sourceColumnId) {
      if (canDropInColumn(destinationColumnId)) {
        const result = {
          itemId: draggedItemId,
          sourceColumnId,
          destinationColumnId
        };
        onDragEnd?.(result);
      }
    }
    setIsDragging(false);
    setDraggedItemId(null);
    setSourceColumnId(null);
    setHoveredColumnId(null);
  }, [draggedItemId, sourceColumnId, canDropInColumn, onDragEnd]);
  const handleDragEnd = React10.useCallback(() => {
    setIsDragging(false);
    setDraggedItemId(null);
    setSourceColumnId(null);
    setHoveredColumnId(null);
  }, []);
  const contextValue = React10.useMemo(() => ({
    isDragging,
    draggedItemId,
    sourceColumnId,
    hoveredColumnId,
    setHoveredColumnId,
    canDropInColumn,
    registerDropValidator,
    unregisterDropValidator
  }), [isDragging, draggedItemId, sourceColumnId, hoveredColumnId, canDropInColumn, registerDropValidator, unregisterDropValidator]);
  return /* @__PURE__ */ jsx(KanbanProvider, { value: contextValue, children: /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "flex gap-4 overflow-x-auto pb-4",
        className
      ),
      onDragEnd: handleDragEnd,
      "data-kanban-board": true,
      "data-onstart": handleDragStart.toString(),
      "data-ondrop": handleDrop.toString(),
      children: /* @__PURE__ */ jsx(KanbanBoardInternalContext.Provider, { value: { handleDragStart, handleDrop }, children })
    }
  ) });
}
var KanbanBoardInternalContext = React10.createContext(null);
function useKanbanBoard() {
  const context = React10.useContext(KanbanBoardInternalContext);
  if (!context) {
    throw new Error("useKanbanBoard must be used within a Kanban.Board component");
  }
  return context;
}
KanbanBoard.displayName = "KanbanBoard";
function KanbanColumn({
  id,
  title,
  count,
  children,
  className,
  headerClassName,
  emptyMessage = "Nenhum item",
  footer,
  canDrop
}) {
  const { isDragging, sourceColumnId, hoveredColumnId, setHoveredColumnId, canDropInColumn, registerDropValidator, unregisterDropValidator } = useKanban();
  const { handleDrop } = useKanbanBoard();
  React10.useEffect(() => {
    if (canDrop) {
      registerDropValidator(id, canDrop);
      return () => unregisterDropValidator(id);
    }
  }, [id, canDrop, registerDropValidator, unregisterDropValidator]);
  const isValidDropTarget = isDragging && sourceColumnId !== id && canDropInColumn(id);
  const isInvalidDropTarget = isDragging && sourceColumnId !== id && !canDropInColumn(id);
  const isHovered = hoveredColumnId === id;
  const handleDragOver = React10.useCallback((e) => {
    e.preventDefault();
    if (isValidDropTarget) {
      e.dataTransfer.dropEffect = "move";
      setHoveredColumnId(id);
    } else {
      e.dataTransfer.dropEffect = "none";
    }
  }, [isValidDropTarget, setHoveredColumnId, id]);
  const handleDragLeave = React10.useCallback((e) => {
    if (e.currentTarget === e.target || !e.currentTarget.contains(e.relatedTarget)) {
      setHoveredColumnId(null);
    }
  }, [setHoveredColumnId]);
  const handleDropEvent = React10.useCallback((e) => {
    e.preventDefault();
    if (isValidDropTarget) {
      handleDrop(id);
    }
  }, [isValidDropTarget, handleDrop, id]);
  const childCount = React10.Children.count(children);
  const displayCount = count ?? childCount;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex flex-col min-w-[300px] max-w-[340px] rounded-2xl",
        "bg-muted/20 dark:bg-muted/10",
        "transition-all duration-200",
        isValidDropTarget && "ring-2 ring-primary/40 bg-primary/5",
        isInvalidDropTarget && "opacity-40",
        isHovered && isValidDropTarget && "ring-primary/60 bg-primary/10 scale-[1.01]",
        className
      ),
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDropEvent,
      "data-kanban-column": id,
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: cn(
              "flex items-center gap-2 px-4 py-3",
              headerClassName
            ),
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "\u21BB" }),
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-foreground flex-1", children: title }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: displayCount }),
              /* @__PURE__ */ jsx("button", { className: "p-1 rounded-md hover:bg-muted/50 text-muted-foreground transition-colors", children: /* @__PURE__ */ jsx("span", { className: "text-sm", children: "\u22EF" }) }),
              /* @__PURE__ */ jsx("button", { className: "p-1 rounded-md hover:bg-muted/50 text-muted-foreground transition-colors", children: /* @__PURE__ */ jsx("span", { className: "text-sm", children: "+" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "flex-1 px-2 pb-2 space-y-3 min-h-[200px] max-h-[calc(100vh-200px)] overflow-y-auto",
              isHovered && isValidDropTarget && "bg-primary/5"
            ),
            children: childCount === 0 ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-32 text-sm text-muted-foreground/60", children: emptyMessage }) : children
          }
        ),
        footer && /* @__PURE__ */ jsx("div", { className: "px-2 pb-3", children: footer })
      ]
    }
  );
}
KanbanColumn.displayName = "KanbanColumn";
function KanbanCard({
  id,
  columnId,
  children,
  className,
  disabled = false
}) {
  const { draggedItemId } = useKanban();
  const { handleDragStart } = useKanbanBoard();
  const isThisCardDragging = draggedItemId === id;
  const handleDragStartEvent = React10.useCallback((e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
    setTimeout(() => {
      handleDragStart(id, columnId);
    }, 0);
  }, [id, columnId, handleDragStart, disabled]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      draggable: !disabled,
      onDragStart: handleDragStartEvent,
      className: cn(
        "group relative rounded-2xl border border-border/60 bg-card p-4",
        "shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.04)]",
        "transition-all duration-200",
        !disabled && "cursor-grab hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.12),0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:border-border",
        !disabled && "active:cursor-grabbing active:scale-[0.98]",
        isThisCardDragging && "opacity-50 scale-[0.96] shadow-xl border-primary ring-2 ring-primary/20",
        disabled && "cursor-not-allowed opacity-60",
        className
      ),
      "data-kanban-card": id,
      "data-column": columnId,
      children
    }
  );
}
KanbanCard.displayName = "KanbanCard";

// src/components/Kanban/Kanban.tsx
var Kanban = {
  Board: KanbanBoard,
  Column: KanbanColumn,
  Card: KanbanCard
};
var itemCardVariants = cva(
  "relative flex flex-col bg-card rounded-lg border shadow-md overflow-hidden transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-border",
        selected: "border-primary ring-2 ring-primary/20",
        muted: "border-border/50 opacity-80"
      },
      hover: {
        true: "hover:shadow-lg hover:border-border",
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      hover: true
    }
  }
);
var ItemCardContext = React10.createContext(null);
function useItemCard() {
  const context = React10.useContext(ItemCardContext);
  if (!context) {
    throw new Error("ItemCard components must be used within ItemCard.Root");
  }
  return context;
}
var ItemCardRoot = React10.forwardRef(
  ({
    className,
    variant,
    hover,
    selected = false,
    asButton = false,
    children,
    ...props
  }, ref) => {
    const contextValue = React10.useMemo(
      () => ({ isSelected: selected }),
      [selected]
    );
    return /* @__PURE__ */ jsx(ItemCardContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        role: asButton ? "button" : void 0,
        tabIndex: asButton ? 0 : void 0,
        className: cn(
          itemCardVariants({
            variant: selected ? "selected" : variant,
            hover
          }),
          asButton && "cursor-pointer",
          className
        ),
        ...props,
        children
      }
    ) });
  }
);
ItemCardRoot.displayName = "ItemCardRoot";
var itemCardBadgeVariants = cva(
  "absolute -top-px right-0 rounded-none rounded-bl-lg px-2.5 py-1 text-xs font-medium border-l border-b transition-colors",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground border-border",
        primary: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/15",
        success: "bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/15",
        warning: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 hover:bg-yellow-500/15",
        destructive: "bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/15",
        info: "bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/15",
        muted: "bg-slate-500/10 text-slate-600 border-slate-500/20 hover:bg-slate-500/15"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
var ItemCardBadge = React10.forwardRef(
  ({ className, variant, children, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(itemCardBadgeVariants({ variant }), className),
        ...props,
        children
      }
    );
  }
);
ItemCardBadge.displayName = "ItemCardBadge";
var ItemCardHeader = React10.forwardRef(
  ({ className, align = "between", children, ...props }, ref) => {
    const alignmentClasses = {
      left: "justify-start",
      right: "justify-end",
      between: "justify-between"
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "flex items-center gap-4 px-6 pt-6 pb-4",
          alignmentClasses[align],
          className
        ),
        ...props,
        children
      }
    );
  }
);
ItemCardHeader.displayName = "ItemCardHeader";
var itemCardIconVariants = cva(
  "flex items-center justify-center rounded-2xl shadow-lg transition-transform",
  {
    variants: {
      size: {
        sm: "p-2 w-10 h-10",
        md: "p-3 w-12 h-12",
        lg: "p-4 w-14 h-14"
      },
      variant: {
        primary: "bg-primary text-primary-foreground shadow-primary/25",
        secondary: "bg-secondary text-secondary-foreground shadow-secondary/25",
        success: "bg-green-500 text-white shadow-green-500/25",
        warning: "bg-yellow-500 text-white shadow-yellow-500/25",
        destructive: "bg-red-500 text-white shadow-red-500/25",
        info: "bg-blue-500 text-white shadow-blue-500/25",
        muted: "bg-muted text-muted-foreground shadow-muted/25",
        outline: "bg-background border-2 border-primary text-primary shadow-none"
      }
    },
    defaultVariants: {
      size: "md",
      variant: "primary"
    }
  }
);
var ItemCardIcon = React10.forwardRef(
  ({ className, size, variant, ripple = false, children, ...props }, ref) => {
    const wrapperSizeClasses = {
      sm: "w-10 h-10",
      md: "w-12 h-12",
      lg: "w-14 h-14"
    };
    const actualSize = size || "md";
    if (ripple) {
      return /* @__PURE__ */ jsxs("div", { className: cn("relative", wrapperSizeClasses[actualSize]), children: [
        /* @__PURE__ */ jsx(
          RippleEffect,
          {
            color: "primary",
            size: "md",
            rings: 3,
            intensity: "light"
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref,
            className: cn(itemCardIconVariants({ size, variant }), "relative z-10", className),
            ...props,
            children
          }
        )
      ] });
    }
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(itemCardIconVariants({ size, variant }), className),
        ...props,
        children
      }
    );
  }
);
ItemCardIcon.displayName = "ItemCardIcon";
var ItemCardTitleGroup = React10.forwardRef(
  ({ className, align = "right", children, ...props }, ref) => {
    const alignmentClasses = {
      left: "text-left",
      right: "text-right",
      center: "text-center"
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn("flex-1 min-w-0", alignmentClasses[align], className),
        ...props,
        children
      }
    );
  }
);
ItemCardTitleGroup.displayName = "ItemCardTitleGroup";
var ItemCardTitle = React10.forwardRef(
  ({ className, children, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "h3",
      {
        ref,
        className: cn("text-lg font-semibold text-foreground truncate", className),
        ...props,
        children
      }
    );
  }
);
ItemCardTitle.displayName = "ItemCardTitle";
var ItemCardSubtitle = React10.forwardRef(
  ({ className, children, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "p",
      {
        ref,
        className: cn("text-sm text-muted-foreground", className),
        ...props,
        children
      }
    );
  }
);
ItemCardSubtitle.displayName = "ItemCardSubtitle";
var ItemCardContent = React10.forwardRef(
  ({ className, muted = true, children, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "px-6 py-3 space-y-2",
          muted && "bg-muted/40",
          className
        ),
        ...props,
        children
      }
    );
  }
);
ItemCardContent.displayName = "ItemCardContent";
var ItemCardContentItem = React10.forwardRef(
  ({ className, label, value, secondary, children, ...props }, ref) => {
    if (children) {
      return /* @__PURE__ */ jsx(
        "div",
        {
          ref,
          className: cn(
            "flex justify-between items-center text-sm text-muted-foreground",
            className
          ),
          ...props,
          children
        }
      );
    }
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: cn(
          "flex justify-between items-center text-sm text-muted-foreground gap-2",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsx("span", { className: "truncate flex-1", children: label }),
          value && /* @__PURE__ */ jsx("span", { className: "font-medium shrink-0", children: value }),
          secondary && /* @__PURE__ */ jsx("span", { className: "font-medium shrink-0", children: secondary })
        ]
      }
    );
  }
);
ItemCardContentItem.displayName = "ItemCardContentItem";
var ItemCardEmpty = React10.forwardRef(
  ({ className, icon, message = "Nenhum item", children, ...props }, ref) => {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: cn(
          "flex flex-col items-center justify-center py-6 text-center text-muted-foreground",
          className
        ),
        ...props,
        children: [
          icon && /* @__PURE__ */ jsx("div", { className: "mb-2 opacity-50", children: icon }),
          children || /* @__PURE__ */ jsx("p", { className: "text-sm", children: message })
        ]
      }
    );
  }
);
ItemCardEmpty.displayName = "ItemCardEmpty";
var ItemCardFooter = React10.forwardRef(
  ({ className, children, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "px-6 py-3 flex justify-between items-center gap-4",
          className
        ),
        ...props,
        children
      }
    );
  }
);
ItemCardFooter.displayName = "ItemCardFooter";
var ItemCardFooterItem = React10.forwardRef(
  ({ className, label, value, align = "left", ...props }, ref) => {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: cn(
          "flex flex-col",
          align === "right" && "items-end",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: label }),
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-sm text-foreground", children: value })
        ]
      }
    );
  }
);
ItemCardFooterItem.displayName = "ItemCardFooterItem";
var ItemCardFooterDivider = React10.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn("flex-1", className),
        ...props
      }
    );
  }
);
ItemCardFooterDivider.displayName = "ItemCardFooterDivider";
var ItemCardActions = React10.forwardRef(
  ({ className, bordered = true, children, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "mt-auto",
          bordered && "border-t border-border",
          className
        ),
        ...props,
        children
      }
    );
  }
);
ItemCardActions.displayName = "ItemCardActions";
var ItemCardActionButton = React10.forwardRef(
  ({
    className,
    showArrow = true,
    loading = false,
    variant = "default",
    disabled,
    children,
    ...props
  }, ref) => {
    const variantClasses = {
      default: "bg-muted/50 text-foreground hover:bg-muted active:bg-muted/80",
      primary: "bg-primary/10 text-primary hover:bg-primary/20 active:bg-primary/30",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive: "bg-red-500/10 text-red-600 hover:bg-red-500/20 active:bg-red-500/30"
    };
    return /* @__PURE__ */ jsxs(
      "button",
      {
        ref,
        type: "button",
        disabled: disabled || loading,
        className: cn(
          "w-full px-6 py-3 flex items-center justify-between",
          "text-sm font-medium transition-colors",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantClasses[variant],
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsx("span", { children }),
          showArrow && !loading && /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 opacity-60" }),
          loading && /* @__PURE__ */ jsx("div", { className: "w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" })
        ]
      }
    );
  }
);
ItemCardActionButton.displayName = "ItemCardActionButton";
var ItemCardActionsRow = React10.forwardRef(
  ({ className, children, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn("flex items-center gap-2 p-3", className),
        ...props,
        children
      }
    );
  }
);
ItemCardActionsRow.displayName = "ItemCardActionsRow";

// src/components/ItemCard/ItemCard.tsx
var ItemCard = Object.assign(ItemCardRoot, {
  // Badge
  Badge: ItemCardBadge,
  // Header components
  Header: ItemCardHeader,
  Icon: ItemCardIcon,
  TitleGroup: ItemCardTitleGroup,
  Title: ItemCardTitle,
  Subtitle: ItemCardSubtitle,
  // Content components
  Content: ItemCardContent,
  ContentItem: ItemCardContentItem,
  Empty: ItemCardEmpty,
  // Footer components
  Footer: ItemCardFooter,
  FooterItem: ItemCardFooterItem,
  FooterDivider: ItemCardFooterDivider,
  // Actions components
  Actions: ItemCardActions,
  ActionButton: ItemCardActionButton,
  ActionsRow: ItemCardActionsRow
});
var WizardContext = createContext(void 0);
function useWizardContext() {
  const context = useContext(WizardContext);
  if (context === void 0) {
    throw new Error("useWizardContext must be used within a Wizard component");
  }
  return context;
}
function useWizardContextOptional() {
  return useContext(WizardContext);
}
function WizardProvider({
  children,
  form,
  steps,
  initialStep = 0,
  onStepChange,
  validateOnNext = true,
  allowJumpToStep = false
}) {
  const [completedSteps, setCompletedSteps] = useState(/* @__PURE__ */ new Set());
  const activeSteps = useMemo(() => {
    const formValues = form.getValues();
    return steps.filter((step) => {
      if (typeof step.isHidden === "function") {
        return !step.isHidden(formValues);
      }
      return !step.isHidden;
    });
  }, [steps, form]);
  const [currentStep, setCurrentStep] = useState(() => {
    return Math.min(Math.max(0, initialStep), activeSteps.length - 1);
  });
  const totalSteps = activeSteps.length;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const progress = totalSteps > 0 ? Math.round((currentStep + 1) / totalSteps * 100) : 0;
  const currentStepConfig = activeSteps[currentStep];
  const getStepConfig = useCallback(
    (index) => activeSteps[index],
    [activeSteps]
  );
  const getStepByName = useCallback(
    (name) => activeSteps.find((step) => step.name === name || step.id === name),
    [activeSteps]
  );
  const getStepIndexByName = useCallback(
    (name) => activeSteps.findIndex((step) => step.name === name || step.id === name),
    [activeSteps]
  );
  const isStepCompleted = useCallback(
    (index) => completedSteps.has(index),
    [completedSteps]
  );
  const hasStepErrors = useCallback(
    (index) => {
      const stepConfig = activeSteps[index];
      if (!stepConfig?.fields) return false;
      const errors = form.formState.errors;
      return stepConfig.fields.some((field) => {
        const fieldPath = field;
        return fieldPath in errors;
      });
    },
    [activeSteps, form.formState.errors]
  );
  const validateCurrentStep = useCallback(async () => {
    const stepConfig = currentStepConfig;
    if (!stepConfig?.validationSchema) {
      return true;
    }
    const formValues = form.getValues();
    const result = await stepConfig.validationSchema.safeParseAsync(formValues);
    if (!result.success) {
      if (stepConfig.fields) {
        await Promise.all(
          stepConfig.fields.map((field) => form.trigger(field))
        );
      }
      return false;
    }
    if (stepConfig.fields) {
      stepConfig.fields.forEach((field) => {
        form.clearErrors(field);
      });
    }
    return true;
  }, [currentStepConfig, form]);
  const goToNextStep = useCallback(async () => {
    if (isLastStep) {
      return false;
    }
    if (validateOnNext) {
      const isValid = await validateCurrentStep();
      if (!isValid) {
        return false;
      }
    }
    setCompletedSteps((prev) => /* @__PURE__ */ new Set([...prev, currentStep]));
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    onStepChange?.(nextStep, "next");
    return true;
  }, [isLastStep, validateOnNext, validateCurrentStep, currentStep, onStepChange]);
  const goToPrevStep = useCallback(() => {
    if (isFirstStep) {
      return;
    }
    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
    onStepChange?.(prevStep, "prev");
  }, [isFirstStep, currentStep, onStepChange]);
  const goToStep = useCallback(
    async (targetStep) => {
      if (targetStep < 0 || targetStep >= totalSteps) {
        return false;
      }
      if (!allowJumpToStep && targetStep > currentStep) {
        for (let i = currentStep; i < targetStep; i++) {
          if (!completedSteps.has(i)) {
            return false;
          }
        }
      }
      if (targetStep < currentStep) {
        setCurrentStep(targetStep);
        onStepChange?.(targetStep, "jump");
        return true;
      }
      if (validateOnNext && targetStep > currentStep) {
        const isValid = await validateCurrentStep();
        if (!isValid) {
          return false;
        }
        setCompletedSteps((prev) => /* @__PURE__ */ new Set([...prev, currentStep]));
      }
      setCurrentStep(targetStep);
      onStepChange?.(targetStep, "jump");
      return true;
    },
    [totalSteps, allowJumpToStep, currentStep, completedSteps, validateOnNext, validateCurrentStep, onStepChange]
  );
  const reset = useCallback(() => {
    setCurrentStep(Math.min(Math.max(0, initialStep), activeSteps.length - 1));
    setCompletedSteps(/* @__PURE__ */ new Set());
    form.reset();
  }, [initialStep, activeSteps.length, form]);
  const contextValue = useMemo(
    () => ({
      // State
      currentStep,
      totalSteps,
      activeSteps,
      allSteps: steps,
      // Computed
      isFirstStep,
      isLastStep,
      progress,
      // Navigation
      goToNextStep,
      goToPrevStep,
      goToStep,
      reset,
      // Validation
      validateCurrentStep,
      isStepCompleted,
      hasStepErrors,
      // Form
      form,
      // Step info
      currentStepConfig,
      getStepConfig,
      getStepByName,
      getStepIndexByName,
      // Settings
      allowJumpToStep
    }),
    [
      currentStep,
      totalSteps,
      activeSteps,
      steps,
      isFirstStep,
      isLastStep,
      progress,
      goToNextStep,
      goToPrevStep,
      goToStep,
      reset,
      validateCurrentStep,
      isStepCompleted,
      hasStepErrors,
      form,
      currentStepConfig,
      getStepConfig,
      getStepByName,
      getStepIndexByName,
      allowJumpToStep
    ]
  );
  return /* @__PURE__ */ jsx(WizardContext.Provider, { value: contextValue, children });
}
var sizeConfig = {
  sm: {
    circle: "h-7 w-7 text-xs",
    icon: "h-3.5 w-3.5",
    label: "text-xs",
    description: "text-xs",
    gap: "gap-1.5"
  },
  md: {
    circle: "h-9 w-9 text-sm",
    icon: "h-4 w-4",
    label: "text-sm",
    description: "text-xs",
    gap: "gap-2"
  },
  lg: {
    circle: "h-11 w-11 text-base",
    icon: "h-5 w-5",
    label: "text-base",
    description: "text-sm",
    gap: "gap-2.5"
  }
};
var stateStyles = {
  completed: {
    circle: "bg-green-500 text-white border-green-500",
    label: "text-green-600 dark:text-green-400",
    description: "text-muted-foreground"
  },
  current: {
    circle: "bg-primary text-primary-foreground border-primary ring-4 ring-primary/20",
    label: "text-primary font-semibold",
    description: "text-muted-foreground"
  },
  pending: {
    circle: "bg-background text-muted-foreground border-muted-foreground/30",
    label: "text-muted-foreground",
    description: "text-muted-foreground/60"
  },
  error: {
    circle: "bg-destructive text-destructive-foreground border-destructive",
    label: "text-destructive",
    description: "text-destructive/60"
  },
  disabled: {
    circle: "bg-muted text-muted-foreground/50 border-muted cursor-not-allowed",
    label: "text-muted-foreground/50",
    description: "text-muted-foreground/30"
  }
};
function WizardStepIndicator({
  step,
  index,
  state,
  showNumber = false,
  showDescription = false,
  size = "md",
  isClickable = false,
  onClick
}) {
  const config = sizeConfig[size];
  const styles = stateStyles[state];
  const Icon2 = step.icon;
  const renderCircleContent = () => {
    if (state === "completed") {
      return /* @__PURE__ */ jsx(Check, { className: config.icon, strokeWidth: 3 });
    }
    if (state === "error") {
      return /* @__PURE__ */ jsx(AlertCircle, { className: config.icon });
    }
    if (Icon2 && !showNumber) {
      return /* @__PURE__ */ jsx(Icon2, { className: config.icon });
    }
    return /* @__PURE__ */ jsx("span", { children: index + 1 });
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex flex-col items-center",
        config.gap,
        isClickable && "cursor-pointer group"
      ),
      onClick: isClickable ? onClick : void 0,
      role: isClickable ? "button" : void 0,
      tabIndex: isClickable ? 0 : void 0,
      onKeyDown: isClickable ? (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      } : void 0,
      "aria-current": state === "current" ? "step" : void 0,
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "flex items-center justify-center rounded-full border-2 transition-all duration-200",
              config.circle,
              styles.circle,
              isClickable && "group-hover:ring-4 group-hover:ring-primary/10"
            ),
            children: renderCircleContent()
          }
        ),
        (step.label || showDescription) && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center max-w-[120px]", children: [
          step.label && /* @__PURE__ */ jsx(
            "span",
            {
              className: cn(
                "leading-tight transition-colors duration-200",
                config.label,
                styles.label
              ),
              children: step.label
            }
          ),
          showDescription && step.description && /* @__PURE__ */ jsx(
            "span",
            {
              className: cn(
                "leading-tight mt-0.5",
                config.description,
                styles.description
              ),
              children: step.description
            }
          )
        ] })
      ]
    }
  );
}
function WizardStepConnector({
  isCompleted = false,
  variant = "horizontal",
  className
}) {
  const isHorizontal = variant === "horizontal";
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "transition-colors duration-300",
        isHorizontal ? "flex-1 h-0.5 min-w-[24px] mx-2" : "w-0.5 min-h-[24px] my-2 ml-[18px]",
        isCompleted ? "bg-green-500" : "bg-muted-foreground/20",
        className
      ),
      "aria-hidden": "true"
    }
  );
}
function WizardSteps({
  variant = "horizontal",
  showDescription = false,
  showNumbers = false,
  size = "md",
  className
}) {
  const {
    activeSteps,
    currentStep,
    isStepCompleted,
    hasStepErrors,
    goToStep,
    allowJumpToStep
  } = useWizardContext();
  const getStepState = (index) => {
    const step = activeSteps[index];
    if (step.isDisabled) {
      return "disabled";
    }
    if (index === currentStep) {
      return hasStepErrors(index) ? "error" : "current";
    }
    if (isStepCompleted(index)) {
      return hasStepErrors(index) ? "error" : "completed";
    }
    return "pending";
  };
  const isStepClickable = (index) => {
    if (index === currentStep) return false;
    const step = activeSteps[index];
    if (step.isDisabled) return false;
    if (index < currentStep) return true;
    if (allowJumpToStep && index > currentStep) {
      for (let i = currentStep; i < index; i++) {
        if (!isStepCompleted(i)) return false;
      }
      return true;
    }
    return false;
  };
  const handleStepClick = async (index) => {
    if (isStepClickable(index)) {
      await goToStep(index);
    }
  };
  const isHorizontal = variant === "horizontal";
  return /* @__PURE__ */ jsx(
    "nav",
    {
      "aria-label": "Progresso do formul\xE1rio",
      className: cn(
        "flex",
        isHorizontal ? "flex-row items-center justify-center" : "flex-col items-start",
        className
      ),
      children: activeSteps.map((step, index) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: cn(
            "flex",
            isHorizontal ? "flex-row items-center" : "flex-col",
            index !== activeSteps.length - 1 && isHorizontal && "flex-1"
          ),
          children: [
            /* @__PURE__ */ jsx(
              WizardStepIndicator,
              {
                step,
                index,
                state: getStepState(index),
                showNumber: showNumbers,
                showDescription,
                size,
                isClickable: isStepClickable(index),
                onClick: () => handleStepClick(index)
              }
            ),
            index !== activeSteps.length - 1 && /* @__PURE__ */ jsx(
              WizardStepConnector,
              {
                isCompleted: isStepCompleted(index),
                variant
              }
            )
          ]
        },
        step.id
      ))
    }
  );
}
function WizardContent({ children, className }) {
  const { currentStepConfig } = useWizardContext();
  let activePanel = null;
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    const panelProps = child.props;
    if (panelProps.name === currentStepConfig?.name || panelProps.name === currentStepConfig?.id) {
      activePanel = child;
    }
  });
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("flex-1", className),
      role: "tabpanel",
      "aria-label": currentStepConfig?.label || currentStepConfig?.name,
      children: activePanel
    }
  );
}
function WizardPanel({ name, children, className }) {
  return /* @__PURE__ */ jsx("div", { className: cn("w-full", className), "data-wizard-panel": name, children });
}
function WizardNavigation({
  cancelLabel = "Cancelar",
  prevLabel = "Voltar",
  nextLabel = "Continuar",
  submitLabel = "Finalizar",
  loadingLabel = "Processando...",
  onCancel,
  showCancel,
  submitDisabled = false,
  className
}) {
  const {
    isFirstStep,
    isLastStep,
    currentStep,
    goToNextStep,
    goToPrevStep,
    form
  } = useWizardContext();
  const isSubmitting = form.formState.isSubmitting;
  const shouldShowCancel = showCancel ?? isFirstStep;
  const handleNext = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await goToNextStep();
  }, [goToNextStep]);
  const handlePrev = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    goToPrevStep();
  }, [goToPrevStep]);
  const handleCancel = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    onCancel?.();
  }, [onCancel]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "grid grid-cols-2 gap-3 pt-4 border-t border-border",
        className
      ),
      children: [
        shouldShowCancel && onCancel ? /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: handleCancel,
            disabled: isSubmitting,
            className: "w-full",
            children: cancelLabel
          },
          "cancel"
        ) : !isFirstStep ? /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: handlePrev,
            disabled: isSubmitting,
            className: "w-full",
            children: prevLabel
          },
          "prev"
        ) : /* @__PURE__ */ jsx("div", {}),
        isLastStep ? /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            disabled: submitDisabled || isSubmitting,
            className: "w-full",
            children: isSubmitting ? /* @__PURE__ */ jsxs("span", { className: "flex items-center justify-center gap-2", children: [
              /* @__PURE__ */ jsx(Loader, { variant: "spinner" }),
              loadingLabel
            ] }) : submitLabel
          },
          `submit-step-${currentStep}`
        ) : /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            onClick: handleNext,
            disabled: isSubmitting,
            className: "w-full",
            children: nextLabel
          },
          `next-step-${currentStep}`
        )
      ]
    }
  );
}
function WizardProgress({
  showPercentage = false,
  showStepCount = false,
  className
}) {
  const { progress, currentStep, totalSteps } = useWizardContext();
  return /* @__PURE__ */ jsxs("div", { className: cn("w-full", className), children: [
    (showPercentage || showStepCount) && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2 text-sm text-muted-foreground", children: [
      showStepCount && /* @__PURE__ */ jsxs("span", { children: [
        "Etapa ",
        currentStep + 1,
        " de ",
        totalSteps
      ] }),
      showPercentage && /* @__PURE__ */ jsxs("span", { className: !showStepCount ? "ml-auto" : "", children: [
        progress,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "h-2 w-full bg-muted rounded-full overflow-hidden",
        role: "progressbar",
        "aria-valuenow": progress,
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-label": `Progresso: ${progress}%`,
        children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "h-full bg-primary transition-all duration-300 ease-out rounded-full",
            style: { width: `${progress}%` }
          }
        )
      }
    )
  ] });
}
function WizardRoot({
  children,
  form,
  steps,
  initialStep,
  onStepChange,
  onComplete,
  validateOnNext = true,
  allowJumpToStep = false,
  className
}) {
  const handleSubmit = async (data) => {
    if (onComplete) {
      await onComplete(data);
    }
  };
  return /* @__PURE__ */ jsx(
    WizardProvider,
    {
      form,
      steps,
      initialStep,
      onStepChange,
      onComplete,
      validateOnNext,
      allowJumpToStep,
      children: /* @__PURE__ */ jsx(FormProvider, { ...form, children: /* @__PURE__ */ jsx(
        "form",
        {
          onSubmit: form.handleSubmit(handleSubmit),
          className: cn("flex flex-col", className),
          noValidate: true,
          children
        }
      ) })
    }
  );
}
var Wizard = Object.assign(WizardRoot, {
  /** Visual step indicators */
  Steps: WizardSteps,
  /** Container for step panels */
  Content: WizardContent,
  /** Individual step content panel */
  Panel: WizardPanel,
  /** Navigation buttons (prev, next, submit) */
  Navigation: WizardNavigation,
  /** Progress bar indicator */
  Progress: WizardProgress
});
var positionClasses = {
  "bottom-center": "bottom-6 inset-x-0 flex justify-center",
  "bottom-left": "bottom-6 left-6",
  "bottom-right": "bottom-6 right-6"
};
var FloatingBar = React10.forwardRef(
  ({ className, visible = true, position = "bottom-center", wrapperClassName, children, style, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "fixed z-50 pointer-events-none",
          positionClasses[position],
          wrapperClassName
        ),
        style,
        ...props,
        children: /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "pointer-events-auto",
              "flex items-center gap-2 px-4 py-2.5 rounded-full",
              "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl",
              "border border-white/60 dark:border-white/10",
              "shadow-2xl shadow-black/15 dark:shadow-black/40",
              "ring-1 ring-black/[0.06] dark:ring-white/[0.06]",
              "transition-all duration-300",
              visible ? "translate-y-0 opacity-100 scale-100" : "translate-y-6 opacity-0 scale-95 pointer-events-none",
              className
            ),
            children
          }
        )
      }
    );
  }
);
FloatingBar.displayName = "FloatingBar";
var actionVariants = cva(
  "inline-flex items-center gap-2 rounded-full font-medium transition-all duration-150 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm",
        success: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/20",
        destructive: "bg-red-600 hover:bg-red-700 text-white shadow-sm shadow-red-600/20",
        ghost: "hover:bg-accent text-foreground"
      },
      size: {
        default: "h-9 px-5 text-sm",
        sm: "h-8 px-4 text-xs"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var FloatingBarAction = React10.forwardRef(
  ({ className, variant, size, icon: Icon2, children, ...props }, ref) => {
    return /* @__PURE__ */ jsxs(
      "button",
      {
        ref,
        className: cn(actionVariants({ variant, size, className })),
        ...props,
        children: [
          Icon2 && /* @__PURE__ */ jsx(Icon2, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { children })
        ]
      }
    );
  }
);
FloatingBarAction.displayName = "FloatingBarAction";
var iconActionVariants = cva(
  "inline-flex items-center justify-center rounded-full transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "text-muted-foreground hover:text-foreground hover:bg-muted",
        success: "text-muted-foreground hover:text-emerald-600 hover:bg-emerald-500/10",
        warning: "text-muted-foreground hover:text-amber-600 hover:bg-amber-500/10",
        danger: "text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      },
      size: {
        default: "h-9 w-9",
        sm: "h-8 w-8"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var FloatingBarIconAction = React10.forwardRef(
  ({ className, variant, size, icon: Icon2, label, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "button",
      {
        ref,
        "aria-label": label,
        title: label,
        className: cn(iconActionVariants({ variant, size, className })),
        ...props,
        children: /* @__PURE__ */ jsx(Icon2, { className: "h-4 w-4" })
      }
    );
  }
);
FloatingBarIconAction.displayName = "FloatingBarIconAction";
var FloatingBarDivider = React10.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn("w-px h-6 bg-border/60 mx-0.5", className),
        ...props
      }
    );
  }
);
FloatingBarDivider.displayName = "FloatingBarDivider";
var FloatingBarCounter = React10.forwardRef(
  ({ className, count, label = "selecionado", pluralLabel, ...props }, ref) => {
    const plural = pluralLabel ?? `${label}s`;
    return /* @__PURE__ */ jsxs(
      "span",
      {
        ref,
        className: cn(
          "text-sm font-medium whitespace-nowrap tabular-nums px-2",
          className
        ),
        ...props,
        children: [
          count,
          " ",
          count === 1 ? label : plural
        ]
      }
    );
  }
);
FloatingBarCounter.displayName = "FloatingBarCounter";
var FloatingBarCompound = Object.assign(FloatingBar, {
  Action: FloatingBarAction,
  IconAction: FloatingBarIconAction,
  Divider: FloatingBarDivider,
  Counter: FloatingBarCounter
});
function Logo({
  width = 100,
  color = "currentColor",
  className = "text-primary"
}) {
  const originalWidth = 207;
  const originalHeight = 304;
  let calculatedHeight = originalHeight;
  if (typeof width === "number") {
    calculatedHeight = Math.round(width * (originalHeight / originalWidth));
  } else if (typeof width === "string" && width.endsWith("%")) {
    calculatedHeight = "auto";
  } else if (typeof width === "string") {
    const numWidth = parseFloat(width);
    if (!isNaN(numWidth)) {
      calculatedHeight = `${Math.round(
        numWidth * (originalHeight / originalWidth)
      )}${width.match(/[a-zA-Z%]+$/)?.[0] || ""}`;
    } else {
      calculatedHeight = originalHeight;
    }
  }
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width,
      height: calculatedHeight,
      viewBox: "0 0 207 304",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: cn(className),
      style: color !== "currentColor" ? { fill: color } : void 0,
      "aria-label": "Facter Logo",
      role: "img",
      children: [
        /* @__PURE__ */ jsx(
          "mask",
          {
            id: "facter-logo-mask",
            maskUnits: "userSpaceOnUse",
            x: "0",
            y: "0",
            width: "207",
            height: "304",
            children: /* @__PURE__ */ jsx("path", { d: "M0 0.15625H206.26V304H0V0.15625Z", fill: "white" })
          }
        ),
        /* @__PURE__ */ jsx("g", { mask: "url(#facter-logo-mask)", children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M25.8384 196.911L15.4739 183.729C-10.7189 150.411 0.44781 101.422 38.4895 82.7344L206.266 0.307297V34.2396C206.266 60.1875 191.448 83.8698 168.12 95.2396L56.578 149.594C48.4634 153.547 41.3489 159.344 35.9791 166.609C30.5936 173.901 25.9582 183.906 26.3176 196.526C29.9947 193.609 34.0624 191.026 38.4843 188.854L206.26 106.432V140.359C206.26 166.313 191.437 189.995 168.109 201.365L56.578 255.708C48.4634 259.667 41.3489 265.464 35.9791 272.724C30.4426 280.224 25.6978 290.578 26.3593 303.693L15.4739 289.854C-7.54698 260.568 -1.72407 219.193 25.8384 196.911ZM134.818 266.526L206.208 303.724L206.187 210.802L134.953 246.661C126.828 250.755 126.755 262.323 134.818 266.526Z",
            fill: color === "currentColor" ? "currentColor" : color
          }
        ) })
      ]
    }
  );
}
var StatsCardContext = React10.createContext(null);
function useStatsCard() {
  const context = React10.useContext(StatsCardContext);
  if (!context) {
    throw new Error("StatsCard components must be used within StatsCard.Root");
  }
  return context;
}
var colorConfigs = {
  green: {
    lineColor: "#22c55e",
    gradientStart: "rgba(34, 197, 94, 0.4)",
    gradientEnd: "rgba(34, 197, 94, 0.02)",
    bgGradient: "from-white via-emerald-50/30 to-emerald-100/50",
    iconBg: "bg-emerald-100/80 text-emerald-600",
    textColor: "text-emerald-500"
  },
  red: {
    lineColor: "#f87171",
    gradientStart: "rgba(248, 113, 113, 0.4)",
    gradientEnd: "rgba(248, 113, 113, 0.02)",
    bgGradient: "from-white via-rose-50/30 to-rose-100/50",
    iconBg: "bg-rose-100/80 text-rose-500",
    textColor: "text-rose-500"
  },
  yellow: {
    lineColor: "#f59e0b",
    gradientStart: "rgba(245, 158, 11, 0.4)",
    gradientEnd: "rgba(245, 158, 11, 0.02)",
    bgGradient: "from-white via-amber-50/30 to-amber-100/50",
    iconBg: "bg-amber-100/80 text-amber-600",
    textColor: "text-amber-500"
  },
  blue: {
    lineColor: "#3b82f6",
    gradientStart: "rgba(59, 130, 246, 0.4)",
    gradientEnd: "rgba(59, 130, 246, 0.02)",
    bgGradient: "from-white via-blue-50/30 to-blue-100/50",
    iconBg: "bg-blue-100/80 text-blue-600",
    textColor: "text-blue-500"
  },
  primary: {
    lineColor: "#3b82f6",
    gradientStart: "rgba(59, 130, 246, 0.4)",
    gradientEnd: "rgba(59, 130, 246, 0.02)",
    bgGradient: "from-white via-primary/5 to-primary/10",
    iconBg: "bg-primary/10 text-primary",
    textColor: "text-primary"
  }
};
var rootVariants2 = cva(
  "relative overflow-hidden bg-card shadow-sm border border-border",
  {
    variants: {
      variant: {
        default: "rounded-2xl h-full",
        compact: "rounded-xl h-full",
        mini: "rounded-xl w-fit"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function StatsCardRoot({
  colorScheme = "blue",
  variant = "default",
  className,
  children,
  ...props
}) {
  const config = colorConfigs[colorScheme];
  return /* @__PURE__ */ jsx(StatsCardContext.Provider, { value: { colorScheme, variant, config }, children: /* @__PURE__ */ jsxs("div", { className: cn(rootVariants2({ variant }), className), ...props, children: [
    /* @__PURE__ */ jsx("div", { className: cn("absolute inset-0 bg-gradient-to-br pointer-events-none", config.bgGradient) }),
    /* @__PURE__ */ jsx("div", { className: cn(
      "relative flex h-full",
      variant === "default" && "flex-col",
      variant === "compact" && "flex-row items-center p-3 gap-3",
      variant === "mini" && "flex-row items-center p-3 gap-3"
    ), children })
  ] }) });
}
function StatsCardHeader({ className, children, ...props }) {
  const { variant } = useStatsCard();
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "flex items-center justify-between",
        variant === "default" && "p-4 pb-2",
        (variant === "compact" || variant === "mini") && "flex-1 min-w-0",
        className
      ),
      ...props,
      children
    }
  );
}
function StatsCardIcon({ icon: Icon2, className, ...props }) {
  const { config } = useStatsCard();
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "rounded-lg p-2",
        config.iconBg,
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(Icon2, { className: "w-4 h-4" })
    }
  );
}
function StatsCardTitle({ className, children, ...props }) {
  return /* @__PURE__ */ jsx(
    "h3",
    {
      className: cn(
        "font-medium text-gray-700 text-sm",
        className
      ),
      ...props,
      children
    }
  );
}
function StatsCardSubtitle({ className, children, ...props }) {
  return /* @__PURE__ */ jsx(
    "p",
    {
      className: cn(
        "text-gray-400 text-[10px]",
        className
      ),
      ...props,
      children
    }
  );
}
function StatsCardValue({ className, children, ...props }) {
  const { variant } = useStatsCard();
  return /* @__PURE__ */ jsx(
    "p",
    {
      className: cn(
        "font-light tracking-tight text-gray-900",
        variant === "default" && "text-4xl",
        (variant === "compact" || variant === "mini") && "text-2xl",
        className
      ),
      ...props,
      children
    }
  );
}
function StatsCardChange({ type = "positive", className, children, ...props }) {
  const { config } = useStatsCard();
  return /* @__PURE__ */ jsxs("div", { className: cn("flex items-center gap-0.5", className), ...props, children: [
    /* @__PURE__ */ jsx(
      "svg",
      {
        className: cn("w-2.5 h-2.5", config.textColor),
        viewBox: "0 0 12 12",
        fill: "currentColor",
        children: /* @__PURE__ */ jsx("path", { d: type === "negative" ? "M6 10L10 5H2L6 10Z" : "M6 2L10 7H2L6 2Z" })
      }
    ),
    /* @__PURE__ */ jsx("span", { className: cn(
      "font-medium text-[10px]",
      config.textColor
    ), children })
  ] });
}
function StatsCardChart({ data, height, className, ...props }) {
  const { config, variant } = useStatsCard();
  const gradientId = React10.useId();
  if (variant === "mini") {
    return null;
  }
  const chartHeight = height ?? (variant === "compact" ? 40 : 70);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        variant === "compact" && "w-16 h-10 shrink-0",
        variant === "default" && "flex-1 relative mt-auto",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: chartHeight, children: /* @__PURE__ */ jsxs(AreaChart, { data, margin: { top: 2, right: 0, left: 0, bottom: 0 }, children: [
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: gradientId, x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: config.gradientStart }),
          /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: config.gradientEnd })
        ] }) }),
        /* @__PURE__ */ jsx(
          Tooltip$1,
          {
            content: ({ active, payload }) => {
              if (active && payload && payload.length) {
                const point = payload[0].payload;
                return /* @__PURE__ */ jsxs("div", { className: "bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1.5 shadow-lg border border-gray-100", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] font-medium text-gray-700", children: point.value }),
                  /* @__PURE__ */ jsx("p", { className: "text-[9px] text-gray-400", children: point.date })
                ] });
              }
              return null;
            }
          }
        ),
        /* @__PURE__ */ jsx(
          Area,
          {
            type: "monotone",
            dataKey: "value",
            stroke: config.lineColor,
            strokeWidth: 1.5,
            fill: `url(#${gradientId})`,
            dot: false,
            activeDot: {
              r: 3,
              fill: config.lineColor,
              stroke: "white",
              strokeWidth: 2
            }
          }
        )
      ] }) })
    }
  );
}
function StatsCardContent({ className, children, ...props }) {
  const { variant } = useStatsCard();
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        variant === "default" && "mt-2",
        className
      ),
      ...props,
      children
    }
  );
}
function StatsCardToday({ label, type = "positive", className, children, ...props }) {
  const { config } = useStatsCard();
  return /* @__PURE__ */ jsxs("p", { className: cn("text-xs mt-0.5", className), ...props, children: [
    /* @__PURE__ */ jsxs("span", { className: config.textColor, children: [
      type === "positive" ? "+" : "",
      children
    ] }),
    label && /* @__PURE__ */ jsx("span", { className: "text-gray-500 ml-1", children: label })
  ] });
}
var StatsCard = Object.assign(StatsCardRoot, {
  Header: StatsCardHeader,
  Icon: StatsCardIcon,
  Title: StatsCardTitle,
  Subtitle: StatsCardSubtitle,
  Value: StatsCardValue,
  Change: StatsCardChange,
  Chart: StatsCardChart,
  Content: StatsCardContent,
  Today: StatsCardToday
});
var initialState = {
  theme: "system",
  setTheme: () => null
};
var ThemeProviderContext = React10.createContext(initialState);
function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "facter-ds-theme",
  ...props
}) {
  const [theme, setTheme] = React10.useState(
    () => localStorage.getItem(storageKey) || defaultTheme
  );
  const [resolvedTheme, setResolvedTheme] = React10.useState("light");
  React10.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      setResolvedTheme(systemTheme);
      return;
    }
    root.classList.add(theme);
    setResolvedTheme(theme);
  }, [theme]);
  const value = React10.useMemo(
    () => ({
      theme,
      setTheme: (theme2) => {
        localStorage.setItem(storageKey, theme2);
        setTheme(theme2);
      }
    }),
    [theme, storageKey]
  );
  return /* @__PURE__ */ jsx(ThemeProviderContext.Provider, { ...props, value, children: /* @__PURE__ */ jsx("div", { className: resolvedTheme, style: { minHeight: "100vh" }, children }) });
}
var useTheme = () => {
  const context = React10.useContext(ThemeProviderContext);
  if (context === void 0)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

// src/themes/index.ts
var FACTER_THEMES = {
  default: "default",
  truck: "truck",
  vagas: "vagas",
  techcare: "techcare"
};
var THEME_INFO = {
  default: {
    name: "Default",
    primaryColor: "#18181B",
    primaryHsl: "240 5.9% 10%",
    ringHsl: "240 5.9% 10%",
    description: "Tema neutro padr\xE3o"
  },
  truck: {
    name: "Facter Truck",
    primaryColor: "#3B5BDB",
    primaryHsl: "233 65% 55%",
    ringHsl: "233 65% 55%",
    description: "Sistema de gest\xE3o de frotas"
  },
  vagas: {
    name: "Facter Vagas",
    primaryColor: "#8B5CF6",
    primaryHsl: "262 83% 58%",
    ringHsl: "262 83% 58%",
    description: "Plataforma de vagas de emprego"
  },
  techcare: {
    name: "Facter TechCare",
    primaryColor: "#16A34A",
    primaryHsl: "142 76% 36%",
    ringHsl: "142 76% 36%",
    description: "Sistema de assist\xEAncia t\xE9cnica"
  }
};

export { AuthLayout, Avatar, AvatarFallback, AvatarImage, Badge, BigNumberCard, Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Checkbox, DENSITY_CONFIG, DashboardLayout, DataTable, Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, DialogWrapper, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, EmptyState, FACTER_THEMES, FloatingBarCompound as FloatingBar, FloatingBarAction, FloatingBarCounter, FloatingBarDivider, FloatingBarIconAction, Form, FormCheckbox, FormDescription, FormError, FormFieldProvider, FormFieldWrapper, FormInput, FormLabel, FormMultiSelect, FormNumberStepper, FormRadioGroup, FormSelect, FormSwitch, FormTextarea, GlobalLoaderController, Input, ItemCard, ItemCardActionButton, ItemCardActions, ItemCardActionsRow, ItemCardBadge, ItemCardContent, ItemCardContentItem, ItemCardEmpty, ItemCardFooter, ItemCardFooterDivider, ItemCardFooterItem, ItemCardHeader, ItemCardIcon, ItemCardRoot, ItemCardSubtitle, ItemCardTitle, ItemCardTitleGroup, Kanban, Loader, LoaderProvider, Logo, MobileNav, MobileNavItem, Navbar, NavbarCompanyProfile, NavbarNotification, NavbarUserMenu, NumberStepper, PageHeader, Popover, PopoverContent, PopoverTrigger, RippleBackground, RippleEffect, RippleWrapper, ScrollArea, ScrollBar, SectionHeader, SectionHeaderActions, SectionHeaderBadge, SectionHeaderContent, SectionHeaderIcon, SectionHeaderRoot, SectionHeaderSubtitle, SectionHeaderTitle, Select, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectionLayout, Separator3 as Separator, Sidebar, SimpleTooltip, Skeleton, Sparkline, StatsCard, Switch, THEME_INFO, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger, Textarea, ThemeProvider, ThemeToggle, Toaster, Tooltip, TooltipAction, TooltipActions, TooltipArrow, TooltipContent, TooltipDescription, TooltipHeader, TooltipIcon, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTitle, TooltipTrigger, Wizard, WizardContent, WizardNavigation, WizardPanel, WizardProgress, WizardProvider, WizardStepConnector, WizardStepIndicator, WizardSteps, cn, itemCardBadgeVariants, itemCardIconVariants, itemCardVariants, loader, toast, useAutoPageSize, useAvailableHeight, useDashboardLayout, useDataTable, useDataTableColumnVisibility, useDataTableDensity, useDataTableEmpty, useDataTableInstance, useDataTableLoading, useDataTableMeta, useDataTablePagination, useDataTableSelection, useDataTableSorting, useDataTableState, useDebounce, useDebouncedCallback, useFormFieldContext, useItemCard, useKanban, useKanbanOptional, useLoader, useMediaQuery2 as useMediaQuery, useSidebar, useSidebarOptional, useTheme, useWizardContext, useWizardContextOptional };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map