// app/api/test/route.ts
import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({
    keyPresent: !!process.env.NEXT_PUBLIC_WEATHER_API_KEY,
    keyValue: process.env.NEXT_PUBLIC_WEATHER_API_KEY ? '****' : null
  });
}