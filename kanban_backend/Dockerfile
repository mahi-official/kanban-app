FROM python:3.8-alpine

ENV MICRO_SERVICE=/home/app/microservice

# set work directory
RUN mkdir -p $MICRO_SERVICE
RUN mkdir -p $MICRO_SERVICE/static

# where the code lives
WORKDIR $MICRO_SERVICE

# set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# copy requirements.txt for installing python libraries
COPY requirements.txt $MICRO_SERVICE

#check for pip updates
RUN pip install --upgrade pip

# install psycopg2 dependencies and requirements.txt
RUN apk update \
 && apk add --no-cache postgresql-libs \
 && apk add --no-cache --virtual .build-deps python3-dev gcc musl-dev postgresql-dev \
 && python3 -m pip install -r requirements.txt --no-cache-dir \
 && apk --purge del .build-deps

# copy project
COPY . $MICRO_SERVICE

#copy initial database files
COPY initdb.sql /docker-entrypoint-initdb.d/