# Participation: Awk - grep, sed, and awk

## Log File (`server.log`)

```
192.168.1.10 - - [01/Apr/2026:09:15:22] "GET /index.html" 200 1024
192.168.1.15 - - [01/Apr/2026:09:15:25] "GET /api/users" 500 312
10.0.0.5 - - [01/Apr/2026:09:15:30] "POST /login" 401 215
192.168.1.10 - - [01/Apr/2026:09:16:01] "GET /dashboard" 200 4096
10.0.0.5 - - [01/Apr/2026:09:16:05] "POST /login" 401 215
10.0.0.5 - - [01/Apr/2026:09:16:12] "POST /login" 200 512
192.168.1.15 - - [01/Apr/2026:09:17:00] "GET /api/users" 500 312
192.168.1.20 - - [01/Apr/2026:09:17:30] "GET /about" 404 128
```

---

## grep

### 1. Find all 500 errors

```bash
grep '500' server.log
```

**Output:**

```
192.168.1.15 - - [01/Apr/2026:09:15:25] "GET /api/users" 500 312
192.168.1.15 - - [01/Apr/2026:09:17:00] "GET /api/users" 500 312
```

### 2. Find all requests from 10.0.0.5

```bash
grep '10.0.0.5' server.log
```

**Output:**

```
10.0.0.5 - - [01/Apr/2026:09:15:30] "POST /login" 401 215
10.0.0.5 - - [01/Apr/2026:09:16:05] "POST /login" 401 215
10.0.0.5 - - [01/Apr/2026:09:16:12] "POST /login" 200 512
```

### 3. Find all POST requests

```bash
grep 'POST' server.log
```

**Output:**

```
10.0.0.5 - - [01/Apr/2026:09:15:30] "POST /login" 401 215
10.0.0.5 - - [01/Apr/2026:09:16:05] "POST /login" 401 215
10.0.0.5 - - [01/Apr/2026:09:16:12] "POST /login" 200 512
```

---

## sed

### 1. Replace IP 10.0.0.5 with [REDACTED]

```bash
sed 's/10.0.0.5/[REDACTED]/g' server.log
```

**Output:**

```
192.168.1.10 - - [01/Apr/2026:09:15:22] "GET /index.html" 200 1024
192.168.1.15 - - [01/Apr/2026:09:15:25] "GET /api/users" 500 312
[REDACTED] - - [01/Apr/2026:09:15:30] "POST /login" 401 215
192.168.1.10 - - [01/Apr/2026:09:16:01] "GET /dashboard" 200 4096
[REDACTED] - - [01/Apr/2026:09:16:05] "POST /login" 401 215
[REDACTED] - - [01/Apr/2026:09:16:12] "POST /login" 200 512
192.168.1.15 - - [01/Apr/2026:09:17:00] "GET /api/users" 500 312
192.168.1.20 - - [01/Apr/2026:09:17:30] "GET /about" 404 128
```

### 2. Remove the date brackets

```bash
sed 's/\[.*\]//g' server.log
```

**Output:**

```
192.168.1.10 - -  "GET /index.html" 200 1024
192.168.1.15 - -  "GET /api/users" 500 312
10.0.0.5 - -  "POST /login" 401 215
192.168.1.10 - -  "GET /dashboard" 200 4096
10.0.0.5 - -  "POST /login" 401 215
10.0.0.5 - -  "POST /login" 200 512
192.168.1.15 - -  "GET /api/users" 500 312
192.168.1.20 - -  "GET /about" 404 128
```

### 3. Replace HTTP 500 status with ERROR

```bash
sed 's/ 500 / ERROR /g' server.log
```

**Output:**

```
192.168.1.10 - - [01/Apr/2026:09:15:22] "GET /index.html" 200 1024
192.168.1.15 - - [01/Apr/2026:09:15:25] "GET /api/users" ERROR 312
10.0.0.5 - - [01/Apr/2026:09:15:30] "POST /login" 401 215
192.168.1.10 - - [01/Apr/2026:09:16:01] "GET /dashboard" 200 4096
10.0.0.5 - - [01/Apr/2026:09:16:05] "POST /login" 401 215
10.0.0.5 - - [01/Apr/2026:09:16:12] "POST /login" 200 512
192.168.1.15 - - [01/Apr/2026:09:17:00] "GET /api/users" ERROR 312
192.168.1.20 - - [01/Apr/2026:09:17:30] "GET /about" 404 128
```

---

## awk

### 1. Print IP addresses and status codes

```bash
awk '{print $1, $7}' server.log
```

**Output:**

```
192.168.1.10 200
192.168.1.15 500
10.0.0.5 401
192.168.1.10 200
10.0.0.5 401
10.0.0.5 200
192.168.1.15 500
192.168.1.20 404
```

### 2. Print only lines where status code is not 200

```bash
awk '$7 != 200' server.log
```

**Output:**

```
192.168.1.15 - - [01/Apr/2026:09:15:25] "GET /api/users" 500 312
10.0.0.5 - - [01/Apr/2026:09:15:30] "POST /login" 401 215
10.0.0.5 - - [01/Apr/2026:09:16:05] "POST /login" 401 215
192.168.1.15 - - [01/Apr/2026:09:17:00] "GET /api/users" 500 312
192.168.1.20 - - [01/Apr/2026:09:17:30] "GET /about" 404 128
```

### 3. Sum total bytes transferred

```bash
awk '{sum += $8} END {print "Total bytes:", sum}' server.log
```

**Output:**

```
Total bytes: 6814
```
