FROM fnwharbor.enncloud.cn/fnw/nginx-brotli:latest
ADD default.conf /etc/nginx/conf.d/
ADD dist/. /usr/share/nginx/html/

RUN ["touch","/usr/share/nginx/html/env_config.js"]
CMD ["sh", "-c", "echo $(cat /usr/share/nginx/html/env/env_\"$ENV\".js) >> /usr/share/nginx/html/env_config.js; nginx -g \"daemon off;\""]