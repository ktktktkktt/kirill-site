# Деплой на сервер

## Как задеплоить изменения

```bash
# 1. Собери проект на Mac
npm run build

# 2. Закоммить всё (код + .next/)
git add -A
git commit -m "описание изменений"
git push origin main
```

GitHub автоматически пришлёт вебхук → сервер сделает `git pull` → pm2 перезапустит сайт.  
Обновление применяется примерно за 30–60 секунд.

---

## Как это работает

- Сервер: Timeweb VPS, **нет SSH, нет systemd, нет apt-get**
- Билд на сервере убивается (SIGKILL) из-за `/etc/ld.so.preload` — поэтому билдим **локально на Mac**
- `.next/` закоммичен в git — сервер просто тянет готовый билд
- GitHub Webhook → nginx `/deploy` → Node.js (`webhook.js` на порту 9001) → `git pull && pm2 restart site`

## Структура авто-деплоя на сервере

```
GitHub push
  └─> GitHub Webhook → http://92.51.39.32/deploy
        └─> nginx proxy_pass → 127.0.0.1:9001
              └─> webhook.js (pm2: webhook)
                    └─> git reset --hard HEAD
                    └─> git pull origin main
                    └─> pm2 restart site
```

## Файлы на сервере

| Файл | Назначение |
|------|------------|
| `/home/kirill-site/webhook.js` | Webhook-сервер (порт 9001) |
| `/etc/nginx/sites-enabled/kirill-site` | Nginx конфиг |
| PM2 процессы: `site` (3000), `webhook` (9001) | |

## Если деплой не сработал автоматически

Проверь логи на сервере:
```bash
pm2 logs webhook --lines 20 --nostream
```

Триггернуть деплой вручную с Mac:
```bash
python3 -c "
import hmac, hashlib, urllib.request
payload = b'{\"ref\":\"refs/heads/main\"}'
secret = b'my-deploy-secret-123'
sig = 'sha256=' + hmac.new(secret, payload, hashlib.sha256).hexdigest()
req = urllib.request.Request('http://92.51.39.32/deploy', data=payload,
  headers={'Content-Type': 'application/json', 'X-Hub-Signature-256': sig})
resp = urllib.request.urlopen(req, timeout=10)
print('Response:', resp.status, resp.read().decode())
"
```
