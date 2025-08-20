
FROM python:3.8-alpine
LABEL maintainer="abedjooy.com"

ENV PYTHONUNBUFFERED=1 PYTHONDONTWRITEBYTECODE=1

# Install system dependencies for psycopg2 and Pillow
RUN apk update && \
    apk add --no-cache gcc musl-dev postgresql-dev python3-dev libffi-dev jpeg-dev zlib-dev

WORKDIR /app/backend/

COPY requirements.txt ./
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Copy project files
COPY . .

# Create non-root user
RUN adduser --disabled-password --no-create-home app

EXPOSE 8080

USER app

CMD ["python", "manage.py", "runserver", "0.0.0.0:8080"]