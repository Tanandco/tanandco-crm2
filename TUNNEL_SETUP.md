# 🔐 מדריך להפעלת Cloudflare Tunnel

מדריך זה מסביר איך להפעיל את Cloudflare Tunnel כדי לחבר את BioStar המקומי לשרת הענן.

---

## 🚀 הפעלה מהירה (מומלץ)

### Windows PowerShell

1. **פתח PowerShell** (לחץ ימני → "Run as Administrator" אם צריך)

2. **הרץ את הסקריפט:**
   ```powershell
   .\start-tunnel.ps1
   ```

3. **העתק את ה-URL** שיופיע (משהו כמו `https://xxx.trycloudflare.com`)

4. **עדכן ב-Replit:**
   - פתח את הפרויקט ב-Replit
   - לחץ על "Secrets" (🔐)
   - עדכן/הוסף: `BIOSTAR_SERVER_URL` = ה-URL שקיבלת
   - שמור

5. **אל תסגור את חלון PowerShell!** המנהרה עובדת רק כל עוד החלון פתוח.

---

## 📋 הפעלה ידנית

אם הסקריפט לא עובד, נסה את זה:

### שלב 1: הורדת cloudflared

```powershell
# צור תיקייה
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.cloudflared"

# הורד
Invoke-WebRequest "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe" `
  -OutFile "$env:USERPROFILE\.cloudflared\cloudflared.exe"
```

### שלב 2: בדיקה ש-BioStar רץ

פתח בדפדפן: `http://localhost:5000`

אם אתה רואה את BioStar - מעולה! אם לא, ודא ש-BioStar רץ.

### שלב 3: הפעלת המנהרה

```powershell
& "$env:USERPROFILE\.cloudflared\cloudflared.exe" tunnel --url http://localhost:5000
```

### שלב 4: העתק את ה-URL

תראה משהו כמו:
```
https://ace-commodities-wars-talk.trycloudflare.com
```

העתק את זה!

---

## ⚠️ בעיות נפוצות

### 1. "BioStar לא זמין"

**פתרון:**
- ודא ש-BioStar רץ על המחשב
- פתח `http://localhost:5000` בדפדפן
- אם זה לא עובד, בדוק את הגדרות ה-firewall

### 2. "cloudflared לא מוריד"

**פתרון:**
- הורד ידנית מ: https://github.com/cloudflare/cloudflared/releases
- שמור ב: `C:\Users\YourName\.cloudflared\cloudflared.exe`

### 3. "המנהרה נסגרת מיד"

**פתרון:**
- ודא ש-BioStar רץ
- נסה להריץ PowerShell כ-Administrator
- בדוק את ה-firewall של Windows

### 4. "שגיאות חיבור"

**פתרון:**
- המנהרה מנסה להתחבר מספר פעמים - זה נורמלי
- חכה 10-20 שניות
- אם זה לא עובד אחרי דקה, נסה להפעיל מחדש

### 5. "URL משתנה כל פעם"

**זה נורמלי!** Quick Tunnel (ללא חשבון) נותן URL חדש כל פעם.

**פתרון:**
- כל פעם שמפעילים מחדש, עדכן את `BIOSTAR_SERVER_URL` ב-Replit
- או: צור Named Tunnel עם חשבון Cloudflare (חינמי) - ראה למטה

---

## 🔒 Named Tunnel (URL קבוע)

אם אתה רוצה URL קבוע שלא משתנה:

### שלב 1: הירשם ל-Cloudflare Zero Trust

1. היכנס ל: https://one.dash.cloudflare.com
2. הירשם (חינמי)

### שלב 2: התחברות

```powershell
& "$env:USERPROFILE\.cloudflared\cloudflared.exe" tunnel login
```

זה יפתח דפדפן - לחץ "Authorize"

### שלב 3: צור Tunnel

```powershell
& "$env:USERPROFILE\.cloudflared\cloudflared.exe" tunnel create biostar-tunnel
```

### שלב 4: הגדר DNS (אופציונלי)

אם יש לך דומיין ב-Cloudflare, תוכל ליצור subdomain.

### שלב 5: הרץ

```powershell
& "$env:USERPROFILE\.cloudflared\cloudflared.exe" tunnel run biostar-tunnel
```

---

## 📝 עדכון ב-Replit

1. פתח את הפרויקט ב-Replit
2. לחץ על "Secrets" (🔐) בתפריט השמאלי
3. לחץ "New secret"
4. שם: `BIOSTAR_SERVER_URL`
5. ערך: ה-URL שקיבלת (בלי `/` בסוף)
6. שמור
7. Restart את האפליקציה ב-Replit

---

## ✅ בדיקה שהכל עובד

### בדיקה 1: המנהרה עובדת

פתח בדפדפן את ה-URL שקיבלת (למשל: `https://xxx.trycloudflare.com`)

אמור לראות את BioStar!

### בדיקה 2: Replit מתחבר

ב-Replit, פתח:
```
https://your-app.repl.co/api/biostar/status
```

אמור לקבל סטטוס של BioStar.

---

## 💡 טיפים

1. **השאר את PowerShell פתוח** - המנהרה עובדת רק כל עוד הסקריפט רץ
2. **השתמש ב-Task Scheduler** אם אתה רוצה שהמנהרה תרוץ אוטומטית
3. **Quick Tunnel** (ללא חשבון) - נוח לבדיקות, אבל URL משתנה
4. **Named Tunnel** - טוב לפרודקשן, URL קבוע

---

## 🆘 עזרה נוספת

אם יש בעיות:
1. בדוק את ה-logs ב-PowerShell
2. ודא ש-BioStar רץ
3. בדוק את ה-firewall
4. נסה להפעיל PowerShell כ-Administrator

---

**הצלחה! 🎉**

