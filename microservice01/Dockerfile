FROM python:slim-buster

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . /usr/src/app/

EXPOSE 5000

CMD ["flask", "--app", "app", "run","--host","0.0.0.0"]