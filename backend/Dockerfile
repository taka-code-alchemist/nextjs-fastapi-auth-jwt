# Pythonをインストール
FROM python:3.12-slim

# ワークディレクトリパスを指定
WORKDIR /app

# UVをインストールに必要なライブラリをインストール
RUN apt-get update -y \
    && apt-get install -y curl ca-certificates \
    && apt-get -y clean all

# UVのインストール
# ADD https://astral.sh/uv/install.sh /uv-installer.sh
# RUN sh /uv-installer.sh && rm /uv-installer.sh
COPY --from=ghcr.io/astral-sh/uv:0.8.11 /uv /uvx /bin/

# UVを使用するに必要なパスを通す
ENV PATH="/root/.cargo/bin/:$PATH"

# プロジェクトの主要ファイルをコンテナにコピー
COPY README.md uv.lock pyproject.toml requirements.txt /app/

# UV用環境変数の設定
ENV UV_SYSTEM_PYTHON=true \ 
    UV_COMPILE_BYTCODE=1 \
    UV_CAHE_DIR=/root/.cache/uv \
    UV_LINK_MODE=copy

# アプリソースコードをコピー
COPY ./app /app

# アプリが使うパッケージをインストール
RUN uv export --frozen --no-dev --format requirements-txt > requirements.txt
RUN uv pip install -r requirements.txt

# 外部からアクセスのためポートを開く
EXPOSE 80
CMD [ "uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80", "--reload" ]
