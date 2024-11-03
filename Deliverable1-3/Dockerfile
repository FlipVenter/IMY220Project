# Philipus Jacobus Venter u23692619
# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /project

# Copy package.json and package-lock.json
COPY package*.json ./

# Increase fetch timeout and retries for npm
RUN npm config set fetch-timeout 600000
RUN npm config set fetch-retries 5

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]