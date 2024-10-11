"use client";

import React, { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, CartesianGrid } from "recharts";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartData = [
    { date: "2024-04-01", total: 5, success: 3 },
    { date: "2024-04-02", total: 3, success: 2 },
    { date: "2024-04-03", total: 7, success: 4 },
    { date: "2024-04-04", total: 6, success: 3 },
    { date: "2024-04-05", total: 7, success: 2 },
    { date: "2024-04-06", total: 4, success: 2 },
    { date: "2024-04-07", total: 3, success: 1 },
    { date: "2024-04-08", total: 7, success: 4 },
    { date: "2024-04-09", total: 4, success: 2 },
    { date: "2024-04-10", total: 6, success: 3 },
    { date: "2024-04-11", total: 5, success: 2 },
    { date: "2024-04-12", total: 4, success: 1 },
    { date: "2024-04-13", total: 6, success: 3 },
    { date: "2024-04-14", total: 3, success: 1 },
    { date: "2024-04-15", total: 5, success: 2 },
    { date: "2024-04-16", total: 4, success: 2 },
    { date: "2024-04-17", total: 7, success: 4 },
    { date: "2024-04-18", total: 6, success: 3 },
    { date: "2024-04-19", total: 4, success: 1 },
    { date: "2024-04-20", total: 2, success: 1 },
    { date: "2024-04-21", total: 3, success: 2 },
    { date: "2024-04-22", total: 5, success: 3 },
    { date: "2024-04-23", total: 4, success: 2 },
    { date: "2024-04-24", total: 6, success: 4 },
    { date: "2024-04-25", total: 5, success: 3 },
    { date: "2024-04-26", total: 2, success: 1 },
    { date: "2024-04-27", total: 7, success: 2 },
    { date: "2024-04-28", total: 3, success: 2 },
    { date: "2024-04-29", total: 6, success: 3 },
    { date: "2024-04-30", total: 7, success: 4 },
    { date: "2024-05-01", total: 5, success: 3 },
    { date: "2024-05-02", total: 6, success: 4 },
    { date: "2024-05-03", total: 5, success: 3 },
    { date: "2024-05-04", total: 6, success: 4 },
    { date: "2024-05-05", total: 7, success: 2 },
    { date: "2024-05-06", total: 7, success: 4 },
    { date: "2024-05-07", total: 6, success: 4 },
    { date: "2024-05-08", total: 4, success: 2 },
    { date: "2024-05-09", total: 5, success: 3 },
    { date: "2024-05-10", total: 6, success: 4 },
    { date: "2024-05-11", total: 7, success: 2 },
    { date: "2024-05-12", total: 3, success: 2 },
    { date: "2024-05-13", total: 4, success: 2 },
    { date: "2024-05-14", total: 7, success: 2 },
    { date: "2024-05-15", total: 7, success: 4 },
    { date: "2024-05-16", total: 6, success: 4 },
    { date: "2024-05-17", total: 7, success: 2 },
    { date: "2024-05-18", total: 5, success: 3 },
    { date: "2024-05-19", total: 3, success: 2 },
    { date: "2024-05-20", total: 2, success: 1 },
    { date: "2024-05-21", total: 2, success: 1 },
    { date: "2024-05-22", total: 3, success: 2 },
    { date: "2024-05-23", total: 5, success: 3 },
    { date: "2024-05-24", total: 6, success: 4 },
    { date: "2024-05-25", total: 4, success: 2 },
    { date: "2024-05-26", total: 5, success: 3 },
    { date: "2024-05-27", total: 7, success: 4 },
    { date: "2024-05-28", total: 4, success: 2 },
    { date: "2024-05-29", total: 2, success: 1 },
    { date: "2024-05-30", total: 6, success: 4 },
    { date: "2024-05-31", total: 4, success: 2 },
    { date: "2024-06-01", total: 4, success: 2 },
    { date: "2024-06-02", total: 7, success: 2 },
    { date: "2024-06-03", total: 3, success: 2 },
    { date: "2024-06-04", total: 7, success: 4 },
    { date: "2024-06-05", total: 3, success: 1 },
    { date: "2024-06-06", total: 6, success: 3 },
    { date: "2024-06-07", total: 7, success: 2 },
    { date: "2024-06-08", total: 7, success: 2 },
    { date: "2024-06-09", total: 7, success: 6 },
    { date: "2024-06-10", total: 5, success: 3 },
    { date: "2024-06-11", total: 3, success: 1 },
    { date: "2024-06-12", total: 7, success: 2 },
    { date: "2024-06-13", total: 3, success: 1 },
    { date: "2024-06-14", total: 7, success: 4 },
    { date: "2024-06-15", total: 5, success: 3 },
    { date: "2024-06-16", total: 6, success: 3 },
    { date: "2024-06-17", total: 7, success: 2 },
    { date: "2024-06-18", total: 4, success: 2 },
    { date: "2024-06-19", total: 6, success: 4 },
    { date: "2024-06-20", total: 7, success: 2 },
    { date: "2024-06-21", total: 4, success: 2 },
    { date: "2024-06-22", total: 5, success: 3 },
    { date: "2024-06-23", total: 7, success: 6 },
    { date: "2024-06-24", total: 3, success: 1 },
    { date: "2024-06-25", total: 4, success: 2 },
    { date: "2024-06-26", total: 7, success: 4 },
    { date: "2024-06-27", total: 7, success: 6 },
    { date: "2024-06-28", total: 4, success: 2 },
    { date: "2024-06-29", total: 3, success: 2 },
    { date: "2024-06-30", total: 7, success: 2 },
];



const chartConfig = {
  views: { label: "Page Views" },
  total: { label: "Всего", color: "hsl(var(--chart-1))" },
  success: { label: "Успешных", color: "hsl(var(--chart-2))" },
};

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('ru-RU').format(num);
};

export function Chart() {
  const [activeChart, setActiveChart] = useState("total");

  const totals = useMemo(() => ({
    total: chartData.reduce((acc, curr) => acc + curr.total, 0),
    success: chartData.reduce((acc, curr) => acc + curr.success, 0),
  }), []);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>График собеседований</CardTitle>
          <CardDescription>
            График собеседований за последние 3 месяца
          </CardDescription>
        </div>
        <div className="flex">
          {["total", "success"].map((key) => {
            const chart = key;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart as keyof typeof chartConfig].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {formatNumber(totals[key as keyof typeof totals])}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              local={"ru-RU"}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("ru-RU", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("ru-RU", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}