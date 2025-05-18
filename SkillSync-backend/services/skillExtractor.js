const skillKeywords = [
    "JavaScript", "React", "Node.js", "MongoDB", "Python",
    "SQL", "AWS", "Docker", "HTML", "CSS", "Git", "Express",
  ];
  
  const extractSkills = (text) => {
    const found = skillKeywords.filter(skill =>
      text.toLowerCase().includes(skill.toLowerCase())
    );
    return [...new Set(found)];
  };
  
  module.exports = { extractSkills };  