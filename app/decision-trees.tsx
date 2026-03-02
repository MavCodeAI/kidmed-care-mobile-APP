import { ScrollView, Text, View, Pressable } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { decisionTreesService } from "@/lib/decision-trees-service";

export default function DecisionTreesScreen() {
  const router = useRouter();
  const [selectedTree, setSelectedTree] = useState<any>(null);
  const [currentNode, setCurrentNode] = useState<any>(null);
  const [path, setPath] = useState<any[]>([]);

  const trees = decisionTreesService.getAllTrees();

  const handleSelectTree = (treeId: string) => {
    const tree = decisionTreesService.getTree(treeId);
    if (tree) {
      setSelectedTree(tree);
      const startNode = decisionTreesService.getNode(treeId, tree.startNodeId);
      setCurrentNode(startNode);
      setPath([startNode]);
    }
  };

  const handleNodeAnswer = (nextNodeId: string) => {
    const nextNode = decisionTreesService.getNode(selectedTree.id, nextNodeId);
    if (nextNode) {
      setCurrentNode(nextNode);
      setPath([...path, nextNode]);
    }
  };

  const handleReset = () => {
    setSelectedTree(null);
    setCurrentNode(null);
    setPath([]);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "emergency":
        return "#ff0000";
      case "urgent":
        return "#ffaa00";
      default:
        return "#00ff00";
    }
  };

  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case "emergency":
        return "🚨 EMERGENCY";
      case "urgent":
        return "⚠️ URGENT";
      default:
        return "✓ ROUTINE";
    }
  };

  if (!selectedTree) {
    return (
      <ScreenContainer className="bg-black">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
          <View className="p-6 gap-4">
            <Text className="text-3xl font-bold text-white">Clinical Decision Trees</Text>
            <Text className="text-sm text-gray-400">Interactive diagnostic flowcharts</Text>

            <View className="gap-3 mt-4">
              {trees.map((tree) => (
                <Pressable
                  key={tree.id}
                  onPress={() => handleSelectTree(tree.id)}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#0f3a0f" : "#0a2a0a",
                      borderWidth: 1,
                      borderColor: "#00ff00",
                      borderRadius: 10,
                      padding: 14,
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >
                  <View className="flex-row justify-between items-start">
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-green-500">{tree.name}</Text>
                      <Text className="text-xs text-gray-400 mt-1">{tree.description}</Text>
                    </View>
                    <Text className="text-green-500 text-lg">→</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="bg-black">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-4">
          {/* Header */}
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-2xl font-bold text-white">{selectedTree.name}</Text>
              <Text className="text-xs text-gray-400 mt-1">Step {path.length} of assessment</Text>
            </View>
            <Pressable
              onPress={handleReset}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#333333" : "#1a1a1a",
                  borderWidth: 1,
                  borderColor: "#666666",
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  borderRadius: 6,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text className="text-xs font-semibold text-gray-400">Reset</Text>
            </Pressable>
          </View>

          {/* Current Node */}
          {currentNode && (
            <>
              {/* Urgency Badge */}
              <View
                style={{
                  backgroundColor: getUrgencyColor(currentNode.urgency),
                  borderRadius: 8,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  alignSelf: "flex-start",
                }}
              >
                <Text className="text-xs font-bold text-black">{getUrgencyLabel(currentNode.urgency)}</Text>
              </View>

              {/* Question */}
              <View className="bg-gray-900 rounded-xl p-6 border border-green-500 gap-4">
                <Text className="text-xl font-bold text-white">{currentNode.question}</Text>

                {/* Red Flags */}
                {currentNode.redFlags && currentNode.redFlags.length > 0 && (
                  <View className="bg-red-900 rounded-lg p-4 border border-red-600">
                    <Text className="text-sm font-semibold text-red-300 mb-2">🚩 Red Flags:</Text>
                    {currentNode.redFlags.map((flag: string, idx: number) => (
                      <Text key={idx} className="text-xs text-red-200 mb-1">
                        • {flag}
                      </Text>
                    ))}
                  </View>
                )}

                {/* Recommendations */}
                {currentNode.recommendations && currentNode.recommendations.length > 0 && (
                  <View className="bg-green-900 rounded-lg p-4 border border-green-600">
                    <Text className="text-sm font-semibold text-green-300 mb-2">💡 Recommendations:</Text>
                    {currentNode.recommendations.map((rec: string, idx: number) => (
                      <Text key={idx} className="text-xs text-green-200 mb-1">
                        {rec}
                      </Text>
                    ))}
                  </View>
                )}
              </View>

              {/* Next Steps */}
              {currentNode.nextSteps && currentNode.nextSteps.length > 0 && (
                <View className="gap-3">
                  <Text className="text-sm font-semibold text-white">Select next step:</Text>
                  {currentNode.nextSteps.map((step: any, idx: number) => (
                    <Pressable
                      key={idx}
                      onPress={() => handleNodeAnswer(step.nodeId)}
                      style={({ pressed }) => [
                        {
                          backgroundColor: pressed ? "#00dd00" : "#00ff00",
                          paddingVertical: 12,
                          paddingHorizontal: 16,
                          borderRadius: 8,
                          opacity: pressed ? 0.8 : 1,
                        },
                      ]}
                    >
                      <Text className="text-base font-semibold text-black text-center">{step.answer}</Text>
                    </Pressable>
                  ))}
                </View>
              )}

              {/* Path Summary */}
              {path.length > 1 && (
                <View className="bg-gray-900 rounded-xl p-4 border border-gray-700 gap-2">
                  <Text className="text-xs font-semibold text-gray-400">Assessment Path:</Text>
                  {path.map((node: any, idx: number) => (
                    <Text key={idx} className="text-xs text-gray-300">
                      {idx + 1}. {node.question}
                    </Text>
                  ))}
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
