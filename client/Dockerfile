# Use the official Nginx image as the base
FROM nginx:alpine

# Remove the default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy the built React app to Nginx's serve directory
COPY build /usr/share/nginx/html

# Expose port 80 to the Docker host, so we can access the container
EXPOSE 80

# Start Nginx when the container has provisioned.
CMD ["nginx", "-g", "daemon off;"]
