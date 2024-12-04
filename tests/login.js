const { Builder, By } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');
const allure = require('allure-commandline'); 

describe("Login", () => {
    
    it.only("Login with standard_user credentials", async () => {
        let driver = new Builder().forBrowser('chrome').build();

        // Función para tomar captura de pantalla
        const takeScreenshot = async (step, driver) => {
            const screenshot = await driver.takeScreenshot();
            const screenshotsFolder = path.join(__dirname, 'screenshots');
            
            
            if (!fs.existsSync(screenshotsFolder)) {
                fs.mkdirSync(screenshotsFolder, { recursive: true });
            }

            const screenshotPath = path.join(screenshotsFolder, `screenshot_${step}.png`);
            fs.writeFileSync(screenshotPath, screenshot, 'base64');
            console.log(`Captura de pantalla tomada: ${screenshotPath}`);
        };

        try {
            
            await driver.get('http://127.0.0.1:5502/index.html');
            await takeScreenshot('01_open_page', driver); 

            
            await driver.findElement(By.id('name')).sendKeys('Rolando Mañon Henriquez');
            await takeScreenshot('03_enter_username', driver); 

            await driver.findElement(By.id('provincia')).sendKeys('Santo domingo este');
            await takeScreenshot('04_enter_provincia', driver); 

            await driver.findElement(By.id('ciudad')).sendKeys('Juan Bosch');
            await takeScreenshot('05_enter_Ciudad', driver); 

            await driver.findElement(By.id('sector')).sendKeys('Palmeras del este');
            await takeScreenshot('07_enter_sector', driver);

            await driver.findElement(By.id('calle')).sendKeys('camino real');
            await takeScreenshot('08_enter_Calle', driver); 

            await driver.findElement(By.id('carrera')).sendKeys('software');
            await takeScreenshot('09_select_Carrera', driver); 

            

            // Paso 4: Hacer clic en el botón de login
            await driver.findElement(By.id('registrar')).click();
            await takeScreenshot('10_click_registrar', driver); 

            
            await driver.sleep(10000);
            await takeScreenshot('05_final', driver); 

        } catch (err) {
            console.error("Error durante la prueba:", err);
            await takeScreenshot('error_scenario', driver); 
        } finally {
            await driver.quit();
        }
    });

    
    it("Login with standard_user credentials (test fallido)", async () => {
        let driver = new Builder().forBrowser('chrome').build();

        
        const takeScreenshot = async (step, driver) => {
            const screenshot = await driver.takeScreenshot();
            const screenshotsFolder = path.join(__dirname, 'screenshots');
            
            
            if (!fs.existsSync(screenshotsFolder)) {
                fs.mkdirSync(screenshotsFolder, { recursive: true });
            }

            const screenshotPath = path.join(screenshotsFolder, `screenshot_${step}.png`);
            fs.writeFileSync(screenshotPath, screenshot, 'base64');
            console.log(`Captura de pantalla tomada: ${screenshotPath}`);
        };

        try {
            
            await driver.get('https://www.facebook.com');
            await takeScreenshot('01_open_page', driver); 

            await driver.findElement(By.id('email')).sendKeys('ronal2223@');
            await takeScreenshot('02_enter_username', driver); 

            
            await driver.findElement(By.css('#pass')).sendKeys('delocho');
            await takeScreenshot('03_enter_password', driver);

           
            await driver.findElement(By.css('[data-testid="royal_login_button"]')).click(); 
            await takeScreenshot('04_click_login', driver); 

          
            await driver.sleep(10000);
            await takeScreenshot('05_final', driver); 

        } catch (err) {
            console.error("Error durante la prueba:", err);
            await takeScreenshot('error_scenario', driver); 
        } finally {
            await driver.quit();
        }
    });
});


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
