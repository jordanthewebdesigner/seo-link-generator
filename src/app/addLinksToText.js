export default function addLinksToText(initialParagraph, incomingKeyword, links) {
    if (links.length > 1) {
        const keyword = incomingKeyword.toLowerCase();
        console.log({ initialParagraph });
        console.log({ keyword });
        console.log({ links });
        // Count occurrences of the keyword in the initial paragraph
        var keywordRegex = new RegExp(keyword + '\\w*', 'gi');
        var keywordCount = (initialParagraph.match(keywordRegex) || []).length;
        console.log(keyword + " count in Initial Paragraph: " + keywordCount);

        const updatedText = initialParagraph.replace(keywordRegex, (match, index) => {
            // Check if there's a link available in the links array
            if (links.length > 0) {
                console.log(links);
                const link = links.shift(); // Remove and store the first link
                return `<a href="${link}" target="_blank">${match}</a>`;
            } else {
                return match; // Return the original match if no link available
            }
        });

        console.log(updatedText);
        const data = { updatedText, keywordCount };
        return data;
    }
}
