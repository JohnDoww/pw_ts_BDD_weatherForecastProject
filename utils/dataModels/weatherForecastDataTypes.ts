/**
 * This file defines the data types used in the weather forecast application.
 * It imports the common data types and the zod library for schema validation.
 * The data types defined in this file are used to represent the weather forecast data for a city, including the forecast for each day and the suitability of various activities based on the weather conditions.
 */

import { ISODateString } from "./commonDataTypes.js";
import z from "zod";

type Activities =
  | "Skiing"
  | "Surfing"
  | "Outdoor Sightseeing"
  | "Indoor Sightseeing";

interface ActivitySuitability {
  activityName: Activities;
  suitability: "Excellent" | "Good" | "Moderate" | "Poor";
  reasoning: string;
}

interface DayForecast {
  date: ISODateString;
  temperature: string;
  activities: ActivitySuitability[];
}

export type CityBasedWeatherForecast = {
  city: string;
  forecast: DayForecast[];
};

export const cityBasedWeatherForecastSchema = z.object({
  city: z.string(),
  forecast: z.array(
    z.object({
      date: z.string(),
      temperature: z.string(),
      activities: z.array(
        z.object({
          activityName: z.enum([
            "Skiing",
            "Surfing",
            "Outdoor Sightseeing",
            "Indoor Sightseeing",
          ]),
          suitability: z.enum(["Excellent", "Good", "Moderate", "Poor"]),
          reasoning: z.string(),
        }),
      ),
    }),
  ),
});
