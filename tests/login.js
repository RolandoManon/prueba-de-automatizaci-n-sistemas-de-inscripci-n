const { Builder, By } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');
const allure = require('allure-commandline'); // Para generar el reporte

describe("Login", () => {
    // Solo esta prueba se ejecutará
    it("Login with standard_user credentials", async () => {
        let driver = new Builder().forBrowser('chrome').build();

        // Función para tomar captura de pantalla
        const takeScreenshot = async (step, driver) => {
            const screenshot = await driver.takeScreenshot();
            const screenshotsFolder = path.join(__dirname, 'screenshots');
            
            // Crear la carpeta 'screenshots' si no existe
            if (!fs.existsSync(screenshotsFolder)) {
                fs.mkdirSync(screenshotsFolder, { recursive: true });
            }

            const screenshotPath = path.join(screenshotsFolder, `screenshot_${step}.png`);
            fs.writeFileSync(screenshotPath, screenshot, 'base64');
            console.log(`Captura de pantalla tomada: ${screenshotPath}`);
        };

        try {
            // Paso 1: Abrir la página
            await driver.get('https://www.facebook.com');
            await takeScreenshot('01_open_page', driver); // Captura después de abrir la página

            // Paso 2: Introducir el nombre de usuario
            await driver.findElement(By.id('email')).sendKeys('ronal2223@hotmail.com');
            await takeScreenshot('02_enter_username', driver); // Captura después de introducir el usuario

            // Paso 3: Introducir la contraseña
            await driver.findElement(By.css('#pass')).sendKeys('del1alocho');
            await takeScreenshot('03_enter_password', driver); // Captura después de introducir la contraseña

            // Paso 4: Hacer clic en el botón de login
            await driver.findElement(By.css('[data-testid="royal_login_button"]')).click();
            await takeScreenshot('04_click_login', driver); // Captura después de hacer clic en el botón

            // Espera para ver el resultado final
            await driver.sleep(10000);
            await takeScreenshot('05_final', driver); // Captura final después de la espera

        } catch (err) {
            console.error("Error durante la prueba:", err);
            await takeScreenshot('error_scenario', driver); // Captura en caso de error
        } finally {
            await driver.quit();
        }
    });

    // Esta prueba no se ejecutará porque no tiene .only
    it.only("Login with standard_user credentials (test fallido)", async () => {
        let driver = new Builder().forBrowser('chrome').build();

        // Función para tomar captura de pantalla
        const takeScreenshot = async (step, driver) => {
            const screenshot = await driver.takeScreenshot();
            const screenshotsFolder = path.join(__dirname, 'screenshots');
            
            // Crear la carpeta 'screenshots' si no existe
            if (!fs.existsSync(screenshotsFolder)) {
                fs.mkdirSync(screenshotsFolder, { recursive: true });
            }

            const screenshotPath = path.join(screenshotsFolder, `screenshot_${step}.png`);
            fs.writeFileSync(screenshotPath, screenshot, 'base64');
            console.log(`Captura de pantalla tomada: ${screenshotPath}`);
        };

        try {
            // Paso 1: Abrir la página
            await driver.get('https://www.facebook.com');
            await takeScreenshot('01_open_page', driver); // Captura después de abrir la página

            // Paso 2: Introducir el nombre de usuario
            await driver.findElement(By.id('email')).sendKeys('ronal2223@');
            await takeScreenshot('02_enter_username', driver); // Captura después de introducir el usuario

            // Paso 3: Introducir la contraseña
            await driver.findElement(By.css('#pass')).sendKeys('delocho');
            await takeScreenshot('03_enter_password', driver); // Captura después de introducir la contraseña

            // Paso 4: Intentar hacer clic en un botón que no existe (esto fallará)
            await driver.findElement(By.css('[data-testid="royal_login_button"]')).click(); // Elemento incorrecto
            await takeScreenshot('04_click_login', driver); // Captura después de hacer clic en el botón

            // Espera para ver el resultado final
            await driver.sleep(10000);
            await takeScreenshot('05_final', driver); // Captura final después de la espera

        } catch (err) {
            console.error("Error durante la prueba:", err);
            await takeScreenshot('error_scenario', driver); // Captura en caso de error
        } finally {
            await driver.quit();
        }
    });
});

// Hook para generar reporte con Allure después de la prueba
after(() => {
    const allureReport = allure(['generate', './allure-results', '--clean']);
    allureReport.on('exit', (code) => {
        if (code === 0) {
            console.log('Reporte generado con éxito.');
        } else {
            console.log('Error al generar el reporte.');
        }
    });
});
