FROM eclipse-temurin:17-jdk-jammy
RUN mkdir /app
COPY /build/libs/microservice03-1.0.0.jar microservice03-1.0.0.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar", "/microservice03-1.0.0.jar"]