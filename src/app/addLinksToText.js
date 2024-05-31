export default function addLinksToText(initialParagraph, incomingKeyword, links) {
  if (links.length > 1) {

    const keyword = incomingKeyword.toLowerCase();
    console.log({initialParagraph});
    console.log({keyword});
    console.log({links});

    // Count occurrences of the keyword in the initial paragraph
    var keywordRegex = new RegExp(keyword, 'gi');
    //var keywordRegex = new RegExp(keyword 'g');
    var keywordCount = (initialParagraph.match(keywordRegex) || []).length;
    console.log(keyword + " count in Initial Paragraph: " + keywordCount);

    function replaceKeywords(initialParagraph, keyword, links) {
      let replacedParagraph = initialParagraph;
      for (let i = 0; i < Math.min(links.length, 5); i++) {
        const link = links[i];
        replacedParagraph = replacedParagraph.replace(keyword, link, 1); // Replace only the first occurrence in each iteration
      }
      return replacedParagraph;
    }

    const replacedParagraph = initialParagraph.replace(new RegExp(keyword, 'gi'), (match, index) => {
      // Check if there's a link available in the links array
      if (links.length > 0) {
        console.log(links);
        const link = links.shift(); // Remove and store the first link
        return `<a href="${link}" target="_blank">${match}</a>`;
      } else {
        return match; // Return the original match if no link available
      }
    });

    console.log(replacedParagraph);
    return replacedParagraph;
  }
}