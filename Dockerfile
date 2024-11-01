#---Build front---
FROM node:17 AS builder
WORKDIR /app
COPY . .
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND $REACT_APP_BACKEND_URL
RUN yarn install --force && yarn run build

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# Copy built assets from `builder` image
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]