// V.2 web-scrapping 



//Declarações iniciais
const pupper = require("puppeteer");
const fs = require("fs");
const fsp = require("fs/promises");

const url = "https://en.wikipedia.org/wiki/List_of_dog_breeds";
let cont = 0;

//iniciando puppeteer
(async () =>{

    const browser = await pupper.launch({headless: false});
    const page = await browser.newPage();

    await page.goto(url);
    
    //armazenando os links e nomes de cachorros em listas
    const links = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".div-col ul li > a")).map(n => n.href)
    })

    const nomes = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".div-col ul li > a")).map(n => n.title)
    })
   


    function makedir(dir){
        fs.access(dir, fs.constants.F_OK, (err) => { 
            if (err) {
                fs.mkdir(dir, (error) => {
                    if (error){
                        console.log(error);
                    }
                    else {
                        console.log(`Caminho ${dir} Criado`)
                        cont++;
                    }
                });
                return;
            } return;
        });
    }


    //Solicita a função que cria diretórios e Cria pastas Com os nomes das raças de Cachorro
    makedir("Dogs")
    for(const nome of nomes) {
        const dir = `./Dogs/${nome}`;
        makedir(dir)
    }

    let j = 250;
    
    for(m = 250; m<400; m++ ){

        await page.goto(links[m]);
        page.waitForNavigation()

        const imagens = await page.evaluate(() => {
            var lista = [];
            var listae = [];

            
            let i = 0;
            for(img of document.querySelectorAll("img")){
                if (document.querySelectorAll("img")[i].height > 70 & document.querySelectorAll("img")[i].width > 70){
                    lista.push(document.querySelectorAll("img")[i].src);
                }else{
                    listae.push(document.querySelectorAll("img")[i].src);
                }
                i ++;
            }
            return lista
        });


        var cod = 0
        for(const imagem of imagens){

            const pagina = await page.goto(imagem)
            await page.setDefaultNavigationTimeout(0); 


            await fsp.writeFile(`./Dogs/${nomes[j]}/${cod}.${imagem.split("/").pop()}`, await pagina.buffer())
            cod ++;
        }
        j ++;
        //console.log("Salvei")
        //console.log(imagens)
    }

    
    console.log(`${cont} Pastas Criadas!`)
    await browser.close();

})();


//width and height
