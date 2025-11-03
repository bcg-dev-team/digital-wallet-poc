/**
 * 인증 및 비밀번호 관련 타입 정의
 */

/**
 * zxcvbn 비밀번호 강도 분석 결과 타입
 */
export interface ZxcvbnResult {
  score: 0 | 1 | 2 | 3 | 4;
  feedback: {
    warning: string;
    suggestions: string[];
  };
  crack_times_display: {
    online_throttling_100_per_hour: string | number;
    online_no_throttling_10_per_second: string | number;
    offline_slow_hashing_1e4_per_second: string | number;
    offline_fast_hashing_1e10_per_second: string | number;
  };
  sequence: Array<{
    pattern: string;
    i: number;
    j: number;
    token: string;
    matched_word: string;
    rank: number;
    dictionary_name: string;
    reversed: boolean;
    l33t: boolean;
    guesses: number;
    guesses_log10: number;
  }>;
  calc_time: number;
}

/**
 * 비밀번호 강도 표시 타입
 */
export interface PasswordStrengthDisplay {
  score: 0 | 1 | 2 | 3 | 4;
  label: '매우 약함' | '약함' | '보통' | '강함' | '매우 강함';
  color: 'red' | 'orange' | 'yellow' | 'light-green' | 'green';
  progressColor: string;
  feedback: string[];
  crackTime: string | number;
}
