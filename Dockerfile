# Download the slim version of node
FROM node:17-slim

# Set the work directory to app folder. 
# We will be copying our code here
WORKDIR /node

#Copy package.json file in the node folder inside container
COPY package.json .

# Install the dependencies in the container
RUN npm install

# Copy the rest of the code in the container
COPY . .

# Run the express app
CMD ["npm", "start"]

# Expose the service over PORT 9000
EXPOSE 9000