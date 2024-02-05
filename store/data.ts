// export interface SurveyLoanPlanDto {
//   survey: SurveyDto;
//   loanPlan: LoanPlanDto;
// }
//
// export interface SurveyDto {
//   id: number;
//   cartableId: number;
//   endOfActivationDate: string | null;
//   constructionApproval: boolean;
//   constructionPercentageProgress: number | null;
//   constructionDescription: string;
//   isEquipmentBought: boolean;
//   isFactorMatch: boolean | null;
//   equipmentTypeId: number | null;
//   equipmentDescription: string;
//   surveyReport: string;
//   latitude: string;
//   longitude: string;
//   customerOffer: string;
//   numberOfJobsCreated: number | null;
//   numberOfInsurdPerson: number | null;
//   surveyDate: string;
//   planActivationTypeId: number;
//   planServiceSurvey: PlanServiceSurvey;
//   guidList: string[];
//   planLivestockSurvey: PlanLivestockSurveyDto;
//   planGardenSurvey: PlanGardenSurveyDto;
//   planIndustrialSurvey: PlanIndustrialSurveyDto;
//   isValidPlanNo: boolean;
// }
//
// export interface PlanServiceSurvey {
//   id: number;
//   surveyId: number;
//   hasWorkPermission: boolean;
//   ownerTypeId: number;
//   presenceTypeId: number;
//   ownerType: OwnerType;
//   presenceType: PresenceType;
// }
//
// export interface OwnerType {
//   id: number;
//   name: string;
// }
//
// export interface PresenceType {
//   id: number;
//   name: string;
// }
//
// export interface OwnerTypeDto {
//   id: number;
//   name: string;
// }
// export interface ProductTypeDto {
//   id: number;
//   name: string;
// }
// export interface PresenceTypeDto {
//   id: number;
//   name: string;
// }
// export interface PlanLivestockSurveyDto {
//   iD: number;
//   surveyId: number;
//   livestockBooklet: boolean;
//   livestockLicense: boolean;
//   livestockInsurance: boolean;
//   insuranceDate: string | null;
//   numberOfInsuredLivestock: number | null;
//   livestockTypeId: number;
//   numberOfMaleLivestock: number;
//   numberOfFemaleLivestock: number | null;
//   livestockType: LivestockTypeDto;
//   survey: SurveyDto;
//   surveys: SurveyDto[];
// }
//
// export interface LivestockTypeDto {
//   iD: number;
//   name: string;
// }
//
// export interface PlanGardenSurveyDto {
//   id: number;
//   surveyId: number;
//   ownerTypeId: number;
//   productTypeId: number;
//   landArea: number;
//   cultivatedLandArea: number;
//   hasAgriculturalInsurance: boolean;
//   endOfAgriculturalInsurance: string | null;
//   ownerType: OwnerTypeDto;
//   productType: ProductTypeDto;
//   survey: SurveyDto;
// }
//
// export interface PlanIndustrialSurveyDto {
//   iD: number;
//   surveyId: number;
//   hasWorkPermission: boolean;
//   ownerTypeId: number;
//   presenceTypeId: number;
//   ownerType: OwnerTypeDto;
//   presenceType: PresenceTypeDto;
//   survey: SurveyDto;
// }
//
// export interface LoanPlanDto {
//   id: number;
//   cartableId: number;
//   genderType: boolean | null;
//   loanId: number;
//   loanSurveyEconomidTypeId: number;
//   maritalStatusId: boolean;
//   residentTypeId: number;
//   isFamilySupervisor: boolean;
//   mobileNo: string;
//   phone: string;
//   planTypeId: number;
//   latitude: string;
//   longitude: string;
//   address: string;
//   cityName: string;
//   villageName: string;
//   planNoId: number;
//   loanSurveyEconomicType: LoanSurveyEconomicTypeDto;
//   maritalStatusType: MaritalStatusTypeDto;
//   residentType: ResidentTypeDto;
//   planNo: PlanNoDto;
//   planType: PlanTypeDto;
//   educationTypeId: number | null;
//   loanSystemTypeId: number;
//   insuranceTypeId: number | null;
//   workshopCode: number | null;
//   otherPlanNo: string;
// }
//
// export interface LoanSurveyEconomicTypeDto {
//   iD: number;
//   name: string;
// }
//
// export interface MaritalStatusTypeDto {
//   iD: boolean;
//   name: string;
// }
//
// export interface ResidentTypeDto {
//   iD: number;
//   name: string;
// }
//
// export interface PlanNoDto {
//   iD: number;
//   suveryEconomicTypeId: number;
//   name: string;
//   newSurveyEconomicTypeId: number | null;
//   loanSurveyEconomicType: LoanSurveyEconomicTypeDto;
// }
//
// export interface PlanTypeDto {
//   iD: number;
//   parentId: number | null;
//   name: string;
//   planType1: PlanTypeDto;
// }
