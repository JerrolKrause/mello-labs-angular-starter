REM @echo off

setlocal

SET PATH=%PATH%;%AppData%\npm

IF "%1"=="" (
    SET OUTPUT_PATH=bin
) ELSE (
    SET OUTPUT_PATH=%1\
)

echo %OUTPUT_PATH%

call npm install -g @angular/cli
if %errorlevel% neq 0 exit /b %errorlevel%
call npm install 
if %errorlevel% neq 0 exit /b %errorlevel%
call ng build --prod --aot 
if %errorlevel% neq 0 exit /b %errorlevel%


rd %OUTPUT_PATH% /s /q
mkdir %OUTPUT_PATH%
mkdir %OUTPUT_PATH%\dist

xcopy /E /I /Y dist %OUTPUT_PATH%\dist
if %errorlevel% neq 0 exit /b %errorlevel%


endlocal
