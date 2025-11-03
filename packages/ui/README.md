# @digital-wallet/ui

Digital Wallet PoC용 UI 컴포넌트 라이브러리

## 컴포넌트

### Button
Figma 디자인 기반 버튼 컴포넌트

```tsx
import { Button } from "@digital-wallet/ui";

<Button variant="primary">입금하기</Button>
<Button variant="secondary">출금하기</Button>
<Button variant="outline">취소</Button>
```

### Card
카드 컴포넌트

```tsx
import { Card, CardHeader, CardContent } from "@digital-wallet/ui";

<Card>
  <CardHeader>제목</CardHeader>
  <CardContent>내용</CardContent>
</Card>
```

### Input
입력 필드 컴포넌트

```tsx
import { Input } from "@digital-wallet/ui";

<Input placeholder="금액을 입력하세요" />
```

## 유틸리티

### cn
Tailwind CSS 클래스 병합 유틸리티

```tsx
import { cn } from "@digital-wallet/ui";

const className = cn("base-class", isActive && "active-class");
```

