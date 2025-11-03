import type { ZxcvbnResult } from '@template/types';

let zxcvbnModule: any = null;

/**
 * zxcvbn을 사용하여 비밀번호 강도를 분석합니다.
 *
 * @param password - 분석할 비밀번호
 * @param userInputs - 사용자 입력값들 (이메일, 이름 등) - 이 값들이 비밀번호에 포함되면 강도가 낮아집니다
 * @returns zxcvbn 분석 결과
 */
export async function analyzePasswordStrength(
  password: string,
  userInputs: string[] = []
): Promise<ZxcvbnResult> {
  if (!zxcvbnModule) {
    const { default: zxcvbn } = await import('zxcvbn');
    zxcvbnModule = zxcvbn;
  }

  return zxcvbnModule(password, userInputs);
}
