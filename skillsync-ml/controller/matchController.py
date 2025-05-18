from server import match_pb2
from model.sentenceModel import get_embeddings
from service.skill_extractor import extract_skills
from service.similarity_calculator import calculate_similarity
from service.skill_gap_analyzer import detect_skill_gaps
from service.course_recommender import recommend_courses
import json

class MatchController:
    def handle_match(self, request):
        resume, job = request.resume, request.job

        embeddings = get_embeddings([resume, job])
        similarity = calculate_similarity(embeddings[0], embeddings[1])

        resume_skills = extract_skills(resume)
        job_skills = extract_skills(job)
        missing_skills = detect_skill_gaps(resume_skills, job_skills)
        course_suggestions = recommend_courses(missing_skills)

        print(f"Resume: {resume}")
        print(f"Job Description: {job}")
        # Convert the course suggestions to a string format
        return match_pb2.MatchResponse(
            similarity=similarity*100,
            missing_skills=", ".join(missing_skills),
            course_recommendations=json.dumps(course_suggestions)
        )