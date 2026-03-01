import { ScrollView, Text, View, TouchableOpacity, FlatList, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useClinicalTools } from "@/lib/clinical-tools-context";
import { useSubscription } from "@/lib/subscription-context";
import { useAuth } from "@/lib/auth-context";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function ToolsHubScreen() {
  const router = useRouter();
  const { getAllTools, getToolsByTier } = useClinicalTools();
  const { user } = useAuth();
  const { hasFeature } = useSubscription();
  const scheme = useColorScheme();
  const [tools, setTools] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (user) {
      const availableTools = getToolsByTier(user.subscriptionTier);
      setTools(availableTools);
    }
  }, [user]);

  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "calculator":
        return "bg-primary/20 border-primary/50";
      case "assessment":
        return "bg-accent/20 border-accent/50";
      case "reference":
        return "bg-success/20 border-success/50";
      case "scheduler":
        return "bg-warning/20 border-warning/50";
      case "screening":
        return "bg-error/20 border-error/50";
      default:
        return "bg-muted/20 border-muted/50";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "calculator":
        return "🧮";
      case "assessment":
        return "📋";
      case "reference":
        return "📚";
      case "scheduler":
        return "📅";
      case "screening":
        return "🔍";
      default:
        return "⚙️";
    }
  };

  const handleToolPress = (toolId: string) => {
    // Route to specific tool
    switch (toolId) {
      case "bmi-calculator":
        router.push("/tools/bmi-calculator");
        break;
      default:
        // For other tools, show a coming soon message
        alert(`${toolId} coming soon`);
    }
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">Clinical Tools</Text>
            <Text className="text-sm text-muted">{tools.length} tools available in your plan</Text>
          </View>

          {/* Search Bar */}
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search tools..."
            className="bg-surface rounded-lg p-3 border border-border text-foreground"
            placeholderTextColor={Colors[scheme].muted}
            style={{ color: Colors[scheme].foreground }}
          />

          {/* Tools Grid */}
          <View className="flex-row flex-wrap gap-3">
            {filteredTools.map((tool) => (
              <TouchableOpacity
                key={tool.id}
                className="bg-surface rounded-xl p-4 border border-border active:opacity-80"
                style={{ flex: 1, minWidth: '48%' }}
                onPress={() => handleToolPress(tool.id)}
              >
                <View className="flex-row items-start gap-4">
                  {/* Category Badge */}
                  <View className={`rounded-lg p-3 ${getCategoryColor(tool.category)}`}>
                    <Text className="text-xl">{getCategoryIcon(tool.category)}</Text>
                  </View>

                  {/* Tool Info */}
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-foreground">{tool.name}</Text>
                    <Text className="text-xs text-muted mt-1">{tool.description}</Text>
                    <View className="flex-row items-center gap-2 mt-2">
                      <View className="bg-primary/20 rounded px-2 py-1">
                        <Text className="text-xs font-semibold text-primary capitalize">{tool.category}</Text>
                      </View>
                      <Text className="text-xs text-muted">Updated {tool.lastUpdated}</Text>
                    </View>
                  </View>

                  {/* Arrow */}
                  <Text className="text-xl text-muted">→</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {filteredTools.length === 0 && (
            <View className="bg-surface rounded-xl p-6 border border-border items-center justify-center py-12">
              <Text className="text-sm text-muted">No tools found</Text>
            </View>
          )}

          {/* Upgrade Prompt */}
          {tools.length < getAllTools().length && (
            <View className="bg-primary/10 border border-primary rounded-lg p-4 gap-3">
              <Text className="text-sm font-bold text-primary">Unlock More Tools</Text>
              <Text className="text-xs text-muted">
                Upgrade to Pro or Clinic plan to access all {getAllTools().length} clinical tools including advanced assessments and protocols.
              </Text>
              <TouchableOpacity className="bg-primary rounded-lg p-3 items-center mt-2">
                <Text className="text-white text-sm font-semibold">View Plans</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Tool Categories Info */}
          <View className="bg-surface rounded-xl p-4 border border-border gap-3">
            <Text className="text-base font-semibold text-foreground">Tool Categories</Text>
            <View className="gap-2">
              <View className="flex-row items-center gap-2">
                <Text className="text-lg">🧮</Text>
                <Text className="text-sm text-muted">Calculators - Quick medical calculations</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Text className="text-lg">📋</Text>
                <Text className="text-sm text-muted">Assessments - Clinical evaluation tools</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Text className="text-lg">📚</Text>
                <Text className="text-sm text-muted">References - Medical reference data</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Text className="text-lg">📅</Text>
                <Text className="text-sm text-muted">Schedulers - Timeline and tracking</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Text className="text-lg">🔍</Text>
                <Text className="text-sm text-muted">Screening - Diagnostic screening tools</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
