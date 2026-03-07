/*
 * WHAT IS THIS FILE?
 *
 * It's the entry point for Vercel Edge when building for production.
 *
 * Learn more about the Vercel Edge integration here:
 * - https://qwik.dev/docs/deployments/vercel-edge/
 *
 */
import qwikCityPlan from "@qwik-city-plan";
import { createQwikCity } from "@builder.io/qwik-city/middleware/vercel-edge";
import render from "./entry.ssr";

// Removed empty interface declaration as it is redundant.

export default createQwikCity({ render, qwikCityPlan });
