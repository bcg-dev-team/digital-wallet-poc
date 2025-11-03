/**
 * 회원가입 관련 타입 정의
 * apps/sample-desktop에서만 사용되는 회원가입 관련 타입들을 정의합니다.
 */

/**
 * 업로드된 파일 정보 인터페이스
 */
export interface UploadedFile {
  /** 파일 ID */
  id: string;
  /** 원본 파일명 */
  originalName: string;
  /** 저장된 파일명 */
  fileName: string;
  /** 파일 경로 */
  filePath: string;
  /** 파일 크기 (바이트) */
  size: number;
  /** MIME 타입 */
  mimeType: string;
  /** 업로드 일시 */
  uploadedAt: Date;
}

/**
 * 약관 동의 정보 인터페이스
 */
export interface AgreementInfo {
  /** 서비스 이용 약관 동의 여부 */
  serviceUseNotificationYn: boolean;
  /** 개인정보 수집 및 이용 동의 여부 */
  personalInfoCollectionYn: boolean;
  /** 마케팅 활용 및 광고성 정보 수신 동의 여부 */
  marketingUseAndAdvertiseInfoYn: boolean;
}

/**
 * 회원가입 정보 인터페이스
 */
export interface UserInfo {
  ci: string;
  /** 이름(한글) */
  name: string;
  /** 이메일 */
  email: string;
  /** 휴대폰번호 */
  phoneNo: string;
  /** 생년월일 */
  birth: string;
  /** 비밀번호 */
  password: string;
}

/**
 * 휴대폰 본인인증 후 얻은 사용자 정보 인터페이스
 */
export interface UserInfoForPass {
  ci: string;
  name: string;
  phoneNo: string;
  birth: string;
}

/**
 * 개인 회원가입 정보 인터페이스
 */
export interface IndividualSignUpInfo {
  /** 성(영문) */
  lastNameEn: string;
  /** 이름(영문) */
  firstNameEn: string;
  /** 주소(한글) */
  address: string;
  /** 상세주소(한글) */
  detailAddress: string;
  /** 주소(영문) */
  addressEn: string;
  /** 상세주소(영문) */
  detailAddressEn: string;
  /** 우편번호 */
  zipCode: string;
  /** 신분증(주민등록증 또는 운전면허증) */
  idCard: File | null;
  /** 신분증 초본(영문) */
  additionalIdDocument: File | null;
}

/**
 * 법인 회원가입 정보 인터페이스
 */
export interface CorporateSignUpInfo {
  /** 법인명 */
  companyName: string;
  /** 사업자등록번호 */
  businessRegistrationNumber: string;
  /** 법인등록번호 */
  businessNumber: string;
  /** 법인대표 성(영문) */
  representativeLastName: string;
  /** 법인대표 이름(영문) */
  representativeFirstName: string;
  /** 법인대표 생년월일 */
  representativeBirth: string;
  /** 법인주소 */
  address: string;
  /** 법인주소 상세 */
  detailAddress: string;
  /** 법인주소(영문) */
  addressEn: string;
  /** 법인주소 상세(영문) */
  detailAddressEn: string;
  /** 우편번호 */
  zipCode: string;
  /** 사업자등록증명원 */
  businessRegistration: File | null;
  /** 법인대표 초본(영문) */
  corporateRepresentative: File | null;
  /** 법인명 공과금 납부서 */
  billPaymentCorporate: File | null;
  /** 주주 명부(영문 공증 필요) */
  shareholderRegister: File | null;
  /** 법인대표 여권 사본 */
  corporateRepresentativePassport: File | null;
  /** 법인대표 여권 사본(2명 이상일 경우) */
  additionalCorporateRepresentativePassport: File[] | null;
}
