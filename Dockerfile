# 基于基础镜像简单构建
FROM nginx:latest
# 不指定目录以基础镜像为主
COPY ./dist /usr/share/nginx/html
