import re
import sys
import os
from backend.open_webui import app

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
BACKEND_ROOT = os.path.join(PROJECT_ROOT, 'backend')
print('BACKEND_ROOT', BACKEND_ROOT)
sys.path.insert(0, BACKEND_ROOT)

# export HF_HUB_OFFLINE=1
os.environ['HF_HUB_OFFLINE'] = '1'

if __name__ == '__main__':
    sys.argv[0] = re.sub(r'(-script\.pyw|\.exe)?$', '', sys.argv[0])
    sys.exit(app())