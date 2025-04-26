import React, { useState, useEffect } from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  Line,
  Bar,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  format,
  subHours,
  subDays,
  subWeeks,
  subMonths,
  subQuarters,
  subYears,
} from "date-fns";
import {
  FiClock,
  FiCalendar,
  FiTrendingUp,
  FiUsers,
  FiRefreshCw,
} from "react-icons/fi";
import { motion } from "framer-motion";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
];

const timeframes = [
  { id: "hour", label: "Last 24 Hours", icon: <FiClock className="mr-1" /> },
  { id: "day", label: "Daily", icon: <FiCalendar className="mr-1" /> },
  { id: "week", label: "Weekly", icon: <FiTrendingUp className="mr-1" /> },
  { id: "month", label: "Monthly", icon: <FiCalendar className="mr-1" /> },
  {
    id: "quarter",
    label: "Quarterly",
    icon: <FiTrendingUp className="mr-1" />,
  },
  { id: "year", label: "Yearly", icon: <FiCalendar className="mr-1" /> },
];

const chartTypes = {
  hour: "line",
  day: "bar",
  week: "area",
  month: "bar",
  quarter: "line",
  year: "line",
};

// Visitor tracking storage (simulated)
const getStoredVisitors = () => {
  const stored = localStorage.getItem("visitorAnalytics");
  return stored
    ? JSON.parse(stored)
    : {
        sessions: {},
        lastVisit: null,
        returningCount: 0,
        newCount: 0,
      };
};

const storeVisitorData = (data) => {
  localStorage.setItem("visitorAnalytics", JSON.stringify(data));
};

const VisitorAnalyticsDashboard = () => {
  const [timeframe, setTimeframe] = useState("day");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  // Track current visitor (simulated)
  useEffect(() => {
    const visitorData = getStoredVisitors();
    const now = new Date();
    const visitorId = Math.random().toString(36).substring(2, 15); // Simulated visitor ID

    const isReturning = visitorData.sessions[visitorId] !== undefined;

    // Update visitor counts
    if (isReturning) {
      visitorData.returningCount += 1;
    } else {
      visitorData.newCount += 1;
      visitorData.sessions[visitorId] = now.toISOString();
    }

    visitorData.lastVisit = now.toISOString();
    storeVisitorData(visitorData);
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [timeframe]);

  const fetchData = () => {
    setIsLoading(true);
    setTimeout(() => {
      const mockData = generateRealisticData(timeframe);
      setData(mockData);
      calculateMetrics(mockData);
      setIsLoading(false);
    }, 800);
  };

  const generateRealisticData = (timeframe) => {
    let data = [];
    const now = new Date();
    const visitorData = getStoredVisitors();
    let count = 12;

    // Base values from actual tracking
    const baseNew = visitorData.newCount || 50;
    const baseReturning = visitorData.returningCount || 30;

    switch (timeframe) {
      case "hour":
        count = 24;
        for (let i = count - 1; i >= 0; i--) {
          const date = subHours(now, i);
          const hour = date.getHours();
          // More visitors during daytime
          const hourFactor = hour >= 9 && hour <= 17 ? 1.5 : 0.8;
          const newVisitors =
            Math.floor(baseNew * hourFactor * Math.random() * 0.5) + 5;
          const returningVisitors =
            Math.floor(baseReturning * hourFactor * Math.random() * 0.5) + 3;

          data.push({
            name: format(date, "HH:00"),
            visitors: newVisitors + returningVisitors,
            returning: returningVisitors,
            new: newVisitors,
          });
        }
        break;
      case "day":
        count = 30;
        for (let i = count - 1; i >= 0; i--) {
          const date = subDays(now, i);
          const day = date.getDay();
          // More visitors on weekdays
          const dayFactor = day >= 1 && day <= 5 ? 1.2 : 0.7;
          const newVisitors =
            Math.floor(baseNew * dayFactor * Math.random() * 0.8) + 10;
          const returningVisitors =
            Math.floor(baseReturning * dayFactor * Math.random() * 0.8) + 8;

          data.push({
            name: format(date, "MMM dd"),
            visitors: newVisitors + returningVisitors,
            returning: returningVisitors,
            new: newVisitors,
          });
        }
        break;
      case "week":
        count = 12;
        for (let i = count - 1; i >= 0; i--) {
          const date = subWeeks(now, i);
          // Weekly growth trend
          const growthFactor = 1 + i * 0.03;
          const newVisitors =
            Math.floor(baseNew * growthFactor * Math.random() * 2) + 30;
          const returningVisitors =
            Math.floor(baseReturning * growthFactor * Math.random() * 2) + 25;

          data.push({
            name: `Week ${format(date, "ww")}`,
            visitors: newVisitors + returningVisitors,
            returning: returningVisitors,
            new: newVisitors,
          });
        }
        break;
      case "month":
        count = 12;
        for (let i = count - 1; i >= 0; i--) {
          const date = subMonths(now, i);
          // Seasonal variation
          const month = date.getMonth();
          const seasonFactor = month >= 3 && month <= 9 ? 1.1 : 0.9; // Higher in spring/summer
          const newVisitors = Math.floor(baseNew * seasonFactor * i * 3) + 100;
          const returningVisitors =
            Math.floor(baseReturning * seasonFactor * i * 3) + 80;

          data.push({
            name: format(date, "MMM yyyy"),
            visitors: newVisitors + returningVisitors,
            returning: returningVisitors,
            new: newVisitors,
          });
        }
        break;
      case "quarter":
        count = 8;
        for (let i = count - 1; i >= 0; i--) {
          const date = subQuarters(now, i);
          // Business growth over quarters
          const quarterGrowth = 1 + i * 0.1;
          const newVisitors = Math.floor(baseNew * quarterGrowth * 10) + 200;
          const returningVisitors =
            Math.floor(baseReturning * quarterGrowth * 10) + 180;

          data.push({
            name: `Q${Math.floor((date.getMonth() + 3) / 3)} ${format(
              date,
              "yyyy"
            )}`,
            visitors: newVisitors + returningVisitors,
            returning: returningVisitors,
            new: newVisitors,
          });
        }
        break;
      case "year":
        count = 5;
        for (let i = count - 1; i >= 0; i--) {
          const date = subYears(now, i);
          // Yearly growth
          const yearlyGrowth = 1 + i * 0.2;
          const newVisitors = Math.floor(baseNew * yearlyGrowth * 50) + 500;
          const returningVisitors =
            Math.floor(baseReturning * yearlyGrowth * 50) + 450;

          data.push({
            name: format(date, "yyyy"),
            visitors: newVisitors + returningVisitors,
            returning: returningVisitors,
            new: newVisitors,
          });
        }
        break;
      default:
        break;
    }

    return data.reverse();
  };

  const calculateMetrics = (data) => {
    if (data.length === 0) return;

    const currentPeriodTotal = data.reduce(
      (sum, item) => sum + item.visitors,
      0
    );
    const previousPeriodTotal =
      data.length > 1
        ? data
            .slice(0, Math.floor(data.length / 2))
            .reduce((sum, item) => sum + item.visitors, 0)
        : currentPeriodTotal * 0.8;

    setTotalVisitors(currentPeriodTotal);
    setPercentageChange(
      (
        ((currentPeriodTotal - previousPeriodTotal) / previousPeriodTotal) *
        100
      ).toFixed(1)
    );
  };

  const renderChart = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-96">
          <FiRefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="mt-4 text-gray-500">Loading visitor data...</p>
        </div>
      );
    }

    const chartType = chartTypes[timeframe];
    const isPositiveChange = parseFloat(percentageChange) >= 0;

    switch (chartType) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E5E7EB"
                opacity={0.3}
              />
              <XAxis dataKey="name" stroke="#6B7280" tickMargin={10} />
              <YAxis stroke="#6B7280" tickMargin={10} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderColor: "#374151",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  color: "#F9FAFB",
                }}
                itemStyle={{ color: "#F9FAFB" }}
                labelStyle={{ color: "#F9FAFB", fontWeight: "bold" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="returning"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="new"
                stroke="#F59E0B"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E5E7EB"
                opacity={0.3}
              />
              <XAxis dataKey="name" stroke="#6B7280" tickMargin={10} />
              <YAxis stroke="#6B7280" tickMargin={10} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderColor: "#374151",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  color: "#F9FAFB",
                }}
                itemStyle={{ color: "#F9FAFB" }}
                labelStyle={{ color: "#F9FAFB", fontWeight: "bold" }}
              />
              <Legend />
              <Bar dataKey="visitors" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="returning" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="new" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      case "area":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E5E7EB"
                opacity={0.3}
              />
              <XAxis dataKey="name" stroke="#6B7280" tickMargin={10} />
              <YAxis stroke="#6B7280" tickMargin={10} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderColor: "#374151",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  color: "#F9FAFB",
                }}
                itemStyle={{ color: "#F9FAFB" }}
                labelStyle={{ color: "#F9FAFB", fontWeight: "bold" }}
              />
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorVisitors)"
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  const renderVisitorSegmentation = () => {
    if (data.length === 0) return null;

    const lastDataPoint = data[data.length - 1];
    const segmentationData = [
      { name: "New Visitors", value: lastDataPoint.new },
      { name: "Returning Visitors", value: lastDataPoint.returning },
    ];

    return (
      <div className="w-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Visitor Segmentation
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={segmentationData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {segmentationData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                borderColor: "#374151",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                color: "#F9FAFB",
              }}
              itemStyle={{ color: "#F9FAFB" }}
              labelStyle={{ color: "#F9FAFB", fontWeight: "bold" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="container px-4 2xl:px-20 mx-auto my-20">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4 md:mb-0">
            <FiUsers className="mr-2 text-blue-500" />
            Visitor Analytics
          </h2>
          <div className="flex flex-wrap gap-2">
            {timeframes.map((tf) => (
              <motion.button
                key={tf.id}
                className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  timeframe === tf.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setTimeframe(tf.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tf.icon}
                {tf.label}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium">
              Total Visitors
            </h3>
            <div className="text-2xl font-bold text-gray-800 my-2">
              {totalVisitors.toLocaleString()}
            </div>
            <div
              className={`flex items-center text-sm ${
                percentageChange >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {percentageChange >= 0 ? (
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 01-1 1H9v1h2a1 1 0 110 2H9v1h2a1 1 0 110 2H9v1a1 1 0 11-2 0v-1H5a1 1 0 110-2h2v-1H5a1 1 0 110-2h2V8H5a1 1 0 010-2h2V5a1 1 0 112 0v1h2a1 1 0 011 1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 13a1 1 0 100 2H5a1 1 0 100-2h7z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {Math.abs(percentageChange)}% vs previous period
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium">
              Avg. Session Duration
            </h3>
            <div className="text-2xl font-bold text-gray-800 my-2">
              {timeframe === "hour"
                ? "4:32"
                : timeframe === "day"
                ? "5:18"
                : timeframe === "week"
                ? "6:05"
                : timeframe === "month"
                ? "5:45"
                : timeframe === "quarter"
                ? "6:22"
                : "7:14"}
            </div>
            <div className="flex items-center text-sm text-green-600">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12 7a1 1 0 01-1 1H9v1h2a1 1 0 110 2H9v1h2a1 1 0 110 2H9v1a1 1 0 11-2 0v-1H5a1 1 0 110-2h2v-1H5a1 1 0 110-2h2V8H5a1 1 0 010-2h2V5a1 1 0 112 0v1h2a1 1 0 011 1z"
                  clipRule="evenodd"
                />
              </svg>
              12.5% vs previous period
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium">Bounce Rate</h3>
            <div className="text-2xl font-bold text-gray-800 my-2">
              {timeframe === "hour"
                ? "32%"
                : timeframe === "day"
                ? "28%"
                : timeframe === "week"
                ? "25%"
                : timeframe === "month"
                ? "27%"
                : timeframe === "quarter"
                ? "24%"
                : "22%"}
            </div>
            <div className="flex items-center text-sm text-red-600">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12 13a1 1 0 100 2H5a1 1 0 100-2h7z"
                  clipRule="evenodd"
                />
              </svg>
              3.2% vs previous period
            </div>
          </div>
        </div>

        <div className="flex border-b border-gray-200 mb-4">
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "overview"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "segmentation"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("segmentation")}
          >
            Segmentation
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "sources"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("sources")}
          >
            Traffic Sources
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          {activeTab === "overview" && renderChart()}
          {activeTab === "segmentation" && renderVisitorSegmentation()}
          {activeTab === "sources" && (
            <div className="w-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Traffic Sources
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2/5 text-sm text-gray-600">Direct</div>
                  <div className="w-3/5 flex items-center">
                    <div
                      className="h-4 bg-blue-500 rounded"
                      style={{ width: "65%" }}
                    ></div>
                    <span className="ml-2 text-sm text-gray-700">45%</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-2/5 text-sm text-gray-600">
                    Organic Search
                  </div>
                  <div className="w-3/5 flex items-center">
                    <div
                      className="h-4 bg-green-500 rounded"
                      style={{ width: "55%" }}
                    ></div>
                    <span className="ml-2 text-sm text-gray-700">35%</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-2/5 text-sm text-gray-600">Social</div>
                  <div className="w-3/5 flex items-center">
                    <div
                      className="h-4 bg-yellow-500 rounded"
                      style={{ width: "40%" }}
                    ></div>
                    <span className="ml-2 text-sm text-gray-700">20%</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-2/5 text-sm text-gray-600">Referral</div>
                  <div className="w-3/5 flex items-center">
                    <div
                      className="h-4 bg-red-500 rounded"
                      style={{ width: "30%" }}
                    ></div>
                    <span className="ml-2 text-sm text-gray-700">15%</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-2/5 text-sm text-gray-600">Email</div>
                  <div className="w-3/5 flex items-center">
                    <div
                      className="h-4 bg-purple-500 rounded"
                      style={{ width: "20%" }}
                    ></div>
                    <span className="ml-2 text-sm text-gray-700">10%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-500">
          <button
            className={`flex items-center px-3 py-1.5 rounded-lg mb-2 sm:mb-0 ${
              isLoading ? "bg-gray-100" : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={fetchData}
            disabled={isLoading}
          >
            <FiRefreshCw
              className={`mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            {isLoading ? "Refreshing..." : "Refresh Data"}
          </button>
          <div>Last updated: {format(new Date(), "MMM dd, yyyy HH:mm")}</div>
        </div>
      </div>
    </div>
  );
};

export default VisitorAnalyticsDashboard;
