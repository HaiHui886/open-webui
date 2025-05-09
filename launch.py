import re
import sys
import os
from backend.open_webui import app

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
BACKEND_ROOT = os.path.join(PROJECT_ROOT, 'backend')
print('BACKEND_ROOT', BACKEND_ROOT)
sys.path.insert(0, BACKEND_ROOT)

os.environ['HUGGINGFACE_HUB_CACHE'] = '/workspace/'
os.environ['HF_HUB_OFFLINE'] = '1'
os.environ['HF_HUB_ENABLE_HF_TRANSFER'] = '0'
os.environ['ENABLE_EVALUATION_ARENA_MODELS'] = 'false'
os.environ['ENABLE_OLLAMA_API'] = 'false'
os.environ['ENABLE_OPENAI_API'] = 'true'
# os.environ['OPENAI_API_BASE_URL'] = 'http://127.0.0.1:11231/v1'
os.environ['OPENAI_API_BASE_URL'] = 'http://127.0.0.1:11434/v1'
os.environ['K_SERVICE'] = 'uivarpath'

if __name__ == '__main__':
    sys.argv[0] = re.sub(r'(-script\.pyw|\.exe)?$', '', sys.argv[0])
    sys.exit(app())
    