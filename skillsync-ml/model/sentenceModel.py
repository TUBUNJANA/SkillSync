from sentence_transformers import SentenceTransformer

print("Loading the sentence transformer model...")
model = SentenceTransformer('all-MiniLM-L6-v2')
print("Model loaded.")

def get_embeddings(texts):
    return model.encode(texts)

