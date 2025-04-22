# Using OpenJDK image
FROM openjdk:17-jdk-slim

# Setting environment variable
ENV SPRING_OUTPUT_ANSI_ENABLED=ALWAYS \
    JAVA_OPTS=""

# Setting the working directory inside the container
WORKDIR /app

# Copying the jar file (we'll generate this using Maven)
COPY target/edoc-project.jar app.jar

# Exposing the default Spring Boot port
EXPOSE 8080

# Run the app
ENTRYPOINT ["java","-jar","app.jar"]
