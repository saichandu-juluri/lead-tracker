"use client";

import Image from "next/image";
import { useState } from "react";

export default function ApolloCreditsCalculator() {
  const [credits, setCredits] = useState(10000);
  const [peoplePerCompany, setPeoplePerCompany] = useState(5);
  
  // Replaced single leads input with separate inputs for each lead type
  const [desiredLinkedInLeads, setDesiredLinkedInLeads] = useState(500);
  const [desiredWebsiteLeads, setDesiredWebsiteLeads] = useState(300);
  const [desiredCompanyLeads, setDesiredCompanyLeads] = useState(200);
  const [peoplePerOrgForCredits, setPeoplePerOrgForCredits] = useState(5);

  // Original calculations
  const leadsFromLinkedIn = credits / 6;
  const leadsFromWebsite = credits / (1 + 6 * peoplePerCompany);
  const leadsFromCompanyName = credits / (1 + 1 + 6 * peoplePerCompany);
  
  // Updated separate calculations for each lead type
  const creditsForLinkedIn = desiredLinkedInLeads * 6;
  const creditsForWebsite = desiredWebsiteLeads * (1 + 6 * peoplePerOrgForCredits);
  const creditsForCompanyName = desiredCompanyLeads * (2 + 6 * peoplePerOrgForCredits);
  
  // New total credits calculation
  const totalCreditsRequired = creditsForLinkedIn + creditsForWebsite + creditsForCompanyName;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-blue-50 to-indigo-100">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-800">Apollo Credits Calculator</h1>
        
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium text-gray-700">Total Credits Available:</label>
              <input
                type="number"
                value={credits}
                onChange={(e) => setCredits(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">Average People per Company:</label>
              <input
                type="number"
                value={peoplePerCompany}
                onChange={(e) => setPeoplePerCompany(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* LinkedIn Profile Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500 hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">LinkedIn per person Profile Leads</h2>
              <div className="bg-blue-100 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <div className="text-4xl font-bold text-blue-600 mb-3">{leadsFromLinkedIn.toLocaleString()}</div>
            <p className="text-gray-600">Potential leads you can enrich from LinkedIn profiles.</p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                <span className="font-medium">Cost per lead:</span> 6 credits
              </p>
              <p className="text-sm text-gray-500 mt-1">
                <span className="font-medium">Calculation:</span> {credits.toLocaleString()} ÷ 6 = {leadsFromLinkedIn.toLocaleString()}
              </p>
            </div>
          </div>
          
          {/* Website Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-500 hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Website Leads</h2>
              <div className="bg-green-100 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
            </div>
            <div className="text-4xl font-bold text-green-600 mb-3">{leadsFromWebsite.toLocaleString()}</div>
            <p className="text-gray-600">Companies you can research using their website URL.</p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                <span className="font-medium">Cost per company:</span> 1C for people info using org website + (6C for Phone and email× {peoplePerCompany}) = {1 + 6 * peoplePerCompany} credits
              </p>
              <p className="text-sm text-gray-500 mt-1">
                <span className="font-medium">Calculation:</span> {credits.toLocaleString()} ÷ {1 + 6 * peoplePerCompany} = {leadsFromWebsite.toLocaleString()}
              </p>
            </div>
          </div>
          
          {/* Company Name Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-purple-500 hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Company Name Leads</h2>
              <div className="bg-purple-100 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <div className="text-4xl font-bold text-purple-600 mb-3">{leadsFromCompanyName.toLocaleString()}</div>
            <p className="text-gray-600">Companies you can research using just their name.</p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                <span className="font-medium">Cost per company:</span> 2C for People info using org name + 6C for Email and Phone× {peoplePerCompany}) = {2 + 6 * peoplePerCompany} credits
              </p>
              <p className="text-sm text-gray-500 mt-1">
                <span className="font-medium">Calculation:</span> {credits.toLocaleString()} ÷ {2 + 6 * peoplePerCompany} = {leadsFromCompanyName.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        
        {/* Revised credit calculation section */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4 text-indigo-800">Calculate Credits Required</h2>
          <p className="text-gray-600 mb-4">Determine how many credits you will need for your desired mix of lead types.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
  <div>
    <label className="block mb-2 font-medium text-gray-700">Leads using Linkedin URL:</label>
    <input
      type="number"
      value={desiredLinkedInLeads}
      onChange={(e) => setDesiredLinkedInLeads(Number(e.target.value))}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
    />
  </div>

  {/* Grouped block for the last three fields */}
  <div className="md:col-span-3 p-4 border border-gray-300 rounded-lg bg-gray-100">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block mb-2 font-medium text-gray-700">Leads by company website URL:</label>
        <input
          type="number"
          value={desiredWebsiteLeads}
          onChange={(e) => setDesiredWebsiteLeads(Number(e.target.value))}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
      </div>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Leads by company name:</label>
        <input
          type="number"
          value={desiredCompanyLeads}
          onChange={(e) => setDesiredCompanyLeads(Number(e.target.value))}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
      </div>
    </div>

    <div className="mt-4">
      <label className="block mb-2 font-medium text-gray-700">Leads per company:</label>
      <input
        type="number"
        value={peoplePerOrgForCredits}
        onChange={(e) => setPeoplePerOrgForCredits(Number(e.target.value))}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
      />
    </div>
  </div>
</div>

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* LinkedIn Credits Card */}
            <div className="bg-white p-5 rounded-lg border border-blue-200 hover:border-blue-300 transition duration-300">
              <h3 className="text-lg font-bold text-blue-600 mb-2">LinkedIn Profile</h3>
              <div className="text-3xl font-bold text-gray-800 mb-2">{creditsForLinkedIn.toLocaleString()}</div>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Calculation:</span> {desiredLinkedInLeads.toLocaleString()} × 6 = {creditsForLinkedIn.toLocaleString()}
              </p>
            </div>
            
            {/* Website Credits Card */}
            <div className="bg-white p-5 rounded-lg border border-green-200 hover:border-green-300 transition duration-300">
              <h3 className="text-lg font-bold text-green-600 mb-2">Website Lookup</h3>
              <div className="text-3xl font-bold text-gray-800 mb-2">{creditsForWebsite.toLocaleString()}</div>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Calculation:</span> {desiredWebsiteLeads.toLocaleString()} × {(1 + 6 * peoplePerOrgForCredits)} = {creditsForWebsite.toLocaleString()}
              </p>
            </div>
            
            {/* Company Name Credits Card */}
            <div className="bg-white p-5 rounded-lg border border-purple-200 hover:border-purple-300 transition duration-300">
              <h3 className="text-lg font-bold text-purple-600 mb-2">Company Name</h3>
              <div className="text-3xl font-bold text-gray-800 mb-2">{creditsForCompanyName.toLocaleString()}</div>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Calculation:</span> {desiredCompanyLeads.toLocaleString()} × {(2 + 6 * peoplePerOrgForCredits)} = {creditsForCompanyName.toLocaleString()}
              </p>
            </div>
          </div>
          
          {/* Total Credits Card */}
          <div className="bg-white p-5 rounded-lg border-2 border-indigo-200 hover:border-indigo-300 transition duration-300">
            <h3 className="text-lg font-bold text-indigo-700 mb-2">Total Credits Required</h3>
            <div className="text-4xl font-bold text-indigo-800 mb-2">{totalCreditsRequired.toLocaleString()}</div>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Sum of all credit requirements:</span> {creditsForLinkedIn.toLocaleString()} + {creditsForWebsite.toLocaleString()} + {creditsForCompanyName.toLocaleString()} = {totalCreditsRequired.toLocaleString()}
            </p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Apollo Credit Usage Reference</h3>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <p className="text-gray-600 mb-2">
                <span className="font-medium">LinkedIn Profile:</span> 6 credits per person
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Website Lookup:</span> 1 base credit + 6 credits per person
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Company Name Lookup:</span> 2 base credits + 6 credits per person
              </p>
              <a 
                href="https://docs.apollo.io/reference/people-enrichment" 
                target="_blank" 
                className="inline-block mt-4 text-indigo-600 hover:text-indigo-800 font-medium transition"
              >
                View Apollo API Documentation →
              </a>
            </div>
            <div className="flex-1">
              <Image 
                src="/apollo_credits.png"
                width={400}
                height={300}
                alt="Apollo credits reference chart"
                className="rounded-lg shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
