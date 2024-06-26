"use client";
import { generateLinks } from "./linkGenerator";
import addLinkstoText from "./addLinksToText"
import generateContent from "./generateContent";
import React, { useState, useEffect } from "react";

export default function Home() {
    const [extractedLocations, setExtractedLocations] = useState([]);
    const [linkObjects, setlinkObjects] = useState([]);
    const [extractedKeywords, setExtractedKeywords] = useState([]);
    const [keywords, setKeywords] = useState("");
    const [locations, setLocations] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [textWithoutLinksTemp, setTextWithoutLinksTemp] = useState("");

    const handleGenerateContent = async (keyword, location, index) => {
        const keywordRegex = new RegExp(keyword, 'gi');
        const text = `Write a concise marketing paragraph of 100-120 words about our ${keyword.toLowerCase()} services in ${location}. (Use the EXACT keyword "${keyword.toLowerCase()}" at least 5 times.) Speak in the voice of a succsessful business, but don't make any references to a business name or the state.  Give me the plain text version of the paragraph.`;
        const rawGeneratedContent = await generateContent(text);
        const generatedContent = rawGeneratedContent.replace(/[*#]/g, '');
        console.log(generatedContent);
        let keywordCount = (generatedContent.match(keywordRegex) || []).length;
        console.log(keywordCount);
        const updatedLinks = [...linkObjects]; // Create a shallow copy of linkObjects
        updatedLinks[index].textWithoutLinks = generatedContent;
        setTextWithoutLinksTemp(generatedContent);
        setlinkObjects(updatedLinks);
    }

    const handleInjectLinks = (text, keyword, links, index) => {
        console.log(text, keyword, links, index);
        console.log(linkObjects[index])
        const res = addLinkstoText(text, keyword, links);
        const { updatedText, keywordCount } = res;
        console.log(res);
        console.log(updatedText);
        console.log(keywordCount);
        //find all of the objects in the linkObjects array with the same keyword and set the textWithoutLinks property for all of them
        linkObjects.forEach((link) => {
            if (link.keyword === keyword) {
                console.log(link);
                link.textWithoutLinks = text;
            }
        });
        console.log(linkObjects);
        linkObjects[index].textWithLinks = updatedText;
        console.log(linkObjects[index]);
        setlinkObjects([...linkObjects]);
    }

    const handleTextWithoutLinksChange = (e, index) => {
      console.log("ASDFASDF")
      console.log(e.target.value);
      console.log(index)
      setTextWithoutLinksTemp(e.target.value);
    };
  

    useEffect(() => {
        console.log(linkObjects);
    }, [linkObjects]);

    const handleKeywordsChange = (e) => {
        setKeywords(e.target.value);
    };

    const handleLocationsChange = (e) => {
        setLocations(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleClickParagraph = (index, value) => {
        navigator.clipboard.writeText(value);
        linkObjects[index].copied = true;
        setlinkObjects([...linkObjects]);
    };


    const handleLinkCopy = (linkIndex, linkType) => {
        console.log(linkIndex, linkType);
        const updatedLinks = [...linkObjects]; // Create a shallow copy of linkObjects
        updatedLinks[linkIndex][linkType].copied = true;

        setlinkObjects(updatedLinks);
        console.log(linkObjects[linkIndex]);
        navigator.clipboard.writeText(linkObjects[linkIndex][linkType].link);
    };

    const handleClickCopy = (value) => {
        navigator.clipboard.writeText(value);
    };

    const handleGenerateLinks = (e) => {
        setlinkObjects([]);
        e.preventDefault();
        setlinkObjects(generateLinks(extractedKeywords, extractedLocations));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const keywordArray = extractKeywords(keywords);
        setExtractedKeywords(keywordArray);

        const locationArray = extractLocations(locations);

        if (locationArray[locationArray.length - 1].length < 1) {
            locationArray.pop();
        }
        setExtractedLocations(locationArray);
        setPhoneNumber(phoneNumber);
        setTextWithoutLinksTemp("");
    };

    function extractKeywords(text) {
        if (text.includes(",")) {
            return text.split(",").map((keyword) => keyword.trim())
        }
        if (text.includes(";")) {
            return text.split(";").map((keyword) => keyword.trim())
        }
        if (text.includes("\n")) {
            return text.split("\n").map((keyword) => keyword.trim());
        }
        return [text.trim()];
    }

    function extractLocations(text) {
        if (text.includes(";")) {
            return text.split(";").map((location) => location.trim());
        }
        if (text.includes("\n")) {
            return text.split("\n").map((location) => location.trim());
        }
        return [text.trim()];
        return text.split(",").map((location) => location.trim());

    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    <a
                        href="https://github.com/jordanthewebdesigner/seo-link-generator"
                        target="_blank"
                    >

                        Learn more on Github.
                    </a>
                </div>
                <div className="fixed bottom-0 left-0 flex h-8 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    <a
                        className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                        href="https://jordanclark.tech"
                        target="_blank"
                    >
                        By: Jordan Clark
                    </a>
                </div>
            </div>

            <form onSubmit={handleFormSubmit}>
                <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                    <div className=" group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                        <h2 className={`mb-3 text-2xl font-semibold`}>
                            Keywords
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
                            placeholder="Enter keywords separated by commas, semicolon, or a new line."
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
                            Extracted Keywords
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
                            Locations
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
                            placeholder='Enter locations seperated by a ";" or one per line. Ex: Miami, FL; Orlando, FL"'
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
                            Extracted Locations
                            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                :
                            </span>
                        </h2>
                        <div className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                            {extractLocations.length > 0 && (
                                <div>
                                    <ul>
                                        {extractedLocations.map((location, index) => (
                                            <li key={`${location}-${index}`}>{location.trim()}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col content-start  group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30">
                        <h2 className={`mb-3 text-2xl font-semibold`}>
                            Phone Number
                            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                :
                            </span>
                        </h2>
                        <br />
                        <textarea
                            className="text-black rounded-lg p-2"
                            id="phoneNumber"
                            rows={1}
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            placeholder="555-555-5555"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleFormSubmit(e);
                                }
                            }}
                        />
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

            {linkObjects.length > 0 &&
                linkObjects.map((linkInfo, index) => {
                    const { keyword, location, textWithLinks, textWithoutLinks, bbb, yelp, foursquare, superpages, yellowpages } = linkInfo;
                    return (
                        <>
                            <div
                                className="inline-flex items-center justify-center w-full "
                                key={index}
                            >
                                <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                                <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900 hover:underline "

                                    onClick={() => {
                                        handleClickCopy(`${keyword} | ${location} | ${phoneNumber}`)
                                    }}
                                >
                                    {keyword} | {location} | {phoneNumber}
                                </span>
                            </div>

                            <div className="w-full group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                                <div className="flex items-center justify-between">
                                    <h2 className={` mb-3 text-2xl font-semibold`}>
                                        Text to Add Links To
                                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                            :
                                        </span>
                                    </h2>
                                    <h2 className={`mb-3 text-2xl font-semibold`}>
                                        <button onClick={() => handleGenerateContent(keyword, location, index)}>
                                            Generate Content{" "}
                                            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                                -&gt;
                                            </span>
                                        </button>
                                    </h2>
                                </div>
                                <br />
                                <textarea
                                    className="text-black rounded-lg p-2 w-full"
                                    id="keywords"
                                    rows={10}
                                    defaultValue={textWithoutLinksTemp}
                                    onChange={(e) => handleTextWithoutLinksChange(e, index)}
                                    placeholder='Enter plain text for link injection.'
                                />
                            </div>
                            <h2 className={`mb-3 text-2xl font-semibold`}>
                                <button onClick={() => handleInjectLinks(textWithoutLinksTemp, keyword, [bbb.link, yelp.link, foursquare.link, superpages.link, yellowpages.link], index)}>
                                    Inject Links
                                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                        -&gt;
                                    </span>
                                </button>
                            </h2>

                            {textWithLinks && (
                                <>
                                    <div
                                        className={`w-full group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 ${linkInfo.copied ? "border-gray-500 bg-gray-100/0" : "border-gray-500 bg-gray-100/10"}`}
                                        onClick={() => {
                                            handleClickParagraph(index, textWithLinks);
                                        }}
                                    >
                                        <h2 className={`mb-3 text-2xl font-semibold`}>
                                            Text With Links Added
                                            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                                :
                                            </span>
                                        </h2>
                                        <br />
                                        <p
                                            dangerouslySetInnerHTML={{ __html: textWithLinks }}
                                        >
                                        </p>
                                        {linkInfo.copied && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6  right-0 bottom-5 text-green-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                </>
                            )
                            }

                            <div
                                key={`${keyword}-${location}-${index}`}
                                className="mb-10  w-full lg:mb-0 lg:grid-cols-2 md:grid-cols-1 lg:text-left"
                            >
                                <div
                                    className={`group rounded-lg border border-transparent my-2 px-5 py-4 transition-colors hover:border-gray-300  hover:bg-gray-200 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 ${bbb.copied
                                        ? "border-gray-500 bg-gray-100/0"
                                        : "border-gray-500 bg-gray-100/10"
                                        }`}
                                    onClick={() => {
                                        console.log(bbb.copied);
                                        handleLinkCopy(index, "bbb");
                                    }}
                                >
                                    <h2 className={`mb-3 text-2xl font-semibold`}>BBB</h2>
                                    <div className={`m-0 text-sm opacity-50 text-right`}>
                                        {bbb.link}
                                        {bbb.copied && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6  right-0 bottom-5 text-green-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                <div
                                    className={`group rounded-lg border border-transparent my-2 px-5 py-4 transition-colors hover:border-gray-300  hover:bg-gray-200 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 ${yelp.copied
                                        ? "border-gray-500 bg-gray-100/0"
                                        : "border-gray-500 bg-gray-100/10"
                                        }`}
                                    onClick={() => {
                                        console.log(yelp.copied);
                                        handleLinkCopy(index, "yelp");
                                    }}
                                >
                                    <h2 className={`mb-3 text-2xl font-semibold`}>Yelp</h2>
                                    <div className={`m-0 text-sm opacity-50 text-right`}>
                                        {yelp.link}
                                        {yelp.copied && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6  right-0 bottom-5 text-green-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                <div
                                    className={`group rounded-lg border border-transparent my-2 px-5 py-4 transition-colors hover:border-gray-300  hover:bg-gray-200 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 ${foursquare.copied
                                        ? "border-gray-500 bg-gray-100/0"
                                        : "border-gray-500 bg-gray-100/10"
                                        }`}
                                    onClick={() => {
                                        console.log(foursquare.copied);
                                        handleLinkCopy(index, "foursquare");
                                    }}
                                >
                                    <h2 className={`mb-3 text-2xl font-semibold`}>Foursquare</h2>
                                    <div className={`m-0 text-sm opacity-50 text-right`}>
                                        {foursquare.link}
                                        {foursquare.copied && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6  right-0 bottom-5 text-green-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                <div
                                    className={`group rounded-lg border border-transparent my-2 px-5 py-4 transition-colors hover:border-gray-300  hover:bg-gray-200 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 ${superpages.copied
                                        ? "border-gray-500 bg-gray-100/0"
                                        : "border-gray-500 bg-gray-100/10"
                                        }`}
                                    onClick={() => {
                                        console.log(superpages.copied);
                                        handleLinkCopy(index, "superpages");
                                    }}
                                >
                                    <h2 className={`mb-3 text-2xl font-semibold`}>Super Pages</h2>
                                    <div className={`m-0 text-sm opacity-50 text-right`}>
                                        {superpages.link}
                                        {superpages.copied && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6  right-0 bottom-5 text-green-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                <div
                                    className={`group rounded-lg border border-transparent my-2 px-5 py-4 transition-colors hover:border-gray-300  hover:bg-gray-200 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 ${yellowpages.copied
                                        ? "border-gray-500 bg-gray-100/0"
                                        : "border-gray-500 bg-gray-100/10"
                                        }`}
                                    onClick={() => {
                                        console.log(yellowpages.copied);
                                        handleLinkCopy(index, "yellowpages");
                                    }}
                                >
                                    <h2 className={`mb-3 text-2xl font-semibold`}>Yellow Pages</h2>
                                    <div className={`m-0 text-sm opacity-50 text-right`}>
                                        {yellowpages.link}
                                        {yellowpages.copied && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6  right-0 bottom-5 text-green-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })
            }

        </main>
    );
}
