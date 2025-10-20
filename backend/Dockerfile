# syntax=docker/dockerfile:1
ARG RUBY_VERSION=3.4.7
FROM ruby:$RUBY_VERSION-slim

WORKDIR /rails

# Instala dependências básicas + NodeJS + corepack (Yarn)
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      curl \
      libjemalloc2 \
      libvips \
      postgresql-client \
      build-essential \
      git \
      libpq-dev \
      libyaml-dev \
      pkg-config \
      nodejs \
    && corepack enable && corepack prepare yarn@stable --activate \
    && rm -rf /var/lib/apt/lists/*

ENV RAILS_ENV="development" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_DEPLOYMENT="0" \
    BUNDLE_WITHOUT=""

# Instala gems
COPY Gemfile Gemfile.lock ./
RUN gem install bundler && bundle install

# Copia a aplicação
COPY . .

# Cria usuário dev
RUN groupadd --system --gid 1000 rails && \
    useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash && \
    chown -R rails:rails db log storage tmp

USER 1000:1000

EXPOSE 3000

ENTRYPOINT ["bash", "-c"]

CMD ["bundle exec rails db:prepare && bundle exec rails server -b 0.0.0.0 -p 3000"]
