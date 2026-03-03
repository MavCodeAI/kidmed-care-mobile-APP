import { ScrollView, Text, View, Pressable, TextInput } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { PremiumCard } from "@/components/premium-card";
import { LucideIcon } from "@/components/lucide-icon";
import { useColors } from "@/hooks/use-colors";

const CLINICAL_TOOLS = [
  {
    id: "bmi",
    name: "BMI Calculator",
    description: "Calculate BMI and health metrics",
    icon: "calculator",
    category: "Measurements",
    tier: "free",
  },
  {
    id: "growth",
    name: "Growth Charts",
    description: "WHO/CDC percentile tracking",
    icon: "trending-up",
    category: "Growth",
    tier: "free",
  },
  {
    id: "vaccine",
    name: "Vaccine Scheduler",
    description: "CDC vaccination schedule",
    icon: "calendar",
    category: "Prevention",
    tier: "pro",
  },
  {
    id: "milestones",
    name: "Dev Milestones",
    description: "Developmental tracking",
    icon: "target",
    category: "Development",
    tier: "free",
  },
  {
    id: "labs",
    name: "Lab Values",
    description: "Reference ranges",
    icon: "beaker",
    category: "Labs",
    tier: "free",
  },
  {
    id: "vitals",
    name: "Vital Signs",
    description: "Normal ranges by age",
    icon: "heart",
    category: "Vitals",
    tier: "free",
  },
  {
    id: "asd",
    name: "ASD Screening",
    description: "M-CHAT assessment",
    icon: "brain",
    category: "Screening",
    tier: "pro",
  },
  {
    id: "pain",
    name: "Pain Assessment",
    description: "FLACC/Numeric scales",
    icon: "activity",
    category: "Assessment",
    tier: "pro",
  },
  {
    id: "dosing",
    name: "Drug Dosing",
    description: "Weight-based calculations",
    icon: "pill",
    category: "Medications",
    tier: "pro",
  },
  {
    id: "catchup",
    name: "Catch-up Vaccination",
    description: "Accelerated schedules",
    icon: "zap",
    category: "Prevention",
    tier: "clinic",
  },
  {
    id: "critical",
    name: "Critical Values",
    description: "Emergency thresholds",
    icon: "alert-triangle",
    category: "Emergency",
    tier: "pro",
  },
  {
    id: "prescription",
    name: "AI Prescription",
    description: "Prescription generation",
    icon: "file-text",
    category: "Prescriptions",
    tier: "pro",
  },
];

const CATEGORIES = ["All", "Measurements", "Growth", "Prevention", "Development", "Labs", "Vitals", "Screening"];

export default function ToolsRedesignedScreen() {
  const router = useRouter();
  const colors = useColors();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTools = CLINICAL_TOOLS.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case "free":
        return "#51CF66";
      case "pro":
        return colors.primary;
      case "clinic":
        return "#FF922B";
      default:
        return colors.muted;
    }
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">Clinical Tools</Text>
            <Text className="text-base text-muted">13 tools to support your clinical decisions</Text>
          </View>

          {/* Search Bar */}
          <PremiumCard glassmorphism className="px-4 py-3 flex-row items-center gap-3">
            <LucideIcon name="search" size={20} color={colors.muted} />
            <TextInput
              placeholder="Search tools..."
              placeholderTextColor={colors.muted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 text-foreground"
              style={{ fontSize: 16 }}
            />
          </PremiumCard>

          {/* Category Filter */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-muted uppercase">Categories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-2">
              <View className="flex-row gap-2">
                {CATEGORIES.map((category) => (
                  <Pressable
                    key={category}
                    onPress={() => setSelectedCategory(category)}
                    style={({ pressed }) => [
                      {
                        opacity: pressed ? 0.8 : 1,
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 20,
                        backgroundColor:
                          selectedCategory === category ? colors.primary : colors.surface,
                        borderWidth: 1,
                        borderColor:
                          selectedCategory === category ? colors.primary : colors.border,
                      },
                    ]}
                  >
                    <Text
                      className={`text-sm font-semibold ${
                        selectedCategory === category ? "text-background" : "text-foreground"
                      }`}
                    >
                      {category}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Tools Grid */}
          <View className="gap-3">
            {filteredTools.length > 0 ? (
              filteredTools.map((tool) => (
                <Pressable
                  key={tool.id}
                  onPress={() => router.push("/(tabs)/tools")}
                  style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
                >
                  <PremiumCard glassmorphism elevated className="p-4">
                    <View className="flex-row items-start gap-3">
                      {/* Icon */}
                      <View
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 12,
                          backgroundColor: `${colors.primary}20`,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <LucideIcon name={tool.icon as any} size={24} color={colors.primary} />
                      </View>

                      {/* Content */}
                      <View className="flex-1 gap-1">
                        <View className="flex-row items-center justify-between">
                          <Text className="text-base font-semibold text-foreground flex-1">
                            {tool.name}
                          </Text>
                          <View
                            style={{
                              paddingHorizontal: 8,
                              paddingVertical: 4,
                              borderRadius: 6,
                              backgroundColor: `${getTierBadgeColor(tool.tier)}20`,
                            }}
                          >
                            <Text
                              className="text-xs font-bold uppercase"
                              style={{ color: getTierBadgeColor(tool.tier) }}
                            >
                              {tool.tier}
                            </Text>
                          </View>
                        </View>
                        <Text className="text-sm text-muted">{tool.description}</Text>
                        <View className="flex-row items-center justify-between mt-2">
                          <Text className="text-xs text-muted">{tool.category}</Text>
                          <LucideIcon name="arrow-right" size={16} color={colors.primary} />
                        </View>
                      </View>
                    </View>
                  </PremiumCard>
                </Pressable>
              ))
            ) : (
              <PremiumCard glassmorphism className="p-8 items-center gap-3">
                <LucideIcon name="search" size={32} color={colors.muted} />
                <Text className="text-base font-semibold text-foreground">No tools found</Text>
                <Text className="text-sm text-muted text-center">
                  Try adjusting your search or category filter
                </Text>
              </PremiumCard>
            )}
          </View>

          {/* Spacer */}
          <View className="h-4" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
