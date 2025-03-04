FROM node:22-alpine

WORKDIR /app

# Install build dependencies using build-base and set up python symlink
RUN apk add --no-cache build-base python3 && ln -sf python3 /usr/bin/python
ENV PYTHON=python3

# Copy package files and remove sensitive files
COPY package*.json ./
RUN rm -f .npmrc

# Install dependencies and rebuild native modules
RUN npm install
RUN npm rebuild

# Copy the rest of your source code and build the app
COPY . .
RUN npm run build

CMD ["node", "build/index.js"]
