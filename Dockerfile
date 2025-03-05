# Base image
FROM node:18-alpine AS build
WORKDIR /app

# ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY 
# ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}

# ARG MONGODB_URI 
# ENV MONGODB_URI=${MONGODB_URI}
# # RUN echo $MONGODB_URI && exit 1
# ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
# ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}

# ARG CLERK_SECRET_KEY
# ENV CLERK_SECRET_KEY=${CLERK_SECRET_KEY}

# ARG CLERK_PUBLISHABLE_KEY
# ENV CLERK_PUBLISHABLE_KEY=${CLERK_PUBLISHABLE_KEY}



# Install dependencies (including devDependencies for the build process)
COPY package.json package-lock.json ./
RUN npm install

# Build stage
# FROM base AS build
COPY . .


RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app

# Copy standalone build and static assets
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port and start server
EXPOSE 3000
CMD ["node", "server.js"]



# docker image run commmand in terminal
# docker run \
# -e APOLLO_API_KEY="api" \
# -e EMAIL="from email" \
# -e EMAIL_PASS="email pass" \
# -e MONGODB_URI="mongodb uri" \
# -e NODE_ENV="production" \
# -e NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk" \
# -e CLERK_SECRET_KEY="sk" \
# -e GROQ_API_KEY="gsk" \
# -p 3000:3000 qrcode-nextjs-app

# set -o allexport
# source .env
# set +o allexport