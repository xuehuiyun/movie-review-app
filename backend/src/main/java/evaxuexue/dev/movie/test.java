package evaxuexue.dev.movie;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class test {
    public static void main(String[] args) throws InterruptedException {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");
        WebDriver webDriver = new ChromeDriver(options);
        webDriver.get("http://localhost:3000/");
        webDriver.findElement(By.xpath("//*[@id=\"123456\"]")).click();
        webDriver.findElement(By.xpath("//*[@id=\"formUsername\"]")).sendKeys("123");
        webDriver.findElement(By.xpath("//*[@id=\"formPassword\"]")).sendKeys("123");
        webDriver.findElement(By.xpath("/html/body/div[3]/div/div/div[3]/button[2]")).click();
        Thread.sleep(8000);
        webDriver.findElement(By.xpath("//*[@id=\"root\"]/div/main/div/div/div/div[1]/div[2]/div/div/div/div/div/div/div/div[3]/div/button")).click();
        webDriver.findElement(By.xpath("//*[@id=\"exampleForm.ControlTextarea1\"]")).sendKeys("123");
        webDriver.findElement(By.xpath("//*[@id=\"root\"]/div/main/div/div[2]/div[2]/div[1]/div/form/button")).click();
        
        Thread.sleep(3000);
        webDriver.findElement(By.xpath("//*[@id=\"navbarScroll\"]/div/a[2]")).click();
        webDriver.findElement(By.xpath("//*[@id=\"root\"]/div/main/div/main/div/input")).sendKeys("s");
        webDriver.findElement(By.xpath("//*[@id=\"root\"]/div/main/div/main/div/button")).click();
        
    }
}
