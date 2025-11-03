import {
  AgreementInfo,
  CorporateSignUpInfo,
  IndividualSignUpInfo,
  UserInfo,
  UserInfoForPass,
} from '@/types/store/signup.types';

import type { IndividualMemberJoinRequest, CorporateMemberJoinRequest } from '@template/api';
import { reactive, computed } from 'vue';

import { defineStore } from 'pinia';

export const useSignupStore = defineStore('signup', () => {
  const terms = reactive<AgreementInfo>({
    serviceUseNotificationYn: false,
    personalInfoCollectionYn: false,
    marketingUseAndAdvertiseInfoYn: false,
  });

  const userInfo = reactive<UserInfo>({
    ci: '',
    name: '', //이름(한글)
    email: '', //이메일
    phoneNo: '', //휴대폰번호
    birth: '', //생년월일
    password: '', //비밀번호
  });

  const individualInfo = reactive<IndividualSignUpInfo>({
    lastNameEn: '', //성(영문)
    firstNameEn: '', //이름(영문)
    address: '', //주소(한글)
    detailAddress: '', //상세주소(한글)
    addressEn: '', //주소(영문)
    detailAddressEn: '', //상세주소(영문)
    zipCode: '', //우편번호

    idCard: null, //신분증(주민등록증 또는 운전면허증)
    additionalIdDocument: null, //신분증 초본(영문)
  });

  const corporateInfo = reactive<CorporateSignUpInfo>({
    companyName: '', //법인명
    businessRegistrationNumber: '', //사업자등록번호
    businessNumber: '', //법인등록번호
    representativeLastName: '', //법인대표 성(영문)
    representativeFirstName: '', //법인대표 이름(영문)
    representativeBirth: '', //법인대표 생년월일
    address: '', //법인주소
    detailAddress: '', //법인주소 상세
    addressEn: '', //법인주소(영문)
    detailAddressEn: '', //법인주소 상세(영문)
    zipCode: '', //우편번호

    businessRegistration: null, //사업자등록증명원
    corporateRepresentative: null, //법인대표 초본(영문)
    billPaymentCorporate: null, //법인명 공과금 납부서
    shareholderRegister: null, //주주 명부(영문 공증 필요)
    corporateRepresentativePassport: null, //법인대표 여권 사본
    additionalCorporateRepresentativePassport: [], //법인대표 여권 사본(2명 이상일 경우)
  });

  /**
   * 개인 회원가입에 필요한 정보를 반환합니다.
   */
  const getIndividualSignupInfo = computed(
    (): IndividualMemberJoinRequest & { idCard: File; additionalIdDocument?: File } => {
      // 타입 변환: string -> Date
      return {
        ci: userInfo.ci,
        email: userInfo.email, // 이제 string으로 사용 가능!
        password: userInfo.password,
        name: userInfo.name,
        phoneNo: userInfo.phoneNo,
        birth: userInfo.birth,
        firstNameEn: individualInfo.firstNameEn,
        lastNameEn: individualInfo.lastNameEn,
        address: individualInfo.address,
        addressEn: individualInfo.addressEn,
        detailAddress: individualInfo.detailAddress,
        detailAddressEn: individualInfo.detailAddressEn,
        zipCode: individualInfo.zipCode,
        idCard: individualInfo.idCard!, // File
        additionalIdDocument: individualInfo.additionalIdDocument || undefined,
      };
    }
  );

  /**
   * 법인 회원가입에 필요한 정보를 반환합니다.
   */
  const getCorporateSignupInfo = computed(
    (): CorporateMemberJoinRequest & {
      businessRegistration: File;
      corporateRepresentative: File;
      billPaymentCorporate: File;
      shareholderRegister: File;
      corporateRepresentativePassport: File;
      additionalCorporateRepresentativePassport?: File[];
    } => {
      // 타입 변환: string -> Date, 필드명 매핑
      return {
        ci: userInfo.ci,
        email: userInfo.email, // 이제 string으로 사용 가능!
        password: userInfo.password,
        name: userInfo.name,
        phoneNo: userInfo.phoneNo,
        // 법인회원에는 birth 없음, 대신 representativeBirth 사용
        companyName: corporateInfo.companyName,
        businessRegistrationNumber: corporateInfo.businessRegistrationNumber,
        businessNumber: corporateInfo.businessNumber,
        address: corporateInfo.address,
        addressEn: corporateInfo.addressEn,
        detailAddress: corporateInfo.detailAddress,
        detailAddressEn: corporateInfo.detailAddressEn,
        zipCode: corporateInfo.zipCode,
        representativeEngFirstName: corporateInfo.representativeFirstName,
        representativeEngLastName: corporateInfo.representativeLastName,
        representativeBirth: corporateInfo.representativeBirth,
        // File들
        businessRegistration: corporateInfo.businessRegistration!,
        corporateRepresentative: corporateInfo.corporateRepresentative!,
        billPaymentCorporate: corporateInfo.billPaymentCorporate!,
        shareholderRegister: corporateInfo.shareholderRegister!,
        corporateRepresentativePassport: corporateInfo.corporateRepresentativePassport!,
        additionalCorporateRepresentativePassport:
          corporateInfo.additionalCorporateRepresentativePassport || undefined,
      };
    }
  );

  /**
   *
   * @param value 약관 동의 내용
   * - serviceUseNotificationYn: 서비스 이용 약관 동의 여부(필수)
   * - personalInfoCollectionYn: 개인정보 수집 및 이용 동의 여부(필수)
   * - marketingUseAndAdvertiseInfoYn: 마케팅 활용 및 광고성 정보 수신 동의 여부(선택)
   *
   * @description 약관 동의 내용을 업데이트 합니다.
   */
  const updateTerms = (value: AgreementInfo) => {
    terms.serviceUseNotificationYn = value.serviceUseNotificationYn;
    terms.personalInfoCollectionYn = value.personalInfoCollectionYn;
    terms.marketingUseAndAdvertiseInfoYn = value.marketingUseAndAdvertiseInfoYn;
  };

  /**
   *
   * @param value 사용자 정보
   *
   * @description 휴대폰인증(PASS) 후 얻은 사용자 정보를 업데이트합니다.
   */
  const updateUserInfo = (value: UserInfoForPass) => {
    userInfo.ci = value.ci;
    userInfo.name = value.name;
    userInfo.phoneNo = value.phoneNo;
    userInfo.birth = value.birth;
  };

  /**
   *
   * @param value 이메일
   *
   * @description 이메일 검증 후 이메일 정보를 업데이트합니다.
   */
  const updateUserEmail = (value: string) => {
    userInfo.email = value;
  };

  /**
   *
   * @param value 비밀번호
   *
   * @description 비밀번호 유효성검사 후 비밀번호 정보를 업데이트합니다.
   */
  const updateUserPassword = (value: string) => {
    userInfo.password = value;
  };

  /**
   *
   * @param value 개인 회원가입 정보
   *
   * @description 개인 회원가입 시 필요한 정보를 업데이트합니다.
   */
  const updateIndividual = (value: IndividualSignUpInfo) => {
    individualInfo.lastNameEn = value.lastNameEn;
    individualInfo.firstNameEn = value.firstNameEn;
    individualInfo.address = value.address;
    individualInfo.detailAddress = value.detailAddress;
    individualInfo.addressEn = value.addressEn;
    individualInfo.detailAddressEn = value.detailAddressEn;
    individualInfo.zipCode = value.zipCode;
  };

  /**
   *
   * @param value 개인 회원가입 정보
   *
   * @description 개인 회원가입 시 필요한 파일을 업데이트합니다.
   */
  const uploadIndividualDocument = (
    individualDocument: File,
    additionalIdDocument: File | null
  ) => {
    individualInfo.idCard = individualDocument;
    individualInfo.additionalIdDocument = additionalIdDocument;
  };

  /**
   *
   * @param value 법인 회원가입 정보
   *
   * @description 법인 회원가입 시 필요한 정보를 업데이트합니다.
   */
  const updateCorporate = (value: CorporateSignUpInfo) => {
    corporateInfo.companyName = value.companyName;
    corporateInfo.businessRegistrationNumber = value.businessRegistrationNumber;
    corporateInfo.businessNumber = value.businessNumber;
    corporateInfo.representativeLastName = value.representativeLastName;
    corporateInfo.representativeFirstName = value.representativeFirstName;
    corporateInfo.representativeBirth = value.representativeBirth;
    corporateInfo.address = value.address;
    corporateInfo.detailAddress = value.detailAddress;
    corporateInfo.addressEn = value.addressEn;
    corporateInfo.detailAddressEn = value.detailAddressEn;
    corporateInfo.zipCode = value.zipCode;
  };

  /**
   *
   * @param value 법인 회원가입 정보
   *
   * @description 법인 회원가입 시 필요한 파일을 업데이트합니다.
   */
  const uploadCorpInfoDocument = (
    businessRegistration: File,
    corporateRepresentative: File,
    billPaymentCorporate: File
  ) => {
    corporateInfo.businessRegistration = businessRegistration;
    corporateInfo.corporateRepresentative = corporateRepresentative;
    corporateInfo.billPaymentCorporate = billPaymentCorporate;
  };

  /**
   *
   * @param value 법인 대표 여권 사본 (1개 이상)
   *
   * @description 법인 회원가입 시 필요한 법인대표 관련 파일을 업데이트합니다.
   */
  const uploadCorpAdminDocument = (
    shareholderRegister: File,
    corporateRepresentativePassport: File,
    additionalCorporateRepresentativePassport: File[]
  ) => {
    corporateInfo.shareholderRegister = shareholderRegister;
    corporateInfo.corporateRepresentativePassport = corporateRepresentativePassport;
    corporateInfo.additionalCorporateRepresentativePassport =
      additionalCorporateRepresentativePassport;
  };

  /**
   * 회원가입 스토어의 모든 정보를 초기화합니다.
   *
   * @description 약관 동의, 사용자 정보, 개인/법인 회원가입 정보를 모두 초기 상태로 되돌립니다.
   */
  const resetSignupStore = () => {
    // 약관 동의 정보 초기화
    terms.serviceUseNotificationYn = false;
    terms.personalInfoCollectionYn = false;
    terms.marketingUseAndAdvertiseInfoYn = false;

    // 사용자 기본 정보 초기화
    userInfo.ci = '';
    userInfo.name = '';
    userInfo.email = '';
    userInfo.phoneNo = '';
    userInfo.birth = '';
    userInfo.password = '';

    // 개인 회원가입 정보 초기화
    individualInfo.lastNameEn = '';
    individualInfo.firstNameEn = '';
    individualInfo.address = '';
    individualInfo.detailAddress = '';
    individualInfo.addressEn = '';
    individualInfo.detailAddressEn = '';
    individualInfo.zipCode = '';
    individualInfo.idCard = null;
    individualInfo.additionalIdDocument = null;

    // 법인 회원가입 정보 초기화
    corporateInfo.companyName = '';
    corporateInfo.businessNumber = '';
    corporateInfo.representativeLastName = '';
    corporateInfo.representativeFirstName = '';
    corporateInfo.representativeBirth = '';
    corporateInfo.address = '';
    corporateInfo.detailAddress = '';
    corporateInfo.addressEn = '';
    corporateInfo.detailAddressEn = '';
    corporateInfo.zipCode = '';
    corporateInfo.businessRegistration = null;
    corporateInfo.corporateRepresentative = null;
    corporateInfo.billPaymentCorporate = null;
    corporateInfo.shareholderRegister = null;
    corporateInfo.corporateRepresentativePassport = null;
    corporateInfo.additionalCorporateRepresentativePassport = [];
  };

  return {
    terms,
    userInfo,
    individualInfo,
    corporateInfo,

    getIndividualSignupInfo,
    getCorporateSignupInfo,

    updateTerms,
    updateUserInfo,
    updateUserEmail,
    updateUserPassword,
    updateIndividual,
    uploadIndividualDocument,
    updateCorporate,
    uploadCorpInfoDocument,
    uploadCorpAdminDocument,
    resetSignupStore,
  };
});
