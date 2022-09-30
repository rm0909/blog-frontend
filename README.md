### Netlify page: https://thais-blog.netlify.app/



Minha prima me pediu para eu criar um blog para ela postar os trabalhos da faculdade de pedagogia.

Então como eu já tenho experiencias com projetos que usam mongodb e express, não tive muitas dificuldades no backend. 

Criei um model mongoose para uma unica conta de admin, afinal só ela irá postar. 

E criei um model para posts (titulo, texto e imagem). 

Terminei o backend e fiz o deploy no Railway (RIP heroku). 

Usando React-Router Fiz uma tela de login e uma tela de post onde só ela terá acesso. 

Minha maior duvida foi saber como eu iria permitir ela postar imagens e quebrar linha de texto...  

Então eu achei esse React-Quill um componente de editor de texto muito fácil de usar. 

Usei bootstrap como framework pois eu estava mais preocupado em fazer funcionar. 

Então eu fiz a tela principal onde mostra os posts em cards.  

Depois eu fiz a pagina dos artigos e depois foi só consertar as falhas no css (ainda deve ter algum 🤭).  


![admin page](https://user-images.githubusercontent.com/88063797/193212406-a08a0b00-466c-4e58-a8bf-40a128c8d857.png)
![post page](https://user-images.githubusercontent.com/88063797/193215238-96c96458-b8e3-4056-a553-1a77274ce83d.png)

### Feito com:
- Mongodb, Express, Cloudinary
- React: Bootstrap, Quill, Hooks.
- Netlify, vite.

### O que eu aprendi:
- Criar um editor de texto com React-Quill

### Maiores dificuldades:
- Montar layout da pagina
- CSS e responsividade

### O que eu preciso melhorar:
- Aprender Nextjs
- Usar outro framework alem do bootstrap
