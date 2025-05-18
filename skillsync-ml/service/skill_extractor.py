import re
from config.skill_course_map import SKILL_TO_COURSE

def extract_skills(text):
    skills = []
    text = text.lower()

    for skill in SKILL_TO_COURSE:
        pattern = r'\b' + re.escape(skill.lower()) + r'\b'
        if re.search(pattern, text):
            skills.append(skill)

    return skills
