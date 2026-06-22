import * as React from "react";
import {
  Home, Award, Users, UsersRound, Contact, IdCard, ShoppingBag, Boxes, ScrollText, Mail,
  BriefcaseMedical, CircleDollarSign, CircleUser, ListChecks, Clock, Calendar, CalendarClock,
  CalendarDays, Pin, Megaphone, MapPin, LayoutDashboard, Activity, PackageMinus, ClipboardPlus,
  Check, CheckCheck, UserCog, Truck, Gauge, Sunrise, Sun, Sunset, Moon, Repeat, Wheat, Pill,
  Stethoscope, Syringe, Footprints, ClipboardList, Plus, SquarePen, Trash2, Save, X, Search,
  SlidersHorizontal, ChevronLeft, ChevronRight, MoreHorizontal, ExternalLink, ArrowUpDown,
  CircleCheck, TriangleAlert, HeartPulse, TrendingDown, CircleDot, Circle, CircleX, CircleAlert,
  Receipt, FileText, StickyNote, FileSignature, Lock, KeyRound, LogIn, LogOut, ShieldCheck, Tags,
  Settings, BookOpen, BadgeCheck, BarChart3, Palette, EyeOff, LayoutGrid, UserCheck, Building2,
  Scale, Rows3, FileCheck, Upload, Info, Loader2, Copy, Star, Map,
  Share, Sparkles, Tag, Undo2, Table, List,
} from "lucide-react";

// GGE shared icon system. ONE glyph per concept, everywhere — referenced as
// Icon.<concept> (never lucide directly), so the same concept can't drift between
// screens or apps. The concept *names* are the cross-platform contract shared with
// Canter iOS (SF Symbols there); web maps each concept to a lucide glyph or one of
// the custom SVGs below. Source of truth for the vocabulary: gge-ui/ICON_VOCABULARY.md (this repo).

export type IconProps = Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
  size?: number;
  strokeWidth?: number;
};
type IconComp = React.ComponentType<IconProps>;

// Standardize defaults so every icon shares size + stroke weight + currentColor.
function std(C: IconComp): IconComp {
  const W = ({ size = 20, strokeWidth = 1.75, ...rest }: IconProps) => (
    <C size={size} strokeWidth={strokeWidth} {...rest} />
  );
  W.displayName = `Icon(${(C as { displayName?: string }).displayName ?? "custom"})`;
  return W;
}

// --- Custom SVGs for the gaps lucide doesn't cover. Stroke-based, 24 viewBox,
// currentColor — same visual language as lucide. (horse/hoof/barn are v1 line
// glyphs; eyeball on the rail and refine the paths if a concept doesn't read.)
function svg(paths: React.ReactNode): IconComp {
  const C = ({ size = 20, strokeWidth = 1.75, ...rest }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
      strokeLinejoin="round" {...rest}
    >
      {paths}
    </svg>
  );
  return C;
}

// Horse — the signature entity (rail + every horse surface). Real designed glyph
// from Tabler Icons `horse` (MIT, https://tabler.io/icons) — stroke-style matches
// lucide. This is THE shared horse: also exported standalone at assets/horse.svg
// for the Canter iOS asset catalog, so web + iOS converge on one true horse.
const Horse = svg(
  <>
    <path d="M7 10l-.85 8.507a1.357 1.357 0 0 0 1.35 1.493h.146a2 2 0 0 0 1.857 -1.257l.994 -2.486a2 2 0 0 1 1.857 -1.257h1.292a2 2 0 0 1 1.857 1.257l.994 2.486a2 2 0 0 0 1.857 1.257h.146a1.37 1.37 0 0 0 1.364 -1.494l-.864 -9.506h-8c0 -3 -3 -5 -6 -5l-3 6l2 2l3 -2" />
    <path d="M22 14v-2a3 3 0 0 0 -3 -3" />
  </>,
);
// Hoof / farrier — a horseshoe with nail holes.
const Hoof = svg(
  <>
    <path d="M7 20c-1.9-1.7-3-4.4-3-7.6C4 7.8 7.6 4 12 4s8 3.8 8 8.4c0 3.2-1.1 5.9-3 7.6" />
    <path d="M7 20l1.4-1M17 20l-1.4-1" />
    <path d="M8.5 9.5h.01M15.5 9.5h.01M9.5 13.5h.01M14.5 13.5h.01" />
  </>,
);
// Barn — gable building with door + cross beams.
const Barn = svg(
  <>
    <path d="M3 21V9l9-5 9 5v12" />
    <path d="M3 21h18" />
    <path d="M9 21v-7h6v7" />
    <path d="M9 14l6 7M15 14l-6 7" />
  </>,
);

// ---------------------------------------------------------------------------
// The vocabulary. Concept -> glyph. Keep alphabetical-ish by area.
// ---------------------------------------------------------------------------
export const Icon = {
  // Nav / entities
  home: std(Home),
  shows: std(Award),
  showTeam: std(Star),             // show-team membership flag (iOS parity — T2)
  courseMap: std(Map),             // course map for a show (iOS parity — T2)
  barn: std(Barn),                 // custom
  barns: std(Barn),
  riders: std(Users),
  roster: std(UsersRound),
  members: std(Contact),
  staff: std(IdCard),
  team: std(UsersRound),
  horse: std(Horse),               // custom — highest-priority gap
  horses: std(Horse),
  vendors: std(ShoppingBag),       // bag (Anjul, final June 18 — supersedes the earlier box)
  supplies: std(Boxes),
  owners: std(ScrollText),
  invites: std(Mail),
  care: std(BriefcaseMedical),
  pay: std(CircleDollarSign),
  profile: std(CircleUser),
  account: std(CircleUser),
  checklist: std(ListChecks),
  schedule: std(Clock),
  calendar: std(Calendar),
  bulletin: std(Pin),
  announce: std(Megaphone),
  venue: std(MapPin),

  // Care Board
  careBoard: std(LayoutDashboard),
  myTasks: std(ListChecks),
  groomProgress: std(Activity),
  supplyLow: std(PackageMinus),
  dueNext: std(CalendarClock),
  recordCare: std(ClipboardPlus),
  checkOff: std(Check),
  bundleDone: std(CheckCheck),
  assignee: std(CircleUser),
  reassign: std(UserCog),
  delivery: std(Truck),
  supplyLevel: std(Gauge),
  slotAM: std(Sunrise),
  slotNoon: std(Sun),
  slotPM: std(Sunset),
  slotNight: std(Moon),

  // Care-line types
  daily: std(Repeat),
  appointment: std(CalendarClock),
  feed: std(Wheat),
  medication: std(Pill),
  vet: std(Stethoscope),
  vaccination: std(Syringe),
  farrier: std(Hoof),              // custom
  handWalk: std(Footprints),
  chore: std(ClipboardList),

  // Actions
  add: std(Plus),
  edit: std(SquarePen),
  delete: std(Trash2),
  save: std(Save),
  close: std(X),
  search: std(Search),
  filter: std(SlidersHorizontal),
  back: std(ChevronLeft),
  drillIn: std(ChevronRight),
  overflow: std(MoreHorizontal),
  external: std(ExternalLink),
  sort: std(ArrowUpDown),
  upload: std(Upload),
  copy: std(Copy),
  share: std(Share),               // T2 parity
  settings: std(Settings),         // generic settings (distinct from appSettings, the Cortex admin page)

  // Data import (T3) — lucide placeholders; Claude Design set swaps in behind these names
  customField: std(Tag),           // a column kept as a barn-defined field
  undo: std(Undo2),                // reverse a committed import batch (distinct from delete)
  feedChart: std(Table),           // feed/meds matrix shape (fork tile)
  list: std(List),                 // flat-list shape (fork tile)

  // Status / health
  healthy: std(CircleCheck),
  restricted: std(TriangleAlert),
  injured: std(HeartPulse),
  overdue: std(Clock),
  lowStock: std(TrendingDown),
  active: std(CircleDot),
  inactive: std(Circle),
  eligible: std(CircleCheck),
  notEligible: std(CircleX),
  cantConfirm: std(CircleAlert),
  warning: std(TriangleAlert),
  info: std(Info),
  loading: std(Loader2),
  celebrate: std(Sparkles),        // success / aha moment (T2 parity)

  // Detail sections
  health: std(HeartPulse),
  costs: std(Receipt),
  documents: std(FileText),
  notes: std(StickyNote),
  lease: std(FileSignature),

  // Auth
  magicLink: std(Mail),
  password: std(Lock),
  signIn: std(LogIn),
  signOut: std(LogOut),
  key: std(KeyRound),

  // Cortex platform admin
  serviceAccounts: std(KeyRound),
  roles: std(ShieldCheck),
  taskTemplates: std(ClipboardList),
  vendorCategories: std(Tags),
  appSettings: std(Settings),
  classReference: std(BookOpen),
  showCalendar: std(CalendarDays),
  licensing: std(BadgeCheck),
  analytics: std(BarChart3),
  auditLog: std(ScrollText),
  branding: std(Palette),
  config: std(SlidersHorizontal),
  hiddenCategories: std(EyeOff),
  catalog: std(LayoutGrid),
  userLicenses: std(UserCheck),
  barnSubscriptions: std(Building2),

  // Points & Eligibility
  pointsEligibility: std(FileCheck),
  rules: std(Scale),
  divisions: std(Rows3),
} satisfies Record<string, IconComp>;

export type IconName = keyof typeof Icon;
