# Blog API

## Docker

Развертывание Postgres в **Docker Container** :

```docker
docker run --name blog-api-db -d -it \
-p "5432:5432" \
-e POSTGRES_DB="blog_api" \
-e POSTGRES_USER="root" \
-e POSTGRES_PASSWORD="root" \
-v blog-api-data:/var/lib/postgresql postgres
```

* POSTGRES_DB: **blog_api**
* POSTGRES_USER: **root**
* POSTGRES_PASSWORD: **root**
