FROM python:slim-buster
RUN mkdir -p src
WORKDIR /src
ENV RABBIT_HOST="10.0.1.100"
ENV RABBIT_PORT=5672
COPY /requirements.txt .
RUN pip install -r requirements.txt
COPY /bar_plot.py .
COPY /metachart.py .
RUN mkdir tmp
CMD ["python3","bar_plot.py"]