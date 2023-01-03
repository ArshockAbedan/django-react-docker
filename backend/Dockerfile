FROM python:3.8-alpine
LABEL maintainer="abedjooy.com"

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

COPY . /app/backend/

WORKDIR /app/backend/
EXPOSE 8000

RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    /py/bin/pip install -r requirements.txt && \
    adduser --disabled-password --no-create-home app

ENV PATH="/py/bin:$PATH"

USER app

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]