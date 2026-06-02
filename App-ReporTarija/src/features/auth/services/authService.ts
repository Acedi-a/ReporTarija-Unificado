
import { insforge } from '../../../lib/insforge';
import type { User } from '../../../shared/types';
import type { LoginDto } from '../dtos/login.dto';
import type { RegisterDto } from '../dtos/register.dto';



function translateAuthError(message: string | undefined): string {
  if (!message) return 'Ha ocurrido un error inesperado';

  const msgLower = message.toLowerCase();

  if (msgLower.includes('invalid login credentials') || msgLower.includes('invalid credentials')) {
    return 'Correo o contraseña incorrectos';
  }
  if (msgLower.includes('email not confirmed')) {
    return 'El correo electrónico no ha sido verificado aún';
  }
  if (
    msgLower.includes('user already registered') ||
    msgLower.includes('already exists') ||
    msgLower.includes('email already in use')
  ) {
    return 'Este correo electrónico ya está registrado';
  }
  if (msgLower.includes('password should be at least')) {
    return 'La contraseña debe tener al menos 6 caracteres';
  }
  if (msgLower.includes('invalid email') || msgLower.includes('email format')) {
    return 'El formato del correo electrónico es inválido';
  }
  if (msgLower.includes('rate limit') || msgLower.includes('too many requests')) {
    return 'Demasiados intentos. Por favor, espera un momento y vuelve a intentarlo.';
  }
  if (msgLower.includes('network') || msgLower.includes('fetch')) {
    return 'Error de conexión. Verifica tu conexión a internet.';
  }

  return message;
}

export async function login(credentials: LoginDto): Promise<User> {
  const { data: authData, error: authError } = await insforge.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });

  if (authError) {
    throw new Error(translateAuthError(authError.message));
  }

  if (!authData?.user) {
    throw new Error('No se pudo obtener la información del usuario');
  }

  const { data: users, error: dbError } = await insforge.database
    .from('users')
    .select()
    .eq('email', credentials.email)
    .limit(1);

  if (dbError) {
    throw new Error('Error al obtener perfil del usuario');
  }

  if (!users || users.length === 0) {
    throw new Error('Usuario no encontrado en el sistema');
  }

  const user = users[0] as User;

  if (!user.is_active) {
    throw new Error('Tu cuenta ha sido desactivada');
  }

  return user;
}


export async function register(userData: RegisterDto): Promise<User> {
  const { data: authData, error: authError } = await insforge.auth.signUp({
    email: userData.email,
    password: userData.password,
    name: userData.fullName,
  });

  if (authError) {
    throw new Error(translateAuthError(authError.message));
  }

  if (!authData?.user) {
    throw new Error('No se pudo crear la cuenta');
  }

  const newUser = {
    id: authData.user.id,
    full_name: userData.fullName,
    email: userData.email,
    phone: userData.phone || null,
    role: 'CITIZEN' as const,
    is_active: true,
  };

  const { data: createdUsers, error: dbError } = await insforge.database
    .from('users')
    .insert(newUser)
    .select();

  if (dbError) {
    console.error('Error al crear perfil en DB:', dbError);
    return {
      ...newUser,
      area_id: null,
      reputation_points: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }

  return (createdUsers?.[0] as User) || {
    ...newUser,
    area_id: null,
    reputation_points: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export async function logout(): Promise<void> {
  const { error } = await insforge.auth.signOut();
  if (error) {
    console.error('Error al cerrar sesión:', error);
  }
}


export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: authData } = await insforge.auth.getCurrentUser();

    if (!authData?.user) {
      return null;
    }

    const { data: users } = await insforge.database
      .from('users')
      .select()
      .eq('email', authData.user.email)
      .limit(1);

    if (!users || users.length === 0) {
      return null;
    }

    return users[0] as User;
  } catch {
    return null;
  }
}
