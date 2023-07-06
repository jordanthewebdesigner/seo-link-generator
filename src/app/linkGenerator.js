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

  const localLink = (keyword, location) =>
    `https://www.local.com/business/results/listing.cfm?ar=${encodeURIComponent(
      location
    )}&s=${encodeURIComponent(keyword)}`;

  const links = [];

  for (let i = 0; i < keywords.length; i++) {
    //add a link for each keyword/location pair
    for (let j = 0; j < locations.length; j++) {
      links.push({
        keyword: keywords[i],
        location: locations[j],
        superpages: superpagesLink(keywords[i], locations[j]),
        yellowpages: yellowpagesLink(keywords[i], locations[j]),
        bbb: bbbLink(keywords[i], locations[j]),
        yelp: yelpLink(keywords[i], locations[j]),
        local: localLink(keywords[i], locations[j]),
      });
    }
  }
  return links;
}
