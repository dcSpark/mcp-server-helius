FROM node:18-alpine

WORKDIR /app

# Install build dependencies with more complete toolchain
RUN apk add --no-cache build-base python3 make g++ py3-pip git curl && \
    ln -sf python3 /usr/bin/python
ENV PYTHON=python3

# Copy package files and remove sensitive files
COPY package*.json ./
RUN rm -f .npmrc

# Install dependencies
RUN npm ci

# Copy the rest of your source code
COPY . .

# Build the app
RUN npm run build

# Explicitly rebuild the problematic module and all native modules
RUN npm rebuild bigint-buffer && \
    npm rebuild @noble/secp256k1 && \
    npm rebuild helius-sdk && \
    npm rebuild

CMD ["node", "/app/build/index.js"]
