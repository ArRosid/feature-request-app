FROM python:3.6.5-alpine

WORKDIR /app

COPY . /app

RUN pip install -r requirements.txt

ENTRYPOINT ["python"]
CMD ["app.py"]