#!/bin/bash
export GCE_PEM_FILE_PATH=./agisit-2425-g46-65cf0d4c1c2c.json
export GCE_PROJECT=$(grep project_id $GCE_PEM_FILE_PATH | sed -e 's/  "project_id": "//g' -e 's/",//g')
export GCE_EMAIL=$(grep client_email $GCE_PEM_FILE_PATH | sed -e 's/  "client_email": "//g' -e 's/",//g')
gcloud config set project $GCE_PROJECT
