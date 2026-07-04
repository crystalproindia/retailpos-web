/**
 * Static icon registry. Only icons actually used by the site are imported,
 * restoring tree-shaking. Previously the full lucide `icons` map (~1,500
 * icons) was bundled into client components — the root cause of the slow
 * dev module graph and the dev-overlay issue indicator.
 */
import {
  Apple, Armchair, ArrowLeftRight, BadgePercent, BellRing, BookMarked, BookOpen,
  Boxes, Braces, Building2, Calculator, CalendarCheck, ChartColumnIncreasing,
  ChartPie, CircleDot, CircleHelp, CloudCog, CreditCard, DatabaseBackup, Dumbbell,
  EyeOff, FileBarChart, FileSpreadsheet, Footprints, Gem, Gift, GitBranch, Globe,
  Handshake, HeartHandshake, Hourglass, Landmark, LayoutDashboard, LifeBuoy, Lock,
  MessageCircle, MonitorSmartphone, Network, Newspaper, PackageCheck, PackageX,
  Percent, Phone, Pill, Printer, ReceiptText, Rocket, Route, Scale, ScrollText,
  Shirt, ShieldCheck, ShoppingBag, ShoppingBasket, ShoppingCart, Smartphone,
  Sparkle, Sparkles, Store, Tag, Tags, TrendingDown, TrendingUp, Truck, Undo2,
  UserX, Users, UtensilsCrossed, Warehouse, WifiOff, Workflow, Zap,
  type LucideIcon,
} from "lucide-react";

export const iconRegistry: Record<string, LucideIcon> = {
  Apple, Armchair, ArrowLeftRight, BadgePercent, BellRing, BookMarked, BookOpen,
  Boxes, Braces, Building2, Calculator, CalendarCheck, ChartColumnIncreasing,
  ChartPie, CircleDot, CircleHelp, CloudCog, CreditCard, DatabaseBackup, Dumbbell,
  EyeOff, FileBarChart, FileSpreadsheet, Footprints, Gem, Gift, GitBranch, Globe,
  Handshake, HeartHandshake, Hourglass, Landmark, LayoutDashboard, LifeBuoy, Lock,
  MessageCircle, MonitorSmartphone, Network, Newspaper, PackageCheck, PackageX,
  Percent, Phone, Pill, Printer, ReceiptText, Rocket, Route, Scale, ScrollText,
  Shirt, ShieldCheck, ShoppingBag, ShoppingBasket, ShoppingCart, Smartphone,
  Sparkle, Sparkles, Store, Tag, Tags, TrendingDown, TrendingUp, Truck, Undo2,
  UserX, Users, UtensilsCrossed, Warehouse, WifiOff, Workflow, Zap,
};

export const fallbackIcon = CircleDot;
