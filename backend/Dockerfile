FROM python:3.8-alpine
LABEL maintainer="abedjooy.com"

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Create app directory
WORKDIR /app/backend/

# Install dependencies first for better caching
COPY requirements.txt ./
RUN pip install --upgrade pip && \
    pip install -r requirements.txt && \
    adduser --disabled-password --no-create-home app

# Copy the rest of the code
COPY . .

EXPOSE 8000

# Switch to non-root user for running the server
USER app

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]