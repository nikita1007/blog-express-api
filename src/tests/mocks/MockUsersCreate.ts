import { IUserResponse } from '../../services/UserService';
import UserService from '../../services/UserService';
import { LoginResponse } from '../../services/AuthService';
import AuthService from '../../services/AuthService';


interface IFakeUser {
  username: string;
  password: string;
}

const fake_users: IFakeUser[] = [
{"username":"badamik0","password":"tlgwX19M"},
{"username":"kjubb1","password":"ibnDrr1zkRzU"},
{"username":"dstigger2","password":"9xyLYg5I6k51"},
{"username":"vodrought3","password":"uQ2utLzEH"},
{"username":"mbrandham4","password":"wiklsV"}
];

for (let i = 0; i < 5; i++) {
  (async () => {
    const user: IUserResponse = await new UserService().createUser(fake_users[i].username, fake_users[i].password)
        
    if (user.hasOwnProperty('error')) {
      console.log(user);
    }
    else {
      const token: LoginResponse = (await new AuthService().login(user.username, user.password))
      
      if (token.hasOwnProperty('error')) {
        console.log(token);
      }
    }
  })();
}

console.log("Пользователи были успешно созданы и авторизированы!");


