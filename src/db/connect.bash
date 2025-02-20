docker exec -it $(docker ps | awk '/better-brightspace/ {print $1}') bash -c "psql -U templateuser -d templateDB"
