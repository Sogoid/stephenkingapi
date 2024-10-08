import {User} from '../model/user';

// Declaração do tipo
const fakeUser: User = {
  id: 1,
  username: 'admin',
  token: '123456abcef',
};

export const login = async (
  username: string,
  password: string,
): Promise<User> => {
  console.log(`Verificando usuário: ${username} e senha: ${password}`);
  if (username === 'admin' && password === 'password') {
    return fakeUser;
  } else {
    throw new Error('Usuário ou senha inválidos.');
  }
};

export const logout = (): void => {
  // Limpar a seção de usuário
  localStorage.removeItem('user');
};
