# Deploying Kimbeca to a Linux server

## Part 1 — Manual deploy now (no domain yet)

### 0. Get the code onto the server

No git remote is set up yet. Pick one:

- **Push to GitHub/GitLab first** (recommended — makes future updates a `git pull`):
  ```bash
  # from your machine
  git remote add origin <your-repo-url>
  git push -u origin master
  ```
  Then on the server: `git clone <your-repo-url> kimbeca`

- **Or skip git entirely** and copy the folder straight to the server:
  ```bash
  rsync -avz --exclude node_modules --exclude .next -e ssh \
    "F:/work/numevi/Landing page/" user@your-server:~/kimbeca/
  ```

### 1. Install Docker on the server (Ubuntu/Debian)

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
# log out and back in for the group change to apply
```

Confirm: `docker --version` and `docker compose version` (the compose plugin ships with the script above).

### 2. Build and run

```bash
cd ~/kimbeca
docker compose up -d --build
```

This builds the image and starts the container, bound to `127.0.0.1:3000` on the server (not exposed to the internet yet — see the security note below).

Check it's up:
```bash
docker compose ps
docker compose logs -f
```

### 3. Test it before a domain/nginx exists

The app only listens on `127.0.0.1:3000` on the server, so open an SSH tunnel from your own machine instead of exposing the port publicly:

```bash
ssh -L 3000:localhost:3000 user@your-server
```

Then open `http://localhost:3000` in your own browser.

### Updating later

```bash
cd ~/kimbeca
git pull            # or re-rsync
docker compose up -d --build
```

---

## Part 2 — Later: domain + nginx + HTTPS

### 1. DNS

Point your domain's `A` record (and `www` if you want it) at the server's public IP. Wait for it to propagate (`dig example.com` should show the server IP).

### 2. Install nginx on the server (not in Docker — simpler to manage certs)

```bash
sudo apt update && sudo apt install -y nginx
```

### 3. Add the reverse proxy config

This repo already has a template at `deploy/nginx/kimbeca.conf`. On the server:

```bash
sudo cp deploy/nginx/kimbeca.conf /etc/nginx/sites-available/kimbeca
sudo nano /etc/nginx/sites-available/kimbeca   # replace example.com with your real domain
sudo ln -s /etc/nginx/sites-available/kimbeca /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

At this point `http://example.com` should reach the app through nginx.

### 4. Open the firewall for HTTP/HTTPS (if using ufw)

```bash
sudo ufw allow 'Nginx Full'
sudo ufw status
```

Do **not** open port 3000 externally — it should stay reachable only via `127.0.0.1` (nginx talks to it locally; that's already how `docker-compose.yml` binds it).

### 5. HTTPS with Let's Encrypt (certbot)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d example.com -d www.example.com
```

Certbot edits the nginx config automatically: adds the SSL server block, redirects HTTP → HTTPS. Follow its prompts (email, agree to terms, choose redirect).

Certbot also installs a systemd timer that auto-renews the cert — verify with:
```bash
sudo systemctl status certbot.timer
sudo certbot renew --dry-run
```

### 6. Done

`https://example.com` now serves the app through nginx with a valid cert, and the container itself is never directly reachable from outside the server.
