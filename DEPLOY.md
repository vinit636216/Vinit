# Deploying to a Hostinger VPS

This app is fully Dockerized. This guide takes you from a fresh Hostinger VPS to a live site with HTTPS.

## 1. Prerequisites on the VPS

- Ubuntu 22.04+ (Hostinger's default VPS image works fine)
- A domain name with its DNS **A record pointing at your VPS's IP address** (do this early — DNS can take a while to propagate)
- SSH access to the VPS

Install Docker and the Compose plugin:

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
# log out and back in for the group change to take effect
```

Install Nginx and Certbot (used for the reverse proxy + free SSL certificate):

```bash
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx
```

## 2. Get the code onto the VPS

Clone your repository (or `scp`/`rsync` the project folder) to somewhere like `/opt/vinit-portfolio`:

```bash
git clone <your-repo-url> /opt/vinit-portfolio
cd /opt/vinit-portfolio
```

## 3. Configure environment variables

```bash
cp .env.example .env
nano .env
```

Fill in real values:
- `POSTGRES_PASSWORD` — a strong password
- `AUTH_SECRET` and `NEXTAUTH_SECRET` (same value for both) — generate with:
  ```bash
  openssl rand -base64 32
  ```
- `NEXTAUTH_URL` — `https://yourdomain.com` (your real domain, with https)
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — the login you'll use once, then rotate immediately after first login via the admin panel's Change Password page

## 4. Start the database, then the app

```bash
docker compose up -d db
docker compose up -d --build app
```

The app container's entrypoint automatically runs Prisma migrations and seeds placeholder content (admin user + sample sections) on first boot — no manual DB setup needed. Watch the logs to confirm it started cleanly:

```bash
docker compose logs -f app
```

The app is now listening on `127.0.0.1:3000` on the VPS (not yet exposed to the internet — that's what Nginx is for).

## 5. Set up Nginx + SSL

Copy the provided config, swapping in your real domain:

```bash
sudo cp nginx/portfolio.conf /etc/nginx/sites-available/portfolio.conf
sudo sed -i 's/yourdomain.com/YOUR_ACTUAL_DOMAIN/g' /etc/nginx/sites-available/portfolio.conf
sudo ln -s /etc/nginx/sites-available/portfolio.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

Issue the SSL certificate (Certbot edits the Nginx config for you to add the HTTPS server block and redirect):

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
sudo certbot renew --dry-run   # confirms auto-renewal works
```

Visit `https://yourdomain.com` — your portfolio should be live.

## 6. First login and password rotation

1. Go to `https://yourdomain.com/admin/login` and sign in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` from your `.env`.
2. Immediately go to **Change Password** in the sidebar and set a new password you haven't used elsewhere. The seeded password only exists to get you into the account once.
3. Fill in your real content: Profile (name, bio, photos, socials, resume), Projects, Services, Experience, Testimonials, Achievements, FAQ, Blog posts.

## 7. Redeploying after code changes

```bash
cd /opt/vinit-portfolio
git pull
docker compose build app
docker compose up -d app
```

Migrations run automatically again on start (safe/no-op if there's nothing new to migrate). The database and your uploaded images persist across redeploys via Docker volumes.

## 8. Backups

Database dump:

```bash
docker compose exec db pg_dump -U vinit vinit_portfolio > backup-$(date +%F).sql
```

Uploaded images live in the `uploads` Docker volume — back up its contents periodically:

```bash
docker run --rm -v vinit-portfolio_uploads:/data -v $(pwd):/backup alpine \
  tar czf /backup/uploads-$(date +%F).tar.gz -C /data .
```

Consider putting both commands in a daily cron job.

## Troubleshooting

- **`docker compose logs -f app`** — check for migration or startup errors.
- **502 from Nginx** — the app container probably isn't running; check `docker compose ps` and the app logs.
- **Uploaded images 404 after redeploy** — confirm the `uploads` named volume wasn't removed (`docker compose down -v` would delete it — avoid `-v` unless you mean to wipe data).
- **Need to inspect the database directly** — run `docker compose exec app npx prisma studio` and access it via an SSH tunnel, or temporarily add a `ports` mapping to the `db` service in `docker-compose.yml`.
