"use client";
import { generateLinks } from "./linkGenerator";
("./linkGenerator");
import React, { useState, useEffect } from "react";

export default function Home() {
  const [keywords, setKeywords] = useState("");
  const [locations, setLocations] = useState("");
  const [extractedKeywords, setExtractedKeywords] = useState([]);
  const [extractedLocations, setExtractedLocations] = useState([]);
  const [generatedLinks, setGeneratedLinks] = useState([]);

  useEffect(() => {
    console.log(generatedLinks);
  }, [generatedLinks]);

  const handleKeywordsChange = (e) => {
    setKeywords(e.target.value);
  };

  const handleLocationsChange = (e) => {
    setLocations(e.target.value);
  };

  const handleLinkCopy = (link) => {
    console.log(link);
    navigator.clipboard.writeText(link);
  };

  const handleGenerateLinks = (e) => {
    e.preventDefault();
    setGeneratedLinks(generateLinks(extractedKeywords, extractedLocations));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const keywordArray = extractKeywords(keywords);
    setExtractedKeywords(keywordArray);

    const locationArray = extractLocations(locations);
    setExtractedLocations(locationArray);
  };

  function extractKeywords(text) {
    const keywords = text.split(",").map((keyword) => keyword.trim());
    return keywords;
  }

  function extractLocations(text) {
    //add regex to get the text inside the parentheses
    const regex = /\(([^)]+)\)/g;
    //if there are parentheses, extract the text inside them otherwise there is only one location
    // tthe list can look like this, notice that the state is onlt on the last city for each state:
    // Charlotte, Shelby, Gastonia, Hickory, Statesville, Matthews, Salisbury, Albemarle, Concord, Huntersville, Harrisburg, Kings Mountain (NC)  Rock Hill, Clover, York, Fort Mill (SC)
    // so we need to split on the state abbreviation and then add the state to the end of each city
    // the format needs to be: city, state (abbreviation)
    let currentState = "";
    const locations = text.split(",");
    //iterate through the locations from the end to the beginning and add the state to the end of each city
    for (let i = locations.length - 1; i >= 0; i--) {
      console.log(locations[i]);
      //extract the state from the parenthesesm, save as a string
      const checkForState = locations[i].match(regex);
      console.log(checkForState);
      //remove the parentheses from the state
      const stateExists = checkForState
        ? checkForState[0].replace(/[()]/g, "")
        : null;
      console.log(stateExists);
      //if the state exists, save it as the current state
      if (stateExists) {
        currentState = stateExists;
        //remove the state and the parentheses from the city
        locations[i] = locations[i]
          .replace(stateExists, "")
          .replace(/[()]/g, "");
      }
      //add the state to the end of each city and save it to the array
      locations[i] = `${locations[i].trim()}, ${currentState}`;
    }
    return locations;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Learn more on Github.
        </div>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://jordanclark.tech"
            target="_blank"
            rel="noopener noreferrer"
          >
            By: Jordan Clark
          </a>
        </div>
      </div>

      <form onSubmit={handleFormSubmit}>
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <div className=" group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Keywords{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                :
              </span>
            </h2>
            <br />
            <textarea
              className="text-black rounded-lg p-2"
              id="keywords"
              rows={10}
              value={keywords}
              onChange={handleKeywordsChange}
              placeholder="Enter keywords separated by commas."
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleFormSubmit(e);
                }
              }}
            />
          </div>
          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Extracted Keywords{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                :
              </span>
            </h2>
            <div className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              {extractedKeywords.length > 0 && (
                <div>
                  <ul>
                    {extractedKeywords.map((keyword, index) => (
                      <li key={`${keyword}-${index}`}>{keyword}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className=" group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Locations{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                :
              </span>
            </h2>
            <br />
            <textarea
              className="text-black rounded-lg p-2"
              id="keywords"
              rows={10}
              value={locations}
              onChange={handleLocationsChange}
              placeholder="Enter locations in the format 'City, State (Abbreviation)' separated by commas"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleFormSubmit(e);
                }
              }}
            />
          </div>

          <div className="flex flex-col content-start  group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Extracted Locations{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                :
              </span>
            </h2>
            <div className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              {extractLocations.length > 0 && (
                <div>
                  <ul>
                    {extractedLocations.map((location, index) => (
                      <li key={`${location}-${index}`}>{location}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="z-10 mt-8 w-full max-w-5xl items-center justify-around font-mono text-sm lg:flex">
          <h2
            className={`mb-3 text-2xl font-semibold`}
            onClick={handleFormSubmit}
          >
            <button type="submit">
              Extract Data{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </button>
          </h2>
          <h2 className={`mb-3 text-2xl font-semibold`}>
            <button onClick={handleGenerateLinks}>
              Create Links{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </button>
          </h2>
        </div>
      </form>
      {generatedLinks.length > 0 &&
        generatedLinks.map((linkInfo, index) => (
          <>
            <div
              className="inline-flex items-center justify-center w-full"
              key={`${linkInfo.keyword}-${linkInfo.location}`}
            >
              <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
              <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900 capitalize">
                {linkInfo.keyword} | {linkInfo.location}
              </span>
            </div>

            <div
              key={`${linkInfo.keyword}-${linkInfo.location}-${index}`}
              className="mb-10  lg:mb-0 lg:grid-cols-2 md:grid-cols-1 lg:text-left"
            >
              <div
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                onClick={() => handleLinkCopy(linkInfo.bbb)}
              >
                <h2 className={`mb-3 text-2xl font-semibold`}>BBB</h2>
                <div className={`m-0 text-sm opacity-50`}>{linkInfo.bbb}</div>
              </div>
              <div
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                onClick={() => handleLinkCopy(linkInfo.yelp)}
              >
                <h2 className={`mb-3 text-2xl font-semibold`}>Yelp</h2>
                <div className={`m-0 text-sm opacity-50`}>{linkInfo.yelp}</div>
              </div>
              <div
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                onClick={() => handleLinkCopy(linkInfo.local)}
              >
                <h2 className={`mb-3 text-2xl font-semibold`}>Local</h2>
                <div className={`m-0 text-sm opacity-50`}>{linkInfo.local}</div>
              </div>
              <div
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                onClick={() => handleLinkCopy(linkInfo.superpages)}
              >
                <h2 className={`mb-3 text-2xl font-semibold`}>Super Pages</h2>
                <div className={`m-0 text-sm opacity-50`}>
                  {linkInfo.superpages}
                </div>
              </div>
              <div
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                onClick={() => handleLinkCopy(linkInfo.yellowpages)}
              >
                <h2 className={`mb-3 text-2xl font-semibold`}>Yellow Pages</h2>
                <div className={`m-0 text-sm opacity-50`}>
                  {linkInfo.yellowpages}
                </div>
              </div>
            </div>
          </>
        ))}
    </main>
  );
}