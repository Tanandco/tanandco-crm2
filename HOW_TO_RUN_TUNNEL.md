# 🚀 איך להפעיל את המנהרה - הוראות מהירות

## שיטה 1: הפעלה מהירה (מומלץ) ⚡

1. **פתח PowerShell** (לא CMD!)
   - לחץ `Win + X`
   - בחר "Windows PowerShell" או "Terminal"

2. **נווט לתיקיית הפרויקט:**
   ```powershell
   cd C:\Users\User\tanandco-crm
   ```

3. **הרץ את הסקריפט:**
   ```powershell
   .\start-tunnel.ps1
   ```

4. **אם יש שגיאת הרשאות:**
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
   ואז הרץ שוב את הסקריפט.

---

## שיטה 2: הפעלה ידנית

אם הסקריפט לא עובד, נסה את זה:

### שלב 1: הורד cloudflared

```powershell
# צור תיקייה
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.cloudflared"

# הורד
Invoke-WebRequest "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe" `
  -OutFile "$env:USERPROFILE\.cloudflared\cloudflared.exe"
```

### שלב 2: הפעל את המנהרה

```powershell
& "$env:USERPROFILE\.cloudflared\cloudflared.exe" tunnel --url http://localhost:5000
```

---

## ⚠️ בעיות נפוצות

### "לא ניתן לטעון את הסקריפט"

**פתרון:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### "BioStar לא נמצא"

**פתרון:**
1. ודא ש-BioStar רץ על המחשב
2. פתח בדפדפן: `http://localhost:5000`
3. אם BioStar רץ על פורט אחר, עדכן את הסקריפט

### "המנהרה נסגרת מיד"

**פתרון:**
1. ודא ש-BioStar רץ
2. נסה להריץ PowerShell כ-Administrator (לחץ ימני → "Run as Administrator")
3. בדוק את ה-firewall

---

## ✅ אחרי שהמנהרה רצה

1. **העתק את ה-URL** שיופיע (משהו כמו `https://xxx.trycloudflare.com`)

2. **עדכן ב-Replit:**
   - פתח את הפרויקט ב-Replit
   - לחץ על "Secrets" (🔐)
   - עדכן: `BIOSTAR_SERVER_URL` = ה-URL שקיבלת
   - שמור ו-Restart את האפליקציה

3. **אל תסגור את PowerShell!** המנהרה עובדת רק כל עוד החלון פתוח.

---

## 📝 הערות חשובות

- **המנהרה עובדת רק כל עוד PowerShell פתוח** - אל תסגור את החלון!
- **URL משתנה כל פעם** - זה נורמלי עם Quick Tunnel
- **לפרודקשן** - עדיף ליצור Named Tunnel (ראה `TUNNEL_SETUP.md`)

---

**הצלחה! 🎉**

