// Emoji to Lucide Icon mapping
export const emojiToLucideMap: { [key: string]: string } = {
  "℞": "prescription",
  "🚨": "alertTriangle",
  "⚠️": "alertTriangle",
  "✓": "checkCircle",
  "✅": "checkCircle",
  "💡": "lightbulb",
  "🚩": "flag",
  "📥": "download",
  "📤": "upload",
  "👥": "users",
  "💬": "messageSquare",
  "📊": "barChart3",
  "📱": "smartphone",
  "⚙️": "settings",
  "🏥": "stethoscope",
  "❌": "xCircle",
  "📋": "clipboard",
  "🔔": "bell",
  "⭐": "star",
  "📞": "phone",
  "📧": "mail",
  "🌙": "moon",
  "☀️": "sun",
  "💳": "creditCard",
  "🎯": "target",
  "📈": "trendingUp",
  "🔄": "refreshCw",
  "🔗": "link",
  "⚡": "zap",
  "👁️": "eye",
  "🔍": "search",
  "➕": "plus",
  "✏️": "edit",
  "🗑️": "trash2",
  "🌐": "globe",
  "🔐": "lock",
  "💾": "save",
  "📂": "folder",
  "📄": "file",
  "🎨": "palette",
  "🔊": "volume2",
  "🔇": "volumeX",
  "⏰": "clock",
  "📅": "calendar",
  "🚀": "rocket",
  "✨": "sparkles",
  "🎓": "book",
  "💼": "briefcase",
  "🏆": "award",
  "🎁": "gift",
  "❤️": "heart",
  "👍": "thumbsUp",
  "👎": "thumbsDown",
  "🔥": "flame",
  "💧": "droplet",
  "🌡️": "thermometer",
  "💊": "pill",
  "💉": "syringe",
  "🧠": "brain",
  "❓": "helpCircle",
  "ℹ️": "info",
  "⚠": "warning",
};

export function replaceEmojiWithLucideIcon(text: string): { text: string; emoji: string } {
  for (const [emoji, icon] of Object.entries(emojiToLucideMap)) {
    if (text.includes(emoji)) {
      return {
        text: text.replace(emoji, ""),
        emoji: icon,
      };
    }
  }
  return { text, emoji: "" };
}

export function extractEmojiFromText(text: string): { emoji: string; icon: string } | null {
  for (const [emoji, icon] of Object.entries(emojiToLucideMap)) {
    if (text.includes(emoji)) {
      return { emoji, icon };
    }
  }
  return null;
}
