import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { linkedinUrl, emailRequired } = await req.json();

    if (!linkedinUrl || !linkedinUrl.includes("linkedin.com/in/")) {
      return NextResponse.json({ error: "Invalid LinkedIn URL" }, { status: 400 });
    }

    const cleanedURL = linkedinUrl.split("?")[0];
    const encodedLinkedInURL = encodeURIComponent(cleanedURL);
    console.log("emailRequired", emailRequired);
    const url = `https://api.apollo.io/api/v1/people/match?linkedin_url=${encodedLinkedInURL}&reveal_personal_emails=${emailRequired}&reveal_phone_number=false`;

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        "x-api-key": process.env.APOLLO_API_KEY, // API key from .env
      },
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to fetch data from Apollo API");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching Apollo data:", error);
    return NextResponse.json({ error: "Failed to retrieve user data" }, { status: 500 });
  }
}
