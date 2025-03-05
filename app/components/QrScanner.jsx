"use client";
import React, { useState, useRef, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import DbViewer from "./DbViewer";
import { FaDatabase, FaUser } from "react-icons/fa";


const QrScanner = () => {


  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [userData, setUserData] = useState(null); // Store Apollo API response
  const [showForm, setShowForm] = useState(false); // Show form if no email is returned
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    note: "",
  });
  const [showDatabaseViewer, setShowDatabaseViewer] = useState(false); // State for toggling DatabaseViewer
  const scannerRef = useRef(null);

  const openDatabaseViewer = () => {
    console.log("Opening Database Viewer");
    setShowDatabaseViewer(true);
  };

  const closeDatabaseViewer = () => {
    console.log("Closing Database Viewer");
    setShowDatabaseViewer(false);
  };

  const sampledata = {
    person: {
      id: "5ffe89d06d20bc0001878165",
      // email: null,
      "email": "juluri.saichandu99@gmail.com",

      first_name: "Saichandu",
      last_name: "Juluri",
      name: "Saichandu Juluri",
      linkedin_url: "http://www.linkedin.com/in/julurisaichandu",
      title: "AI Scientist",
      email_status: "unavailable",
      photo_url:
        "https://media.licdn.com/dms/image/v2/D4E35AQFIf_iakX-zuw/profile-framedphoto-shrink_200_200/profile-framedphoto-shrink_200_200/0/1731271551572?e=1740661200&v=beta&t=JrwO0Y1L8Yu5_EA8Am30xRtJlV8p-2DWNTEZ1EKeR5w",
      twitter_url: null,
      github_url: null,
      facebook_url: null,
      extrapolated_email_confidence: null,
      headline:
        "AI Scientist | MS in Artificial Intelligence| Responsible AI, RAGs, LLMs, NLP, Python, Pytorch, ML, OpenAI, Nextjs, Flask| Ex. Research Engineer @Hyundai Mobis🚗",
      organization_id: "5ec2bddb7a9bee00fb63ec23",
      employment_history: [
        {
          _id: "67b72794cdb8d10001b0bdcf",
          created_at: null,
          current: true,
          degree: null,
          description: null,
          emails: null,
          end_date: null,
          grade_level: null,
          kind: null,
          major: null,
          organization_id: "5ec2bddb7a9bee00fb63ec23",
          organization_name: "Gravitate AI",
          raw_address: null,
          start_date: "2025-01-01",
          title: "AI Scientist",
          updated_at: null,
          id: "67b72794cdb8d10001b0bdcf",
          key: "67b72794cdb8d10001b0bdcf",
        },
        {
          _id: "67b72794cdb8d10001b0bdd0",
          created_at: null,
          current: false,
          degree: null,
          description: null,
          emails: null,
          end_date: "2025-01-01",
          grade_level: null,
          kind: null,
          major: null,
          organization_id: "54a1b0f07468695860ffa908",
          organization_name: "Northeastern University",
          raw_address: null,
          start_date: "2024-07-01",
          title: "Graduate Teaching Assistant",
          updated_at: null,
          id: "67b72794cdb8d10001b0bdd0",
          key: "67b72794cdb8d10001b0bdd0",
        },
        {
          _id: "67b72794cdb8d10001b0bdd1",
          created_at: null,
          current: false,
          degree: null,
          description: null,
          emails: null,
          end_date: "2023-08-01",
          grade_level: null,
          kind: null,
          major: null,
          organization_id: "5fdb5305c07c8e0112e1dbfc",
          organization_name: "Hyundai Mobis",
          raw_address: null,
          start_date: "2021-08-01",
          title: "Research Engineer",
          updated_at: null,
          id: "67b72794cdb8d10001b0bdd1",
          key: "67b72794cdb8d10001b0bdd1",
        },
        {
          _id: "67b72794cdb8d10001b0bdd2",
          created_at: null,
          current: false,
          degree: null,
          description: null,
          emails: null,
          end_date: "2023-08-01",
          grade_level: null,
          kind: null,
          major: null,
          organization_id: "57c4da0ea6da986a1b274a2d",
          organization_name:
            "Mobis Technical Center of India(Hyundai Mobis R &D)",
          raw_address: null,
          start_date: "2022-08-01",
          title: "Research Engineer",
          updated_at: null,
          id: "67b72794cdb8d10001b0bdd2",
          key: "67b72794cdb8d10001b0bdd2",
        },
        {
          _id: "67b72794cdb8d10001b0bdd3",
          created_at: null,
          current: false,
          degree: null,
          description: null,
          emails: null,
          end_date: "2018-12-01",
          grade_level: null,
          kind: null,
          major: null,
          organization_id: "654465f3cf5b3800015529e9",
          organization_name: "Centre for Development of Advanced Computing",
          raw_address: null,
          start_date: "2018-12-01",
          title: "CDAC Internship",
          updated_at: null,
          id: "67b72794cdb8d10001b0bdd3",
          key: "67b72794cdb8d10001b0bdd3",
        },
        {
          _id: "67b72794cdb8d10001b0bdd4",
          created_at: null,
          current: false,
          degree: null,
          description: null,
          emails: null,
          end_date: "2021-08-01",
          grade_level: null,
          kind: null,
          major: null,
          organization_id: "54a1229f69702d8aa1561f03",
          organization_name: "Freelancer.com",
          raw_address: null,
          start_date: "2017-08-01",
          title: "Freelance Wordpress Web Designer",
          updated_at: null,
          id: "67b72794cdb8d10001b0bdd4",
          key: "67b72794cdb8d10001b0bdd4",
        },
      ],
      state: null,
      city: null,
      country: "United States",
      organization: {
        id: "5ec2bddb7a9bee00fb63ec23",
        name: "Gravitate AI",
        website_url: "http://www.gravitate.ai",
        linkedin_url: "http://www.linkedin.com/company/gravitate-ai",
        primary_phone: {
          number: "+1 401-216-9828",
          source: "Scraped",
          sanitized_number: "+14012169828",
        },
        alexa_ranking: 616878,
        phone: "+1 401-216-9828",
        linkedin_uid: "64522380",
        logo_url:
          "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/67adf3b920fb6a0001f19741/picture",
        primary_domain: "gravitate.ai",
        sanitized_phone: "+14012169828",
        industry: "information technology & services",
        keywords: [
          "ai",
          "machine learning",
          "data engineering",
          "software development",
          "nlp",
          "llm",
          "custom alogrithms",
          "data assets",
          "predictive modeling",
          "artificial intelligence",
          "information technology & services",
          "natural language processing",
        ],
        estimated_num_employees: 9,
        industries: ["information technology & services"],
        secondary_industries: [],
        snippets_loaded: true,
        industry_tag_id: "5567cd4773696439b10b0000",
        industry_tag_hash: {
          "information technology & services": "5567cd4773696439b10b0000",
        },
        retail_location_count: 0,
        raw_address: "83 morse street, boston, massachusetts, united states",
        street_address: "83 Morse St",
        city: "Norwood",
        state: "Massachusetts",
        postal_code: "02062-4327",
        country: "United States",
        owned_by_organization_id: null,
        seo_description: "",
        short_description:
          "In a world with abundant AI tools, Gartner predicts 85% of AI projects will fail.  Inflated expectations, skill gaps, ineffective processes, and cross-team miscommunication are some of the most common problems among early AI development. \n\nGravitate uniquely blends AI architecture strategy and industry expertise with agile data science methodology and best practices, to develop and deliver cost-efficient bespoke AI & data solutions. We create custom algorithms, AI powered features and data assets to quickly and cost-efficiently develop AI-driven products for differentiation & scale. \n\nAccelerate your business growth with on-demand AI/ML & data engineering expertise.",
        suborganizations: [],
        num_suborganizations: 0,
        total_funding: null,
        total_funding_printed: null,
        latest_funding_round_date: null,
        latest_funding_stage: null,
        funding_events: [],
        technology_names: [
          "AI",
          "Adobe Media Optimizer",
          "Android",
          "Basis",
          "Cedexis Radar",
          "Circle",
          "DoubleClick",
          "DoubleClick Conversion",
          "Flutter",
          "Gmail",
          "Google Apps",
          "Google Cloud Hosting",
          "Google Dynamic Remarketing",
          "Google Tag Manager",
          "Hubspot",
          "Linkedin Marketing Solutions",
          "Mobile Friendly",
          "Python",
          "Remote",
          "SharePoint",
          "Varnish",
          "Vimeo",
          "Wix",
          "YouTube",
        ],
        current_technologies: [
          {
            uid: "ai",
            name: "AI",
            category: "Other",
          },
          {
            uid: "adobe_media_optimizer",
            name: "Adobe Media Optimizer",
            category: "Search Marketing",
          },
          {
            uid: "android",
            name: "Android",
            category: "Frameworks and Programming Languages",
          },
          {
            uid: "basis",
            name: "Basis",
            category: "Advertising Networks",
          },
          {
            uid: "cedexis_radar",
            name: "Cedexis Radar",
            category: "Web Performance Monitoring",
          },
          {
            uid: "circle",
            name: "Circle",
            category: "Financial Software",
          },
          {
            uid: "doubleclick",
            name: "DoubleClick",
            category: "Ad Servers",
          },
          {
            uid: "doubleclick_conversion",
            name: "DoubleClick Conversion",
            category: "Advertising Networks",
          },
          {
            uid: "flutter",
            name: "Flutter",
            category: "Frameworks and Programming Languages",
          },
          {
            uid: "gmail",
            name: "Gmail",
            category: "Email Providers",
          },
          {
            uid: "google_apps",
            name: "Google Apps",
            category: "Other",
          },
          {
            uid: "google_cloud_hosting",
            name: "Google Cloud Hosting",
            category: "Hosting",
          },
          {
            uid: "google_dynamic_remarketing",
            name: "Google Dynamic Remarketing",
            category: "Retargeting",
          },
          {
            uid: "google_tag_manager",
            name: "Google Tag Manager",
            category: "Tag Management",
          },
          {
            uid: "hubspot",
            name: "Hubspot",
            category: "Marketing Automation",
          },
          {
            uid: "linkedin_display_ads__formerly_bizo",
            name: "Linkedin Marketing Solutions",
            category: "Advertising Networks",
          },
          {
            uid: "mobile_friendly",
            name: "Mobile Friendly",
            category: "Other",
          },
          {
            uid: "python",
            name: "Python",
            category: "Frameworks and Programming Languages",
          },
          {
            uid: "remote",
            name: "Remote",
            category: "Other",
          },
          {
            uid: "sharepoint",
            name: "SharePoint",
            category: "CMS",
          },
          {
            uid: "varnish",
            name: "Varnish",
            category: "Load Balancers",
          },
          {
            uid: "vimeo",
            name: "Vimeo",
            category: "Online Video Platforms",
          },
          {
            uid: "wix",
            name: "Wix",
            category: "CMS",
          },
          {
            uid: "youtube",
            name: "YouTube",
            category: "Online Video Platforms",
          },
        ],
        org_chart_root_people_ids: [],
        org_chart_sector: "OrgChart::SectorHierarchy::Rules::IT",
        org_chart_removed: null,
        org_chart_show_department_filter: null,
      },
      intent_strength: null,
      show_intent: false,
      email_domain_catchall: false,
      revealed_for_current_team: true,
      departments: ["master_engineering_technical"],
      subdepartments: [
        "artificial_intelligence_machine_learning",
        "research_development",
      ],
      functions: [],
      seniority: "entry",
    },
  };

  useEffect(() => {
    if (isScanning) {
      initializeScanner();
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(console.error);
        scannerRef.current = null;
      }
    };
  }, [isScanning]);


  useEffect(() => {
    (async () => {
      if (scanResult && scanResult.includes("linkedin.com/in/")) {
        try {

          const response = await fetch("/api/apolloapi", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              linkedinUrl: scanResult,
            }),
          });
    
          if (!response.ok) throw new Error("Failed to fetch data");
          const data = await response.json();
          setUserData(data.person);

          // If email exists, show success popup and save to database
          if (data.person.email) {
            const save_conformation = await saveToDatabase({
              name: data.person.name,
              email: data.person.email,
            });
            alert(
              `User with LinkedIn URL got email: ${data.person.email} and saved to database: ${save_conformation.success}`
            );
          }
          else
          { 
            alert(`User with LinkedIn URL have no email in database, enter manually using form`);
            stopScan();}
        } catch (error) {
          console.error("Error fetching Apollo data:", error);
          alert("Failed to retrieve user data. Please try again.");
        }
      }
    })();
  }, [scanResult]);

  const saveToDatabase = async (data) => {
    try {
      const response = await fetch("/api/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to save data");
      return { success: true };
    } catch (error) {
      console.error("Error saving data:", error);
      // alert("Failed to save data. Please try again.");
      return { success: false };
    }
  };

  const startScan = async () => {
    try {
      const devices = await Html5Qrcode.getCameras();
      if (devices && devices.length) {
        setScanResult(null);
        setUserData(null); // Clear previous data
        setIsScanning(true);
      } else {
        alert("No cameras found on this device.");
      }
    } catch (error) {
      console.error("Camera permission denied or error occurred:", error);
      alert("Please allow camera access in your browser settings.");
    }
  };

  const initializeScanner = () => {
    setTimeout(() => {
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode("reader");
        scannerRef.current.start(
          { facingMode: "environment" },
          {
            fps: 15,
            qrbox: { width: 500, height: 500 },
            aspectRatio: 1.7777778,
            experimentalFeatures: { useBarCodeDetectorIfSupported: true },
          },
          (decodedText) => {
            setScanResult(decodedText);
            stopScan();
            // fetchApolloData(); // Automatically call Apollo API after scanning
          },
          (error) => {
            console.warn(error);
          }
        );
      }
    }, 100);
  };

  const stopScan = () => {
    if (scannerRef.current) {
      scannerRef.current.stop().catch(console.error);
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert("Name and email are required!");
      return;
    }

    try {
      const save_confirmation = await saveToDatabase(formData);
      setShowForm(false);
      alert(
        `Form submitted and data saved! to db - "${save_confirmation.success}"`
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 w-full h-full">
                  {showForm &&  (
              <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Please provide details
                </h3>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Organization (optional)
                    </label>
                    <input
                      type="text"
                      id="phone"
                      placeholder="Phone (optional)"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone (optional)
                    </label>
                    <input
                      type="text"
                      id="phone"
                      placeholder="Phone (optional)"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="note"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Note (optional)
                    </label>
                    <textarea
                      id="note"
                      placeholder="Note (optional)"
                      value={formData.note}
                      onChange={(e) =>
                        setFormData({ ...formData, note: e.target.value })
                      }
                      rows={4}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}
      {/* Always visible button */}
      {!showDatabaseViewer && (
        <div className=" flex items-center gap-4 justify-center">
        <button
          onClick={openDatabaseViewer}
          className=" bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
        >
          <FaDatabase className="w-4 h-4" />
          <span>View Database</span>
        </button>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className=" bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
        >
          <FaUser className="w-4 h-4" />
          <span className="ml-2">Store User</span>
        </button>
        </div>
      )}

      {!showDatabaseViewer ? (

          <div className="max-w-4xl mx-auto p-4 w-full min-h-screen grid place-items-center">
            {isScanning ? (
              <div className="flex flex-col items-center w-[90%] h-[90%]">
                <div
                  id="reader"
                  className="w-full max-w-3xl aspect-video border border-blue-500 rounded-lg shadow-lg"
                ></div>
                <button
                  onClick={stopScan}
                  className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-600"
                >
                  Stop Scanner
                </button>
              </div>
            ) : (
              <button
                onClick={startScan}
                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
              >
                Start Scanner
              </button>
            )}
          </div>
        
      ) : (
        <DbViewer closeViewer={closeDatabaseViewer} />
      )}
    </div>
  );
};

export default QrScanner;
