import hashlib
import os

def get_local_file_hash(filename):
    sha256_hash = hashlib.sha256()
    
    with open(filename, "rb") as file:
        while True:
            data = file.read(65536)  # 64 KB chunks
            if not data:
                break
            sha256_hash.update(data)
    
    return sha256_hash.hexdigest()

def is_text_file(filename):
    code_extensions = {'.txt', '.c', '.cpp', '.cc', '.java', '.py', '.js', '.html', '.css', '.php', '.rb', '.swift', '.go', '.pl', '.lua', '.sh', '.xml', '.json', '.yaml', '.yml', '.cfg'}
    _, file_extension = os.path.splitext(filename)
    return file_extension in code_extensions