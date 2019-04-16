#!/bin/bash
rm -rf server.key
rm -rf server.pem
openssl req -new -nodes -x509 -out server.pem -keyout server.key -days 3650