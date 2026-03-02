import React from "react";
import {
  Home,
  Wrench,
  Users,
  MessageSquare,
  User,
  Settings,
  Activity,
  Heart,
  Thermometer,
  Pill,
  Syringe,
  Droplet,
  Brain,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  Share2,
  Copy,
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  XCircle,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  FileText,
  GitBranch,
  BarChart3,
  Send,
  Briefcase,
  WifiOff,
  RefreshCw,
  Stethoscope,
  Clipboard,
  Calendar,
  Clock,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Sun,
  Moon,
  CreditCard,
  DollarSign,
  Bell,
  Star,
  Bookmark,
  Zap,
  TrendingUp,
} from "lucide-react-native";

interface LucideIconProps {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const iconMap: { [key: string]: React.ComponentType<any> } = {
  home: Home,
  tools: Wrench,
  users: Users,
  messageSquare: MessageSquare,
  user: User,
  settings: Settings,
  activity: Activity,
  heart: Heart,
  thermometer: Thermometer,
  pill: Pill,
  syringe: Syringe,
  droplet: Droplet,
  brain: Brain,
  plus: Plus,
  edit: Edit,
  trash: Trash2,
  download: Download,
  upload: Upload,
  share: Share2,
  copy: Copy,
  checkCircle: CheckCircle,
  alertCircle: AlertCircle,
  info: Info,
  warning: AlertTriangle,
  error: XCircle,
  menu: Menu,
  x: X,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  search: Search,
  filter: Filter,
  prescription: FileText,
  decisionTree: GitBranch,
  analytics: BarChart3,
  messaging: Send,
  workspace: Briefcase,
  offline: WifiOff,
  sync: RefreshCw,
  stethoscope: Stethoscope,
  clipboard: Clipboard,
  calendar: Calendar,
  clock: Clock,
  lock: Lock,
  unlock: Unlock,
  eye: Eye,
  eyeOff: EyeOff,
  sun: Sun,
  moon: Moon,
  creditCard: CreditCard,
  dollarSign: DollarSign,
  bell: Bell,
  star: Star,
  bookmark: Bookmark,
  zap: Zap,
  trending: TrendingUp,
};

export function LucideIcon({
  name,
  size = 24,
  color = "#00ff00",
  strokeWidth = 2,
}: LucideIconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in Lucide icons`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={strokeWidth}
    />
  );
}
