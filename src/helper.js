export function checkHeading(str) {
  //regular expression RegEx to check headings **.....*
  return /^(\*)(\*)(.*)\*$/.test(str);
}

export function replaceStars(str) {
  //regular expression RegEx to remove asterisk **.....*=> ....
  //   return str.replace(/^(\*)(\*)|(\*)$/g, "");
  return str.replace(/^\*\*/, "").replace(/\*$/, "");
}
