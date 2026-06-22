import * as React from "react";
import {
  Home, Award, Star, Map, Contact, IdCard, BookUser, ShoppingBag, Boxes, Mail,
  BriefcaseMedical, CircleDollarSign, CircleUser, ListChecks, CalendarClock, Calendar,
  Pin, Megaphone, MapPin, Tag, Undo2, Table, List, Upload, LayoutDashboard, Activity,
  PackageMinus, ClipboardPlus, Check, CheckCheck, UserCheck, UserCog, Truck, Gauge,
  Sunrise, Sun, Sunset, Moon, Repeat, Pill, Stethoscope, Syringe, ClipboardList,
  CircleCheck, TriangleAlert, Bandage, AlarmClock, TrendingDown, CircleDot, Circle,
  CircleX, CircleAlert, Info, Loader2, HeartPulse, Receipt, FileText, StickyNote,
  FileSignature, Plus, SquarePen, Trash2, Save, X, Search, Filter, ArrowUpDown,
  ChevronLeft, ChevronRight, MoreHorizontal, ExternalLink, Copy, Settings, Sparkles,
  Lock, LogIn, LogOut, KeyRound, Bot, ShieldCheck, Tags, Wrench, BookOpen, CalendarDays,
  BadgeCheck, BarChart3, History, Palette, SlidersHorizontal, EyeOff, LayoutGrid,
  Building2, FileCheck, Scale, Rows3, GraduationCap,
} from "lucide-react";
import {
  DomainBarn, DomainHorse, DomainRider, DomainRoster, DomainTeam, DomainFeed,
  DomainFarrier, DomainHandWalk,
} from "./icons/custom";

// GGE shared icon system. ONE glyph per concept, everywhere — referenced as
// Icon.<concept> (never lucide directly), so the same concept can't drift between
// screens or apps. The concept *names* are the cross-platform contract shared with
// Canter iOS (CanterIcon → SF Symbols). The glyph per concept is the DESIGNER SET
// (handoff 2026-06-22): master-list web glyph + §A custom SVGs + §B collision fixes +
// §C resolutions. Source of truth: gge-ui/ICON_VOCABULARY.md +
// Claude Design/design_handoff_gge_ui_kit/ICON_SPEC.md.

export type IconProps = Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
  size?: number;
  strokeWidth?: number;
};
type IconComp = React.ComponentType<IconProps>;
type LucideLike = React.ComponentType<{ size?: number; strokeWidth?: number } & React.SVGProps<SVGSVGElement>>;

// Lucide concepts — bake in size + stroke weight + currentColor.
function lib(C: LucideLike): IconComp {
  const W = ({ size = 20, strokeWidth = 1.75, ...rest }: IconProps) => (
    <C size={size} strokeWidth={strokeWidth} {...rest} />
  );
  W.displayName = `Icon(${(C as { displayName?: string }).displayName ?? "lucide"})`;
  return W;
}

// Custom fill-based SVGs (§A/§C) — size via width/height; no stroke-width.
function cust(C: React.ComponentType<React.SVGProps<SVGSVGElement>>): IconComp {
  const W = ({ size = 20, strokeWidth: _sw, ...rest }: IconProps) => <C width={size} height={size} {...rest} />;
  W.displayName = "Icon(custom)";
  return W;
}

// ---------------------------------------------------------------------------
// The vocabulary. Concept -> glyph. (§A) custom · (§B) collision fix · (§C) resolved.
// ---------------------------------------------------------------------------
export const Icon = {
  // Nav / entities
  home: lib(Home),
  shows: lib(Award),
  showTeam: lib(Star),
  courseMap: lib(Map),
  barn: cust(DomainBarn),            // §A custom
  barns: cust(DomainBarn),
  horse: cust(DomainHorse),          // §A custom
  horses: cust(DomainHorse),
  riders: cust(DomainRider),         // §A custom (helmeted head)
  roster: cust(DomainRoster),        // §C custom
  members: lib(Contact),
  staff: lib(IdCard),
  team: cust(DomainTeam),            // §C custom
  owners: lib(BookUser),             // §C
  vendors: lib(ShoppingBag),
  supplies: lib(Boxes),
  invites: lib(Mail),
  care: lib(BriefcaseMedical),
  pay: lib(CircleDollarSign),
  profile: lib(CircleUser),
  account: lib(CircleUser),
  checklist: lib(ListChecks),
  schedule: lib(CalendarClock),      // §B (vs overdue)
  calendar: lib(Calendar),
  bulletin: lib(Pin),
  announce: lib(Megaphone),
  venue: lib(MapPin),

  // Data import
  customField: lib(Tag),
  undo: lib(Undo2),
  feedChart: lib(Table),
  list: lib(List),

  // Care board
  careBoard: lib(LayoutDashboard),
  myTasks: lib(ListChecks),
  groomProgress: lib(Activity),
  supplyLow: lib(PackageMinus),
  dueNext: lib(CalendarClock),
  recordCare: lib(ClipboardPlus),
  checkOff: lib(Check),
  bundleDone: lib(CheckCheck),
  assignee: lib(UserCheck),          // §B (vs profile/account)
  reassign: lib(UserCog),
  delivery: lib(Truck),
  supplyLevel: lib(Gauge),
  slotAM: lib(Sunrise),
  slotNoon: lib(Sun),
  slotPM: lib(Sunset),
  slotNight: lib(Moon),

  // Care-line types
  daily: lib(Repeat),
  appointment: lib(CalendarClock),
  feed: cust(DomainFeed),            // §A custom (feed sack)
  medication: lib(Pill),
  vet: lib(Stethoscope),
  vaccination: lib(Syringe),
  farrier: cust(DomainFarrier),      // §A custom
  handWalk: cust(DomainHandWalk),    // §A custom (halter + lead)
  chore: lib(ClipboardList),

  // Status / health
  healthy: lib(CircleCheck),
  restricted: lib(TriangleAlert),
  injured: lib(Bandage),             // §B (vs health)
  overdue: lib(AlarmClock),          // §B (vs schedule)
  lowStock: lib(TrendingDown),
  active: lib(CircleDot),
  inactive: lib(Circle),
  eligible: lib(CircleCheck),
  notEligible: lib(CircleX),
  cantConfirm: lib(CircleAlert),
  warning: lib(TriangleAlert),
  info: lib(Info),
  loading: lib(Loader2),

  // Detail sections
  health: lib(HeartPulse),
  costs: lib(Receipt),
  documents: lib(FileText),
  notes: lib(StickyNote),
  lease: lib(FileSignature),

  // Actions / chrome
  add: lib(Plus),
  edit: lib(SquarePen),
  delete: lib(Trash2),
  save: lib(Save),
  close: lib(X),
  search: lib(Search),
  filter: lib(Filter),               // §B (vs config)
  sort: lib(ArrowUpDown),
  back: lib(ChevronLeft),
  drillIn: lib(ChevronRight),
  overflow: lib(MoreHorizontal),
  external: lib(ExternalLink),
  upload: lib(Upload),
  copy: lib(Copy),
  settings: lib(Settings),           // §B gear (vs appSettings)
  celebrate: lib(Sparkles),

  // Auth
  magicLink: lib(Mail),
  password: lib(Lock),
  signIn: lib(LogIn),
  signOut: lib(LogOut),
  key: lib(KeyRound),

  // Cortex platform admin
  serviceAccounts: lib(Bot),         // §C (key stays KeyRound)
  roles: lib(ShieldCheck),
  taskTemplates: lib(ClipboardList),
  vendorCategories: lib(Tags),
  appSettings: lib(Wrench),          // §B (vs settings)
  classReference: lib(BookOpen),
  showCalendar: lib(CalendarDays),
  licensing: lib(BadgeCheck),
  analytics: lib(BarChart3),
  auditLog: lib(History),            // §B/§C (vs owners)
  branding: lib(Palette),
  config: lib(SlidersHorizontal),
  hiddenCategories: lib(EyeOff),
  catalog: lib(LayoutGrid),
  userLicenses: lib(UserCheck),
  barnSubscriptions: lib(Building2), // §C

  // Points & eligibility
  pointsEligibility: lib(FileCheck), // §C
  rules: lib(Scale),
  divisions: lib(Rows3),
  training: lib(GraduationCap),      // §C (Canter; web parity)
} satisfies Record<string, IconComp>;

export type IconName = keyof typeof Icon;
