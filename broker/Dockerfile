FROM oven/bun:latest

WORKDIR /app/server

COPY . .

RUN bun i

CMD ["bun", "run", "src/index.ts"]
EXPOSE 3000
