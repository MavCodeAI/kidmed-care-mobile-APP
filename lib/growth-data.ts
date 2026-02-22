/**
 * WHO/CDC Growth Reference Data
 * Pediatric growth percentiles for height, weight, and BMI
 * Based on CDC 2000 growth charts and WHO standards
 */

export interface GrowthDataPoint {
  age: number; // months
  p3: number; // 3rd percentile
  p5: number; // 5th percentile
  p10: number; // 10th percentile
  p25: number; // 25th percentile
  p50: number; // 50th percentile (median)
  p75: number; // 75th percentile
  p90: number; // 90th percentile
  p95: number; // 95th percentile
  p97: number; // 97th percentile
}

export interface GrowthChart {
  boys: GrowthDataPoint[];
  girls: GrowthDataPoint[];
}

// Height (cm) - CDC 2000 Growth Charts (0-36 months)
export const heightInfants: GrowthChart = {
  boys: [
    { age: 0, p3: 46.4, p5: 46.9, p10: 47.8, p25: 49.1, p50: 50.5, p75: 51.9, p90: 53.1, p95: 53.7, p97: 54.2 },
    { age: 1, p3: 49.0, p5: 49.6, p10: 50.6, p25: 52.1, p50: 53.6, p75: 55.1, p90: 56.4, p95: 57.1, p97: 57.6 },
    { age: 2, p3: 51.2, p5: 51.9, p10: 52.9, p25: 54.5, p50: 56.1, p75: 57.7, p90: 59.1, p95: 59.8, p97: 60.3 },
    { age: 3, p3: 53.1, p5: 53.8, p10: 54.9, p25: 56.5, p50: 58.2, p75: 59.9, p90: 61.4, p95: 62.1, p97: 62.7 },
    { age: 6, p3: 58.4, p5: 59.2, p10: 60.4, p25: 62.2, p50: 64.0, p75: 65.9, p90: 67.6, p95: 68.4, p97: 69.1 },
    { age: 9, p3: 63.4, p5: 64.2, p10: 65.5, p25: 67.6, p50: 69.7, p75: 71.8, p90: 73.7, p95: 74.6, p97: 75.3 },
    { age: 12, p3: 67.6, p5: 68.5, p10: 69.8, p25: 72.1, p50: 74.3, p75: 76.6, p90: 78.6, p95: 79.6, p97: 80.3 },
    { age: 18, p3: 74.4, p5: 75.3, p10: 76.8, p25: 79.2, p50: 81.6, p75: 84.1, p90: 86.4, p95: 87.5, p97: 88.3 },
    { age: 24, p3: 80.0, p5: 80.9, p10: 82.5, p25: 85.0, p50: 87.6, p75: 90.2, p90: 92.7, p95: 93.9, p97: 94.8 },
    { age: 30, p3: 84.8, p5: 85.8, p10: 87.4, p25: 90.0, p50: 92.7, p75: 95.5, p90: 98.2, p95: 99.5, p97: 100.4 },
    { age: 36, p3: 88.9, p5: 89.9, p10: 91.6, p25: 94.3, p50: 97.1, p75: 100.0, p90: 102.9, p95: 104.3, p97: 105.3 },
  ],
  girls: [
    { age: 0, p3: 45.4, p5: 46.0, p10: 46.9, p25: 48.2, p50: 49.5, p75: 50.8, p90: 51.9, p95: 52.5, p97: 52.9 },
    { age: 1, p3: 47.9, p5: 48.5, p10: 49.5, p25: 50.9, p50: 52.3, p75: 53.7, p90: 54.9, p95: 55.5, p97: 56.0 },
    { age: 2, p3: 50.1, p5: 50.8, p10: 51.8, p25: 53.3, p50: 54.8, p75: 56.3, p90: 57.6, p95: 58.3, p97: 58.8 },
    { age: 3, p3: 51.9, p5: 52.6, p10: 53.7, p25: 55.2, p50: 56.8, p75: 58.4, p90: 59.8, p95: 60.5, p97: 61.1 },
    { age: 6, p3: 56.9, p5: 57.7, p10: 58.9, p25: 60.6, p50: 62.3, p75: 64.1, p90: 65.8, p95: 66.6, p97: 67.3 },
    { age: 9, p3: 61.7, p5: 62.5, p10: 63.8, p25: 65.8, p50: 67.8, p75: 69.9, p90: 71.8, p95: 72.7, p97: 73.4 },
    { age: 12, p3: 65.9, p5: 66.8, p10: 68.1, p25: 70.3, p50: 72.5, p75: 74.8, p90: 76.9, p95: 77.9, p97: 78.7 },
    { age: 18, p3: 72.6, p5: 73.5, p10: 74.9, p25: 77.2, p50: 79.5, p75: 81.9, p90: 84.2, p95: 85.3, p97: 86.1 },
    { age: 24, p3: 78.0, p5: 78.9, p10: 80.4, p25: 82.8, p50: 85.3, p75: 87.8, p90: 90.3, p95: 91.5, p97: 92.4 },
    { age: 30, p3: 82.7, p5: 83.6, p10: 85.1, p25: 87.6, p50: 90.2, p75: 92.8, p90: 95.4, p95: 96.6, p97: 97.6 },
    { age: 36, p3: 86.8, p5: 87.7, p10: 89.2, p25: 91.8, p50: 94.4, p75: 97.1, p90: 99.7, p95: 100.9, p97: 102.0 },
  ],
};

// Weight (kg) - CDC 2000 Growth Charts (0-36 months)
export const weightInfants: GrowthChart = {
  boys: [
    { age: 0, p3: 2.5, p5: 2.6, p10: 2.8, p25: 3.1, p50: 3.4, p75: 3.8, p90: 4.1, p95: 4.3, p97: 4.5 },
    { age: 1, p3: 3.6, p5: 3.8, p10: 4.1, p25: 4.6, p50: 5.1, p75: 5.6, p90: 6.1, p95: 6.4, p97: 6.7 },
    { age: 2, p3: 4.4, p5: 4.6, p10: 5.0, p25: 5.6, p50: 6.3, p75: 7.0, p90: 7.7, p95: 8.1, p97: 8.5 },
    { age: 3, p3: 5.0, p5: 5.3, p10: 5.7, p25: 6.4, p50: 7.1, p75: 7.9, p90: 8.7, p95: 9.2, p97: 9.6 },
    { age: 6, p3: 6.4, p5: 6.7, p10: 7.2, p25: 8.0, p50: 9.0, p75: 10.0, p90: 11.0, p95: 11.6, p97: 12.2 },
    { age: 9, p3: 7.5, p5: 7.8, p10: 8.4, p25: 9.3, p50: 10.5, p75: 11.7, p90: 12.9, p95: 13.6, p97: 14.3 },
    { age: 12, p3: 8.4, p5: 8.7, p10: 9.4, p25: 10.4, p50: 11.7, p75: 13.1, p90: 14.5, p95: 15.3, p97: 16.1 },
    { age: 18, p3: 9.6, p5: 10.0, p10: 10.8, p25: 12.0, p50: 13.5, p75: 15.2, p90: 17.0, p95: 18.0, p97: 19.0 },
    { age: 24, p3: 10.8, p5: 11.2, p10: 12.1, p25: 13.5, p50: 15.2, p75: 17.1, p90: 19.2, p95: 20.4, p97: 21.6 },
    { age: 30, p3: 11.9, p5: 12.3, p10: 13.3, p25: 14.9, p50: 16.8, p75: 18.9, p90: 21.3, p95: 22.7, p97: 24.1 },
    { age: 36, p3: 13.0, p5: 13.4, p10: 14.5, p25: 16.2, p50: 18.3, p75: 20.6, p90: 23.2, p95: 24.8, p97: 26.3 },
  ],
  girls: [
    { age: 0, p3: 2.4, p5: 2.5, p10: 2.7, p25: 3.0, p50: 3.3, p75: 3.6, p90: 3.9, p95: 4.1, p97: 4.3 },
    { age: 1, p3: 3.4, p5: 3.5, p10: 3.8, p25: 4.3, p50: 4.8, p75: 5.3, p90: 5.8, p95: 6.1, p97: 6.3 },
    { age: 2, p3: 4.1, p5: 4.3, p10: 4.7, p25: 5.2, p50: 5.9, p75: 6.6, p90: 7.3, p95: 7.7, p97: 8.1 },
    { age: 3, p3: 4.7, p5: 4.9, p10: 5.3, p25: 6.0, p50: 6.7, p75: 7.5, p90: 8.3, p95: 8.8, p97: 9.2 },
    { age: 6, p3: 6.0, p5: 6.3, p10: 6.8, p25: 7.6, p50: 8.6, p75: 9.6, p90: 10.6, p95: 11.2, p97: 11.8 },
    { age: 9, p3: 7.0, p5: 7.3, p10: 7.9, p25: 8.8, p50: 10.0, p75: 11.2, p90: 12.4, p95: 13.1, p97: 13.8 },
    { age: 12, p3: 7.9, p5: 8.2, p10: 8.9, p25: 9.9, p50: 11.2, p75: 12.6, p90: 14.0, p95: 14.8, p97: 15.6 },
    { age: 18, p3: 9.0, p5: 9.4, p10: 10.2, p25: 11.4, p50: 12.9, p75: 14.6, p90: 16.4, p95: 17.4, p97: 18.4 },
    { age: 24, p3: 10.1, p5: 10.5, p10: 11.4, p25: 12.8, p50: 14.5, p75: 16.4, p90: 18.5, p95: 19.7, p97: 20.9 },
    { age: 30, p3: 11.1, p5: 11.5, p10: 12.5, p25: 14.0, p50: 15.9, p75: 18.0, p90: 20.4, p95: 21.8, p97: 23.2 },
    { age: 36, p3: 12.1, p5: 12.5, p10: 13.6, p25: 15.2, p50: 17.2, p75: 19.5, p90: 22.0, p95: 23.5, p97: 24.9 },
  ],
};

// BMI percentiles (kg/m²) - CDC 2000 Growth Charts (2-20 years)
export const bmiChildren: GrowthChart = {
  boys: [
    { age: 24, p3: 13.3, p5: 13.5, p10: 13.8, p25: 14.3, p50: 14.9, p75: 15.6, p90: 16.4, p95: 16.9, p97: 17.3 },
    { age: 36, p3: 13.4, p5: 13.6, p10: 13.9, p25: 14.4, p50: 15.1, p75: 15.8, p90: 16.7, p95: 17.2, p97: 17.6 },
    { age: 48, p3: 13.5, p5: 13.7, p10: 14.0, p25: 14.5, p50: 15.2, p75: 16.0, p90: 16.9, p95: 17.4, p97: 17.9 },
    { age: 60, p3: 13.6, p5: 13.8, p10: 14.1, p25: 14.6, p50: 15.3, p75: 16.2, p90: 17.2, p95: 17.8, p97: 18.3 },
    { age: 84, p3: 13.9, p5: 14.1, p10: 14.4, p25: 15.0, p50: 15.8, p75: 16.8, p90: 17.9, p95: 18.6, p97: 19.2 },
    { age: 120, p3: 14.4, p5: 14.6, p10: 14.9, p25: 15.6, p50: 16.5, p75: 17.7, p90: 19.0, p95: 19.8, p97: 20.5 },
    { age: 156, p3: 15.1, p5: 15.3, p10: 15.6, p25: 16.4, p50: 17.4, p75: 18.8, p90: 20.4, p95: 21.3, p97: 22.2 },
    { age: 192, p3: 15.8, p5: 16.0, p10: 16.3, p25: 17.2, p50: 18.3, p75: 19.9, p90: 21.7, p95: 22.8, p97: 23.8 },
    { age: 228, p3: 16.4, p5: 16.6, p10: 16.9, p25: 17.9, p50: 19.1, p75: 20.9, p90: 22.9, p95: 24.1, p97: 25.2 },
    { age: 240, p3: 16.6, p5: 16.8, p10: 17.1, p25: 18.1, p50: 19.4, p75: 21.2, p90: 23.3, p95: 24.5, p97: 25.7 },
  ],
  girls: [
    { age: 24, p3: 13.2, p5: 13.4, p10: 13.7, p25: 14.2, p50: 14.8, p75: 15.5, p90: 16.3, p95: 16.8, p97: 17.2 },
    { age: 36, p3: 13.3, p5: 13.5, p10: 13.8, p25: 14.3, p50: 15.0, p75: 15.7, p90: 16.6, p95: 17.1, p97: 17.5 },
    { age: 48, p3: 13.4, p5: 13.6, p10: 13.9, p25: 14.4, p50: 15.1, p75: 15.9, p90: 16.8, p95: 17.3, p97: 17.8 },
    { age: 60, p3: 13.5, p5: 13.7, p10: 14.0, p25: 14.5, p50: 15.2, p75: 16.1, p90: 17.1, p95: 17.7, p97: 18.2 },
    { age: 84, p3: 13.8, p5: 14.0, p10: 14.3, p25: 14.9, p50: 15.7, p75: 16.7, p90: 17.9, p95: 18.6, p97: 19.2 },
    { age: 120, p3: 14.3, p5: 14.5, p10: 14.8, p25: 15.5, p50: 16.4, p75: 17.7, p90: 19.1, p95: 19.9, p97: 20.7 },
    { age: 156, p3: 15.0, p5: 15.2, p10: 15.5, p25: 16.3, p50: 17.4, p75: 18.9, p90: 20.6, p95: 21.6, p97: 22.6 },
    { age: 192, p3: 15.8, p5: 16.0, p10: 16.3, p25: 17.2, p50: 18.4, p75: 20.1, p90: 22.1, p95: 23.3, p97: 24.4 },
    { age: 228, p3: 16.4, p5: 16.6, p10: 16.9, p25: 17.9, p50: 19.2, p75: 21.1, p90: 23.3, p95: 24.6, p97: 25.8 },
    { age: 240, p3: 16.6, p5: 16.8, p10: 17.1, p25: 18.1, p50: 19.5, p75: 21.4, p90: 23.7, p95: 25.0, p97: 26.3 },
  ],
};

/**
 * Interpolate growth data for ages between data points
 */
export function interpolateGrowthData(
  data: GrowthDataPoint[],
  targetAge: number
): GrowthDataPoint | null {
  if (targetAge < data[0].age) return null;
  if (targetAge > data[data.length - 1].age) return null;

  // Find surrounding data points
  let lower = data[0];
  let upper = data[data.length - 1];

  for (let i = 0; i < data.length - 1; i++) {
    if (data[i].age <= targetAge && data[i + 1].age >= targetAge) {
      lower = data[i];
      upper = data[i + 1];
      break;
    }
  }

  if (lower.age === upper.age) {
    return lower;
  }

  // Linear interpolation
  const ratio = (targetAge - lower.age) / (upper.age - lower.age);

  return {
    age: targetAge,
    p3: lower.p3 + (upper.p3 - lower.p3) * ratio,
    p5: lower.p5 + (upper.p5 - lower.p5) * ratio,
    p10: lower.p10 + (upper.p10 - lower.p10) * ratio,
    p25: lower.p25 + (upper.p25 - lower.p25) * ratio,
    p50: lower.p50 + (upper.p50 - lower.p50) * ratio,
    p75: lower.p75 + (upper.p75 - lower.p75) * ratio,
    p90: lower.p90 + (upper.p90 - lower.p90) * ratio,
    p95: lower.p95 + (upper.p95 - lower.p95) * ratio,
    p97: lower.p97 + (upper.p97 - lower.p97) * ratio,
  };
}

/**
 * Calculate percentile for a given measurement
 */
export function calculatePercentile(
  data: GrowthDataPoint[],
  ageMonths: number,
  measurement: number
): number {
  const point = interpolateGrowthData(data, ageMonths);
  if (!point) return 0;

  // Determine percentile based on measurement
  if (measurement < point.p3) return 0;
  if (measurement < point.p5) return 3;
  if (measurement < point.p10) return 5;
  if (measurement < point.p25) return 10;
  if (measurement < point.p50) return 25;
  if (measurement < point.p75) return 50;
  if (measurement < point.p90) return 75;
  if (measurement < point.p95) return 90;
  if (measurement < point.p97) return 95;
  return 97;
}

/**
 * Classify growth status based on percentile
 */
export function classifyGrowthStatus(percentile: number): {
  status: string;
  color: string;
  description: string;
} {
  if (percentile < 5) {
    return {
      status: "Below 5th percentile",
      color: "#EF4444",
      description: "Growth concern - Consider evaluation",
    };
  }
  if (percentile < 10) {
    return {
      status: "5-10th percentile",
      color: "#F59E0B",
      description: "Low-normal - Monitor closely",
    };
  }
  if (percentile >= 10 && percentile <= 90) {
    return {
      status: "Normal range",
      color: "#22C55E",
      description: "Growth within normal limits",
    };
  }
  if (percentile <= 95) {
    return {
      status: "90-95th percentile",
      color: "#F59E0B",
      description: "High-normal - Monitor for obesity",
    };
  }
  return {
    status: "Above 95th percentile",
    color: "#EF4444",
    description: "Elevated - Consider evaluation",
  };
}
