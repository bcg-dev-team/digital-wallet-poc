<template>
  <div class="utils-example">
    <h1>유틸리티 함수 예시</h1>
    <p class="description">@template/utils 패키지의 함수들을 실제로 활용하는 예시</p>

    <!-- 문자열 유틸리티 -->
    <section class="utils-section">
      <h2>📝 문자열 유틸리티</h2>
      <div class="utils-grid">
        <div class="util-card">
          <h3>케이스 변환</h3>
          <div class="input-group">
            <BaseInput
              name="case-input"
              v-model="caseInput"
              placeholder="변환할 문자열을 입력하세요"
              label="입력 문자열"
            />
          </div>
          <div class="results">
            <div class="result-item"><strong>카멜케이스:</strong> {{ toCamelCase(caseInput) }}</div>
            <div class="result-item">
              <strong>파스칼케이스:</strong> {{ toPascalCase(caseInput) }}
            </div>
            <div class="result-item"><strong>케밥케이스:</strong> {{ toKebabCase(caseInput) }}</div>
            <div class="result-item">
              <strong>스네이크케이스:</strong> {{ toSnakeCase(caseInput) }}
            </div>
            <div class="result-item">
              <strong>제목 케이스:</strong> {{ toTitleCase(caseInput) }}
            </div>
          </div>
        </div>

        <div class="util-card">
          <h3>문자열 검증</h3>
          <div class="input-group">
            <BaseInput
              name="email-input"
              v-model="emailInput"
              placeholder="이메일을 입력하세요"
              label="이메일 검증"
            />
            <BaseInput
              name="url-input"
              v-model="urlInput"
              placeholder="URL을 입력하세요"
              label="URL 검증"
            />
          </div>
          <div class="results">
            <div class="result-item">
              <strong>이메일 유효성:</strong>
              <span
                :class="{ valid: isValidEmail(emailInput), invalid: !isValidEmail(emailInput) }"
              >
                {{ isValidEmail(emailInput) ? '✅ 유효' : '❌ 유효하지 않음' }}
              </span>
            </div>
            <div class="result-item">
              <strong>URL 유효성:</strong>
              <span :class="{ valid: isValidUrl(urlInput), invalid: !isValidUrl(urlInput) }">
                {{ isValidUrl(urlInput) ? '✅ 유효' : '❌ 유효하지 않음' }}
              </span>
            </div>
          </div>
        </div>

        <div class="util-card">
          <h3>문자열 처리</h3>
          <div class="input-group">
            <BaseInput
              name="truncate-input"
              v-model="truncateInput"
              placeholder="자를 문자열을 입력하세요"
              label="문자열 자르기"
            />
            <BaseInput
              name="truncate-length"
              v-model="truncateLength"
              type="number"
              placeholder="길이"
              label="최대 길이"
            />
          </div>
          <div class="results">
            <div class="result-item">
              <strong>자른 결과:</strong>
              {{ truncate(truncateInput, Number(truncateLength) || 20) }}
            </div>
            <div class="result-item">
              <strong>숫자만 추출:</strong> {{ extractNumbers(truncateInput) }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 날짜 유틸리티 -->
    <section class="utils-section">
      <h2>📅 날짜 유틸리티</h2>
      <div class="utils-grid">
        <div class="util-card">
          <h3>날짜 포맷팅</h3>
          <div class="input-group">
            <BaseInput name="date-input" v-model="dateInput" type="date" label="날짜 선택" />
          </div>
          <div class="results">
            <div class="result-item"><strong>기본 형식:</strong> {{ formatDate(dateInput) }}</div>
            <div class="result-item">
              <strong>한국어 형식:</strong> {{ formatDate(dateInput, 'yyyy년 MM월 dd일') }}
            </div>
            <div class="result-item">
              <strong>영어 형식:</strong> {{ formatDate(dateInput, 'MMMM dd, yyyy', 'en') }}
            </div>
            <div class="result-item">
              <strong>상대적 시간:</strong> {{ formatRelativeTime(dateInput) }}
            </div>
          </div>
        </div>

        <div class="util-card">
          <h3>날짜 검증</h3>
          <div class="results">
            <div class="result-item">
              <strong>오늘인가요?</strong> {{ isTodayDate(dateInput) ? '✅ 예' : '❌ 아니오' }}
            </div>
            <div class="result-item">
              <strong>어제인가요?</strong> {{ isYesterdayDate(dateInput) ? '✅ 예' : '❌ 아니오' }}
            </div>
            <div class="result-item">
              <strong>이번 주인가요?</strong>
              {{ isThisWeekDate(dateInput) ? '✅ 예' : '❌ 아니오' }}
            </div>
            <div class="result-item">
              <strong>이번 달인가요?</strong>
              {{ isThisMonthDate(dateInput) ? '✅ 예' : '❌ 아니오' }}
            </div>
          </div>
        </div>

        <div class="util-card">
          <h3>나이 계산</h3>
          <div class="input-group">
            <BaseInput name="birth-input" v-model="birthInput" type="date" label="생년월일" />
          </div>
          <div class="results">
            <div class="result-item"><strong>나이:</strong> {{ calculateAge(birthInput) }}세</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 실시간 업데이트 -->
    <section class="utils-section">
      <h2>🕐 실시간 업데이트</h2>
      <div class="utils-grid">
        <div class="util-card">
          <h3>현재 시간</h3>
          <div class="results">
            <div class="result-item">
              <strong>한국 시간:</strong> {{ formatDate(nowInTimezone(), 'yyyy-MM-dd HH:mm:ss') }}
            </div>
            <div class="result-item">
              <strong>UTC 시간:</strong>
              {{ formatDate(nowInTimezone('UTC'), 'yyyy-MM-dd HH:mm:ss') }}
            </div>
            <div class="result-item">
              <strong>도쿄 시간:</strong>
              {{ formatDate(nowInTimezone('Asia/Tokyo'), 'yyyy-MM-dd HH:mm:ss') }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  // 문자열 유틸리티
  toCamelCase,
  toPascalCase,
  toKebabCase,
  toSnakeCase,
  toTitleCase,
  truncate,
  extractNumbers,
  isValidEmail,
  isValidUrl,
  // 날짜 유틸리티
  formatDate,
  formatRelativeTime,
  isTodayDate,
  isYesterdayDate,
  isThisWeekDate,
  isThisMonthDate,
  calculateAge,
  nowInTimezone,
} from '@template/utils';
import { ref, onMounted, onUnmounted } from 'vue';
import { BaseInput } from '@template/ui';

// 반응형 상태
const caseInput = ref('hello world example');
const emailInput = ref('test@example.com');
const urlInput = ref('https://example.com');
const truncateInput = ref('이것은 매우 긴 문자열 예시입니다.');
const truncateLength = ref('10');
const dateInput = ref(new Date().toISOString().split('T')[0]);
const birthInput = ref('1990-01-01');

// 실시간 시간 업데이트
let timeInterval: ReturnType<typeof setInterval>;

onMounted(() => {
  // 1초마다 시간 업데이트
  timeInterval = setInterval(() => {
    // 반응형 업데이트를 위해 강제로 트리거
    dateInput.value = dateInput.value;
  }, 1000);
});

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval);
  }
});
</script>

<style scoped>
.utils-example {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.description {
  color: #7f8c8d;
  margin-bottom: 2rem;
}

.utils-section {
  margin-bottom: 3rem;
}

.utils-section h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.utils-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.util-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.util-card h3 {
  margin-bottom: 1rem;
  color: #2c3e50;
  font-size: 1.2rem;
}

.input-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.results {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.result-item {
  margin-bottom: 0.5rem;
  padding: 0.25rem 0;
  border-bottom: 1px solid #f8f9fa;
}

.result-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.result-item strong {
  color: #2c3e50;
  margin-right: 0.5rem;
}

.valid {
  color: #28a745;
}

.invalid {
  color: #dc3545;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .utils-grid {
    grid-template-columns: 1fr;
  }

  .util-card {
    padding: 1rem;
  }
}
</style>
