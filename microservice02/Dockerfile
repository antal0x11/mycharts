FROM nginx:alpine
COPY .nginx /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY dist .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]