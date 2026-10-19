@echo off
title SpectreHub Launcher
cd /d "%~dp0"

if not exist "node_modules" (
  echo Installing SpectreHub dependencies...
  call npm install
)

echo Starting SpectreHub on http://localhost:1420 ...
start "" /b cmd /c "npm run dev"

timeout /t 2 /nobreak >nul
where msedge >nul 2>nul
if %errorlevel%==0 (
  start "" msedge --app=http://localhost:1420
) else (
  start "" http://localhost:1420
)
