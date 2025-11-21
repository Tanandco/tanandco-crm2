# ============================================
# Cloudflare Tunnel - הפעלה אוטומטית
# ============================================
# סקריפט זה מוריד ומפעיל את Cloudflare Tunnel
# כדי לחבר את BioStar המקומי לשרת הענן

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Cloudflare Tunnel - הפעלה" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# ============================================
# שלב 1: בדיקה שה-BioStar רץ מקומית
# ============================================
$BIOSTAR_URL = "http://localhost:5000"
Write-Host "[1/4] בודק אם BioStar רץ ב-$BIOSTAR_URL..." -ForegroundColor Yellow

# נסה מספר פורטים נפוצים
$ports = @(5000, 443, 8443, 80)
$found = $false

foreach ($port in $ports) {
    $testUrl = "http://localhost:$port"
    try {
        $null = Invoke-WebRequest -Uri $testUrl -UseBasicParsing -TimeoutSec 3 -ErrorAction Stop
        Write-Host "✅ BioStar זמין ב-$testUrl!" -ForegroundColor Green
        $BIOSTAR_URL = $testUrl
        $found = $true
        break
    } catch {
        # ממשיך לנסות
    }
}

if (-not $found) {
    Write-Host "❌ BioStar לא נמצא ב-localhost" -ForegroundColor Red
    Write-Host ""
    Write-Host "אפשרויות:" -ForegroundColor Yellow
    Write-Host "   1. ודא ש-BioStar רץ על המחשב" -ForegroundColor Gray
    Write-Host "   2. פתח בדפדפן: http://localhost:5000" -ForegroundColor Gray
    Write-Host "   3. אם BioStar רץ על פורט אחר, עדכן את הסקריפט" -ForegroundColor Gray
    Write-Host ""
    Write-Host "האם להמשיך בכל זאת? (Y/N)" -ForegroundColor Yellow
    $continue = Read-Host
    if ($continue -ne "Y" -and $continue -ne "y") {
        exit 1
    }
}

Write-Host ""

# ============================================
# שלב 2: הורדת cloudflared (אם לא קיים)
# ============================================
$dir = "$env:USERPROFILE\.cloudflared"
$exe = Join-Path $dir "cloudflared.exe"

if (-not (Test-Path $exe)) {
    Write-Host "[2/4] מוריד cloudflared..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
    
    try {
        $downloadUrl = "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe"
        Invoke-WebRequest -Uri $downloadUrl -OutFile $exe -UseBasicParsing
        Write-Host "✅ cloudflared הורד בהצלחה!" -ForegroundColor Green
    } catch {
        Write-Host "❌ שגיאה בהורדת cloudflared: $_" -ForegroundColor Red
        Write-Host "   נסה להוריד ידנית מ: https://github.com/cloudflare/cloudflared/releases" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "לחץ Enter כדי לסגור..." -ForegroundColor Gray
        Read-Host
        exit 1
    }
} else {
    Write-Host "[2/4] cloudflared כבר מותקן" -ForegroundColor Green
}

Write-Host ""

# ============================================
# שלב 3: הפעלת המנהרה
# ============================================
Write-Host "[3/4] מפעיל מנהרה..." -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  חשוב:" -ForegroundColor Yellow
Write-Host "   - המנהרה תרוץ כל עוד החלון הזה פתוח" -ForegroundColor Gray
Write-Host "   - אל תסגור את החלון הזה!" -ForegroundColor Gray
Write-Host "   - העתק את ה-URL שיופיע למטה" -ForegroundColor Gray
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "המנהרה פעילה! העתק את ה-URL למטה:" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# הפעלת המנהרה
& $exe tunnel --url $BIOSTAR_URL

# אם המנהרה נסגרה
Write-Host ""
Write-Host "========================================" -ForegroundColor Red
Write-Host "המנהרה נסגרה!" -ForegroundColor Red
Write-Host "========================================" -ForegroundColor Red
Write-Host ""
Write-Host "לחץ Enter כדי לסגור..." -ForegroundColor Gray
Read-Host

