from config.skill_course_map import SKILL_TO_COURSE

def recommend_courses(missing_skills):
    recommendations = {}
    for skill in missing_skills:
        if skill in SKILL_TO_COURSE:
            recommendations[skill] = SKILL_TO_COURSE[skill]
    return recommendations
