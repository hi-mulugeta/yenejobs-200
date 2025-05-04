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
  FiArrowUp,
  FiArrowDown,
  FiGlobe,
  FiSearch,
  FiShare2,
  FiMail,
} from "react-icons/fi";
import { motion } from "framer-motion";

const COLORS = [
  "#3B82F6", // Blue
  "#10B981", // Emerald
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#8B5CF6", // Violet
  "#EC4899", // Pink
];

const timeframes = [
  { id: "hour", label: "24h", icon: <FiClock size={16} /> },
  { id: "day", label: "7d", icon: <FiCalendar size={16} /> },
  { id: "week", label: "4w", icon: <FiTrendingUp size={16} /> },
  { id: "month", label: "12m", icon: <FiCalendar size={16} /> },
  { id: "quarter", label: "Q", icon: <FiTrendingUp size={16} /> },
  { id: "year", label: "5y", icon: <FiCalendar size={16} /> },
];

const chartTypes = {
  hour: "line",
  day: "bar",
  week: "area",
  month: "bar",
  quarter: "line",
  year: "line",
};

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

  useEffect(() => {
    const visitorData = getStoredVisitors();
    const now = new Date();
    const visitorId = Math.random().toString(36).substring(2, 15);

    const isReturning = visitorData.sessions[visitorId] !== undefined;

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

    const baseNew = visitorData.newCount || 50;
    const baseReturning = visitorData.returningCount || 30;

    switch (timeframe) {
      case "hour":
        count = 24;
        for (let i = count - 1; i >= 0; i--) {
          const date = subHours(now, i);
          const hour = date.getHours();
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
        count = 7;
        for (let i = count - 1; i >= 0; i--) {
          const date = subDays(now, i);
          const day = date.getDay();
          const dayFactor = day >= 1 && day <= 5 ? 1.2 : 0.7;
          const newVisitors =
            Math.floor(baseNew * dayFactor * Math.random() * 0.8) + 10;
          const returningVisitors =
            Math.floor(baseReturning * dayFactor * Math.random() * 0.8) + 8;

          data.push({
            name: format(date, "EEE"),
            visitors: newVisitors + returningVisitors,
            returning: returningVisitors,
            new: newVisitors,
          });
        }
        break;
      case "week":
        count = 4;
        for (let i = count - 1; i >= 0; i--) {
          const date = subWeeks(now, i);
          const growthFactor = 1 + i * 0.03;
          const newVisitors =
            Math.floor(baseNew * growthFactor * Math.random() * 2) + 30;
          const returningVisitors =
            Math.floor(baseReturning * growthFactor * Math.random() * 2) + 25;

          data.push({
            name: `Week ${i + 1}`,
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
          const month = date.getMonth();
          const seasonFactor = month >= 3 && month <= 9 ? 1.1 : 0.9;
          const newVisitors = Math.floor(baseNew * seasonFactor * i * 3) + 100;
          const returningVisitors =
            Math.floor(baseReturning * seasonFactor * i * 3) + 80;

          data.push({
            name: format(date, "MMM"),
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
          const quarterGrowth = 1 + i * 0.1;
          const newVisitors = Math.floor(baseNew * quarterGrowth * 10) + 200;
          const returningVisitors =
            Math.floor(baseReturning * quarterGrowth * 10) + 180;

          data.push({
            name: `Q${Math.floor((date.getMonth() + 3) / 3)}`,
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
        <div className="flex flex-col items-center justify-center h-64">
          <FiRefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="mt-4 text-gray-500">Loading data...</p>
        </div>
      );
    }

    const chartType = chartTypes[timeframe];
    const isPositiveChange = parseFloat(percentageChange) >= 0;

    switch (chartType) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={data}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E5E7EB"
                opacity={0.3}
              />
              <XAxis
                dataKey="name"
                stroke="#6B7280"
                tickMargin={10}
                tick={{ fontSize: 12 }}
              />
              <YAxis stroke="#6B7280" tickMargin={10} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                itemStyle={{ color: "#F9FAFB" }}
                labelStyle={{
                  color: "#F9FAFB",
                  fontWeight: "bold",
                  fontSize: 12,
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: 20 }}
                iconSize={12}
                iconType="circle"
              />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="returning"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="new"
                stroke="#F59E0B"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={data}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E5E7EB"
                opacity={0.3}
              />
              <XAxis
                dataKey="name"
                stroke="#6B7280"
                tickMargin={10}
                tick={{ fontSize: 12 }}
              />
              <YAxis stroke="#6B7280" tickMargin={10} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                itemStyle={{ color: "#F9FAFB" }}
                labelStyle={{
                  color: "#F9FAFB",
                  fontWeight: "bold",
                  fontSize: 12,
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: 20 }}
                iconSize={12}
                iconType="circle"
              />
              <Bar
                dataKey="visitors"
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
                barSize={24}
              />
              <Bar
                dataKey="returning"
                fill="#10B981"
                radius={[4, 4, 0, 0]}
                barSize={24}
              />
              <Bar
                dataKey="new"
                fill="#F59E0B"
                radius={[4, 4, 0, 0]}
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      case "area":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart
              data={data}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
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
              <XAxis
                dataKey="name"
                stroke="#6B7280"
                tickMargin={10}
                tick={{ fontSize: 12 }}
              />
              <YAxis stroke="#6B7280" tickMargin={10} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                itemStyle={{ color: "#F9FAFB" }}
                labelStyle={{
                  color: "#F9FAFB",
                  fontWeight: "bold",
                  fontSize: 12,
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: 20 }}
                iconSize={12}
                iconType="circle"
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
      { name: "New", value: lastDataPoint.new },
      { name: "Returning", value: lastDataPoint.returning },
    ];

    return (
      <div className="w-full">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={segmentationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${(percent * 100).toFixed(0)}%`
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
                    border: "none",
                    borderRadius: "0.5rem",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  formatter={(value) => [value, `${value} visitors`]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2 pl-0 md:pl-8">
            <div className="space-y-4">
              {segmentationData.map((segment, index) => (
                <div key={segment.name} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-gray-700 font-medium">
                        {segment.name}
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {segment.value}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                          width: `${
                            (segment.value / lastDataPoint.visitors) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTrafficSources = () => {
    const sources = [
      {
        name: "Direct",
        icon: <FiGlobe className="text-blue-500" />,
        value: 45,
        color: "#3B82F6",
      },
      {
        name: "Search",
        icon: <FiSearch className="text-green-500" />,
        value: 35,
        color: "#10B981",
      },
      {
        name: "Social",
        icon: <FiShare2 className="text-yellow-500" />,
        value: 20,
        color: "#F59E0B",
      },
      {
        name: "Referral",
        icon: <FiUsers className="text-red-500" />,
        value: 15,
        color: "#EF4444",
      },
      {
        name: "Email",
        icon: <FiMail className="text-purple-500" />,
        value: 10,
        color: "#8B5CF6",
      },
    ];

    return (
      <div className="w-full">
        <div className="space-y-4">
          {sources.map((source) => (
            <div key={source.name} className="flex items-center">
              <div className="flex items-center w-24">
                {source.icon}
                <span className="ml-2 text-gray-700 text-sm">
                  {source.name}
                </span>
              </div>
              <div className="flex-1 flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full"
                    style={{
                      backgroundColor: source.color,
                      width: `${source.value}%`,
                    }}
                  ></div>
                </div>
                <span className="ml-3 text-gray-900 font-medium text-sm w-10 text-right">
                  {source.value}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const MetricCard = ({ title, value, change, icon, isPositive }) => (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className="bg-gray-100 p-2 rounded-lg">{icon}</div>
      </div>
      <div
        className={`flex items-center mt-3 text-sm ${
          isPositive ? "text-green-600" : "text-red-600"
        }`}
      >
        {isPositive ? (
          <FiArrowUp className="mr-1" />
        ) : (
          <FiArrowDown className="mr-1" />
        )}
        {change}
      </div>
    </div>
  );

  return (
    <div className="container px-4 mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Visitor Analytics
          </h1>
          <p className="text-gray-500 mt-1">
            Track and analyze your website traffic
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          {timeframes.map((tf) => (
            <motion.button
              key={tf.id}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeframe === tf.id
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
              onClick={() => setTimeframe(tf.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tf.icon}
              <span className="ml-1">{tf.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Total Visitors"
          value={totalVisitors.toLocaleString()}
          change={`${Math.abs(percentageChange)}% vs previous`}
          icon={<FiUsers className="text-blue-500" size={20} />}
          isPositive={percentageChange >= 0}
        />
        <MetricCard
          title="Avg. Duration"
          value={
            timeframe === "hour"
              ? "4:32"
              : timeframe === "day"
              ? "5:18"
              : timeframe === "week"
              ? "6:05"
              : timeframe === "month"
              ? "5:45"
              : timeframe === "quarter"
              ? "6:22"
              : "7:14"
          }
          change="12.5% vs previous"
          icon={<FiClock className="text-green-500" size={20} />}
          isPositive={true}
        />
        <MetricCard
          title="Bounce Rate"
          value={
            timeframe === "hour"
              ? "32%"
              : timeframe === "day"
              ? "28%"
              : timeframe === "week"
              ? "25%"
              : timeframe === "month"
              ? "27%"
              : timeframe === "quarter"
              ? "24%"
              : "22%"
          }
          change="3.2% vs previous"
          icon={<FiTrendingUp className="text-red-500" size={20} />}
          isPositive={false}
        />
        <MetricCard
          title="Pages/Visit"
          value={
            timeframe === "hour"
              ? "3.2"
              : timeframe === "day"
              ? "3.8"
              : timeframe === "week"
              ? "4.1"
              : timeframe === "month"
              ? "3.9"
              : timeframe === "quarter"
              ? "4.3"
              : "4.7"
          }
          change="8.1% vs previous"
          icon={<FiCalendar className="text-purple-500" size={20} />}
          isPositive={true}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
        <div className="flex flex-wrap items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Traffic Overview
          </h2>
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                activeTab === "overview"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                activeTab === "segmentation"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
              onClick={() => setActiveTab("segmentation")}
            >
              Segmentation
            </button>
            <button
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                activeTab === "sources"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
              onClick={() => setActiveTab("sources")}
            >
              Sources
            </button>
          </div>
        </div>

        <div className="min-h-[350px]">
          {activeTab === "overview" && renderChart()}
          {activeTab === "segmentation" && renderVisitorSegmentation()}
          {activeTab === "sources" && renderTrafficSources()}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
        <button
          className={`flex items-center px-3 py-1.5 rounded-lg mb-2 sm:mb-0 ${
            isLoading
              ? "bg-gray-100"
              : "bg-white hover:bg-gray-100 border border-gray-200"
          }`}
          onClick={fetchData}
          disabled={isLoading}
        >
          <FiRefreshCw className={`mr-2 ${isLoading ? "animate-spin" : ""}`} />
          {isLoading ? "Refreshing..." : "Refresh Data"}
        </button>
        <div className="text-sm text-gray-500">
          Last updated: {format(new Date(), "MMM dd, yyyy HH:mm")}
        </div>
      </div>
    </div>
  );
};

export default VisitorAnalyticsDashboard;
