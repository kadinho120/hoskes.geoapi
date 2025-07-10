# Estágio 1: Build da aplicação Go e download do banco de dados
FROM golang:1.22-alpine AS builder

# Instala as dependências necessárias para baixar o banco de dados
RUN apk add --no-cache curl unzip

# Define o diretório de trabalho
WORKDIR /app

# Instala o 'geoipupdate' da MaxMind
RUN curl -L -o /tmp/geoipupdate.tar.gz "https://github.com/maxmind/geoipupdate/releases/download/v6.1.0/geoipupdate_6.1.0_linux_amd64.tar.gz" && \
    tar -zxvf /tmp/geoipupdate.tar.gz -C /usr/local/bin --strip-components=1

# Copia o código-fonte da aplicação
COPY . .

# Argumentos para a chave de licença e ID da conta MaxMind
ARG MAXMIND_ACCOUNT_ID
ARG MAXMIND_LICENSE_KEY

# Cria o arquivo de configuração do geoipupdate com as credenciais
RUN mkdir -p /usr/local/etc
RUN echo -e "AccountID ${MAXMIND_ACCOUNT_ID}\nLicenseKey ${MAXMIND_LICENSE_KEY}\nEditionIDs GeoLite2-City\nDatabaseDirectory /app/db" > /usr/local/etc/GeoIP.conf

# Executa o geoipupdate para baixar o banco de dados
# O RUN fará o download durante o 'build' da imagem
RUN /usr/local/bin/geoipupdate -v

# Compila a aplicação Go. O executável final será 'geoapi'
RUN CGO_ENABLED=0 GOOS=linux GO111MODULE=off go build -o geoapi ./cmd/geoapi

# ---

# Estágio 2: Imagem final, otimizada e leve
FROM alpine:latest

WORKDIR /app

# Copia apenas o executável compilado e o banco de dados do estágio 'builder'
COPY --from=builder /app/geoapi .
COPY --from=builder /app/db/GeoLite2-City.mmdb .

# Expõe a porta que a aplicação usa
EXPOSE 8080

# Comando para iniciar a aplicação quando o container iniciar
# Aponta para o arquivo de banco de dados que copiamos
CMD ["./geoapi", "-db", "./GeoLite2-City.mmdb"]
