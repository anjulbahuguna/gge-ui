export { cn } from "./lib/cn";
export { GGE, type GgeToken } from "./tokens";
export { Button, buttonVariants, type ButtonProps } from "./button";
export { Badge } from "./badge";
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "./card";
export { Input } from "./input";
export { Label } from "./label";
export { Breadcrumbs, type Crumb, type BreadcrumbsProps } from "./breadcrumb";
export { BrandLockup, type BrandLockupProps } from "./brand-lockup";
export { BrandPanel, type BrandPanelProps } from "./brand-panel";
export { Footer, type FooterProps, type FooterLink } from "./footer";

export { FontScaleProvider, useFontScale, FontSizeControl } from "./font-scale";

// Layout / detail-edit primitives (T3, June 12) — the shared detail/edit model.
export { Avatar } from "./avatar";
export { SectionHeader } from "./section-header";
export { ListCard, ListRow, type ListRowProps } from "./list-row";
export { FieldGrid, ReadField } from "./field-grid";
export { FormField, type FormFieldProps } from "./form-field";
export { PlaceholderSection } from "./placeholder-section";
export { EditableSection, type EditableSectionState } from "./editable-section";
export { DetailHeader } from "./detail-header";

// Content shell (④) + roster table — the container + the list, defined once so
// neither console owns its page surface or re-rolls table markup (T1, June 13).
export { PageShell } from "./page-shell";
export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./table";
export { AccountBar, type AccountBarProps } from "./account-bar";
export { Rail, NavSection, NavLink, type RailProps, type NavLinkProps } from "./rail";
export { StatStrip, type Stat } from "./stat-strip";
export { Segmented, type SegmentOption, type SegmentedProps } from "./segmented";
export { EmptyState, type EmptyStateProps } from "./empty-state";
export { ErrorState, type ErrorStateProps } from "./error-state";
export { FormActions } from "./form-actions";
export { Pagination, type PaginationProps } from "./pagination";
export { DateField } from "./date-field";
export { ConfirmDialog, type ConfirmDialogProps } from "./confirm-dialog";
export { ToastProvider, useToast } from "./toast";

// Care Board primitives (Paddock, reused by Cortex) — names-not-counts dashboard
// card, fast dose/supply entry, slot + assignee + check-off controls.
export { ExceptionCard, type ExceptionCardProps, type ExceptionItem } from "./exception-card";
export {
  SupplyTypeAhead,
  type SupplyTypeAheadProps,
  type Supply,
} from "./supply-type-ahead";
export { UnitDoseField, type UnitDoseFieldProps } from "./unit-dose-field";
export { SlotChips, type SlotChipsProps, type Slot } from "./slot-chips";
export { AssigneeControl, type AssigneeControlProps } from "./assignee-control";
export { SupplyLevel, type SupplyLevelProps } from "./supply-level";
export { Checkbox, type CheckboxProps } from "./checkbox";
