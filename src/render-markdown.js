'use strict';

/** 
 * TODO:
 *  - Make it pretty (Github uses a monospace font, I need to figure out how to make it "code")
 *  - Figure out how to support tables (it might be hard, given the parser can't handle it 
 *    line by line (which makes sense). This might mean I have to re-render the whole markdown 
 *    document, rather than do it line by line (which could get whacky w/ respect to using Github's
 *    built in comments capability)
 */

function isMarkdown(fileNode) {
  const fileNameNode = fileNode.querySelectorAll('.file-info a')[0];
  return fileNameNode && fileNameNode.textContent.endsWith('.md');
}

function replaceMarkdownWithHtml(fileNode) {
  // Find each line of code, which in this case is markdown
  const markdownNodes = fileNode.querySelectorAll('.blob-code .blob-code-inner');
  Array.from(markdownNodes).map(node => {
    // Strip either a leading "+" or "-" (for additions / removals) and any other 
    // whitespace that Github puts at the front to align things correctly.
    let content = node.textContent.substr(1);
    // Replace the HTML with the markdown version.
    node.innerHTML = markdown.toHTML(content)
  });
}

console.log('Markdown renderer intialized...');

Array.from(document.querySelectorAll('#files .file') || [])
  .filter(isMarkdown)
  .forEach(replaceMarkdownWithHtml);

console.log('Complete, all markdown has been replaced with HTML.');