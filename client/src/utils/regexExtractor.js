function extractResumeFields(text) {
  const regexMap = {
    name:  /^(?<name>[^\n\r]+)/, 

    phone: /(?<phone>\b\d{10}\b)/,  

    address: /(?<address>[A-Z][^\n]*Maharashtra[^\n]*)/i,  

    email: /(?<email>[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,})/,  

    github: /(?<github>github\.com\/[^\s]+)/i,  

    summary: /(?<=\bSUMMARY\b[\r\n]+)(?<summary>[\s\S]*?)(?=\n(?:INTERNSHIPS?|EXPERIENCE|SKILLS))/i,

    internships: /(?<=\bINTERNSHIPS?\b[\r\n]+)(?<internships>[\s\S]*?)(?=\n(?:SKILLS?|PROJECTS?|CERTIFICATIONS?|COURSES?|EDUCATION))/i,

    skills: /(?<=\bSKILLS?\b[\r\n]+)(?<skills>[\s\S]*?)(?=\n(?:PROJECTS?|CERTIFICATIONS?|COURSES?|EDUCATION))/i,

    projects: /(?<=\bPROJECTS?\b[\r\n]+)(?<projects>[\s\S]*?)(?=\n(?:CERTIFICATIONS?|COURSES?|EDUCATION))/i,

    certifications: /(?<=\bCERTIFICATIONS?(?: & COURSES?)?\b[\r\n]+)(?<certifications>[\s\S]*?)(?=\n(?:EDUCATION|ACHIEVEMENTS?))/i,

    education: /(?<=\bEDUCATION\b[\r\n]+)(?<education>[\s\S]*?)(?=\n(?:ACHIEVEMENTS?|POSITIONS?|LANGUAGES?))/i,

    achievements: /(?<=\bACHIEVEMENTS?\b[\r\n]+)(?<achievements>[\s\S]*?)(?=\n(?:POSITIONS?|LANGUAGES?))/i,

    positions: /(?<=\bPOSITIONS? OF RESPONSIBILITY\b[\r\n]+)(?<positions>[\s\S]*?)(?=\n(?:LANGUAGES?))/i,

    languages: /(?<=\bLANGUAGES?\b[\r\n]+)(?<languages>[\s\S]*)/i
  };

  const results = {};
  for (const [key, regex] of Object.entries(regexMap)) {
    const match = text.match(regex);
    results[key] = match?.groups?.[key]?.trim() || null;
  }
  return results;
}
export default extractResumeFields;