@echo off
echo ======================================
echo  🚀  Iniciando despliegue de TCT Services
echo ======================================
cd /d %~dp0
npm run full-deploy
echo.
echo ✅ Publicación completada en GitHub Pages
echo Abriendo sitio web...
start https://eteruel21.github.io/tct-portfolio/
echo.
echo Presiona una tecla para salir...
pause >nul
