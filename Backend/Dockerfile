# /backend/Dockerfile

FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt requirements.txt
RUN apt update
RUN apt install libpq-dev python3-dev -y
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "app.py"]