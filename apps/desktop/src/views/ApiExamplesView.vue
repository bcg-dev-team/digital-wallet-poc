<template>
  <div class="api-examples-view">
    <div class="header">
      <h1>🌐 API 예제</h1>
      <p>API 클라이언트 사용법과 예제를 확인하세요.</p>
    </div>

    <div class="content">
      <div class="api-overview">
        <h2>API 클라이언트 개요</h2>
        <div class="overview-grid">
          <div class="overview-card">
            <h3>🚀 주요 기능</h3>
            <ul class="feature-list">
              <li>타입 안전한 API 호출</li>
              <li>자동 에러 핸들링</li>
              <li>요청/응답 인터셉터</li>
              <li>타임아웃 설정</li>
              <li>재시도 로직</li>
              <li>캐싱 지원</li>
            </ul>
          </div>
          <div class="overview-card">
            <h3>📦 설치 및 설정</h3>
            <div class="code-block">
              <pre><code>import { ApiClient } from '@template/api';

const apiClient = new ApiClient({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});</code></pre>
            </div>
          </div>
        </div>
      </div>

      <div class="api-examples">
        <h2>API 사용 예제</h2>
        <div class="examples-grid">
          <div class="example-card" v-for="example in apiExamples" :key="example.title">
            <div class="example-header">
              <h3>{{ example.title }}</h3>
              <span class="example-method" :class="example.method">{{ example.method }}</span>
            </div>
            <p>{{ example.description }}</p>
            <div class="example-code">
              <h4>코드 예시:</h4>
              <div class="code-block">
                <pre><code>{{ example.code }}</code></pre>
              </div>
            </div>
            <div class="example-response" v-if="example.response">
              <h4>응답 예시:</h4>
              <div class="code-block">
                <pre><code>{{ example.response }}</code></pre>
              </div>
            </div>
            <div class="example-demo" v-if="example.demo">
              <h4>실시간 데모:</h4>
              <component :is="example.demo" />
            </div>
          </div>
        </div>
      </div>

      <div class="error-handling">
        <h2>에러 핸들링</h2>
        <div class="error-examples">
          <div class="error-card" v-for="error in errorExamples" :key="error.type">
            <h3>{{ error.type }}</h3>
            <p>{{ error.description }}</p>
            <div class="code-block">
              <pre><code>{{ error.code }}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <div class="interceptors">
        <h2>인터셉터</h2>
        <div class="interceptor-examples">
          <div class="interceptor-card" v-for="interceptor in interceptors" :key="interceptor.type">
            <h3>{{ interceptor.type }}</h3>
            <p>{{ interceptor.description }}</p>
            <div class="code-block">
              <pre><code>{{ interceptor.code }}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <div class="best-practices">
        <h2>베스트 프랙티스</h2>
        <div class="practices-grid">
          <div class="practice-card" v-for="practice in bestPractices" :key="practice.title">
            <h3>{{ practice.title }}</h3>
            <p>{{ practice.description }}</p>
            <div class="practice-example" v-if="practice.example">
              <h4>예시:</h4>
              <div class="code-block">
                <pre><code>{{ practice.example }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';

/**
 * API 예제 페이지 컴포넌트
 *
 * API 클라이언트 사용법과 예제를 보여줍니다.
 */

const apiExamples = [
  {
    title: 'GET 요청',
    method: 'GET',
    description: '데이터를 조회하는 GET 요청 예제입니다.',
    code: `// 사용자 목록 조회
const users = await apiClient.get<User[]>('/users');

// 특정 사용자 조회
const user = await apiClient.get<User>('/users/123');

// 쿼리 파라미터와 함께
const filteredUsers = await apiClient.get<User[]>('/users', {
  params: {
    page: 1,
    limit: 10,
    search: 'john'
  }
});`,
    response: `{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com"
    }
  ],
  "message": "Users retrieved successfully"
}`,
    demo: () =>
      h('div', { class: 'api-demo' }, [
        h(
          'button',
          {
            onClick: () => alert('GET /users 요청 시뮬레이션\n응답: 사용자 목록 조회 성공'),
          },
          'GET 요청 테스트'
        ),
        h('p', '클릭하여 GET 요청을 시뮬레이션하세요.'),
      ]),
  },
  {
    title: 'POST 요청',
    method: 'POST',
    description: '새로운 데이터를 생성하는 POST 요청 예제입니다.',
    code: `// 새 사용자 생성
const newUser = await apiClient.post<User>('/users', {
  name: 'Jane Doe',
  email: 'jane@example.com',
  role: 'user'
});

// 폼 데이터 전송
const formData = new FormData();
formData.append('file', file);
formData.append('description', 'Profile image');

const uploadResult = await apiClient.post('/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});`,
    response: `{
  "success": true,
  "data": {
    "id": "2",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": "User created successfully"
}`,
    demo: () =>
      h('div', { class: 'api-demo' }, [
        h(
          'button',
          {
            onClick: () => alert('POST /users 요청 시뮬레이션\n응답: 새 사용자 생성 성공'),
          },
          'POST 요청 테스트'
        ),
        h('p', '클릭하여 POST 요청을 시뮬레이션하세요.'),
      ]),
  },
  {
    title: 'PUT 요청',
    method: 'PUT',
    description: '기존 데이터를 완전히 교체하는 PUT 요청 예제입니다.',
    code: `// 사용자 정보 전체 업데이트
const updatedUser = await apiClient.put<User>('/users/123', {
  name: 'John Smith',
  email: 'john.smith@example.com',
  role: 'admin'
});`,
    response: `{
  "success": true,
  "data": {
    "id": "123",
    "name": "John Smith",
    "email": "john.smith@example.com",
    "updatedAt": "2024-01-15T11:00:00Z"
  },
  "message": "User updated successfully"
}`,
    demo: () =>
      h('div', { class: 'api-demo' }, [
        h(
          'button',
          {
            onClick: () => alert('PUT /users/123 요청 시뮬레이션\n응답: 사용자 정보 업데이트 성공'),
          },
          'PUT 요청 테스트'
        ),
        h('p', '클릭하여 PUT 요청을 시뮬레이션하세요.'),
      ]),
  },
  {
    title: 'PATCH 요청',
    method: 'PATCH',
    description: '기존 데이터의 일부를 수정하는 PATCH 요청 예제입니다.',
    code: `// 사용자 이메일만 업데이트
const patchedUser = await apiClient.patch<User>('/users/123', {
  email: 'newemail@example.com'
});

// 여러 필드 부분 업데이트
const partialUpdate = await apiClient.patch<User>('/users/123', {
  name: 'John Updated',
  role: 'moderator'
});`,
    response: `{
  "success": true,
  "data": {
    "id": "123",
    "name": "John Updated",
    "email": "newemail@example.com",
    "role": "moderator",
    "updatedAt": "2024-01-15T11:30:00Z"
  },
  "message": "User partially updated"
}`,
    demo: () =>
      h('div', { class: 'api-demo' }, [
        h(
          'button',
          {
            onClick: () =>
              alert('PATCH /users/123 요청 시뮬레이션\n응답: 사용자 정보 부분 업데이트 성공'),
          },
          'PATCH 요청 테스트'
        ),
        h('p', '클릭하여 PATCH 요청을 시뮬레이션하세요.'),
      ]),
  },
  {
    title: 'DELETE 요청',
    method: 'DELETE',
    description: '데이터를 삭제하는 DELETE 요청 예제입니다.',
    code: `// 사용자 삭제
await apiClient.delete('/users/123');

// 조건부 삭제
const deleteResult = await apiClient.delete('/users', {
  params: {
    inactive: true,
    before: '2024-01-01'
  }
});`,
    response: `{
  "success": true,
  "data": null,
  "message": "User deleted successfully"
}`,
    demo: () =>
      h('div', { class: 'api-demo' }, [
        h(
          'button',
          {
            onClick: () => alert('DELETE /users/123 요청 시뮬레이션\n응답: 사용자 삭제 성공'),
          },
          'DELETE 요청 테스트'
        ),
        h('p', '클릭하여 DELETE 요청을 시뮬레이션하세요.'),
      ]),
  },
];

const errorExamples = [
  {
    type: '네트워크 에러',
    description: '네트워크 연결 문제나 서버 응답 없음',
    code: `try {
  const data = await apiClient.get('/users');
} catch (error) {
  if (error.code === 'NETWORK_ERROR') {
    console.error('네트워크 연결을 확인하세요');
  }
}`,
  },
  {
    type: 'HTTP 에러',
    description: '4xx, 5xx 상태 코드 응답',
    code: `try {
  const user = await apiClient.get('/users/999');
} catch (error) {
  if (error.status === 404) {
    console.error('사용자를 찾을 수 없습니다');
  } else if (error.status === 500) {
    console.error('서버 내부 오류가 발생했습니다');
  }
}`,
  },
  {
    type: '타임아웃 에러',
    description: '요청 시간 초과',
    code: `try {
  const data = await apiClient.get('/slow-endpoint');
} catch (error) {
  if (error.code === 'TIMEOUT') {
    console.error('요청 시간이 초과되었습니다');
  }
}`,
  },
];

const interceptors = [
  {
    type: '요청 인터셉터',
    description: '요청을 보내기 전에 처리하는 인터셉터',
    code: `apiClient.interceptors.request.use(
  (config) => {
    // 인증 토큰 추가
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    
    // 요청 로깅
    console.log('요청:', config.method?.toUpperCase(), config.url);
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);`,
  },
  {
    type: '응답 인터셉터',
    description: '응답을 받은 후 처리하는 인터셉터',
    code: `apiClient.interceptors.response.use(
  (response) => {
    // 응답 로깅
    console.log('응답:', response.status, response.data);
    
    // 토큰 갱신
    const newToken = response.headers['x-new-token'];
    if (newToken) {
      localStorage.setItem('authToken', newToken);
    }
    
    return response;
  },
  (error) => {
    // 401 에러 시 로그아웃
    if (error.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);`,
  },
];

const bestPractices = [
  {
    title: '타입 안전성',
    description: '모든 API 호출에 적절한 타입을 정의하세요.',
    example: `// 타입 정의
interface User {
  id: string;
  name: string;
  email: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
  role: 'user' | 'admin';
}

// 타입 안전한 API 호출
const users = await apiClient.get<User[]>('/users');
const newUser = await apiClient.post<User>('/users', userData as CreateUserRequest);`,
  },
  {
    title: '에러 처리',
    description: '모든 API 호출에 적절한 에러 처리를 구현하세요.',
    example: `const fetchUsers = async () => {
  try {
    const users = await apiClient.get<User[]>('/users');
    return users;
  } catch (error) {
    if (error.status === 404) {
      throw new Error('사용자 목록을 찾을 수 없습니다');
    }
    if (error.status === 500) {
      throw new Error('서버 오류가 발생했습니다');
    }
    throw new Error('알 수 없는 오류가 발생했습니다');
  }
};`,
  },
  {
    title: '로딩 상태 관리',
    description: 'API 호출 중 로딩 상태를 적절히 관리하세요.',
    example: `const { data: users, loading, error } = useAsyncState(
  () => apiClient.get<User[]>('/users'),
  []
);

// 템플릿에서 사용
<template>
  <div v-if="loading">로딩 중...</div>
  <div v-else-if="error">에러: {{ error.message }}</div>
  <div v-else>
    <div v-for="user in users" :key="user.id">
      {{ user.name }}
    </div>
  </div>
</template>`,
  },
  {
    title: '캐싱 전략',
    description: '적절한 캐싱을 통해 성능을 최적화하세요.',
    example: `// 캐시 설정
const apiClient = new ApiClient({
  baseURL: 'https://api.example.com',
  cache: {
    maxAge: 5 * 60 * 1000, // 5분
    maxSize: 100 // 최대 100개 캐시
  }
});

// 캐시 무효화
apiClient.invalidateCache('/users');

// 조건부 캐싱
const users = await apiClient.get('/users', {
  cache: {
    key: 'users-list',
    maxAge: 10 * 60 * 1000 // 10분
  }
});`,
  },
];
</script>

<style scoped>
.api-examples-view {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.header p {
  font-size: 1.125rem;
  color: #6c757d;
  max-width: 600px;
  margin: 0 auto;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.api-overview h2,
.api-examples h2,
.error-handling h2,
.interceptors h2,
.best-practices h2 {
  font-size: 2rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.overview-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.overview-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f1f3f4;
  color: #6c757d;
}

.feature-list li:last-child {
  border-bottom: none;
}

.code-block {
  background: #1e1e1e;
  border-radius: 0.5rem;
  overflow: hidden;
}

.code-block pre {
  margin: 0;
  padding: 1.5rem;
  color: #d4d4d4;
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  overflow-x: auto;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
}

.example-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.example-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.example-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.example-method {
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.example-method.GET {
  background: #d4edda;
  color: #155724;
}

.example-method.POST {
  background: #d1ecf1;
  color: #0c5460;
}

.example-method.PUT {
  background: #fff3cd;
  color: #856404;
}

.example-method.PATCH {
  background: #f8d7da;
  color: #721c24;
}

.example-method.DELETE {
  background: #f5c6cb;
  color: #721c24;
}

.example-card p {
  color: #6c757d;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.example-code h4,
.example-response h4,
.example-demo h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.75rem;
}

.example-code,
.example-response {
  margin-bottom: 1.5rem;
}

.example-demo {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 0.5rem;
  text-align: center;
}

.api-demo button {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.api-demo button:hover {
  background: #5a6fd8;
}

.api-demo p {
  color: #6c757d;
  font-size: 0.875rem;
  margin: 0;
}

.error-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.error-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.error-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.error-card p {
  color: #6c757d;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.interceptor-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.interceptor-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.interceptor-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.interceptor-card p {
  color: #6c757d;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.practice-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.practice-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.practice-card p {
  color: #6c757d;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.practice-example h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.75rem;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .overview-grid,
  .examples-grid,
  .error-examples,
  .interceptor-examples,
  .practices-grid {
    grid-template-columns: 1fr;
  }

  .example-header {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>
