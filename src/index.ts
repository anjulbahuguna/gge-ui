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
