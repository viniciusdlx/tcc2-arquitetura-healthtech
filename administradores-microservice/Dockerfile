# Use the official Node.js image
FROM node:22.3.0 AS administradores

# Set the working directory
WORKDIR /usr/src/app

# Change TimeZone to America/Sao_Paulo
ENV TZ=America/Sao_Paulo

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app to the /dist folder
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the NestJS application
CMD ["node", "dist/main.js"]