# testTask_legro
Запуск:
    1. отредактировать конфиг файл по пути: 
    
    src/config/config.dev.json
        
    2. ставим зависимости:
    
    npm install
    
    3. установить глобально
    
    npm i -g gulp typescript
    
    4. сбилдить сервер
    
    npm run build
    
    5. запустить
    
    npm run start

Апи: 
    /users/signup - POST {email, name, password}, регистрация
    /users/signin - POST {email, password}, авторизация
    
    последующие запросы требуют авторизации (наличие хедера Authorization - Bearer xxxTOKENxxx):
    
    /todoItem/list - GET получить список всех тодо юзера
    /todoItem/create - POST {text}, создать тодо
    /todoItem/update - POST {id, text}, редактировать тодо
    /todoItem/finish/{id} - POST, выполнить тодо
    /todoItem/delete/{id} - DELETE удалить тодо
    