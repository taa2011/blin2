@echo off
set "PATH=%APPDATA%\npm;%~dp0;%PATH%"
setlocal enabledelayedexpansion
npm start
endlocal
