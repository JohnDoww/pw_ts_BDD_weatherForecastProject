import { ISODateString } from "./commonDataTypes.js";
import z from "zod";


type Activities =
  | "hiking"
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
  temperature: string;
  humidity: number;
  description: string;
};

export const cityBasedWeatherForecastSchema =  z.object({
      city: z.string(),
      forecast: z.array(
        z.object({
          date: z.string(),
          temperature: z.string(),
          activities: z.array(
            z.object({
              activityName: z.enum([
                "hiking",
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
      temperature: z.string(),
      humidity: z.number(),
      description: z.string(),
    });
