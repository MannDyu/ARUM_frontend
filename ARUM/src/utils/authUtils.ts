import AsyncStorage from '@react-native-async-storage/async-storage';

export const validateEmail = (email: string): boolean => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return re.test(email);
};

export const validatePassword = (password: string): boolean => {
  // 최소 8자, 문자, 숫자, 특수문자 포함
  const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return re.test(password);
};

export const checkUsernameAvailability = async (nickname: string): Promise<boolean> => {
  // 여기에 실제 서버 API 호출 로직 구현
  // 예시로 항상 사용 가능하다고 가정
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 1000);
  });
};

// 토큰 저장
export const storeToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (e) {
    console.error('Failed to save the token to storage', e);
  }
};

// 토큰 가져오기
export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('userToken');
  } catch (e) {
    console.error('Failed to get the token from storage', e);
    return null;
  }
};

// 토큰 제거
export const removeToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('userToken');
  } catch (e) {
    console.error('Failed to remove the token from storage', e);
  }
};

// 토큰 유효성 검사 (예시 함수, 실제 구현은 서버와의 통신이 필요할 수 있음)
export const isTokenValid = async (): Promise<boolean> => {
  const token = await getToken();
  // 여기에 토큰 유효성 검사 로직 구현
  // 예를 들어, 토큰의 만료 시간을 확인하거나 서버에 검증 요청을 보낼 수 있습니다.
  return !!token; // 간단한 예시: 토큰이 존재하면 유효하다고 가정
};