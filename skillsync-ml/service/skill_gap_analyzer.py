def detect_skill_gaps(resume_skills, job_skills):
    return list(set(job_skills) - set(resume_skills))

