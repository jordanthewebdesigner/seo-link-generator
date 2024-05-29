export function generateLinks(keywords, locations) {
  console.log(keywords, locations);
  const superpagesLink = (keyword, location) =>
    `https://www.superpages.com/search?search_terms=${encodeURIComponent(
      keyword
    )}&geo_location_terms=${encodeURIComponent(location)}`;

  const yellowpagesLink = (keyword, location) =>
    `https://www.yellowpages.com/search?search_terms=${encodeURIComponent(
      keyword
    )}&geo_location_terms=${encodeURIComponent(location)}`;

  const bbbLink = (keyword, location) =>
    `https://www.bbb.org/search?find_country=USA&find_loc=${encodeURIComponent(
      location
    )}&find_text=${encodeURIComponent(keyword)}`;

  const yelpLink = (keyword, location) =>
    `https://www.yelp.com/search?find_loc=${encodeURIComponent(
      location
    )}&find_desc=${encodeURIComponent(keyword)}`;

  const foursquareLink = (keyword, location) =>
    `https://foursquare.com/explore?mode=url&near${encodeURIComponent(
      location
    )}&q=${encodeURIComponent(keyword)}`;
  const links = [];

  for (let i = 0; i < keywords.length; i++) {
    // add a link for each keyword/location pair
    for (let j = 0; j < locations.length; j++) {
      const link = {
        keyword: keywords[i],
        location: locations[j],
        copied: false,
        superpages: {
          link: superpagesLink(keywords[i], locations[j]),
          copied: false,
        },
        yellowpages: {
          link: yellowpagesLink(keywords[i], locations[j]),
          copied: false,
        },
        bbb: {
          link: bbbLink(keywords[i], locations[j]),
          copied: false,
        },
        yelp: {
          link: yelpLink(keywords[i], locations[j]),
          copied: false,
        },
        foursquare: {
          link: foursquareLink(keywords[i], locations[j]),
          copied: false,
        },
      };

      link.handleLinkCopy = (linkType) =>
        handleLinkCopy(links.length, linkType);

      links.push(link);
    }
  }

  return links;
}
